import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Course,
  NoteItem,
  QuizQuestion,
  DemoLecture,
  TopperRecord,
  FacultyMember,
  AdmissionInquiry,
  SiteAnnouncement,
} from '../types';
import {
  initialCourses,
  initialNotes,
  initialQuizQuestions,
  initialDemoLectures,
  initialToppers,
  initialFaculty,
  initialInquiries,
  initialAnnouncements,
} from '../data/seedData';

interface AppContextType {
  // Public Data
  courses: Course[];
  notes: NoteItem[];
  quizQuestions: QuizQuestion[];
  demoLectures: DemoLecture[];
  toppers: TopperRecord[];
  faculty: FacultyMember[];
  inquiries: AdmissionInquiry[];
  announcements: SiteAnnouncement[];

  // Admin Actions
  isAdminAuthenticated: boolean;
  adminPin: string;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  updateAdminPin: (newPin: string) => void;

  // CRUD Methods
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, updated: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  clearAllCourses: () => void;

  addNote: (note: Omit<NoteItem, 'id' | 'downloadsCount' | 'dateAdded'>) => void;
  updateNote: (id: string, updated: Partial<NoteItem>) => void;
  deleteNote: (id: string) => void;
  incrementNoteDownload: (id: string) => void;

  addQuizQuestion: (question: Omit<QuizQuestion, 'id'>) => void;
  updateQuizQuestion: (id: string, updated: Partial<QuizQuestion>) => void;
  deleteQuizQuestion: (id: string) => void;

  submitAdmissionInquiry: (inquiry: Omit<AdmissionInquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: AdmissionInquiry['status']) => void;
  deleteInquiry: (id: string) => void;

  updateAnnouncement: (id: string, updated: Partial<SiteAnnouncement>) => void;
  addAnnouncement: (announcement: Omit<SiteAnnouncement, 'id'>) => void;
  deleteAnnouncement: (id: string) => void;

  resetToDefaultData: () => void;

  // UI Modals
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  isAdmissionModalOpen: boolean;
  setIsAdmissionModalOpen: (open: boolean) => void;
  selectedCourseForAdmission?: Course;
  openAdmissionWithCourse: (course?: Course) => void;

  activeDemoLecture: DemoLecture | null;
  setActiveDemoLecture: (lecture: DemoLecture | null) => void;

  activeNotePreview: NoteItem | null;
  setActiveNotePreview: (note: NoteItem | null) => void;

  isPromptModalOpen: boolean;
  setIsPromptModalOpen: (open: boolean) => void;

  // Learning Progress Tracking
  completedLectures: string[];
  completedNotes: string[];
  toggleLectureCompleted: (id: string) => void;
  toggleNoteCompleted: (id: string) => void;
  isLectureCompleted: (id: string) => boolean;
  isNoteCompleted: (id: string) => boolean;
  clearLearningProgress: () => void;
  totalLecturesCount: number;
  completedLecturesCount: number;
  totalNotesCount: number;
  completedNotesCount: number;
  overallProgressPercentage: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  COURSES: 'ignite_classes_courses_v5',
  NOTES: 'ignite_classes_notes_v1',
  QUIZ: 'ignite_classes_quiz_v1',
  INQUIRIES: 'ignite_classes_inquiries_v1',
  ANNOUNCEMENTS: 'ignite_classes_announcements_v1',
  PIN: 'ignite_classes_admin_pin_v1',
  COMPLETED_LECTURES: 'ignite_classes_completed_lectures_v1',
  COMPLETED_NOTES: 'ignite_classes_completed_notes_v1',
};

// Purge any stale batch keys from previous sessions to guarantee all batches are removed
if (typeof window !== 'undefined') {
  try {
    ['ignite_classes_courses_v1', 'ignite_classes_courses_v2', 'ignite_classes_courses_v3', 'ignite_classes_courses_v4'].forEach((k) => {
      localStorage.removeItem(k);
    });
  } catch {
    // Ignore storage errors
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State initialization with localStorage fallback (defaults to empty array)
  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notes, setNotes] = useState<NoteItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTES);
      return saved ? JSON.parse(saved) : initialNotes;
    } catch {
      return initialNotes;
    }
  });

  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUIZ);
      return saved ? JSON.parse(saved) : initialQuizQuestions;
    } catch {
      return initialQuizQuestions;
    }
  });

  const [inquiries, setInquiries] = useState<AdmissionInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return saved ? JSON.parse(saved) : initialInquiries;
    } catch {
      return initialInquiries;
    }
  });

  const [announcements, setAnnouncements] = useState<SiteAnnouncement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
      return saved ? JSON.parse(saved) : initialAnnouncements;
    } catch {
      return initialAnnouncements;
    }
  });

  const [adminPin, setAdminPin] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PIN);
      return saved || '1234';
    } catch {
      return '1234';
    }
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  // Modals
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState<boolean>(false);
  const [selectedCourseForAdmission, setSelectedCourseForAdmission] = useState<Course | undefined>(undefined);
  const [activeDemoLecture, setActiveDemoLecture] = useState<DemoLecture | null>(null);
  const [activeNotePreview, setActiveNotePreview] = useState<NoteItem | null>(null);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState<boolean>(false);

  // Learning Progress state
  const [completedLectures, setCompletedLectures] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_LECTURES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completedNotes, setCompletedNotes] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_NOTES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUIZ, JSON.stringify(quizQuestions));
  }, [quizQuestions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PIN, adminPin);
  }, [adminPin]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPLETED_LECTURES, JSON.stringify(completedLectures));
  }, [completedLectures]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPLETED_NOTES, JSON.stringify(completedNotes));
  }, [completedNotes]);

  // Keyboard shortcut listener for discrete Admin Access (Ctrl+Shift+A or Cmd+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const loginAdmin = (pin: string) => {
    if (pin.trim() === adminPin.trim()) {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
  };

  const updateAdminPin = (newPin: string) => {
    setAdminPin(newPin);
  };

  // Course CRUD
  const addCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...courseData,
      id: `course-${Date.now()}`,
    };
    setCourses((prev) => [newCourse, ...prev]);
  };

  const updateCourse = (id: string, updated: Partial<Course>) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const clearAllCourses = () => {
    setCourses([]);
  };

  // Notes CRUD
  const addNote = (noteData: Omit<NoteItem, 'id' | 'downloadsCount' | 'dateAdded'>) => {
    const newNote: NoteItem = {
      ...noteData,
      id: `note-${Date.now()}`,
      downloadsCount: 0,
      dateAdded: 'Today',
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const updateNote = (id: string, updated: Partial<NoteItem>) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updated } : n))
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const incrementNoteDownload = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, downloadsCount: n.downloadsCount + 1 } : n))
    );
  };

  // Quiz CRUD
  const addQuizQuestion = (qData: Omit<QuizQuestion, 'id'>) => {
    const newQ: QuizQuestion = {
      ...qData,
      id: `quiz-${Date.now()}`,
    };
    setQuizQuestions((prev) => [...prev, newQ]);
  };

  const updateQuizQuestion = (id: string, updated: Partial<QuizQuestion>) => {
    setQuizQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...updated } : q))
    );
  };

  const deleteQuizQuestion = (id: string) => {
    setQuizQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  // Inquiry CRUD
  const submitAdmissionInquiry = (inquiryData: Omit<AdmissionInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: AdmissionInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'New',
    };
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: AdmissionInquiry['status']) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status } : i))
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
  };

  // Announcements CRUD
  const updateAnnouncement = (id: string, updated: Partial<SiteAnnouncement>) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updated } : a))
    );
  };

  const addAnnouncement = (aData: Omit<SiteAnnouncement, 'id'>) => {
    const newA: SiteAnnouncement = {
      ...aData,
      id: `ann-${Date.now()}`,
    };
    setAnnouncements((prev) => [newA, ...prev]);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const resetToDefaultData = () => {
    setCourses(initialCourses);
    setNotes(initialNotes);
    setQuizQuestions(initialQuizQuestions);
    setInquiries(initialInquiries);
    setAnnouncements(initialAnnouncements);
    setAdminPin('1234');
    localStorage.clear();
  };

  const openAdmissionWithCourse = (course?: Course) => {
    setSelectedCourseForAdmission(course);
    setIsAdmissionModalOpen(true);
  };

  // Learning Progress Helpers
  const toggleLectureCompleted = (id: string) => {
    setCompletedLectures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleNoteCompleted = (id: string) => {
    setCompletedNotes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isLectureCompleted = (id: string) => completedLectures.includes(id);
  const isNoteCompleted = (id: string) => completedNotes.includes(id);

  const clearLearningProgress = () => {
    setCompletedLectures([]);
    setCompletedNotes([]);
  };

  const totalLecturesCount = initialDemoLectures.length;
  const completedLecturesCount = completedLectures.length;
  const totalNotesCount = notes.length;
  const completedNotesCount = completedNotes.filter((id) => notes.some((n) => n.id === id)).length;
  const totalItems = totalLecturesCount + totalNotesCount;
  const totalCompleted = completedLecturesCount + completedNotesCount;
  const overallProgressPercentage = totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0;

  return (
    <AppContext.Provider
      value={{
        courses,
        notes,
        quizQuestions,
        demoLectures: initialDemoLectures,
        toppers: initialToppers,
        faculty: initialFaculty,
        inquiries,
        announcements,
        isAdminAuthenticated,
        adminPin,
        loginAdmin,
        logoutAdmin,
        updateAdminPin,
        addCourse,
        updateCourse,
        deleteCourse,
        clearAllCourses,
        addNote,
        updateNote,
        deleteNote,
        incrementNoteDownload,
        addQuizQuestion,
        updateQuizQuestion,
        deleteQuizQuestion,
        submitAdmissionInquiry,
        updateInquiryStatus,
        deleteInquiry,
        updateAnnouncement,
        addAnnouncement,
        deleteAnnouncement,
        resetToDefaultData,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isAdmissionModalOpen,
        setIsAdmissionModalOpen,
        selectedCourseForAdmission,
        openAdmissionWithCourse,
        activeDemoLecture,
        setActiveDemoLecture,
        activeNotePreview,
        setActiveNotePreview,
        isPromptModalOpen,
        setIsPromptModalOpen,
        completedLectures,
        completedNotes,
        toggleLectureCompleted,
        toggleNoteCompleted,
        isLectureCompleted,
        isNoteCompleted,
        clearLearningProgress,
        totalLecturesCount,
        completedLecturesCount,
        totalNotesCount,
        completedNotesCount,
        overallProgressPercentage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
