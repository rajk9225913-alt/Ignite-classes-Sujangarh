import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Lock,
  Plus,
  Trash2,
  CheckCircle,
  BookOpen,
  Users,
  Copy,
  Check,
  RefreshCw,
  LogOut,
} from 'lucide-react';
import { ExamCategory } from '../../types';

export const AdminModal: React.FC = () => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    updateAdminPin,
    courses,
    addCourse,
    deleteCourse,
    clearAllCourses,
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
    announcements,
    updateAnnouncement,
    resetToDefaultData,
  } = useApp();

  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'leads' | 'courses' | 'prompt' | 'settings'>('leads');
  const [promptCopied, setPromptCopied] = useState(false);

  // New Course Form State
  const [newCourse, setNewCourse] = useState({
    title: '',
    hindiTitle: '',
    category: 'REET' as ExamCategory,
    duration: '4 Months',
    mode: 'Classroom & Online' as const,
    batchStartDate: 'Starts Upcoming Monday',
    timings: '08:00 AM - 01:00 PM',
    fee: 8500,
    originalFee: 12000,
    rating: 4.9,
    enrolledStudents: 120,
    facultyLead: 'Senior Subject Specialist',
    syllabusHighlights: 'Paper 1, Paper 2, Regular Practice, Classroom Handouts',
    features: 'Printed Booklets, Library Access, Personal Doubt Desk',
    status: 'Open' as const,
  });

  // Pin Change State
  const [newPinValue, setNewPinValue] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);

  if (!isAdminModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(enteredPin);
    if (success) {
      setPinError(false);
      setEnteredPin('');
    } else {
      setPinError(true);
    }
  };

  const handleAddCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.title.trim()) return;

    addCourse({
      ...newCourse,
      syllabusHighlights: newCourse.syllabusHighlights.split(',').map((s) => s.trim()).filter(Boolean),
      features: newCourse.features.split(',').map((s) => s.trim()).filter(Boolean),
    });

    setNewCourse({
      title: '',
      hindiTitle: '',
      category: 'REET',
      duration: '4 Months',
      mode: 'Classroom & Online',
      batchStartDate: 'Starts Upcoming Monday',
      timings: '08:00 AM - 01:00 PM',
      fee: 8500,
      originalFee: 12000,
      rating: 4.9,
      enrolledStudents: 120,
      facultyLead: 'Senior Subject Specialist',
      syllabusHighlights: 'Paper 1, Paper 2, Regular Practice, Classroom Handouts',
      features: 'Printed Booklets, Library Access, Personal Doubt Desk',
      status: 'Open',
    });
  };

  const handleCopyPrompt = () => {
    const promptText = `Website details:
Business type: Rajasthan Competitive Exam Coaching Institute
Business name: Ignite Classes Sujangarh
Main goal: Student Admissions, Classroom Counseling, Merit Results & Student Reviews
Target audience: Rajasthan competitive exam aspirants (REET Level 1 & 2, Rajasthan CET 2026, Rajasthan Police Constable & SI, Patwar, RPSC 2nd Grade Senior Teacher) in Sujangarh, Churu, Shekhawati, and across Rajasthan.
Hosting Target: Netlify SPA configuration (netlify.toml, _redirects)

Key Features:
1. One-row Top Bar navigation with brand wordmark, exam streams, and 'Book Free Demo' CTA.
2. Announcement Ticker for campus admission schedules and merit achievements.
3. High-Impact Hero with classroom photo, value checklist, and proof strip (850+ Selections, 15+ Yrs Faculty Legacy).
4. Verified Toppers Hall of Fame with merit ranks, roll numbers, and celebration ceremony photo.
5. Student Success Testimonials carousel with authentic candidate quotes and star ratings.
6. Campus Location in Sujangarh (Station Road) with direct Google Maps integration and WhatsApp counseling desk.
7. Hidden Admin Management Panel (secured with PIN, default: 1234, plus Ctrl+Shift+A keyboard shortcut) allowing administrators to track student admission leads and manage notice announcements.`;

    navigator.clipboard.writeText(promptText);
    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 text-slate-100 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">Ignite Classes Sujangarh</span>
                <span className="text-[10px] font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-1.5 py-0.5 rounded">
                  Admin Console
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Back-Office Management · Student Leads, Notices & Batches
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area: Either PIN Authentication or Full Admin Dashboard */}
        {!isAdminAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto w-full text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-amber-400">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">Staff & Educator Access</h3>
              <p className="text-xs text-slate-400">
                Enter your administrative PIN to access lead inquiries and campus settings.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  maxLength={8}
                  placeholder="Enter 4-digit PIN (Default: 1234)"
                  value={enteredPin}
                  onChange={(e) => {
                    setEnteredPin(e.target.value);
                    setPinError(false);
                  }}
                  className={`w-full px-4 py-3 text-sm text-center tracking-widest bg-slate-950 border rounded-xl text-white font-mono focus:outline-none ${
                    pinError ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-700 focus:ring-1 focus:ring-amber-500'
                  }`}
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-rose-400 mt-1.5">
                    Incorrect PIN. Please try again or use default: 1234
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer"
              >
                Unlock Administrator Console
              </button>
            </form>

            <div className="text-[11px] text-slate-500">
              Shortcut: Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300 font-mono">Ctrl</kbd> +{' '}
              <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300 font-mono">Shift</kbd> +{' '}
              <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300 font-mono">A</kbd> from anywhere on the website.
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Nav Tabs */}
            <div className="px-6 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'leads' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  Student Leads ({inquiries.length})
                </button>
                <button
                  onClick={() => setActiveTab('courses')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'courses' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Course Batches ({courses.length})
                </button>
                <button
                  onClick={() => setActiveTab('prompt')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'prompt' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Copy className="w-3.5 h-3.5" />
                  Master Details
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'settings' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Settings
                </button>
              </div>

              <button
                onClick={logoutAdmin}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Lock Console
              </button>
            </div>

            {/* Tab Panes */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* TAB 1: STUDENT LEADS */}
              {activeTab === 'leads' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        Student Counseling & Demo Inquiries ({inquiries.length})
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Real-time student counseling and seat reservation inquiries from the website
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {inquiries.length === 0 ? (
                      <div className="p-8 text-center text-slate-500 text-xs bg-slate-950 rounded-xl border border-slate-800">
                        No inquiries submitted yet. Forms submitted on the website will show here instantly.
                      </div>
                    ) : (
                      inquiries.map((inq) => (
                        <div
                          key={inq.id}
                          className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white">{inq.studentName}</span>
                              <a
                                href={`tel:${inq.mobile}`}
                                className="text-xs font-mono text-amber-400 hover:underline"
                              >
                                {inq.mobile}
                              </a>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                  inq.status === 'New'
                                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                                    : inq.status === 'Contacted'
                                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                }`}
                              >
                                {inq.status}
                              </span>
                            </div>

                            <div className="text-xs text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-1">
                              <span>Target: <strong className="text-slate-200">{inq.examTarget}</strong></span>
                              <span>Mode: {inq.preferredMode}</span>
                              <span>Qualification: {inq.qualification}</span>
                              <span className="text-[11px] text-slate-500">{new Date(inq.createdAt).toLocaleDateString()}</span>
                            </div>

                            {inq.message && (
                              <p className="text-xs text-slate-300 italic pt-1 border-t border-slate-900">
                                "{inq.message}"
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <select
                              value={inq.status}
                              onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                              className="px-2 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-300 focus:outline-none"
                            >
                              <option value="New">Mark New</option>
                              <option value="Contacted">Mark Contacted</option>
                              <option value="Enrolled">Mark Enrolled</option>
                            </select>

                            <button
                              onClick={() => deleteInquiry(inq.id)}
                              className="p-1.5 text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: COURSES */}
              {activeTab === 'courses' && (
                <div className="space-y-6">
                  {/* Add Course Form */}
                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add New Rajasthan Exam Course Batch
                    </h4>

                    <form onSubmit={handleAddCourseSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Course Title *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. REET Mains Level-2 Special Batch"
                            value={newCourse.title}
                            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                            className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Hindi Title</label>
                          <input
                            type="text"
                            placeholder="e.g. रीट मुख्य परीक्षा विशेष बैच"
                            value={newCourse.hindiTitle}
                            onChange={(e) => setNewCourse({ ...newCourse, hindiTitle: e.target.value })}
                            className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Exam Category</label>
                          <select
                            value={newCourse.category}
                            onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value as ExamCategory })}
                            className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                          >
                            <option value="REET">REET</option>
                            <option value="CET">CET</option>
                            <option value="POLICE">Police</option>
                            <option value="PATWAR">Patwar</option>
                            <option value="GRADE_TEACHER">2nd Grade</option>
                            <option value="FOUNDATION">Foundation</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Fee (₹)</label>
                          <input
                            type="number"
                            value={newCourse.fee}
                            onChange={(e) => setNewCourse({ ...newCourse, fee: Number(e.target.value) })}
                            className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Original Fee (₹)</label>
                          <input
                            type="number"
                            value={newCourse.originalFee}
                            onChange={(e) => setNewCourse({ ...newCourse, originalFee: Number(e.target.value) })}
                            className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Batch Timings</label>
                          <input
                            type="text"
                            value={newCourse.timings}
                            onChange={(e) => setNewCourse({ ...newCourse, timings: e.target.value })}
                            className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="py-2 px-4 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                      >
                        Publish Course Batch
                      </button>
                    </form>
                  </div>

                  {/* Course List Table */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Currently Published Batches ({courses.length})
                      </h4>
                      {courses.length > 0 && (
                        <button
                          onClick={() => {
                            if (confirm('Are you sure you want to remove ALL batches? This will clear all active batches from the public portal.')) {
                              clearAllCourses();
                            }
                          }}
                          className="text-xs text-rose-400 hover:text-rose-300 px-2.5 py-1 rounded bg-rose-950/40 border border-rose-800/60 transition-colors cursor-pointer"
                        >
                          Clear All Batches
                        </button>
                      )}
                    </div>

                    {courses.length === 0 ? (
                      <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                        <p className="text-xs font-medium text-amber-400">
                          All batches have been removed.
                        </p>
                        <p className="text-[11px] text-slate-500">
                          No batches are currently visible to the public. You can add a new batch above whenever fresh admissions are open.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {courses.map((course) => (
                          <div
                            key={course.id}
                            className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-white">{course.title}</span>
                                <span className="text-[10px] bg-amber-400/20 text-amber-400 px-1.5 py-0.5 rounded font-mono">
                                  {course.category}
                                </span>
                              </div>
                              <div className="text-xs text-slate-400 mt-0.5">
                                ₹{course.fee.toLocaleString()} · {course.duration} · {course.timings}
                              </div>
                            </div>

                            <button
                              onClick={() => deleteCourse(course.id)}
                              className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                              title="Delete Batch"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: MASTER PROMPT / DETAILS */}
              {activeTab === 'prompt' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        Website Specification & Details
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Coaching institute structure and deployment settings.
                      </p>
                    </div>

                    <button
                      onClick={handleCopyPrompt}
                      className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      {promptCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {promptCopied ? 'Copied to Clipboard!' : 'Copy Website Details'}
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
{`Website details:
Business type: Rajasthan Competitive Exam Coaching Institute
Business name: Ignite Classes Sujangarh
Main goal: Student Admissions, Classroom Counseling, Merit Results & Student Reviews
Target audience: Rajasthan competitive exam aspirants (REET Level 1 & 2, Rajasthan CET 2026, Rajasthan Police Constable & SI, Patwar, RPSC 2nd Grade Senior Teacher) in Sujangarh, Churu, Shekhawati, and across Rajasthan.
Hosting Target: Netlify SPA configuration (netlify.toml, _redirects)

Key Features:
1. One-row Top Bar navigation with brand wordmark, exam streams, and 'Book Free Demo' CTA.
2. Announcement Ticker for campus admission schedules and merit achievements.
3. High-Impact Hero with classroom photo, value checklist, and proof strip (850+ Selections, 15+ Yrs Faculty Legacy).
4. Verified Toppers Hall of Fame with merit ranks, roll numbers, and celebration ceremony photo.
5. Student Success Testimonials carousel with authentic candidate quotes and star ratings.
6. Campus Location in Sujangarh (Station Road) with direct Google Maps integration and WhatsApp counseling desk.
7. Hidden Admin Management Panel (secured with PIN, default: 1234, plus Ctrl+Shift+A keyboard shortcut) allowing administrators to track student admission leads and manage notice announcements.`}
                  </div>
                </div>
              )}

              {/* TAB 4: SETTINGS & TICKER */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  {/* Announcement Banner Editor */}
                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Top Announcement Notice Ticker
                    </h4>

                    {announcements.map((a) => (
                      <div key={a.id} className="space-y-2">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={a.isActive}
                            onChange={(e) => updateAnnouncement(a.id, { isActive: e.target.checked })}
                            id={`ann-${a.id}`}
                            className="rounded text-amber-500 focus:ring-0"
                          />
                          <label htmlFor={`ann-${a.id}`} className="text-xs font-semibold text-white">
                            Display Active on Top Bar
                          </label>
                        </div>
                        <input
                          type="text"
                          value={a.text}
                          onChange={(e) => updateAnnouncement(a.id, { text: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Change Admin PIN */}
                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Security & Passkey PIN
                    </h4>

                    <div className="flex items-center gap-3">
                      <input
                        type="password"
                        maxLength={8}
                        placeholder="Set new PIN"
                        value={newPinValue}
                        onChange={(e) => setNewPinValue(e.target.value)}
                        className="w-48 px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                      />
                      <button
                        onClick={() => {
                          if (newPinValue.trim()) {
                            updateAdminPin(newPinValue.trim());
                            setPinChangeSuccess(true);
                            setNewPinValue('');
                            setTimeout(() => setPinChangeSuccess(false), 3000);
                          }
                        }}
                        className="px-4 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                      >
                        Update Security PIN
                      </button>
                      {pinChangeSuccess && (
                        <span className="text-xs text-emerald-400 flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> PIN Updated!
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Reset Defaults */}
                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                      Data Reset & Recovery
                    </h4>
                    <p className="text-xs text-slate-400">
                      Reset announcement notices and admissions data back to default settings.
                    </p>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to restore original default data?')) {
                          resetToDefaultData();
                        }
                      }}
                      className="px-4 py-2 text-xs font-semibold text-rose-300 bg-rose-950/60 border border-rose-800 hover:bg-rose-900/60 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Restore Seed Data
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
