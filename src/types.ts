export type ExamCategory =
  | 'REET'
  | 'CET'
  | 'POLICE'
  | 'PATWAR'
  | 'GRADE_TEACHER'
  | 'FOUNDATION';

export interface Course {
  id: string;
  title: string;
  hindiTitle?: string;
  category: ExamCategory;
  badge?: string;
  duration: string;
  mode: 'Classroom & Online' | 'Classroom Offline' | 'Digital App';
  batchStartDate: string;
  timings: string;
  fee: number;
  originalFee: number;
  rating: number;
  enrolledStudents: number;
  facultyLead: string;
  syllabusHighlights: string[];
  features: string[];
  status: 'Open' | 'Filling Fast' | 'Closed';
}

export type SubjectCategory =
  | 'Rajasthan History'
  | 'Rajasthan Geography'
  | 'Art & Culture'
  | 'Polity & Constitution'
  | 'Hindi Vyakaran'
  | 'Child Pedagogy (REET)'
  | 'Maths & Reasoning'
  | 'Current Affairs';

export interface NoteItem {
  id: string;
  title: string;
  hindiTitle?: string;
  subject: SubjectCategory;
  examTarget: string;
  pages: number;
  fileSize: string;
  dateAdded: string;
  downloadsCount: number;
  description: string;
  contentPreview: string[];
  pdfUrl?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionHindi?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  subject: string;
  exam: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
}

export interface DemoLecture {
  id: string;
  title: string;
  hindiTitle?: string;
  subject: string;
  faculty: string;
  facultyDesignation: string;
  duration: string;
  videoUrl: string;
  thumbnailUrl: string;
  keyTopics: string[];
}

export interface TopperRecord {
  id: string;
  name: string;
  hindiName?: string;
  exam: string;
  rank: string;
  rollNo: string;
  year: string;
  district: string;
  score: string;
  testimonial: string;
  photoUrl: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  hindiName?: string;
  role: string;
  subject: string;
  experience: string;
  qualification: string;
  selectionContribution: string;
  photoUrl: string;
}

export interface AdmissionInquiry {
  id: string;
  studentName: string;
  mobile: string;
  examTarget: string;
  preferredMode: 'Offline Classroom (Sujangarh)' | 'Live Online Coaching';
  qualification: string;
  message?: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Enrolled';
}

export interface SiteAnnouncement {
  id: string;
  text: string;
  highlightText?: string;
  linkText?: string;
  linkSection?: string;
  isActive: boolean;
}

export interface StudentTestimonial {
  id: string;
  name: string;
  hindiName?: string;
  exam: string;
  selectionRank: string;
  score: string;
  villageOrTown: string;
  batchYear: string;
  quote: string;
  hindiQuote?: string;
  videoDuration?: string;
  hasVideo: boolean;
  avatarInitials: string;
  keyHighlight: string;
  category: 'REET' | 'CET' | 'POLICE' | 'PATWAR' | 'GRADE_TEACHER';
  rating: number;
}

