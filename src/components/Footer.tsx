import React from 'react';
import { useApp } from '../context/AppContext';
import { Lock, MapPin, Phone, MessageSquare, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { courses, setIsAdminModalOpen, openAdmissionWithCourse } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand & Address (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black text-lg">
                I
              </div>
              <div>
                <span className="text-base font-extrabold tracking-tight text-white block">
                  IGNITE CLASSES SUJANGARH
                </span>
                <span className="text-[11px] text-amber-400 uppercase tracking-wider">
                  Rajasthan Govt Exam Coaching Institute
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Empowering youth across Sujangarh, Churu, and Shekhawati with rigorous classroom mentoring, dedicated faculty support, and disciplined study habits for REET, CET, Rajasthan Police, and Patwar examinations.
            </p>

            <div className="space-y-2 text-slate-300 pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Station Road / Gandhi Chowk Campus, Sujangarh, Churu, Raj. - 331507</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:919829000000" className="hover:text-white font-mono">
                  +91 98290 00000 / 01568-220000
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Exam Streams */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {courses.length > 0 ? 'Active Batches' : 'Exam Streams'}
            </h4>
            <ul className="space-y-2">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <li key={course.id}>
                    <a href="#courses" className="hover:text-amber-400 transition-colors">
                      {course.title}
                    </a>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <a href="#campus" className="hover:text-amber-400 transition-colors">
                      REET 2026 (Level 1 & 2)
                    </a>
                  </li>
                  <li>
                    <a href="#campus" className="hover:text-amber-400 transition-colors">
                      Rajasthan CET (Graduation)
                    </a>
                  </li>
                  <li>
                    <a href="#campus" className="hover:text-amber-400 transition-colors">
                      Rajasthan CET (Senior Secondary)
                    </a>
                  </li>
                  <li>
                    <a href="#campus" className="hover:text-amber-400 transition-colors">
                      Rajasthan Police Constable & SI
                    </a>
                  </li>
                  <li>
                    <a href="#campus" className="hover:text-amber-400 transition-colors">
                      Patwar & Gram Sevak (VDO)
                    </a>
                  </li>
                  <li>
                    <a href="#campus" className="hover:text-amber-400 transition-colors">
                      2nd Grade Senior Teacher
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Col 4: Aspirant Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Aspirant Info
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#toppers" className="hover:text-amber-400 transition-colors">
                  Topper Hall of Fame & Results
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-amber-400 transition-colors">
                  Student Success Stories & Reviews
                </a>
              </li>
              <li>
                <a href="#campus" className="hover:text-amber-400 transition-colors">
                  Sujangarh Campus Facilities & Hours
                </a>
              </li>
              <li>
                <button
                  onClick={() => openAdmissionWithCourse()}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Book 3-Day Free Demo Seat
                </button>
              </li>
              <li>
                <a
                  href="https://share.google/iADgG6o1lo3sLThSu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1 text-amber-500 font-semibold"
                >
                  <ExternalLink className="w-3 h-3" />
                  Google Maps Directions
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Direct Admission */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Admissions Desk
            </h4>
            <p className="text-slate-400 text-xs">
              Reach out to our Sujangarh campus desk to schedule your offline counseling and meet subject mentors.
            </p>
            <button
              onClick={() => openAdmissionWithCourse()}
              className="w-full py-2.5 px-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer text-center"
            >
              Book 3-Day Demo Seat
            </button>
            <a
              href="https://wa.me/919829000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Chat on WhatsApp Desk
            </a>
          </div>
        </div>

        {/* Bottom Legal & Hidden Admin Trigger */}
        <div className="pt-8 mt-10 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Ignite Classes Sujangarh. All rights reserved. RPSC & RSMSSB Exam Preparatory Academy.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-600">Sujangarh, Churu, Rajasthan</span>
            <span aria-hidden="true">·</span>
            {/* Discrete Hidden Admin Access Trigger */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="flex items-center gap-1 text-slate-500 hover:text-amber-400 transition-colors cursor-pointer"
              title="Educator & Staff Management Portal (Shortcut: Ctrl+Shift+A)"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
