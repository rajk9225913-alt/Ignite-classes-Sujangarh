import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NoteItem, SubjectCategory } from '../types';
import { Search, Download, Eye, FileText, CheckCircle2, Circle } from 'lucide-react';

const SUBJECT_FILTERS: { label: string; value: 'ALL' | SubjectCategory }[] = [
  { label: 'All Subjects', value: 'ALL' },
  { label: 'Rajasthan History', value: 'Rajasthan History' },
  { label: 'Rajasthan Geography', value: 'Rajasthan Geography' },
  { label: 'Art & Culture', value: 'Art & Culture' },
  { label: 'Child Pedagogy', value: 'Child Pedagogy (REET)' },
  { label: 'Current Affairs', value: 'Current Affairs' },
];

export const NotesRepository: React.FC = () => {
  const {
    notes,
    setActiveNotePreview,
    incrementNoteDownload,
    isNoteCompleted,
    toggleNoteCompleted,
  } = useApp();
  const [selectedSubject, setSelectedSubject] = useState<'ALL' | SubjectCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter((item) => {
    const matchesSubject = selectedSubject === 'ALL' || item.subject === selectedSubject;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.hindiTitle && item.hindiTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesQuery;
  });

  const handleDownload = (note: NoteItem) => {
    incrementNoteDownload(note.id);
    // Create authentic downloadable text summary file
    const fileContent = `IGNITE CLASSES SUJANGARH - OFFICIAL REVISION NOTES\n` +
      `Title: ${note.title}\n` +
      `Hindi: ${note.hindiTitle || 'N/A'}\n` +
      `Subject: ${note.subject} | Target: ${note.examTarget}\n` +
      `Pages: ${note.pages} | Date: ${note.dateAdded}\n\n` +
      `OVERVIEW:\n${note.description}\n\n` +
      `HIGH-YIELD REVISION BULLETS:\n` +
      note.contentPreview.map((pt, i) => `${i + 1}. ${pt}`).join('\n\n') +
      `\n\n---------------------------------------------\n` +
      `Ignite Classes Sujangarh - Station Road Campus, Churu (Raj.)\n` +
      `For Offline Batches & Test Series: Call Helpline 9829000000`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${note.title.replace(/[^a-zA-Z0-9]/g, '_')}_IgniteClasses.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="notes" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 space-y-3">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-700">
            Free Study Material · High-Yield Revision PDFs
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Handwritten Notes & Syllabus Summaries
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Curated by Ignite Classes faculty based on the latest RPSC and RSMSSB question trends. Read previews online or download for offline study.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          {/* Subject Pills (interactive filter tabs) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto scrollbar-none">
            {SUBJECT_FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setSelectedSubject(f.value)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedSubject === f.value
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notes, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-sm transition-all"
            >
              <div className="space-y-3">
                {/* Unboxed Metadata (Zero-pill discipline) */}
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span className="text-amber-700 font-semibold">{note.subject}</span>
                  <span aria-hidden="true">·</span>
                  <span>{note.examTarget}</span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {note.title}
                  </h3>
                  {note.hindiTitle && (
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                      {note.hindiTitle}
                    </p>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {note.description}
                </p>

                {/* Specs */}
                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 font-mono">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>{note.pages} Pages</span>
                  </div>
                  <span aria-hidden="true">·</span>
                  <span>{note.fileSize}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-800 font-semibold">{note.downloadsCount} downloads</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setActiveNotePreview(note)}
                    className="w-full py-2 px-3 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Read Online
                  </button>
                  <button
                    onClick={() => handleDownload(note)}
                    className="w-full py-2 px-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    PDF
                  </button>
                </div>

                <button
                  onClick={() => toggleNoteCompleted(note.id)}
                  className={`w-full py-1.5 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    isNoteCompleted(note.id)
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {isNoteCompleted(note.id) ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Revised & Completed</span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-3.5 h-3.5 text-slate-400" />
                      <span>Mark as Revised</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-xs">
            No study material found matching your filter. Try another keyword or subject.
          </div>
        )}
      </div>
    </section>
  );
};
