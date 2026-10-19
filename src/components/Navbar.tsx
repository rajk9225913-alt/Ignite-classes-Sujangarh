import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Menu, X, PhoneCall, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { courses, announcements, openAdmissionWithCourse } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeAnnouncement = announcements.find((a) => a.isActive);

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900 border-b border-slate-800 text-slate-100">
      {/* Top Urgent Notice Banner */}
      {activeAnnouncement && (
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 px-4 py-1.5 text-xs text-white">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-hidden truncate">
              {activeAnnouncement.highlightText && (
                <span className="font-bold tracking-wide uppercase text-[11px] bg-black/25 px-2 py-0.5 rounded">
                  {activeAnnouncement.highlightText}
                </span>
              )}
              <span className="truncate">{activeAnnouncement.text}</span>
            </div>
            {activeAnnouncement.linkSection && (
              <a
                href={`#${activeAnnouncement.linkSection}`}
                className="hidden sm:inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:text-amber-100 whitespace-nowrap shrink-0"
              >
                {activeAnnouncement.linkText || 'Details'} &rarr;
              </a>
            )}
          </div>
        </div>
      )}

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Brand Wordmark */}
          <a href="#" className="flex items-center gap-3 whitespace-nowrap shrink-0 group">
            <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-sm transition-transform group-hover:scale-105">
              I
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                IGNITE CLASSES
              </span>
              <span className="text-[11px] font-medium text-amber-400 tracking-wider uppercase">
                Sujangarh · Rajasthan
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {courses.length > 0 && (
              <a href="#courses" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
                Courses & Batches
              </a>
            )}
            <a href="#toppers" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
              Toppers & Results
            </a>
            <a href="#testimonials" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
              Student Reviews
            </a>
            <a href="#campus" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
              Campus Location & Contact
            </a>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <a
              href="tel:919829000000"
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span className="tabular-nums font-medium">01568-220000</span>
            </a>
            <button
              onClick={() => openAdmissionWithCourse()}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Book Free Demo
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => openAdmissionWithCourse()}
              className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 rounded-md whitespace-nowrap"
            >
              Book Demo
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-md"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-5 space-y-2">
          {courses.length > 0 && (
            <a
              href="#courses"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900 rounded-md"
            >
              Courses & Batches
            </a>
          )}
          <a
            href="#toppers"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900 rounded-md"
          >
            Toppers & Results
          </a>
          <a
            href="#testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900 rounded-md"
          >
            Student Reviews
          </a>
          <a
            href="#campus"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900 rounded-md"
          >
            Campus Location & Contact
          </a>
          <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
            <span>Sujangarh Campus: Station Road</span>
            <a href="tel:919829000000" className="text-amber-400 font-semibold">
              Call Desk
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
