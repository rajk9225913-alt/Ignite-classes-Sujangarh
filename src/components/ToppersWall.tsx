import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, Quote } from 'lucide-react';

export const ToppersWall: React.FC = () => {
  const { toppers } = useApp();

  return (
    <section id="toppers" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-semibold tracking-wider uppercase text-amber-700">
              Verified Selections · Shekhawati Pride
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              Proven Results Across Rajasthan Govt Exams
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Meet our selected classroom students from Sujangarh and nearby areas who secured top ranks in REET, Rajasthan Police, CET, and Patwar examinations.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-xl">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Over 850+ Total Student Selections since Inception</span>
          </div>
        </div>

        {/* Feature Felicitation Banner + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Real ceremony image */}
          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
            <img
              src="/src/assets/images/topper_felicitation_ceremony_1792070756851.jpg"
              alt="Ignite Classes Annual Toppers Felicitation Ceremony"
              className="w-full h-72 sm:h-80 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="text-xs font-bold text-slate-900">
                Annual Achievers' Felicitation Ceremony
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Merit award winners felicitated with cash scholarships and trophies at Sujangarh Auditorium.
              </p>
            </div>
          </div>

          {/* Testimonial Highlights Grid (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {toppers.map((topper) => (
              <div
                key={topper.id}
                className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {topper.name}
                      </h3>
                      {topper.hindiName && (
                        <p className="text-xs text-slate-500 font-medium">{topper.hindiName}</p>
                      )}
                    </div>
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      {topper.rank}
                    </span>
                  </div>

                  {/* Exam & Score details */}
                  <div className="text-xs text-slate-600 font-medium">
                    <span className="text-slate-900">{topper.exam}</span>
                    <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
                      Score: <strong className="text-slate-800">{topper.score}</strong> · Roll: {topper.rollNo}
                    </div>
                  </div>

                  {/* Attributable Quote */}
                  <p className="text-xs text-slate-600 italic leading-relaxed pt-1 flex items-start gap-1">
                    <Quote className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                    <span>"{topper.testimonial}"</span>
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                  {topper.district} · Batch {topper.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
