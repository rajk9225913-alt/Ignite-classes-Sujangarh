import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  Circle,
  Video,
  FileText,
  RotateCcw,
  Sparkles,
  Play,
  Eye,
  Award,
} from 'lucide-react';

export const LearningProgress: React.FC = () => {
  const {
    demoLectures,
    notes,
    completedLectures,
    completedNotes,
    toggleLectureCompleted,
    toggleNoteCompleted,
    isLectureCompleted,
    isNoteCompleted,
    clearLearningProgress,
    totalLecturesCount,
    completedLecturesCount,
    totalNotesCount,
    completedNotesCount,
    overallProgressPercentage,
    setActiveDemoLecture,
    setActiveNotePreview,
  } = useApp();

  const [filterType, setFilterType] = useState<'ALL' | 'LECTURES' | 'NOTES' | 'COMPLETED' | 'PENDING'>('ALL');

  // Build unified item list
  const allItems = [
    ...demoLectures.map((l) => ({
      id: l.id,
      title: l.title,
      hindiTitle: l.hindiTitle,
      subject: l.subject,
      type: 'lecture' as const,
      durationOrPages: l.duration,
      isCompleted: isLectureCompleted(l.id),
      rawItem: l,
    })),
    ...notes.map((n) => ({
      id: n.id,
      title: n.title,
      hindiTitle: n.hindiTitle,
      subject: n.subject,
      type: 'note' as const,
      durationOrPages: `${n.pages} Pages`,
      isCompleted: isNoteCompleted(n.id),
      rawItem: n,
    })),
  ];

  const filteredItems = allItems.filter((item) => {
    if (filterType === 'LECTURES') return item.type === 'lecture';
    if (filterType === 'NOTES') return item.type === 'note';
    if (filterType === 'COMPLETED') return item.isCompleted;
    if (filterType === 'PENDING') return !item.isCompleted;
    return true;
  });

  const getMotivationalMessage = () => {
    if (overallProgressPercentage === 100) {
      return 'All foundation demo lectures and study notes completed! You are fully prepared to attempt the full-length OMR test series.';
    }
    if (overallProgressPercentage >= 50) {
      return 'Superb momentum! Over half of the foundational study items are checked off. Keep testing yourself with the Daily Mock Drill.';
    }
    if (overallProgressPercentage > 0) {
      return 'Great start to your preparation! Continue watching video masterclasses and reading high-yield revision summaries daily.';
    }
    return 'Track your revision daily! Mark lectures as watched and handwritten notes as revised to measure your exam readiness.';
  };

  return (
    <section id="progress" className="py-16 lg:py-20 bg-slate-950 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Student Self-Study & Revision Tracker</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white text-balance">
              My Rajasthan Exam Learning Progress
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Check off demo lectures watched and handwritten notes revised. Your progress is saved automatically on this device so you never lose your revision track.
            </p>
          </div>

          {/* Action reset */}
          {(completedLecturesCount > 0 || completedNotesCount > 0) && (
            <button
              onClick={() => {
                if (confirm('Do you want to reset your checked learning progress?')) {
                  clearLearningProgress();
                }
              }}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-900 transition-colors cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Tracker
            </button>
          )}
        </div>

        {/* Progress Overview KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Overall Percentage Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Overall Syllabus Readiness
              </span>
              <Award className="w-5 h-5 text-amber-400" />
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tabular-nums">
                  {overallProgressPercentage}%
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {completedLecturesCount + completedNotesCount} / {totalLecturesCount + totalNotesCount} items
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${overallProgressPercentage}%` }}
                />
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              {getMotivationalMessage()}
            </p>
          </div>

          {/* Demo Lectures Watched */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Demo Lectures Watched
              </span>
              <Video className="w-5 h-5 text-amber-400" />
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tabular-nums">
                  {completedLecturesCount} <span className="text-base text-slate-400 font-normal">/ {totalLecturesCount}</span>
                </span>
                <span className="text-xs text-amber-400 font-mono font-bold">
                  {totalLecturesCount > 0 ? Math.round((completedLecturesCount / totalLecturesCount) * 100) : 0}%
                </span>
              </div>

              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${totalLecturesCount > 0 ? (completedLecturesCount / totalLecturesCount) * 100 : 0}%` }}
                />
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              Covers core Rajasthan History, Physical Geography & Pedagogy masterclasses.
            </p>
          </div>

          {/* Study Notes Revised */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Study Notes Revised
              </span>
              <FileText className="w-5 h-5 text-amber-400" />
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tabular-nums">
                  {completedNotesCount} <span className="text-base text-slate-400 font-normal">/ {totalNotesCount}</span>
                </span>
                <span className="text-xs text-amber-400 font-mono font-bold">
                  {totalNotesCount > 0 ? Math.round((completedNotesCount / totalNotesCount) * 100) : 0}%
                </span>
              </div>

              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${totalNotesCount > 0 ? (completedNotesCount / totalNotesCount) * 100 : 0}%` }}
                />
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              Essential bullet points and exam summary handouts saved to this device.
            </p>
          </div>
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto scrollbar-none mb-6 max-w-fit">
          {[
            { label: `All Items (${allItems.length})`, value: 'ALL' },
            { label: `Lectures (${totalLecturesCount})`, value: 'LECTURES' },
            { label: `Notes (${totalNotesCount})`, value: 'NOTES' },
            { label: `Completed (${completedLecturesCount + completedNotesCount})`, value: 'COMPLETED' },
            { label: `Pending (${allItems.length - (completedLecturesCount + completedNotesCount)})`, value: 'PENDING' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilterType(tab.value as any)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                filterType === tab.value
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Checklist Item Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                item.isCompleted
                  ? 'bg-slate-900/60 border-emerald-900/50 text-slate-300'
                  : 'bg-slate-900 border-slate-800 text-white'
              }`}
            >
              {/* Checkbox trigger & Item details */}
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <button
                  onClick={() => {
                    if (item.type === 'lecture') {
                      toggleLectureCompleted(item.id);
                    } else {
                      toggleNoteCompleted(item.id);
                    }
                  }}
                  className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer shrink-0"
                  aria-label={item.isCompleted ? 'Mark incomplete' : 'Mark complete'}
                >
                  {item.isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-950" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                  )}
                </button>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="font-semibold text-amber-400 uppercase">{item.subject}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{item.durationOrPages}</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{item.type}</span>
                  </div>

                  <h4 className={`text-xs sm:text-sm font-bold truncate leading-tight ${
                    item.isCompleted ? 'line-through text-slate-400' : 'text-white'
                  }`}>
                    {item.title}
                  </h4>

                  {item.hindiTitle && (
                    <p className="text-[11px] text-slate-500 truncate">
                      {item.hindiTitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Quick View / Play Action Button */}
              <div className="flex items-center gap-2 shrink-0">
                {item.type === 'lecture' ? (
                  <button
                    onClick={() => setActiveDemoLecture(item.rawItem as any)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3 h-3 text-amber-400 fill-current" />
                    <span className="hidden sm:inline">Watch</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveNotePreview(item.rawItem as any)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3 h-3 text-amber-400" />
                    <span className="hidden sm:inline">Read</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    if (item.type === 'lecture') {
                      toggleLectureCompleted(item.id);
                    } else {
                      toggleNoteCompleted(item.id);
                    }
                  }}
                  className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    item.isCompleted
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                      : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                  }`}
                >
                  {item.isCompleted ? 'Done' : 'Mark Done'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-xs">
            No items in this category.
          </div>
        )}
      </div>
    </section>
  );
};
