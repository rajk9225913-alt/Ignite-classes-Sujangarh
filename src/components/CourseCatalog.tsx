import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ExamCategory, Course } from '../types';
import { Clock, Calendar, Check, Star } from 'lucide-react';

const CATEGORIES: { label: string; value: 'ALL' | ExamCategory }[] = [
  { label: 'All Exam Batches', value: 'ALL' },
  { label: 'REET (Level 1 & 2)', value: 'REET' },
  { label: 'Rajasthan CET 2026', value: 'CET' },
  { label: 'Police Constable & SI', value: 'POLICE' },
  { label: 'Patwar & VDO', value: 'PATWAR' },
  { label: '2nd Grade Teacher', value: 'GRADE_TEACHER' },
];

export const CourseCatalog: React.FC = () => {
  const { courses, openAdmissionWithCourse } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | ExamCategory>('ALL');

  // If all batches have been removed, do not render the section
  if (courses.length === 0) {
    return null;
  }

  const filteredCourses = courses.filter((c) =>
    selectedCategory === 'ALL' ? true : c.category === selectedCategory
  );

  return (
    <section id="courses" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 space-y-3">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-700">
            Targeted Syllabus Batches · Classroom & Digital
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Select Your Target Rajasthan Competitive Exam
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Every batch at Ignite Classes Sujangarh includes full syllabus completion, subject-wise printed notes kits, weekly offline OMR simulation tests, and dedicated faculty doubt counters.
          </p>
        </div>

        {/* Category Filter Tabs: Functional button segmented control */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/80 rounded-xl overflow-x-auto scrollbar-none mb-10 max-w-fit">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === cat.value
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Course Cards Grid or Empty State */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course: Course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-amber-400/80 transition-all hover:shadow-md"
              >
                <div className="space-y-4">
                  {/* Clean unboxed kicker with category and mode */}
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span className="text-amber-700 font-semibold">{course.category} Exam Stream</span>
                    <span>{course.mode}</span>
                  </div>

                  {/* Course Title */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                      {course.title}
                    </h3>
                    {course.hindiTitle && (
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        {course.hindiTitle}
                      </p>
                    )}
                  </div>

                  {/* Batch Logistics */}
                  <div className="space-y-1.5 py-2 border-y border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{course.batchStartDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{course.timings} · {course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <span className="font-medium text-slate-900">Lead Faculty:</span>
                      <span>{course.facultyLead}</span>
                    </div>
                  </div>

                  {/* Syllabus Highlights */}
                  <div>
                    <div className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
                      Curriculum Inclusions:
                    </div>
                    <ul className="space-y-1.5">
                      {course.syllabusHighlights.slice(0, 4).map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Card Area: Pricing & CTA */}
                <div className="pt-6 mt-6 border-t border-slate-100 space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-xs text-slate-500">Complete Course Fee</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                          ₹{course.fee.toLocaleString('en-IN')}
                        </span>
                        {course.originalFee && (
                          <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                            ₹{course.originalFee.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-semibold text-amber-700">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{course.rating}</span>
                      <span className="text-slate-400 font-normal">({course.enrolledStudents})</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openAdmissionWithCourse(course)}
                      className="w-full py-2.5 px-3 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer text-center"
                    >
                      Join Batch
                    </button>
                    <button
                      onClick={() => openAdmissionWithCourse(course)}
                      className="w-full py-2.5 px-3 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer text-center"
                    >
                      Free Demo Class
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 sm:p-12 rounded-2xl bg-white border border-slate-200 text-center max-w-2xl mx-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">
                New Batches Announcement Releasing Soon
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
                All existing batches have concluded or been cleared. New classroom batches for REET, Rajasthan CET, Police Constable, and Patwar will be announced shortly. Pre-register below to receive early-bird batch schedules.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => openAdmissionWithCourse()}
                className="py-2.5 px-5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
              >
                Pre-Register for Upcoming Batches
              </button>
              <a
                href="https://wa.me/919829000000?text=Hello%20Ignite%20Classes%20Sujangarh%2C%20please%20notify%20me%20when%20new%20Rajasthan%20exam%20batches%20open."
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Notify Me on WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* Offline Center Reassurance */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Need special batch timings or hostel counseling in Sujangarh?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Visit our counseling desk at Station Road, Sujangarh or speak directly with our academic coordinators.
            </p>
          </div>
          <button
            onClick={() => openAdmissionWithCourse()}
            className="px-5 py-2.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Request Counseling Call
          </button>
        </div>
      </div>
    </section>
  );
};
