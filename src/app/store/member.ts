import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type Member = {
  id: number;
  name: string;
  role?: string;
  age: number;
  height: number;
  image: string;
  bio: string;
  skills: string[];
  dateAdded?: string;
  isActive?: boolean;
};

export type MemberFormData = {
  name: string;
  role: string;
  age: number;
  height: number;
  image: string;
  bio: string;
  skills: string[];
};

interface MemberStore {
  // State
  members: Member[];
  selectedMember: Member | null;
  isLoading: boolean;
  error: string | null;
  
  // Form state
  isFormOpen: boolean;
  editingMember: Member | null;
  
  // Actions
  setMembers: (members: Member[]) => void;
  addMember: (memberData: MemberFormData) => void;
  updateMember: (id: number, memberData: Partial<MemberFormData>) => void;
  deleteMember: (id: number) => void;
  setSelectedMember: (member: Member | null) => void;
  
  // Form actions
  openForm: () => void;
  closeForm: () => void;
  setEditingMember: (member: Member | null) => void;
  
  // Utility actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  
  // Search and filter
  searchMembers: (query: string) => Member[];
  getMembersByRole: (role: string) => Member[];
  getMemberById: (id: number) => Member | undefined;
}

// Initial member data
const initialMembers: Member[] = [
  { 
    id: 1, 
    name: "Suho", 
    role: "Leader / Lead Vocal", 
    age: 34, 
    height: 172, 
    image: "suho", 
    bio: "Leader known for stability and vocals.", 
    skills: ["Leadership", "Vocal", "MC"],
    dateAdded: new Date().toISOString(),
    isActive: true
  },
  { 
    id: 2, 
    name: "Xiumin", 
    role: "Lead Vocal / Rap", 
    age: 35, 
    height: 173, 
    image: "xiumin", 
    bio: "Energetic performer and versatile vocalist.", 
    skills: ["Falsetto", "Dance", "Rap"],
    dateAdded: new Date().toISOString(),
    isActive: true
  },
  { 
    id: 3, 
    name: "Lay", 
    role: "Main Dancer / Vocal", 
    age: 33, 
    height: 177, 
    image: "lay", 
    bio: "Strong dancer with musical composition talent.", 
    skills: ["Dance", "Composition", "Production"],
    dateAdded: new Date().toISOString(),
    isActive: true
  },
  { 
    id: 4, 
    name: "Baekhyun", 
    role: "Main Vocal", 
    age: 33, 
    height: 174, 
    image: "baekhyun", 
    bio: "Powerful main vocal with stage presence.", 
    skills: ["High Notes", "Stage Presence"],
    dateAdded: new Date().toISOString(),
    isActive: true
  },
  { 
    id: 5, 
    name: "Chen", 
    role: "Main Vocal", 
    age: 32, 
    height: 173, 
    image: "chen", 
    bio: "Known for emotional vocal tone.", 
    skills: ["Ballad", "Technique"],
    dateAdded: new Date().toISOString(),
    isActive: true
  },
  { 
    id: 6, 
    name: "Chanyeol", 
    role: "Main Rap / Vocal", 
    age: 32, 
    height: 186, 
    image: "chanyeol", 
    bio: "Rapper and multi-instrument enthusiast.", 
    skills: ["Rap", "Guitar", "Production"],
    dateAdded: new Date().toISOString(),
    isActive: true
  },
  { 
    id: 7, 
    name: "D.O.", 
    role: "Main Vocal", 
    age: 32, 
    height: 172, 
    image: "do", 
    bio: "Rich vocal tone and acting talent.", 
    skills: ["Vocal", "Acting", "Cooking"],
    dateAdded: new Date().toISOString(),
    isActive: true
  },
  { 
    id: 8, 
    name: "Kai", 
    role: "Main Dancer / Vocal", 
    age: 31, 
    height: 182, 
    image: "kai", 
    bio: "Main dancer with sharp performance style.", 
    skills: ["Dance", "Charisma"],
    dateAdded: new Date().toISOString(),
    isActive: true
  },
  { 
    id: 9, 
    name: "Sehun", 
    role: "Lead Dancer / Rap", 
    age: 31, 
    height: 183, 
    image: "sehun", 
    bio: "Maknae with growing performance versatility.", 
    skills: ["Rap", "Modeling", "Dance"],
    dateAdded: new Date().toISOString(),
    isActive: true
  },
  { 
    id: 10, 
    name: "Kris", 
    role: "Leader (M) / Rap", 
    age: 34, 
    height: 187, 
    image: "kris", 
    bio: "Former M leader noted for charisma.", 
    skills: ["Rap", "Leadership"],
    dateAdded: new Date().toISOString(),
    isActive: true
  },
  { 
    id: 11, 
    name: "Luhan", 
    role: "Lead Vocal / Lead Dancer", 
    age: 35, 
    height: 178, 
    image: "luhan", 
    bio: "Gentle visuals and smooth dance lines.", 
    skills: ["Dance", "Vocal"],
    dateAdded: new Date().toISOString(),
    isActive: true
  },
  { 
    id: 12, 
    name: "Tao", 
    role: "Lead Rap / Martial Arts", 
    age: 32, 
    height: 185, 
    image: "tao", 
    bio: "Martial arts flair and intense performance.", 
    skills: ["Wushu", "Rap", "Performance"],
    dateAdded: new Date().toISOString(),
    isActive: true
  },
];

export const useMemberStore = create<MemberStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        members: initialMembers,
        selectedMember: null,
        isLoading: false,
        error: null,
        isFormOpen: false,
        editingMember: null,

        // Member actions
        setMembers: (members) => set({ members }),
        
        addMember: (memberData) => {
          const newId = Math.max(...get().members.map(m => m.id)) + 1;
          const newMember: Member = {
            ...memberData,
            id: newId,
            dateAdded: new Date().toISOString(),
            isActive: true,
          };
          set((state) => ({
            members: [...state.members, newMember],
            isFormOpen: false,
            error: null,
          }));
        },
        
        updateMember: (id, memberData) => {
          set((state) => ({
            members: state.members.map((member) =>
              member.id === id ? { ...member, ...memberData } : member
            ),
            editingMember: null,
            isFormOpen: false,
            error: null,
          }));
        },
        
        deleteMember: (id) => {
          set((state) => ({
            members: state.members.filter((member) => member.id !== id),
            selectedMember: state.selectedMember?.id === id ? null : state.selectedMember,
            error: null,
          }));
        },
        
        setSelectedMember: (member) => set({ selectedMember: member }),

        // Form actions
        openForm: () => set({ isFormOpen: true }),
        closeForm: () => set({ isFormOpen: false, editingMember: null }),
        setEditingMember: (member) => set({ editingMember: member, isFormOpen: true }),

        // Utility actions
        setLoading: (loading) => set({ isLoading: loading }),
        setError: (error) => set({ error }),
        clearError: () => set({ error: null }),

        // Search and filter methods
        searchMembers: (query) => {
          const { members } = get();
          if (!query) return members;
          
          return members.filter((member) =>
            member.name.toLowerCase().includes(query.toLowerCase()) ||
            member.role?.toLowerCase().includes(query.toLowerCase()) ||
            member.bio.toLowerCase().includes(query.toLowerCase()) ||
            member.skills.some(skill => 
              skill.toLowerCase().includes(query.toLowerCase())
            )
          );
        },
        
        getMembersByRole: (role) => {
          const { members } = get();
          return members.filter((member) =>
            member.role?.toLowerCase().includes(role.toLowerCase())
          );
        },
        
        getMemberById: (id) => {
          const { members } = get();
          return members.find((member) => member.id === id);
        },
      }),
      {
        name: 'member-store', // localStorage key
        // You can customize what gets persisted
        partialize: (state) => ({
          members: state.members,
          selectedMember: state.selectedMember,
        }),
      }
    ),
    {
      name: 'member-store', // DevTools name
    }
  )
);

// Selector hooks for better performance
export const useMembers = () => useMemberStore((state) => state.members);
export const useSelectedMember = () => useMemberStore((state) => state.selectedMember);
export const useIsFormOpen = () => useMemberStore((state) => state.isFormOpen);
export const useEditingMember = () => useMemberStore((state) => state.editingMember);
export const useIsLoading = () => useMemberStore((state) => state.isLoading);
export const useError = () => useMemberStore((state) => state.error);

// Action hooks - Fixed to prevent infinite re-renders
export const useMemberActions = () => {
  const addMember = useMemberStore((state) => state.addMember);
  const updateMember = useMemberStore((state) => state.updateMember);
  const deleteMember = useMemberStore((state) => state.deleteMember);
  const setSelectedMember = useMemberStore((state) => state.setSelectedMember);
  const openForm = useMemberStore((state) => state.openForm);
  const closeForm = useMemberStore((state) => state.closeForm);
  const setEditingMember = useMemberStore((state) => state.setEditingMember);
  const searchMembers = useMemberStore((state) => state.searchMembers);
  const getMembersByRole = useMemberStore((state) => state.getMembersByRole);
  const getMemberById = useMemberStore((state) => state.getMemberById);

  return {
    addMember,
    updateMember,
    deleteMember,
    setSelectedMember,
    openForm,
    closeForm,
    setEditingMember,
    searchMembers,
    getMembersByRole,
    getMemberById,
  };
};