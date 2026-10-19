import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, BookOpen, CheckCircle2, Award, Users, MapPin } from 'lucide-react';

export const Hero: React.FC = () => {
  const { openAdmissionWithCourse } = useApp();

  return (
    <section className="relative bg-slate-950 text-white overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800">
      {/* Background subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,119,6,0.12),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Human Editorial Pre-Header */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
              <span>Sujangarh's Premier Coaching Institute</span>
              <span aria-hidden="true">·</span>
              <span>RPSC & RSMSSB Specialists</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              Rajasthan Govt Exam Ambition, Ignited with Proven Discipline.
            </h1>

            {/* Subtitle / Value Pitch */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Premier competitive coaching, expert classroom guidance, and personalized mentorship for REET, CET, Rajasthan Police, Patwar, and 2nd Grade Teacher exams in Sujangarh.
            </p>

            {/* Value checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>RPSC & RSMSSB updated syllabus coverage</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dedicated offline doubt-clearing sessions</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Personalized mentor tracking & classroom guidance</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Quiet self-study library & campus reading rooms</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => openAdmissionWithCourse()}
                className="px-6 py-3.5 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-md hover:shadow-amber-500/10 flex items-center gap-2 cursor-pointer"
              >
                Book 3-Day Free Demo Seat
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#testimonials"
                className="px-5 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                View Student Success Stories
              </a>
            </div>

            {/* Verified Trust Line */}
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
              <span>Daily counseling desk: 9:00 AM - 6:00 PM</span>
              <span aria-hidden="true">·</span>
              <span>Direct mentor focus at Sujangarh Campus</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
              <img
                src="/src/assets/images/hero_classroom_coaching_1792070757343.jpg"
                alt="Ignite Classes Sujangarh Lecture Hall with Students"
                className="w-full h-80 sm:h-96 lg:h-[420px] object-cover transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

              {/* Bottom Overlay Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/60">
                <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-1">
                  <span>CLASSROOM TEACHING</span>
                  <span className="text-slate-300">Sujangarh Campus</span>
                </div>
                <p className="text-xs text-slate-200">
                  Disciplined classroom environment with experienced Rajasthan subject faculty and personal attention for every student.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Proof of Impact / KPI strip */}
        <div className="mt-16 pt-10 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400">
              <Award className="w-5 h-5" />
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">850+</span>
            </div>
            <p className="text-xs font-medium text-slate-400">Total Selections in Rajasthan Govt Exams</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400">
              <Users className="w-5 h-5" />
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">15+ Yrs</span>
            </div>
            <p className="text-xs font-medium text-slate-400">Senior Faculty Teaching Experience</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">100%</span>
            </div>
            <p className="text-xs font-medium text-slate-400">Syllabus Completion Guarantee</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400">
              <MapPin className="w-5 h-5" />
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">Prime</span>
            </div>
            <p className="text-xs font-medium text-slate-400">Station Road Campus, Sujangarh</p>
          </div>
        </div>
      </div>
    </section>
  );
};
