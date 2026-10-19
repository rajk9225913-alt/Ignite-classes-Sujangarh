import React from 'react';
import { useApp } from '../context/AppContext';
import { DemoLecture } from '../types';
import { Play, Clock, Sparkles, CheckCircle2, Circle } from 'lucide-react';

export const DemoLectures: React.FC = () => {
  const {
    demoLectures,
    setActiveDemoLecture,
    openAdmissionWithCourse,
    isLectureCompleted,
    toggleLectureCompleted,
  } = useApp();

  return (
    <section id="lectures" className="py-16 lg:py-24 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-semibold tracking-wider uppercase text-amber-400">
              Free Sample Masterclasses · Smart Classroom
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white text-balance">
              Experience the Ignite Teaching Methodology
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Watch authentic classroom demo sessions delivered by senior faculty members specializing in Rajasthan History, Geography, and Teaching Pedagogy.
            </p>
          </div>

          <button
            onClick={() => openAdmissionWithCourse()}
            className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Attend Offline Demo Class (Free)
          </button>
        </div>

        {/* Demo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {demoLectures.map((lecture: DemoLecture) => (
            <div
              key={lecture.id}
              className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-all"
            >
              <div>
                {/* Video Thumbnail with Play Trigger */}
                <div
                  onClick={() => setActiveDemoLecture(lecture)}
                  className="relative aspect-video overflow-hidden cursor-pointer bg-slate-800"
                >
                  <img
                    src={lecture.thumbnailUrl}
                    alt={lecture.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors" />

                  {/* Play Button Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-13 h-13 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Duration Tag */}
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 text-[11px] font-mono text-white flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{lecture.duration}</span>
                  </div>

                  {/* Subject Tag */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-slate-900/90 text-[11px] font-semibold text-amber-400">
                    {lecture.subject}
                  </div>
                </div>

                {/* Lecture Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3
                      onClick={() => setActiveDemoLecture(lecture)}
                      className="text-base font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer leading-snug"
                    >
                      {lecture.title}
                    </h3>
                    {lecture.hindiTitle && (
                      <p className="text-xs text-slate-400 mt-1">
                        {lecture.hindiTitle}
                      </p>
                    )}
                  </div>

                  {/* Faculty Badge */}
                  <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                    <span className="font-semibold text-white">{lecture.faculty}</span>
                    <span className="block text-[11px] text-slate-400">{lecture.facultyDesignation}</span>
                  </div>

                  {/* Key Topics List */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Key Topics Covered:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {lecture.keyTopics.map((topic, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-amber-400" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveDemoLecture(lecture)}
                  className="py-2 px-3 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
                  Watch
                </button>

                <button
                  onClick={() => toggleLectureCompleted(lecture.id)}
                  className={`py-2 px-3 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    isLectureCompleted(lecture.id)
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {isLectureCompleted(lecture.id) ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Watched
                    </>
                  ) : (
                    <>
                      <Circle className="w-3.5 h-3.5 text-slate-500" />
                      Mark Watched
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
