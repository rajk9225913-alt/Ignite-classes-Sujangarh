# Ignite Classes Sujangarh — Premier Rajasthan Exam Coaching Portal & Admin Hub

A production-grade, responsive coaching institute web platform and student portal for Ignite Classes Sujangarh (inspired by Rajasthan's premier competitive institutes like Lakshya Classes), paired with a discrete, secure Admin Management Hub for uploading and managing courses, PDF notes, mock tests/quizzes, and admission inquiries.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural decisions have been aligned based on Phase 1 clarifications:
> - **Primary Coaching Curriculum**: Dedicated specialization in Rajasthan State Competitive Examinations: REET (Level 1 & 2), Rajasthan CET (Graduation & 12th Level), Rajasthan Police Constable & SI, Patwar, and 1st / 2nd Grade Teacher exams.
> - **Student Engagement Focal Features**: Interactive video lecture demo preview player, Daily Current Affairs & Rajasthan GK interactive quiz with instant scoring and explanations, downloadable PDF study material directory, and an online admission/counseling booking modal.
> - **Hidden Admin Access**: Discreet portal trigger in the footer (plus `Ctrl+Shift+A` / `Cmd+Shift+A` shortcut), leading to a PIN/password-protected administrative console to upload and edit live courses, study notes (PDFs), mock tests, announcements, and review student admission inquiries.

---

### 1. Overview & Core Concept

- **What It Does**: 
  - **Public Student Portal**: Delivers a high-conversion, authoritative digital campus for Ignite Classes Sujangarh. Students and aspirants can explore Rajasthan competitive exam batches, watch sample demo lectures by top faculty, attempt live practice questions and daily current affairs quizzes, download syllabus/revision PDFs, read topper verification stories, and book free demo seats or fee counseling.
  - **Discrete Administrative Engine**: A protected back-office interface allowing institute administrators and educators to dynamically create/edit courses, upload and categorize lecture notes & PDF links, configure mock test series and question banks, publish urgent announcements (batch start dates, exam notifications), and track student leads.
- **Target Audience**: Rajasthan competitive exam aspirants (graduates, 12th-pass students, teaching aspirants across Sujangarh, Churu, Shekhawati, and greater Rajasthan) seeking classroom + digital coaching, study notes, and mock tests.
- **Key Value**: Bridges physical classroom excellence with modern digital learning tools; provides local trust markers, structured syllabus roadmaps, and immediate administrative control over coaching resources without external CMS friction.

---

### 2. User Experience & Visual Design

#### Visual Identity & Theme
- **Aesthetic Direction**: High-trust, academic excellence meets modern EdTech precision. Crisp off-white background (`#F8FAFC`) with authoritative navy slate (`#0F172A`), royal cobalt primary (`#1D4ED8`), vibrant saffron/amber highlights (`#D97706` / `#F59E0B` representing energy & enlightenment), and high-contrast typography.
- **Color Palette**:
  - `Canvas`: `#0B1120` (Dark Hero & Footer) / `#F8FAFC` (Content Canvas)
  - `Surfaces`: `#FFFFFF` with hairline borders (`#E2E8F0`), `#1E293B` in dark administrative modules
  - `Primary Action`: `#2563EB` (Cobalt Blue) with `#1D4ED8` hover state
  - `Accent / Focus`: `#D97706` (Rajasthan Saffron Amber) for live badges and quiz triggers
  - `Success / Verification`: `#059669` (Emerald) for correct answers and topper badges
- **Typography**:
  - Display & Headlines: `Plus Jakarta Sans` (bold tracking-tight, balanced headlines)
  - Body & UI Prose: `Plus Jakarta Sans` / `DM Sans` (legible 15px/16px line height 1.6)
  - Scores, Timers & Tabular Data: `JetBrains Mono` / tabular numerals (`tabular-nums`)
- **Top Bar Contract**:
  - Zone 1: Clean wordmark: **Ignite Classes** (Sujangarh)
  - Zone 2: Single-line navigation links: `Courses`, `Notes & Syllabus`, `Daily Quiz`, `Demo Lectures`, `Results`
  - Zone 3: Primary single action button: `Book Free Demo` (opens interactive enrollment modal)
- **Section Rhythm**:
  1. **Top Notice Marquee**: Urgent batch announcements (e.g., *New REET & CET Foundation Offline/Online Batches Starting Monday*).
  2. **Hero Presentation**: Compelling value proposition (*"Ignite Your Rajasthan Govt Exam Ambition"*), live batch metrics, and dual action (Explore Batches or Take Today's Quiz) with an authentic classroom hero visual.
  3. **Exam Stream Switcher**: Interactive category filters (REET, CET, Police, Patwar, Grade 1/2, Foundation).
  4. **Featured Course Cards**: Rich course syllabus details, batch timings, mode (Classroom / Live Online), fee overview, and demo link.
  5. **Interactive Daily Current Affairs & GK Quiz Stage**: Live 5-question test with timer, instant feedback, explanation card, and score tally.
  6. **Interactive Demo Classroom Player**: High-definition lecture previews with subject tabs (Rajasthan History, Polity, Geography, Teaching Aptitude).
  7. **Notes & Study Material Download Repository**: Filterable subject-wise PDF notes with instant download/read modal preview.
  8. **Topper Hall of Fame & Proven Track Record**: Authentic selection milestones, student testimonials with roll-numbers/exam ranks.
  9. **Faculty & Mentors Spotlight**: Veteran subject matter experts with experience credentials.
  10. **Campus Location & Inquiry Booking**: Physical campus details (Station Road / Sujangarh center map link, contact helpline, direct WhatsApp admission desk) and lead inquiry form.
  11. **Footer**: Quick navigation, legal accreditation, and subtle discrete Admin Portal trigger.

---

### 3. Key Product Decisions & Trade-Offs

- **Client-Side State Storage with Pre-Loaded Real Datasets**:
  - *Decision*: Combine rich, authentic pre-configured seed data (real Rajasthan exam curricula, curated current affairs quiz questions, faculty profiles, and study notes) with reactive `localStorage` persistence for administrative mutations (create/edit/delete courses, upload notes, add quiz questions, review inquiries).
  - *Why*: Delivers an immediate, zero-latency, production-ready experience in the AI Studio environment without requiring complex database credentials, while allowing users and testers to test the full admin panel workflow immediately.
- **Discrete Admin Portal Security**:
  - *Decision*: Hidden trigger in the footer copyright zone with a dedicated keyboard combination (`Ctrl+Shift+A` or `Cmd+Shift+A`) and a clean PIN authentication modal (default PIN: `1234` with option to change).
  - *Why*: Keeps the public site focused on student conversion while providing instant access for teachers/staff to demonstrate content management capabilities.
- **Copy-Paste Master Prompt Generator Tool**:
  - *Decision*: Include an expandable "Google AI Studio Master Prompt" export dialog directly in the Admin Console / Footer tools so the user can easily copy the complete, structured prompt instructions for future iterations.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        IGNITE CLASSES SUJANGARH                        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌─────────────────────────────┐               ┌─────────────────────────────┐
│    PUBLIC STUDENT PORTAL    │               │    DISCRETE ADMIN PORTAL    │
│  - Hero & Batch Highlights  │               │  - PIN Authentication Modal │
│  - Course Stream Filter     │               │  - Course Management CRUD   │
│  - Daily Quiz Simulation    │◄──────────────┤  - PDF Notes & Docs Manager │
│  - Demo Lecture Player      │  Shared Live  │  - Quiz & Test Series Editor│
│  - Downloadable PDF Notes   │  State Store  │  - Student Inquiries Feed   │
│  - Admission Booking Modal  │ (LocalStorage)│  - AI Master Prompt Exporter│
└─────────────────────────────┘               └─────────────────────────────┘
```

#### State & Data Entities
- **Course**: `id`, `title`, `examCategory` (REET, CET, Police, Patwar, Grade 1/2), `badge`, `duration`, `mode` (Classroom + Online), `features` (string[]), `fee`, `batchDate`, `rating`, `enrollUrl`.
- **NoteItem**: `id`, `title`, `subject` (Rajasthan History, Art & Culture, Hindi, Reasoning, Maths), `exam`, `pages`, `fileSize`, `downloadUrl`, `dateAdded`.
- **QuizQuestion**: `id`, `question`, `options`, `correctIndex`, `explanation`, `subject`, `examTarget`.
- **DemoLecture**: `id`, `title`, `faculty`, `duration`, `topic`, `videoUrl`, `thumbnailUrl`.
- **AdmissionInquiry**: `id`, `studentName`, `mobile`, `examTarget`, `preferredMode`, `message`, `status`, `timestamp`.

#### Component Architecture
- `src/components/Navbar.tsx`: Strict 3-zone header with responsive mobile drawer.
- `src/components/Hero.tsx`: High-impact headline, live batch badge, quick stats, and primary conversion triggers.
- `src/components/CourseCatalog.tsx`: Stream category selector, syllabus breakdown, fee inquiry trigger.
- `src/components/DailyQuiz.tsx`: Interactive 5-question Rajasthan GK/Current Affairs exam simulator with timer and analytics.
- `src/components/DemoLectures.tsx`: Lecture video preview modal with faculty introduction.
- `src/components/NotesRepository.tsx`: Searchable and filterable study material directory with quick preview.
- `src/components/ToppersWall.tsx`: Authentic Rajasthan exam selections, verified ranks, and student testimonials.
- `src/components/AdmissionModal.tsx`: Complete admission counseling and demo booking form with instant validation.
- `src/components/admin/AdminModal.tsx`: Discrete PIN login and multi-tab administrative workspace (Courses, Notes, Tests, Leads, Settings).
- `src/data/seedData.ts`: Comprehensive initial data representing Ignite Classes Sujangarh.
