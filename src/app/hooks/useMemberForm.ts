// Custom hooks for react-hook-form integration with member data
import { useForm, UseFormReturn } from 'react-hook-form';
import { useMemberStore, MemberFormData, Member } from '../store/member';
import { useEffect } from 'react';

// Hook for member form with validation and store integration
export function useMemberForm(editingMember?: Member | null): UseFormReturn<MemberFormData> & {
  onSubmit: (data: MemberFormData) => Promise<void>;
  isEditing: boolean;
} {
  const { addMember, updateMember, closeForm } = useMemberStore();
  
  const form = useForm<MemberFormData>({
    defaultValues: {
      name: '',
      role: '',
      age: 20,
      height: 170,
      image: '',
      bio: '',
      skills: [],
    },
    mode: 'onChange', // Enable real-time validation
  });

  // Reset form when editing member changes
  useEffect(() => {
    if (editingMember) {
      form.reset({
        name: editingMember.name,
        role: editingMember.role || '',
        age: editingMember.age,
        height: editingMember.height,
        image: editingMember.image,
        bio: editingMember.bio,
        skills: editingMember.skills,
      });
    } else {
      form.reset({
        name: '',
        role: '',
        age: 20,
        height: 170,
        image: '',
        bio: '',
        skills: [],
      });
    }
  }, [editingMember, form]);

  const onSubmit = async (data: MemberFormData) => {
    try {
      if (editingMember) {
        updateMember(editingMember.id, data);
      } else {
        addMember(data);
      }
      form.reset();
      closeForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };

  return {
    ...form,
    onSubmit,
    isEditing: !!editingMember,
  };
}

// Hook for member search functionality
export function useMemberSearch() {
  const { searchMembers, getMembersByRole } = useMemberStore();
  
  return {
    searchMembers,
    getMembersByRole,
    // Additional search utilities
    searchBySkill: (skill: string) => {
      return searchMembers(skill);
    },
    searchByAge: (minAge: number, maxAge: number) => {
      const { members } = useMemberStore.getState();
      return members.filter(member => member.age >= minAge && member.age <= maxAge);
    },
    searchByHeight: (minHeight: number, maxHeight: number) => {
      const { members } = useMemberStore.getState();
      return members.filter(member => member.height >= minHeight && member.height <= maxHeight);
    },
  };
}

// Hook for member statistics
export function useMemberStats() {
  const members = useMemberStore(state => state.members);
  
  const stats = {
    total: members.length,
    active: members.filter(m => m.isActive).length,
    averageAge: Math.round(members.reduce((acc, m) => acc + m.age, 0) / members.length),
    averageHeight: Math.round(members.reduce((acc, m) => acc + m.height, 0) / members.length),
    roles: [...new Set(members.map(m => m.role).filter(Boolean))],
    totalSkills: [...new Set(members.flatMap(m => m.skills))].length,
    mostCommonSkills: getMostCommonSkills(members),
  };
  
  return stats;
}

// Helper function to get most common skills
function getMostCommonSkills(members: Member[], limit = 5) {
  const skillCounts: Record<string, number> = {};
  
  members.forEach(member => {
    member.skills.forEach(skill => {
      skillCounts[skill] = (skillCounts[skill] || 0) + 1;
    });
  });
  
  return Object.entries(skillCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, limit)
    .map(([skill, count]) => ({ skill, count }));
}

// Validation schemas for react-hook-form
export const memberValidationRules = {
  name: {
    required: 'Name is required',
    minLength: {
      value: 2,
      message: 'Name must be at least 2 characters',
    },
    maxLength: {
      value: 50,
      message: 'Name must be less than 50 characters',
    },
  },
  age: {
    required: 'Age is required',
    min: {
      value: 16,
      message: 'Age must be at least 16',
    },
    max: {
      value: 50,
      message: 'Age must be less than 50',
    },
  },
  height: {
    required: 'Height is required',
    min: {
      value: 150,
      message: 'Height must be at least 150cm',
    },
    max: {
      value: 200,
      message: 'Height must be less than 200cm',
    },
  },
  role: {
    maxLength: {
      value: 100,
      message: 'Role must be less than 100 characters',
    },
  },
  bio: {
    maxLength: {
      value: 500,
      message: 'Bio must be less than 500 characters',
    },
  },
};
