import React, { useState } from 'react';
import { MessageCircle, X, Send, ChevronRight } from 'lucide-react';

const QUICK_TOPICS = [
  {
    label: 'REET 2026 Exam Guidance',
    message: 'Hello Ignite Classes Sujangarh! I want to inquire about REET Level 1 & 2 coaching, syllabus, and study kits.',
  },
  {
    label: 'Rajasthan CET 2026 Preparation',
    message: 'Hello Ignite Classes! I want guidance on Rajasthan CET 2026 syllabus and preparation strategy.',
  },
  {
    label: 'Police & Patwar Offline Coaching',
    message: 'Hello! Please share details about Rajasthan Police Constable & Patwar coaching at Sujangarh campus.',
  },
  {
    label: '3-Day Free Demo Class',
    message: 'Hello Ignite Classes! I would like to book a 3-day free demo class at your Sujangarh campus.',
  },
];

export const WhatsAppFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const basePhone = '919829000000';
  const defaultMessage = 'Hello Ignite Classes Sujangarh, I would like to inquire about coaching admission and new batch timings.';

  const getWhatsAppUrl = (msg: string) => {
    return `https://wa.me/${basePhone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Expanded Quick Chat Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-fadeIn text-slate-800">
          {/* Card Header with WhatsApp Green */}
          <div className="bg-emerald-600 px-4 py-3.5 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 fill-current text-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight">Ignite Admissions Desk</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-200" />
                  <span>Sujangarh Campus · Online</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close WhatsApp chat card"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Chat Body */}
          <div className="p-4 bg-slate-50 space-y-3 text-xs">
            {/* Friendly Greeting Bubble */}
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
              <p className="font-semibold text-slate-900">
                Namaste! Welcome to Ignite Classes Sujangarh.
              </p>
              <p className="text-slate-600 leading-relaxed">
                How can our admission counselors assist you today? Select an exam topic below or message us directly on WhatsApp.
              </p>
            </div>

            {/* Quick Topic Chips */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Popular Inquiries:
              </span>
              <div className="space-y-1.5">
                {QUICK_TOPICS.map((topic, idx) => (
                  <a
                    key={idx}
                    href={getWhatsAppUrl(topic.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full p-2.5 rounded-lg bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition-colors flex items-center justify-between group text-slate-700 hover:text-emerald-900"
                  >
                    <span className="font-medium">{topic.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Direct Connect Action */}
            <a
              href={getWhatsAppUrl(defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors flex items-center justify-center gap-2 shadow-sm text-center"
            >
              <Send className="w-3.5 h-3.5" />
              Start Direct WhatsApp Chat
            </a>

            <div className="text-center text-[10px] text-slate-400">
              Station Road Campus, Sujangarh (Churu) · +91 98290 00000
            </div>
          </div>
        </div>
      )}

      {/* Persistent Floating Action Button */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <span className="hidden sm:inline-block px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-semibold shadow-md border border-slate-800 backdrop-blur-xs pointer-events-none">
            Chat with Admissions Desk
          </span>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-13 px-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl hover:shadow-emerald-500/25 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2.5 cursor-pointer font-bold text-xs sm:text-sm border-2 border-white/20"
          aria-label="Chat with Us on WhatsApp"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-current" />
          </div>
          <span className="font-bold tracking-wide">
            {isOpen ? 'Close' : 'Chat with Us'}
          </span>
        </button>
      </div>
    </div>
  );
};
