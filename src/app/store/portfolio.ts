'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Student Portfolio Interface
export interface Student {
  id: string;
  studentId: string; // รหัสนักศึกษา เช่น 6704101333
  
  // ข้อมูลส่วนตัว (Personal Information)
  firstName: string;
  lastName: string;
  nickname?: string;
  birthDate: string;
  bloodType?: string;
  religion?: string;
  ethnicity?: string;
  nationality?: string;
  
  // ที่อยู่และติดต่อ (Address & Contact)
  address: string;
  district: string;
  province: string;
  postalCode: string;
  phoneNumber: string;
  email?: string;
  instagram?: string;
  facebook?: string;
  
  // การศึกษา (Education)
  school: string;
  program: string; // แผนการเรียน เช่น วิทย์-คณิต
  gpa: number;
  
  // ความสามารถและความสนใจ (Abilities & Interests)
  specialAbilities: string[]; // ความสามารถพิเศษ
  hobbies: string[]; // งานอดิเรก
  
  // การสมัคร (Application)
  selectedMajor: string; // สาขาที่เลือก
  selectedUniversity: string; // มหาวิทยาลัย
  applicationReason: string; // เหตุผลในการสมัครเข้าเรียน
  
  // กิจกรรมและรางวัล (Activities & Awards)
  activities: Activity[];
  certificates: Certificate[];
  portfolioProjects: PortfolioProject[];
  
  // รูปภาพ (Images)
  profileImage?: string;
  
  // วันที่สร้างและอัพเดท
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  year: string;
  level: 'school' | 'district' | 'province' | 'national' | 'international';
  rank?: string; // เช่น รองชนะเลิศอันดับที่ 1
  images: string[];
}

export interface Certificate {
  id: string;
  title: string;
  description: string;
  year: string;
  issuer: string;
  images: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  year: string;
  category: string;
  technology: string;
  images: string[];
}

// Form Data Interface
export interface PortfolioFormData {
  firstName: string;
  lastName: string;
  nickname?: string;
  studentId: string;
  birthDate: string;
  bloodType?: string;
  religion?: string;
  ethnicity?: string;
  nationality?: string;
  address: string;
  district: string;
  province: string;
  postalCode: string;
  phoneNumber: string;
  email?: string;
  instagram?: string;
  facebook?: string;
  school: string;
  program: string;
  gpa: number;
  specialAbilities: string[];
  hobbies: string[];
  selectedMajor: string;
  selectedUniversity: string;
  applicationReason: string;
  activities: Activity[];
  certificates: Certificate[];
  portfolioProjects: PortfolioProject[];
  profileImage?: string;
}

interface PortfolioStore {
  // State
  students: Student[];
  editingStudent: Student | null;
  isFormOpen: boolean;
  searchTerm: string;
  sortField: 'firstName' | 'studentId' | 'gpa' | 'selectedMajor';
  sortDirection: 'asc' | 'desc';
  
  // Actions
  addStudent: (data: PortfolioFormData) => void;
  updateStudent: (id: string, data: PortfolioFormData) => void;
  deleteStudent: (id: string) => void;
  initializeData: () => void;
  initializeWithSampleData: () => void;
  loadAllSampleData: () => void;
  getStudent: (id: string) => Student | undefined;
  openForm: () => void;
  closeForm: () => void;
  setEditingStudent: (student: Student | null) => void;
  setSearchTerm: (term: string) => void;
  setSorting: (field: 'firstName' | 'studentId' | 'gpa' | 'selectedMajor', direction: 'asc' | 'desc') => void;
  
  // Computed
  getFilteredStudents: () => Student[];
  getSortedStudents: () => Student[];
  getStudentStats: () => {
    total: number;
    averageGpa: number;
    topUniversities: { name: string; count: number }[];
    topMajors: { name: string; count: number }[];
  };
}

// Sample Data Helper
const getSampleData = (): Student[] => {
  // Your detailed portfolio
  const mainStudent: Student = {
    id: 'thannavat-voloshin-001',
    studentId: '6704101333',
    firstName: 'ธนวัต',
    lastName: 'โวโลชึน',
    nickname: 'ดอนนี',
    birthDate: '2002-01-13',
    bloodType: 'O',
    religion: 'พุทธ',
    ethnicity: 'ไทย',
    nationality: 'ไทย',
    address: 'บ้านเลขที่ 182/1 ถ.บ้านดงพัฒนา',
    district: 'บ่อแฮ้ว',
    province: 'ลำปาง',
    postalCode: '52100',
    phoneNumber: '096-751-7739',
    instagram: 'donkillmeplz',
    facebook: 'Thannavat Voloshin',
    school: 'โรงเรียนอัสสัมชัญลำปาง',
    program: 'วิทย์-คณิต',
    gpa: 3.20,
    specialAbilities: ['พูดรัสเซีย', 'เล่นบาสเกตบอล', 'เล่นเทนนิส', 'เล่นเกม'],
    hobbies: ['เล่นกล้าม'],
    selectedMajor: 'วิทยาศาสตร์คอมพิวเตอร์',
    selectedUniversity: 'มหาวิทยาลัยแม่โจ้',
    applicationReason: 'มีความสนใจในด้านเทคโนโลยีและการพัฒนาซอฟต์แวร์',
    activities: [
      {
        id: 'act1',
        title: 'แข่งขัน World Robot Olympiad Thailand 2019',
        description: 'เข้ารอบ 32 ทีม แข่งขัน WRO ระดับประเทศ',
        year: '2019',
        level: 'national',
        images: ['/image/act1.png']
      },
      {
        id: 'act2',
        title: 'รางวัลรองชนะเลิศอันดับที่ 1 ระดับประเทศ',
        description: 'แข่งขัน Game ROV รายการเครือโรงเรียนอัสสัมชัญทั่วประเทศ',
        year: '2019',
        level: 'national',
        rank: 'รองชนะเลิศอันดับที่ 1',
        images: ['/image/act2.png']
      },
      {
        id: 'act3',
        title: 'รางวัลรองชนะเลิศอันดับที่ 1 ระดับจังหวัด',
        description: 'แข่งขัน Game ROV รายการ Young Championship ณ มหาวิทยาลัยราชภัฏลำปาง',
        year: '2019',
        level: 'province',
        rank: 'รองชนะเลิศอันดับที่ 1',
        images: ['/image/act3.png']
      },
      {
        id: 'act4',
        title: 'รางวัลรองชนะเลิศอันดับที่ 2',
        description: 'แข่งขัน Crossword งานศิลปหัตถกรรมนักเรียน ครั้งที่ 69 ปีการศึกษา 2562 ระดับเขตพื้นที่ สพม.35 ลป.1',
        year: '2019',
        level: 'district',
        rank: 'รองชนะเลิศอันดับที่ 2',
        images: ['/image/act4.png']
      }
    ],
    certificates: [
      {
        id: 'cer1',
        title: 'แข่งขัน WRO ระดับประเทศ',
        description: 'การแข่งขัน World Robot รายการ Robot Olympiad Thailand 2019 เข้ารอบ 32 ทีม',
        year: '2019',
        issuer: 'Robot Olympiad Thailand',
        images: ['/image/cer1.png']
      },
      {
        id: 'cer2',
        title: 'รางวัลรองชนะเลิศอันดับที่ 1 ระดับประเทศ',
        description: 'การแข่งขัน Game ROV รายการเครือโรงเรียนอัสสัมชัญทั่วประเทศ',
        year: '2019',
        issuer: 'เครือโรงเรียนอัสสัมชัญ',
        images: ['/image/cer2.png']
      },
      {
        id: 'cer3',
        title: 'รางวัลรองชนะเลิศอันดับที่ 2',
        description: 'การแข่งขัน Crossword งานศิลปหัตถกรรมนักเรียน ครั้งที่ 69 ปีการศึกษา 2562 ระดับเขตพื้นที่ สพม.35 ลป.1',
        year: '2019',
        issuer: 'สำนักงานเขตพื้นที่การศึกษามัธยมศึกษา เขต 35',
        images: ['/image/cer3.png']
      }
    ],
    portfolioProjects: [
      {
        id: 'portfolio1',
        title: 'ระบบจัดการ Portfolio TCAS69',
        description: 'เว็บแอปพลิเคชันสำหรับจัดการ Portfolio นักศึกษา ใช้ Next.js และ Zustand',
        year: '2024',
        category: 'เว็บไซต์',
        technology: 'Next.js, TypeScript, Tailwind CSS, Zustand',
        images: []
      }
    ],
    profileImage: '/image/รูปนักเรียน.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Additional students from the class list
  const classStudents: Student[] = [
    { id: '6104101332', name: 'นายเทพฤทธิ์ จันทะบูลย์', gpa: 3.25 },
    { id: '6404101355', name: 'นายกษิดิ์เดช หลักเหมาะ', gpa: 2.50 },
    { id: '6404101363', name: 'นายธนาคม ขวัญเงิน', gpa: 3.50 },
    { id: '6504101332', name: 'นายทวีวัฒน์ จันทะกี', gpa: 2.00 },
    { id: '6704101301', name: 'นายกชณัฐพัฒน์ พลอยเกิด', gpa: 3.25 },
    { id: '6704101302', name: 'นายกฤตัชญ์ ถนอมรัตน์', gpa: 3.50 },
    { id: '6704101303', name: 'นายกฤษกร ชีวสิทธิรุ่งเรือง', gpa: 3.50 },
    { id: '6704101304', name: 'นางสาวกฤษณา โพธา', gpa: 1.90 },
    { id: '6704101305', name: 'นายกษาปณ์ ทับแฟง', gpa: 2.10 },
    { id: '6704101306', name: 'นายก้องเกียรติ จิรวัฒนคุณากร', gpa: 3.50 },
    { id: '6704101307', name: 'นายกันตศักดิ์ ตีฆาอายุ', gpa: 3.75 },
    { id: '6704101308', name: 'นายก่า ลุคา', gpa: 1.90 },
    { id: '6704101309', name: 'นายกิตติวงศ์ มีจันทร์', gpa: 2.75 },
    { id: '6704101310', name: 'นางสาวกุริญา ทาเทร์', gpa: 2.00 },
    { id: '6704101311', name: 'นางสาวกุลธิวา เมียกขุนทด', gpa: 3.75 },
    { id: '6704101312', name: 'นายเขมโสภณ วงศ์นฤเดชากุล', gpa: 2.75 },
    { id: '6704101313', name: 'นายคัมภีร์ ชัยนรานนท์', gpa: 2.50 },
    { id: '6704101314', name: 'นายจักรภัทร ชาบัญ', gpa: 2.10 },
    { id: '6704101315', name: 'นายจารุวัฒน์ วัจนะรัตน์', gpa: 2.10 },
    { id: '6704101316', name: 'นายจิตรภณ พ่วงบุใหญ่', gpa: 3.50 },
    { id: '6704101317', name: 'นายจิรายุ วรรณศิลป์', gpa: 3.00 },
    { id: '6704101318', name: 'นายชาญณรงค์ เขมารัมย์', gpa: 2.75 },
    { id: '6704101319', name: 'นายชินดนัย อยู่เชียร', gpa: 2.25 },
    { id: '6704101320', name: 'นายณรงค์พล ชูหนู', gpa: 1.90 },
    { id: '6704101321', name: 'นายณัฐกรณ์ เตี้ยกำลังงาม', gpa: 2.10 },
    { id: '6704101322', name: 'นายณัฐดนัย กองเสาร์', gpa: 2.50 },
    { id: '6704101323', name: 'นายณัฐดนัย ปู่วงษ์', gpa: 4.00 },
    { id: '6704101324', name: 'นายณัฐพงษ์ บุญสถิตย์', gpa: 2.00 },
    { id: '6704101325', name: 'นายณัฐพล ปัญญาเพิ่ม', gpa: 2.20 },
    { id: '6704101326', name: 'นายณัฐภัทร ตันดี', gpa: 3.00 },
    { id: '6704101327', name: 'นางสาวณิชากร คัญทัพ', gpa: 3.00 },
    { id: '6704101328', name: 'นายติณณภพ พวงมาลา', gpa: 2.50 },
    { id: '6704101329', name: 'นายทินภัทร ศรีจันทร์', gpa: 4.00 },
    { id: '6704101330', name: 'นายเทวิน จันทร์ใจ', gpa: 4.00 },
    { id: '6704101331', name: 'นายธนกฤต เลิศประเสริฐ', gpa: 4.00 },
    { id: '6704101332', name: 'นายธนธรณ์ คำต๋อ', gpa: 1.90 },
    // Skip 6704101333 as it's our main student
    { id: '6704101334', name: 'นายธนาธิป ทองเปลว', gpa: 4.00 },
    { id: '6704101335', name: 'นายธนาวัชร์ ต๊ะทอง', gpa: 4.00 },
    { id: '6704101336', name: 'นางสาวธมล นวลหมวก', gpa: 2.00 },
    { id: '6704101339', name: 'นายธีระพงษ์ อวดคม', gpa: 0.00 },
    { id: '6704101341', name: 'นางสาวนวพร อินธิแสง', gpa: 2.40 },
    { id: '6704101342', name: 'นางสาวนัฐฐา จันทร์ปลอด', gpa: 3.00 },
    { id: '6704101343', name: 'นายนิตินัย อารมย์ดี', gpa: 4.00 },
    { id: '6704101344', name: 'นางสาวนุสรินทร์ สงคุ้ม', gpa: 2.75 },
    { id: '6704101345', name: 'นายบุญนุชัย บุญเต็ม', gpa: 2.00 }
    // ... add more as needed
  ].map((student, index) => {
    const [_title, ...nameParts] = student.name.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const schools = ['โรงเรียนอัสสัมชัญลำปาง', 'โรงเรียนแม่โจ้วิทยาลัย', 'โรงเรียนลำปางกัลยาณี'];
    const programs = ['วิทย์-คณิต', 'คณิต-อังกฤษ', 'ศิลป์-ภาษา'];
    const majors = ['วิทยาศาสตร์คอมพิวเตอร์', 'วิศวกรรมซอฟต์แวร์', 'เทคโนโลยีสารสนเทศ'];
    const universities = ['มหาวิทยาลัยแม่โจ้', 'มหาวิทยาลัยเชียงใหม่', 'จุฬาลงกรณ์มหาวิทยาลัย'];

    // Use index as seed for deterministic "random" values
    const seed = parseInt(student.id.slice(-3)) + index; // Use last 3 digits of ID + index

    return {
      id: `student-${student.id}`,
      studentId: student.id,
      firstName,
      lastName,
      nickname: '',
      birthDate: `200${(seed % 5)}-${String((seed % 12) + 1).padStart(2, '0')}-${String((seed % 28) + 1).padStart(2, '0')}`,
      bloodType: ['A', 'B', 'AB', 'O'][seed % 4],
      religion: 'พุทธ',
      ethnicity: 'ไทย',
      nationality: 'ไทย',
      address: `บ้านเลขที่ ${(seed % 999) + 1}/${(seed % 10) + 1}`,
      district: 'เมือง',
      province: 'ลำปาง',
      postalCode: '52100',
      phoneNumber: `0${(seed % 9) + 1}${(seed * 2) % 9}${(seed * 3) % 9}-${((seed * 4) % 999).toString().padStart(3, '0')}-${((seed * 5) % 9999).toString().padStart(4, '0')}`,
      email: '',
      instagram: '',
      facebook: '',
      school: schools[seed % schools.length],
      program: programs[seed % programs.length],
      gpa: student.gpa,
      specialAbilities: [],
      hobbies: [],
      selectedMajor: majors[seed % majors.length],
      selectedUniversity: universities[seed % universities.length],
      applicationReason: 'มีความสนใจในด้านเทคโนโลยีและการพัฒนาซอฟต์แวร์',
      activities: [],
      certificates: [],
      portfolioProjects: [],
      profileImage: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });

  return [mainStudent, ...classStudents];
};

const usePortfolioStore = create<PortfolioStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State with sample data
        students: getSampleData(),
        editingStudent: null,
        isFormOpen: false,
        searchTerm: '',
        sortField: 'firstName',
        sortDirection: 'asc',

        // Actions
        addStudent: (data: PortfolioFormData) => {
          console.log('Adding new student to store');
          const newStudent: Student = {
            id: crypto.randomUUID(),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          set((state) => {
            const updatedStudents = [...state.students, newStudent];
            console.log('Student count updated:', state.students.length, '→', updatedStudents.length);
            return {
              students: updatedStudents,
              isFormOpen: false,
            };
          });
          
          // Force immediate persistence check
          setTimeout(() => {
            try {
              const stored = localStorage.getItem('portfolio-storage');
              if (stored) {
                const parsed = JSON.parse(stored);
                console.log('Post-add verification - localStorage has:', parsed.state?.students?.length || 0, 'students');
              }
            } catch (e) {
              console.error('Error verifying localStorage after add:', e);
            }
          }, 100);
          
          console.log('Student successfully added to store');
        },

        updateStudent: (id: string, data: PortfolioFormData) => {
          set((state) => ({
            students: state.students.map((student) =>
              student.id === id
                ? { ...student, ...data, updatedAt: new Date().toISOString() }
                : student
            ),
            editingStudent: null,
            isFormOpen: false,
          }));
        },

        deleteStudent: (id: string) => {
          set((state) => ({
            students: state.students.filter((student) => student.id !== id),
          }));
        },

        // Initialize with sample data if empty
        initializeData: () => {
          const state = get();
          console.log('initializeData called, current students:', state.students.length);
          if (state.students.length === 0) {
            console.log('No students found, adding sample data');
            set({ students: getSampleData() });
          } else {
            console.log('Students already exist, skipping sample data');
          }
        },

        // Force initialize with full sample data
        initializeWithSampleData: () => {
          set({ students: getSampleData() });
        },

        loadAllSampleData: () => {
          const currentStudents = get().students;
          const sampleData = getSampleData();
          
          // Create a map of existing students by ID for quick lookup
          const existingStudentsMap = new Map(currentStudents.map(student => [student.id, student]));
          
          // Add sample students that don't already exist
          const newStudents = [...currentStudents];
          sampleData.forEach(sampleStudent => {
            if (!existingStudentsMap.has(sampleStudent.id)) {
              newStudents.push(sampleStudent);
            }
          });
          
          set({ students: newStudents });
          console.log(`Loaded sample data. Total students: ${newStudents.length}`);
        },

        getStudent: (id: string) => {
          return get().students.find((student) => student.id === id);
        },

        openForm: () => {
          set({ isFormOpen: true });
        },

        closeForm: () => {
          set({ isFormOpen: false, editingStudent: null });
        },

        setEditingStudent: (student: Student | null) => {
          set({ editingStudent: student, isFormOpen: !!student });
        },

        setSearchTerm: (term: string) => {
          set({ searchTerm: term });
        },

        setSorting: (field, direction) => {
          set({ sortField: field, sortDirection: direction });
        },

        // Computed Functions
        getFilteredStudents: () => {
          const { students, searchTerm } = get();
          if (!searchTerm) return students;
          
          return students.filter((student) =>
            student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.studentId.includes(searchTerm) ||
            student.selectedMajor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.selectedUniversity.toLowerCase().includes(searchTerm.toLowerCase())
          );
        },

        getSortedStudents: () => {
          const { sortField, sortDirection } = get();
          const filteredStudents = get().getFilteredStudents();
          
          return [...filteredStudents].sort((a, b) => {
            let aValue: string | number;
            let bValue: string | number;
            
            switch (sortField) {
              case 'firstName':
                aValue = a.firstName;
                bValue = b.firstName;
                break;
              case 'studentId':
                aValue = a.studentId;
                bValue = b.studentId;
                break;
              case 'gpa':
                aValue = a.gpa;
                bValue = b.gpa;
                break;
              case 'selectedMajor':
                aValue = a.selectedMajor;
                bValue = b.selectedMajor;
                break;
              default:
                return 0;
            }
            
            if (typeof aValue === 'string' && typeof bValue === 'string') {
              return sortDirection === 'asc' 
                ? aValue.localeCompare(bValue, 'th')
                : bValue.localeCompare(aValue, 'th');
            }
            
            if (typeof aValue === 'number' && typeof bValue === 'number') {
              return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
            }
            
            return 0;
          });
        },

        getStudentStats: () => {
          const students = get().students;
          const total = students.length;
          
          if (total === 0) {
            return {
              total: 0,
              averageGpa: 0,
              topUniversities: [],
              topMajors: [],
            };
          }
          
          const averageGpa = students.reduce((sum, student) => sum + student.gpa, 0) / total;
          
          // Count universities
          const universityCount = students.reduce((acc, student) => {
            acc[student.selectedUniversity] = (acc[student.selectedUniversity] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);
          
          const topUniversities = Object.entries(universityCount)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
          
          // Count majors
          const majorCount = students.reduce((acc, student) => {
            acc[student.selectedMajor] = (acc[student.selectedMajor] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);
          
          const topMajors = Object.entries(majorCount)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
          
          return {
            total,
            averageGpa: Math.round(averageGpa * 100) / 100,
            topUniversities,
            topMajors,
          };
        },
      }),
      {
        name: 'portfolio-storage',
        version: 2, // Increment version to trigger migration
        migrate: (persistedState: any, version: number) => {
          console.log('Migrating portfolio store from version:', version);
          
          // Handle migration from version 1 to 2
          if (version < 2) {
            // Ensure all students have the required fields and fix image paths
            if (persistedState?.students) {
              persistedState.students = persistedState.students.map((stu: any) => ({
                ...stu,
                activities: stu.activities?.map((act: any) => ({
                  ...act,
                  images: act.images?.map((img: string) => 
                    img.startsWith('/') ? img : (img.startsWith('image/') ? `/${img}` : `/image/${img}`)
                  ) || []
                })) || [],
                certificates: stu.certificates?.map((cer: any) => ({
                  ...cer,
                  images: cer.images?.map((img: string) => 
                    img.startsWith('/') ? img : (img.startsWith('image/') ? `/${img}` : `/image/${img}`)
                  ) || []
                })) || [],
                portfolioProjects: stu.portfolioProjects || [],
                profileImage: stu.profileImage ? 
                  (stu.profileImage.startsWith('/') ? stu.profileImage : 
                   (stu.profileImage.startsWith('image/') ? `/${stu.profileImage}` : `/image/${stu.profileImage}`)) 
                  : undefined
              }));
            }
          }
          
          return persistedState;
        },
        onRehydrateStorage: () => (state) => {
          console.log('Rehydrating store...', state?.students?.length || 0, 'students found');
          if (state && state.students && state.students.length > 0) {
            console.log('Found existing students after migration:', state.students.length);
          }
        },
      }
    ),
    {
      name: 'portfolio-store',
    }
  )
);

// Selector Hooks
export const usePortfolioActions = () => {
  const addStudent = usePortfolioStore((state) => state.addStudent);
  const updateStudent = usePortfolioStore((state) => state.updateStudent);
  const deleteStudent = usePortfolioStore((state) => state.deleteStudent);
  const initializeData = usePortfolioStore((state) => state.initializeData);
  const initializeWithSampleData = usePortfolioStore((state) => state.initializeWithSampleData);
  const loadAllSampleData = usePortfolioStore((state) => state.loadAllSampleData);
  const getStudent = usePortfolioStore((state) => state.getStudent);
  const openForm = usePortfolioStore((state) => state.openForm);
  const closeForm = usePortfolioStore((state) => state.closeForm);
  const setEditingStudent = usePortfolioStore((state) => state.setEditingStudent);
  const setSearchTerm = usePortfolioStore((state) => state.setSearchTerm);
  const setSorting = usePortfolioStore((state) => state.setSorting);
  
  return {
    addStudent,
    updateStudent,
    deleteStudent,
    initializeData,
    initializeWithSampleData,
    loadAllSampleData,
    getStudent,
    openForm,
    closeForm,
    setEditingStudent,
    setSearchTerm,
    setSorting,
  };
};

export const usePortfolioData = () => {
  const students = usePortfolioStore((state) => state.students);
  const editingStudent = usePortfolioStore((state) => state.editingStudent);
  const isFormOpen = usePortfolioStore((state) => state.isFormOpen);
  const searchTerm = usePortfolioStore((state) => state.searchTerm);
  const sortField = usePortfolioStore((state) => state.sortField);
  const sortDirection = usePortfolioStore((state) => state.sortDirection);
  
  return {
    students,
    editingStudent,
    isFormOpen,
    searchTerm,
    sortField,
    sortDirection,
  };
};

export const usePortfolioComputed = () => {
  const getFilteredStudents = usePortfolioStore((state) => state.getFilteredStudents);
  const getSortedStudents = usePortfolioStore((state) => state.getSortedStudents);
  const getStudentStats = usePortfolioStore((state) => state.getStudentStats);
  
  return {
    getFilteredStudents,
    getSortedStudents,
    getStudentStats,
  };
};

export default usePortfolioStore;