import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle2, Sparkles } from 'lucide-react';

export const AdmissionModal: React.FC = () => {
  const {
    isAdmissionModalOpen,
    setIsAdmissionModalOpen,
    selectedCourseForAdmission,
    submitAdmissionInquiry,
  } = useApp();

  const [formData, setFormData] = useState<{
    studentName: string;
    mobile: string;
    examTarget: string;
    preferredMode: 'Offline Classroom (Sujangarh)' | 'Live Online Coaching';
    qualification: string;
    message: string;
  }>({
    studentName: '',
    mobile: '',
    examTarget: 'REET 2026 Level-1 & 2',
    preferredMode: 'Offline Classroom (Sujangarh)',
    qualification: '',
    message: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (selectedCourseForAdmission) {
      setFormData((prev) => ({
        ...prev,
        examTarget: selectedCourseForAdmission.title,
      }));
    }
  }, [selectedCourseForAdmission]);

  if (!isAdmissionModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.mobile.trim()) return;

    submitAdmissionInquiry(formData);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsAdmissionModalOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setIsAdmissionModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Ignite Classes Sujangarh
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            {selectedCourseForAdmission ? `Reserve Seat: ${selectedCourseForAdmission.title}` : 'Book 3-Day Free Demo Seat'}
          </h3>
          <p className="text-xs text-slate-600">
            Attend actual classroom sessions at our Station Road, Sujangarh campus before paying fees.
          </p>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Seat Reservation Confirmed!</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              We have received your details. Our Sujangarh center coordinator will connect with you on WhatsApp shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Student Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Vikas Sharma"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  placeholder="10-digit number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Exam
                </label>
                <input
                  type="text"
                  value={formData.examTarget}
                  onChange={(e) => setFormData({ ...formData, examTarget: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Batch Mode
                </label>
                <select
                  value={formData.preferredMode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preferredMode: e.target.value as 'Offline Classroom (Sujangarh)' | 'Live Online Coaching',
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="Offline Classroom (Sujangarh)">Offline Classroom (Sujangarh)</option>
                  <option value="Live Online Coaching">Live Online Coaching</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Qualification
                </label>
                <input
                  type="text"
                  placeholder="e.g. B.Ed., Graduation"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Any specific question?
              </label>
              <textarea
                rows={2}
                placeholder="Ask about batch timings, fees concession, or syllabus..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer text-center"
            >
              Confirm 3-Day Demo Seat
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
