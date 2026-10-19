import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, MessageSquare, Clock, CheckCircle2, Navigation } from 'lucide-react';

export const CampusLocation: React.FC = () => {
  const { submitAdmissionInquiry } = useApp();

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
    examTarget: 'REET 2026',
    preferredMode: 'Offline Classroom (Sujangarh)',
    qualification: '',
    message: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.mobile.trim()) return;

    submitAdmissionInquiry(formData);
    setIsSuccess(true);
    setFormData({
      studentName: '',
      mobile: '',
      examTarget: 'REET 2026',
      preferredMode: 'Offline Classroom (Sujangarh)',
      qualification: '',
      message: '',
    });

    setTimeout(() => {
      setIsSuccess(false);
    }, 6000);
  };

  return (
    <section id="campus" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Campus Details & Google Maps info (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-semibold tracking-wider uppercase text-amber-700">
                Offline Coaching Campus · Sujangarh, Churu
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
                Visit Ignite Classes Sujangarh
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Experience our disciplined classroom learning environment. Meet faculty counselors directly, inspect study booklets, and test our digital lab facilities.
              </p>
            </div>

            {/* Address & Contact Cards */}
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <MapPin className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs sm:text-sm text-slate-700">
                  <div className="font-bold text-slate-900">Institute Location:</div>
                  <p>Ignite Classes, Near Railway Station Road / Gandhi Chowk</p>
                  <p>Sujangarh, District Churu, Rajasthan - 331507</p>
                  <div className="pt-2">
                    <a
                      href="https://share.google/iADgG6o1lo3sLThSu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-bold text-amber-700 hover:text-amber-800 underline underline-offset-2"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      Open Location in Google Maps &rarr;
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs sm:text-sm text-slate-700">
                  <div className="font-bold text-slate-900">Visiting & Counseling Hours:</div>
                  <p>Monday to Saturday: 07:00 AM – 08:00 PM</p>
                  <p>Sunday: 08:00 AM – 02:00 PM (Weekly OMR Test Day)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="tel:919829000000"
                  className="p-4 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center gap-3 text-xs sm:text-sm font-semibold"
                >
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-400 font-normal">Direct Student Desk</span>
                    <span>+91 98290 00000</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/919829000000?text=Hello%20Ignite%20Classes%20Sujangarh%2C%20I%20am%20interested%20in%20Rajasthan%20exam%20coaching%20admission."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex items-center gap-3 text-xs sm:text-sm font-semibold"
                >
                  <MessageSquare className="w-4 h-4 text-white shrink-0" />
                  <div>
                    <span className="block text-[10px] text-emerald-100 font-normal">Instant WhatsApp Desk</span>
                    <span>Chat with Counselor</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Campus Highlights list */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Air-Cooled Smart Classrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Girls Special Guidance Desk</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Wi-Fi Enabled Self-Study Lab</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Nearby Hostel & PG Assistance</span>
              </div>
            </div>
          </div>

          {/* Right Column: Admission Inquiry Form (6 cols) */}
          <div className="lg:col-span-6 bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
            <div className="mb-6 space-y-1">
              <h3 className="text-xl font-bold text-slate-900">
                Book Free Counseling & Demo Seat
              </h3>
              <p className="text-xs text-slate-600">
                Fill this quick form to reserve your 3-day classroom trial or receive fee details on WhatsApp.
              </p>
            </div>

            {isSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-900 flex items-start gap-3 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Inquiry Successfully Registered!</strong>
                  Our Sujangarh admission counselor will call you within 2 working hours. You can also visit our Station Road campus directly.
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile / WhatsApp No. *
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="10-digit mobile"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 font-mono focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Exam *
                  </label>
                  <select
                    value={formData.examTarget}
                    onChange={(e) => setFormData({ ...formData, examTarget: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="REET 2026 Level-1">REET 2026 Level-1 (Primary)</option>
                    <option value="REET 2026 Level-2">REET 2026 Level-2 (Subject Specialization)</option>
                    <option value="Rajasthan CET 2026">Rajasthan CET 2026 (Graduation / 12th)</option>
                    <option value="Rajasthan Police Constable">Rajasthan Police Constable / SI</option>
                    <option value="Patwar & VDO">Rajasthan Patwar & VDO</option>
                    <option value="2nd Grade Teacher">RPSC 2nd Grade Senior Teacher</option>
                    <option value="Foundation Batch">Class 11/12 Foundation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Learning Mode
                  </label>
                  <select
                    value={formData.preferredMode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferredMode: e.target.value as 'Offline Classroom (Sujangarh)' | 'Live Online Coaching',
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
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
                    placeholder="e.g. B.A., B.Ed., 12th Pass"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Any specific question or batch timing preference?
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Want morning batch timings or girls hostel information..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-sm text-center"
              >
                Submit Counseling Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
