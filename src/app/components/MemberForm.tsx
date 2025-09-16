'use client';

import { useForm, Controller } from 'react-hook-form';
import { useMemberStore, MemberFormData } from '../store/member';
import { useEffect } from 'react';

interface MemberFormProps {
  onClose?: () => void;
}

export default function MemberForm({ onClose }: MemberFormProps) {
  const { editingMember, isFormOpen, addMember, updateMember, closeForm } = useMemberStore();
  
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<MemberFormData>({
    defaultValues: {
      name: '',
      role: '',
      age: 20,
      height: 170,
      image: '',
      bio: '',
      skills: [],
    },
  });

  // Watch skills for dynamic management
  const watchedSkills = watch('skills');

  // Reset form when editing member changes
  useEffect(() => {
    if (editingMember) {
      reset({
        name: editingMember.name,
        role: editingMember.role || '',
        age: editingMember.age,
        height: editingMember.height,
        image: editingMember.image,
        bio: editingMember.bio,
        skills: editingMember.skills,
      });
    } else {
      reset({
        name: '',
        role: '',
        age: 20,
        height: 170,
        image: '',
        bio: '',
        skills: [],
      });
    }
  }, [editingMember, reset]);

  const onSubmit = async (data: MemberFormData) => {
    try {
      if (editingMember) {
        updateMember(editingMember.id, data);
      } else {
        addMember(data);
      }
      reset();
      onClose?.();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleClose = () => {
    closeForm();
    reset();
    onClose?.();
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !watchedSkills.includes(skill.trim())) {
      setValue('skills', [...watchedSkills, skill.trim()]);
    }
  };

  const removeSkill = (index: number) => {
    setValue('skills', watchedSkills.filter((_, i) => i !== index));
  };

  if (!isFormOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {editingMember ? 'Edit Member' : 'Add New Member'}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="Enter member name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <input
              {...register('role')}
              type="text"
              id="role"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="e.g., Main Vocal, Lead Dancer"
            />
          </div>

          {/* Age and Height */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                Age *
              </label>
              <input
                {...register('age', { 
                  required: 'Age is required',
                  min: { value: 16, message: 'Age must be at least 16' },
                  max: { value: 50, message: 'Age must be less than 50' }
                })}
                type="number"
                id="age"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              {errors.age && (
                <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                Height (cm) *
              </label>
              <input
                {...register('height', { 
                  required: 'Height is required',
                  min: { value: 150, message: 'Height must be at least 150cm' },
                  max: { value: 200, message: 'Height must be less than 200cm' }
                })}
                type="number"
                id="height"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              {errors.height && (
                <p className="mt-1 text-sm text-red-600">{errors.height.message}</p>
              )}
            </div>
          </div>

          {/* Image */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Image Keyword
            </label>
            <input
              {...register('image')}
              type="text"
              id="image"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="Avatar keyword for image generation"
            />
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
              Biography
            </label>
            <textarea
              {...register('bio')}
              id="bio"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="Brief biography or description"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills
            </label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a skill"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                    addSkill(input.value);
                    input.value = '';
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
              
              {watchedSkills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {watchedSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Saving...' : editingMember ? 'Update Member' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
