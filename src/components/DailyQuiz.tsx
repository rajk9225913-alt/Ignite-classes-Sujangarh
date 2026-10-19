import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Timer, CheckCircle, XCircle, RotateCcw, HelpCircle, ArrowRight, BookOpen } from 'lucide-react';

export const DailyQuiz: React.FC = () => {
  const { quizQuestions } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(300); // 5 minutes
  const [timerActive, setTimerActive] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = quizQuestions[currentIndex];
  const totalQuestions = quizQuestions.length;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive && !isSubmitted && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && !isSubmitted) {
      handleSubmit();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, isSubmitted, secondsRemaining]);

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    if (!timerActive) setTimerActive(true);
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setShowExplanation(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimerActive(false);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIndex(0);
    setSecondsRemaining(300);
    setTimerActive(false);
    setShowExplanation(false);
  };

  // Score calculations (RPSC / RSMSSB format: +2 correct, -0.66 wrong)
  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    quizQuestions.forEach((q, idx) => {
      const selected = selectedAnswers[idx];
      if (selected === undefined) {
        unattempted++;
      } else if (selected === q.correctIndex) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const rawScore = (correct * 2) - (incorrect * 0.66);
    const score = Math.max(0, Number(rawScore.toFixed(2)));
    const maxScore = totalQuestions * 2;
    const accuracy = correct + incorrect > 0 ? Math.round((correct / (correct + incorrect)) * 100) : 0;

    return { correct, incorrect, unattempted, score, maxScore, accuracy };
  };

  const results = calculateResults();

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!currentQuestion) {
    return null;
  }

  const isCurrentAnswered = selectedAnswers[currentIndex] !== undefined;
  const currentSelected = selectedAnswers[currentIndex];
  const isCurrentCorrect = currentSelected === currentQuestion.correctIndex;

  return (
    <section id="quiz" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-semibold tracking-wider uppercase text-amber-700">
              Free Daily Exam Drill · RPSC & RSMSSB Pattern
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              Today's Rajasthan GK & Current Affairs Mock Drill
            </h2>
            <p className="text-sm text-slate-600">
              Practice high-probability questions with negative marking penalty (-0.66) and verified historical citations.
            </p>
          </div>

          {/* Test Timer & Marking Scheme Badge */}
          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 p-3 rounded-xl">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
              <Timer className="w-4 h-4 text-amber-600" />
              <span>Time Left:</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">
                {formatTime(secondsRemaining)}
              </span>
            </div>
            <span className="text-slate-300" aria-hidden="true">|</span>
            <div className="text-xs text-slate-500 font-medium">
              <span className="text-emerald-700 font-semibold">+2.0</span> / <span className="text-rose-700 font-semibold">-0.66</span>
            </div>
          </div>
        </div>

        {/* Quiz Layout */}
        {!isSubmitted ? (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
            {/* Question Progress Bar & Metadata */}
            <div className="bg-slate-100/80 px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <span className="font-bold text-slate-900">
                  Question {currentIndex + 1} of {totalQuestions}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-medium text-amber-800">{currentQuestion.subject}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-500">{currentQuestion.exam}</span>
              </div>

              {/* Question Navigator Dots/Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {quizQuestions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowExplanation(false);
                    }}
                    className={`w-7 h-7 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                      currentIndex === idx
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : selectedAnswers[idx] !== undefined
                        ? 'bg-slate-800 text-white'
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Card Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Question Text in Hindi & English */}
              <div className="space-y-2">
                {currentQuestion.questionHindi && (
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {currentQuestion.questionHindi}
                  </h3>
                )}
                <p className="text-sm sm:text-base text-slate-700">
                  {currentQuestion.question}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3">
                {currentQuestion.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentIndex] === optIdx;

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full p-4 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/80 text-slate-900 shadow-xs ring-1 ring-amber-400'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                          isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Inline explanation check toggle */}
              {isCurrentAnswered && (
                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => setShowExplanation(!showExplanation)}
                    className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    {showExplanation ? 'Hide Explanation' : 'Check Verified Explanation'}
                  </button>
                  <span className="text-xs text-slate-400">
                    Auto-saved
                  </span>
                </div>
              )}

              {/* Verified Explanation Drawer */}
              {showExplanation && (
                <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-xs sm:text-sm text-slate-800 space-y-1.5 animate-fadeIn">
                  <div className="font-bold text-amber-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-700" />
                    <span>Correct Answer: Option {String.fromCharCode(65 + currentQuestion.correctIndex)}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}

              {/* Navigation and Submit Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    currentIndex === 0
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  &larr; Previous Question
                </button>

                <div className="flex items-center gap-3">
                  {currentIndex < totalQuestions - 1 ? (
                    <button
                      onClick={handleNext}
                      className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      Next Question
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                    >
                      Submit Exam Drill
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Scoreboard and Result Analytics */
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 space-y-8 animate-fadeIn">
            <div className="max-w-2xl mx-auto text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-amber-700">
                Mock Drill Result Summary
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900">
                {results.accuracy >= 70 ? 'Excellent Preparation!' : 'Good Effort, Revise Weak Concepts!'}
              </h3>
              <p className="text-sm text-slate-600">
                Your performance has been evaluated according to RPSC standard marking rules.
              </p>
            </div>

            {/* Score Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-center">
                <div className="text-xs text-slate-500 font-medium">Final Score</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums mt-1">
                  {results.score} <span className="text-xs text-slate-400 font-normal">/ {results.maxScore}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 text-center">
                <div className="text-xs text-slate-500 font-medium">Correct Answers</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono tabular-nums mt-1">
                  {results.correct}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 text-center">
                <div className="text-xs text-slate-500 font-medium">Wrong (Penalty)</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 font-mono tabular-nums mt-1">
                  {results.incorrect}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 text-center">
                <div className="text-xs text-slate-500 font-medium">Accuracy</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono tabular-nums mt-1">
                  {results.accuracy}%
                </div>
              </div>
            </div>

            {/* Question-wise review list */}
            <div className="max-w-3xl mx-auto space-y-4">
              <h4 className="text-sm font-bold text-slate-900">
                Detailed Question Solutions:
              </h4>

              <div className="space-y-4">
                {quizQuestions.map((q, idx) => {
                  const userAns = selectedAnswers[idx];
                  const isCorrect = userAns === q.correctIndex;
                  const isAttempted = userAns !== undefined;

                  return (
                    <div
                      key={q.id}
                      className="p-5 rounded-xl bg-white border border-slate-200 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="text-sm font-bold text-slate-900">
                          Q{idx + 1}. {q.questionHindi || q.question}
                        </div>
                        <div>
                          {!isAttempted ? (
                            <span className="text-xs font-semibold text-slate-500">Unattempted</span>
                          ) : isCorrect ? (
                            <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                              <CheckCircle className="w-3.5 h-3.5" /> Correct (+2.0)
                            </span>
                          ) : (
                            <span className="text-xs font-semibold text-rose-700 flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5" /> Incorrect (-0.66)
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-xs text-slate-600 space-y-1">
                        <div>
                          <span className="font-semibold text-slate-800">Your selection: </span>
                          {isAttempted ? q.options[userAns] : 'None'}
                        </div>
                        <div>
                          <span className="font-semibold text-emerald-800">Correct solution: </span>
                          {q.options[q.correctIndex]}
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-700 leading-relaxed">
                        <span className="font-semibold text-slate-900">Explanation: </span>
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Retake & Action Buttons */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake Quiz
              </button>
              <a
                href="#courses"
                className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
              >
                Join Full Test Series Batch
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
