import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Download, FileText, CheckCircle2, Circle } from 'lucide-react';

export const NotePreviewModal: React.FC = () => {
  const {
    activeNotePreview,
    setActiveNotePreview,
    incrementNoteDownload,
    isNoteCompleted,
    toggleNoteCompleted,
  } = useApp();

  if (!activeNotePreview) return null;

  const handleDownload = () => {
    incrementNoteDownload(activeNotePreview.id);
    const fileContent = `IGNITE CLASSES SUJANGARH - REVISION NOTES\n` +
      `Title: ${activeNotePreview.title}\n` +
      `Subject: ${activeNotePreview.subject}\n` +
      `Exam: ${activeNotePreview.examTarget}\n\n` +
      `OVERVIEW:\n${activeNotePreview.description}\n\n` +
      `POINTS:\n` +
      activeNotePreview.contentPreview.map((p, i) => `${i + 1}. ${p}`).join('\n\n');

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${activeNotePreview.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-50">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700">
              <span>{activeNotePreview.subject}</span>
              <span aria-hidden="true">·</span>
              <span>{activeNotePreview.examTarget}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {activeNotePreview.title}
            </h3>
            {activeNotePreview.hindiTitle && (
              <p className="text-xs text-slate-500 font-medium">
                {activeNotePreview.hindiTitle}
              </p>
            )}
          </div>

          <button
            onClick={() => setActiveNotePreview(null)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Note Reading Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-sm">
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 space-y-1">
            <strong className="block font-bold">Concept Synopsis:</strong>
            <p className="leading-relaxed">{activeNotePreview.description}</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-600" />
              Verified Core Exam Points:
            </h4>

            <div className="space-y-3">
              {activeNotePreview.contentPreview.map((bullet, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-md bg-amber-200 text-amber-900 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-600 flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-800">Complete Printed 6-Booklet Kit:</span>
              <p className="text-[11px] text-slate-500">Available at Sujangarh Campus Reception for registered students.</p>
            </div>
            <span className="text-emerald-700 font-bold flex items-center gap-1 shrink-0">
              <CheckCircle2 className="w-4 h-4" /> 100% Verified
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
          <span className="text-xs text-slate-500 font-mono">
            {activeNotePreview.pages} Pages · {activeNotePreview.fileSize}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleNoteCompleted(activeNotePreview.id)}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                isNoteCompleted(activeNotePreview.id)
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
              }`}
            >
              {isNoteCompleted(activeNotePreview.id) ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Revised</span>
                </>
              ) : (
                <>
                  <Circle className="w-3.5 h-3.5 text-slate-400" />
                  <span>Mark as Revised</span>
                </>
              )}
            </button>

            <button
              onClick={() => setActiveNotePreview(null)}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
