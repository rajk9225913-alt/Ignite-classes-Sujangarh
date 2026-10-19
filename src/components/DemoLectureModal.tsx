import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Play, Clock, Sparkles, CheckCircle2, Circle } from 'lucide-react';

export const DemoLectureModal: React.FC = () => {
  const {
    activeDemoLecture,
    setActiveDemoLecture,
    openAdmissionWithCourse,
    isLectureCompleted,
    toggleLectureCompleted,
  } = useApp();

  if (!activeDemoLecture) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-slate-950 rounded-2xl border border-slate-800 max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-white">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-900">
          <div>
            <div className="text-xs font-semibold text-amber-400">
              {activeDemoLecture.subject} · {activeDemoLecture.duration}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1">
              {activeDemoLecture.title}
            </h3>
          </div>

          <button
            onClick={() => setActiveDemoLecture(null)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Simulation */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          <img
            src={activeDemoLecture.thumbnailUrl}
            alt={activeDemoLecture.title}
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Interactive Player Controls Simulation */}
          <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6">
            <div className="flex justify-between items-center text-xs">
              <span className="bg-amber-500/90 text-slate-950 font-bold px-2 py-0.5 rounded">
                Free Demo Preview
              </span>
              <span className="bg-black/60 px-2 py-0.5 rounded text-slate-300 font-mono">
                1080p HD
              </span>
            </div>

            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center mx-auto shadow-xl hover:scale-105 transition-transform cursor-pointer">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <p className="text-xs text-slate-200 drop-shadow-md">
                Playing: {activeDemoLecture.title}
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-full bg-slate-700/80 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full w-1/3" />
              </div>
              <div className="flex justify-between items-center text-[11px] text-slate-300 font-mono">
                <span>16:40</span>
                <span>{activeDemoLecture.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Body Details */}
        <div className="p-6 overflow-y-auto space-y-5 bg-slate-900/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="text-xs text-slate-400">Masterclass Mentor:</div>
              <div className="text-sm font-bold text-white">{activeDemoLecture.faculty}</div>
              <div className="text-xs text-amber-400">{activeDemoLecture.facultyDesignation}</div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => toggleLectureCompleted(activeDemoLecture.id)}
                className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  isLectureCompleted(activeDemoLecture.id)
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/80'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                {isLectureCompleted(activeDemoLecture.id) ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Lecture Watched
                  </>
                ) : (
                  <>
                    <Circle className="w-3.5 h-3.5 text-slate-400" />
                    Mark as Watched
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setActiveDemoLecture(null);
                  openAdmissionWithCourse();
                }}
                className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Join Classroom Batch
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Lecture Key Chapter Breakdown:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              {activeDemoLecture.keyTopics.map((t, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center gap-2">
                  <span className="text-amber-400 font-bold font-mono">0{i + 1}.</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
