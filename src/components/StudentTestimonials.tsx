import React, { useState, useEffect } from 'react';
import { initialTestimonials } from '../data/seedData';
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  CheckCircle2,
  Award,
  Sparkles,
} from 'lucide-react';

export const StudentTestimonials: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const filteredTestimonials = initialTestimonials.filter((item) => {
    if (activeCategory === 'ALL') return true;
    return item.category === activeCategory;
  });

  // Ensure index remains in bound when category filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // Auto-advance carousel every 6 seconds unless user is hovering
  useEffect(() => {
    if (isPaused || filteredTestimonials.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, filteredTestimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredTestimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const currentItem = filteredTestimonials[currentIndex];

  if (!currentItem) return null;

  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Aspirant Journeys · Authentic Voice of Ignite</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
              How Ignite Classes Changed Our Selection Destiny
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Read authentic classroom feedback and verified reviews from successful candidates across Sujangarh, Churu, and Shekhawati who converted their government job ambitions into reality.
            </p>
          </div>

          {/* Social Proof Trust Metrics */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium bg-slate-950/80 border border-slate-800 p-4 rounded-2xl">
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-bold text-white tabular-nums">4.9 / 5</span>
              <span className="text-slate-400">Aspirant Rating</span>
            </div>
            <span className="text-slate-700 hidden sm:inline" aria-hidden="true">|</span>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>100% Attributable Hall Tickets</span>
            </div>
          </div>
        </div>

        {/* Category Filters (Segmented Tabs) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/90 border border-slate-800 rounded-xl overflow-x-auto scrollbar-none mb-10 max-w-fit">
          {[
            { label: 'All Stories', value: 'ALL' },
            { label: 'REET Primary & Senior', value: 'REET' },
            { label: 'CET & Patwar', value: 'CET' },
            { label: 'Police Constable', value: 'POLICE' },
            { label: '2nd Grade Teacher', value: 'GRADE_TEACHER' },
          ].map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === cat.value
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Carousel Showcase Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Visual Spotlight (5 cols) */}
            <div className="lg:col-span-5 relative bg-slate-900 flex flex-col justify-between overflow-hidden">
              <div className="relative aspect-4/3 sm:aspect-16/10 lg:aspect-auto lg:h-full min-h-[300px]">
                <img
                  src="/src/assets/images/topper_felicitation_ceremony_1792070756851.jpg"
                  alt={`${currentItem.name} - ${currentItem.exam}`}
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 backdrop-blur-xs">
                    <Award className="w-3.5 h-3.5" />
                    {currentItem.keyHighlight}
                  </span>
                </div>
              </div>

              {/* Student Identification Tag in image bottom */}
              <div className="p-4 sm:p-5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold flex items-center justify-center text-xs">
                    {currentItem.avatarInitials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {currentItem.name}
                    </h4>
                    {currentItem.hindiName && (
                      <span className="text-xs text-slate-400">{currentItem.hindiName}</span>
                    )}
                  </div>
                </div>

                <div className="text-right text-xs">
                  <span className="block font-semibold text-emerald-400 font-mono">
                    {currentItem.score}
                  </span>
                  <span className="text-slate-400 text-[11px]">{currentItem.villageOrTown}</span>
                </div>
              </div>
            </div>

            {/* Right Column: In-depth Testimonial Narrative (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                {/* Header Info */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      {currentItem.exam}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {currentItem.selectionRank} · <span className="font-mono text-slate-300">{currentItem.batchYear}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(currentItem.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Primary Testimonial Quote */}
                <div className="relative pl-6 border-l-2 border-amber-500/60 space-y-3">
                  <Quote className="w-8 h-8 text-amber-400/20 absolute -top-3 -left-3 pointer-events-none" />
                  <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                    "{currentItem.quote}"
                  </p>

                  {currentItem.hindiQuote && (
                    <p className="text-xs sm:text-sm text-slate-400 italic pt-2 border-t border-slate-800/80">
                      "{currentItem.hindiQuote}"
                    </p>
                  )}
                </div>

                {/* Selection Milestone Callout */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Verified Career Outcome: </span>
                    <span>{currentItem.keyHighlight}</span>
                  </div>
                </div>
              </div>

              {/* Carousel Controls & Slide Tally */}
              <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                {/* Numeric Slide Tally */}
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <span className="text-white font-bold tabular-nums">0{currentIndex + 1}</span>
                  <span>/</span>
                  <span className="tabular-nums">0{filteredTestimonials.length}</span>
                </div>

                {/* Interactive Carousel Pagination Indicators */}
                <div className="flex items-center gap-1.5">
                  {filteredTestimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        currentIndex === idx
                          ? 'w-7 bg-amber-400'
                          : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                      aria-label={`Go to testimonial ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Next / Previous Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-9 h-9 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
