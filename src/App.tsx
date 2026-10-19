import React from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CourseCatalog } from './components/CourseCatalog';
import { ToppersWall } from './components/ToppersWall';
import { StudentTestimonials } from './components/StudentTestimonials';
import { CampusLocation } from './components/CampusLocation';
import { Footer } from './components/Footer';
import { AdmissionModal } from './components/AdmissionModal';
import { AdminModal } from './components/admin/AdminModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950 flex flex-col">
        {/* Navigation */}
        <Navbar />

        {/* Main Public Student Portal */}
        <main className="flex-1">
          {/* Hero Section */}
          <Hero />

          {/* Targeted Rajasthan Exam Batches (Rendered conditionally if published) */}
          <CourseCatalog />

          {/* Toppers & Verified Selections */}
          <ToppersWall />

          {/* Student Testimonials & Success Stories */}
          <StudentTestimonials />

          {/* Physical Sujangarh Campus & Admission Form */}
          <CampusLocation />
        </main>

        {/* Professional Footer */}
        <Footer />

        {/* Interactive Modals & Persistent Actions */}
        <AdmissionModal />
        <AdminModal />
        <WhatsAppFloatingButton />
      </div>
    </AppProvider>
  );
}
