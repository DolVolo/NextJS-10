'use client';

import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { usePortfolioActions, usePortfolioData, PortfolioFormData, Activity, Certificate } from '../store/portfolio';
import { useEffect, useState } from 'react';

interface PortfolioFormProps {
  onClose?: () => void;
}

export default function PortfolioForm({ onClose }: PortfolioFormProps) {
  const { editingStudent, isFormOpen } = usePortfolioData();
  const { addStudent, updateStudent, closeForm } = usePortfolioActions();
  
  const [currentSection, setCurrentSection] = useState<'personal' | 'education' | 'application' | 'activities'>('personal');
  
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<PortfolioFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      nickname: '',
      studentId: '',
      birthDate: '',
      bloodType: '',
      religion: '',
      ethnicity: '',
      nationality: '',
      address: '',
      district: '',
      province: '',
      postalCode: '',
      phoneNumber: '',
      email: '',
      instagram: '',
      facebook: '',
      school: '',
      program: '',
      gpa: 0,
      specialAbilities: [],
      hobbies: [],
      selectedMajor: '',
      selectedUniversity: '',
      applicationReason: '',
      activities: [],
      certificates: [],
      profileImage: '',
    },
  });

  // Field Arrays for dynamic sections
  const { fields: activityFields, append: appendActivity, remove: removeActivity } = useFieldArray({
    control,
    name: 'activities',
  });

  const { fields: certificateFields, append: appendCertificate, remove: removeCertificate } = useFieldArray({
    control,
    name: 'certificates',
  });

  // Reset form when editing student changes
  useEffect(() => {
    if (editingStudent) {
      reset({
        firstName: editingStudent.firstName,
        lastName: editingStudent.lastName,
        nickname: editingStudent.nickname || '',
        studentId: editingStudent.studentId,
        birthDate: editingStudent.birthDate,
        bloodType: editingStudent.bloodType || '',
        religion: editingStudent.religion || '',
        ethnicity: editingStudent.ethnicity || '',
        nationality: editingStudent.nationality || '',
        address: editingStudent.address,
        district: editingStudent.district,
        province: editingStudent.province,
        postalCode: editingStudent.postalCode,
        phoneNumber: editingStudent.phoneNumber,
        email: editingStudent.email || '',
        instagram: editingStudent.instagram || '',
        facebook: editingStudent.facebook || '',
        school: editingStudent.school,
        program: editingStudent.program,
        gpa: editingStudent.gpa,
        specialAbilities: editingStudent.specialAbilities,
        hobbies: editingStudent.hobbies,
        selectedMajor: editingStudent.selectedMajor,
        selectedUniversity: editingStudent.selectedUniversity,
        applicationReason: editingStudent.applicationReason,
        activities: editingStudent.activities,
        certificates: editingStudent.certificates,
        profileImage: editingStudent.profileImage || '',
      });
    } else {
      reset({
        firstName: '',
        lastName: '',
        nickname: '',
        studentId: '',
        birthDate: '',
        bloodType: '',
        religion: '',
        ethnicity: '',
        nationality: '',
        address: '',
        district: '',
        province: '',
        postalCode: '',
        phoneNumber: '',
        email: '',
        instagram: '',
        facebook: '',
        school: '',
        program: '',
        gpa: 0,
        specialAbilities: [],
        hobbies: [],
        selectedMajor: '',
        selectedUniversity: '',
        applicationReason: '',
        activities: [],
        certificates: [],
        profileImage: '',
      });
    }
  }, [editingStudent, reset]);

  const onSubmit = async (data: PortfolioFormData) => {
    try {
      if (editingStudent) {
        updateStudent(editingStudent.id, data);
      } else {
        addStudent(data);
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
    setCurrentSection('personal');
    onClose?.();
  };

  const addSkillItem = (type: 'ability' | 'hobby', value: string) => {
    if (value.trim()) {
      if (type === 'ability') {
        const current = watch('specialAbilities') || [];
        setValue('specialAbilities', [...current, value.trim()]);
      } else {
        const current = watch('hobbies') || [];
        setValue('hobbies', [...current, value.trim()]);
      }
    }
  };

  const removeSkillItem = (type: 'ability' | 'hobby', index: number) => {
    if (type === 'ability') {
      const current = watch('specialAbilities') || [];
      setValue('specialAbilities', current.filter((_, i) => i !== index));
    } else {
      const current = watch('hobbies') || [];
      setValue('hobbies', current.filter((_, i) => i !== index));
    }
  };

  const addNewActivity = () => {
    const newActivity: Activity = {
      id: crypto.randomUUID(),
      title: '',
      description: '',
      year: new Date().getFullYear().toString(),
      level: 'school',
      rank: '',
      images: [],
    };
    appendActivity(newActivity);
  };

  const addNewCertificate = () => {
    const newCertificate: Certificate = {
      id: crypto.randomUUID(),
      title: '',
      description: '',
      year: new Date().getFullYear().toString(),
      issuer: '',
      images: [],
    };
    appendCertificate(newCertificate);
  };

  if (!isFormOpen) return null;

  const sections = [
    { id: 'personal', label: 'ข้อมูลส่วนตัว' },
    { id: 'education', label: 'การศึกษา' },
    { id: 'application', label: 'การสมัคร' },
    { id: 'activities', label: 'กิจกรรมและรางวัล' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {editingStudent ? 'แก้ไขข้อมูล Portfolio' : 'เพิ่ม Portfolio นักศึกษาใหม่'}
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
          
          {/* Section Navigation */}
          <div className="flex space-x-1 mt-4">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setCurrentSection(section.id as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentSection === section.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {/* Personal Information Section */}
          {currentSection === 'personal' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลส่วนตัว</h3>
              
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ชื่อ *
                  </label>
                  <input
                    {...register('firstName', { required: 'กรุณากรอกชื่อ' })}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="ชื่อ"
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    นามสกุล *
                  </label>
                  <input
                    {...register('lastName', { required: 'กรุณากรอกนามสกุล' })}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="นามสกุล"
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ชื่อเล่น
                  </label>
                  <input
                    {...register('nickname')}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="ชื่อเล่น"
                  />
                </div>
              </div>

              {/* Student ID and Birth Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    รหัสนักศึกษา *
                  </label>
                  <input
                    {...register('studentId', { 
                      required: 'กรุณากรอกรหัสนักศึกษา',
                      pattern: {
                        value: /^\d{10}$/,
                        message: 'รหัสนักศึกษาต้องเป็นตัวเลข 10 หลัก'
                      }
                    })}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="6704101333"
                  />
                  {errors.studentId && <p className="mt-1 text-sm text-red-600">{errors.studentId.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    วันเกิด *
                  </label>
                  <input
                    {...register('birthDate', { required: 'กรุณาระบุวันเกิด' })}
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                  {errors.birthDate && <p className="mt-1 text-sm text-red-600">{errors.birthDate.message}</p>}
                </div>
              </div>

              {/* Additional Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">หมู่เลือด</label>
                  <select
                    {...register('bloodType')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  >
                    <option value="">เลือกหมู่เลือด</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                    <option value="O">O</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ศาสนา</label>
                  <input
                    {...register('religion')}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="พุทธ"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">เชื้อชาติ</label>
                  <input
                    {...register('ethnicity')}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="ไทย"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">สัญชาติ</label>
                  <input
                    {...register('nationality')}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="ไทย"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ที่อยู่ *
                  </label>
                  <textarea
                    {...register('address', { required: 'กรุณากรอกที่อยู่' })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="บ้านเลขที่ ถนน"
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ตำบล/แขวง *</label>
                    <input
                      {...register('district', { required: 'กรุณากรอกตำบล/แขวง' })}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                      placeholder="ตำบล/แขวง"
                    />
                    {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">จังหวัด *</label>
                    <input
                      {...register('province', { required: 'กรุณากรอกจังหวัด' })}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                      placeholder="จังหวัด"
                    />
                    {errors.province && <p className="mt-1 text-sm text-red-600">{errors.province.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">รหัสไปรษณีย์ *</label>
                    <input
                      {...register('postalCode', { 
                        required: 'กรุณากรอกรหัสไปรษณีย์',
                        pattern: {
                          value: /^\d{5}$/,
                          message: 'รหัสไปรษณีย์ต้องเป็นตัวเลข 5 หลัก'
                        }
                      })}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                      placeholder="52100"
                    />
                    {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    หมายเลขโทรศัพท์ *
                  </label>
                  <input
                    {...register('phoneNumber', { 
                      required: 'กรุณากรอกหมายเลขโทรศัพท์',
                      pattern: {
                        value: /^(\d{3}-\d{3}-\d{4}|\d{10})$/,
                        message: 'รูปแบบหมายเลขโทรศัพท์ไม่ถูกต้อง'
                      }
                    })}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="096-751-7739"
                  />
                  {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">อีเมล</label>
                  <input
                    {...register('email', {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'รูปแบบอีเมลไม่ถูกต้อง'
                      }
                    })}
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="example@email.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>
              </div>

              {/* Social Media */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                  <input
                    {...register('instagram')}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="donkillmeplz"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                  <input
                    {...register('facebook')}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="Thannavat Voloshin"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Education Section */}
          {currentSection === 'education' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">การศึกษา</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    โรงเรียน *
                  </label>
                  <input
                    {...register('school', { required: 'กรุณากรอกชื่อโรงเรียน' })}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="โรงเรียนอัสสัมชัญลำปาง"
                  />
                  {errors.school && <p className="mt-1 text-sm text-red-600">{errors.school.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    แผนการเรียน *
                  </label>
                  <input
                    {...register('program', { required: 'กรุณากรอกแผนการเรียน' })}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="วิทย์-คณิต"
                  />
                  {errors.program && <p className="mt-1 text-sm text-red-600">{errors.program.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GPA *
                  </label>
                  <input
                    {...register('gpa', { 
                      required: 'กรุณากรอก GPA',
                      min: { value: 0, message: 'GPA ต้องมากกว่าหรือเท่ากับ 0' },
                      max: { value: 4, message: 'GPA ต้องน้อยกว่าหรือเท่ากับ 4' }
                    })}
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="3.20"
                  />
                  {errors.gpa && <p className="mt-1 text-sm text-red-600">{errors.gpa.message}</p>}
                </div>
              </div>

              {/* Special Abilities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ความสามารถพิเศษ
                </label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="เพิ่มความสามารถพิเศษ"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSkillItem('ability', e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                        addSkillItem('ability', input.value);
                        input.value = '';
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      เพิ่ม
                    </button>
                  </div>
                  
                  {(watch('specialAbilities') || []).length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {(watch('specialAbilities') || []).map((ability, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {ability}
                          <button
                            type="button"
                            onClick={() => removeSkillItem('ability', index)}
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

              {/* Hobbies */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  งานอดิเรก
                </label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="เพิ่มงานอดิเรก"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSkillItem('hobby', e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                        addSkillItem('hobby', input.value);
                        input.value = '';
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      เพิ่ม
                    </button>
                  </div>
                  
                  {(watch('hobbies') || []).length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {(watch('hobbies') || []).map((hobby, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                        >
                          {hobby}
                          <button
                            type="button"
                            onClick={() => removeSkillItem('hobby', index)}
                            className="text-green-600 hover:text-green-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Application Section */}
          {currentSection === 'application' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">การสมัคร</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    สาขาที่เลือก *
                  </label>
                  <input
                    {...register('selectedMajor', { required: 'กรุณากรอกสาขาที่เลือก' })}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="วิทยาศาสตร์คอมพิวเตอร์"
                  />
                  {errors.selectedMajor && <p className="mt-1 text-sm text-red-600">{errors.selectedMajor.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    มหาวิทยาลัย *
                  </label>
                  <input
                    {...register('selectedUniversity', { required: 'กรุณากรอกมหาวิทยาลัย' })}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="มหาวิทยาลัยแม่โจ้"
                  />
                  {errors.selectedUniversity && <p className="mt-1 text-sm text-red-600">{errors.selectedUniversity.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เหตุผลในการสมัครเข้าเรียน *
                </label>
                <textarea
                  {...register('applicationReason', { required: 'กรุณากรอกเหตุผลในการสมัครเข้าเรียน' })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                  placeholder="อธิบายเหตุผลที่ต้องการเข้าเรียนในสาขาและมหาวิทยาลัยนี้"
                />
                {errors.applicationReason && <p className="mt-1 text-sm text-red-600">{errors.applicationReason.message}</p>}
              </div>
            </div>
          )}

          {/* Activities Section */}
          {currentSection === 'activities' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">กิจกรรมและรางวัล</h3>
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={addNewActivity}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    เพิ่มกิจกรรม
                  </button>
                  <button
                    type="button"
                    onClick={addNewCertificate}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                  >
                    เพิ่มใบรับรอง
                  </button>
                </div>
              </div>

              {/* Activities */}
              {activityFields.map((field, index) => (
                <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">กิจกรรม #{index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeActivity(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ลบ
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อกิจกรรม</label>
                      <input
                        {...register(`activities.${index}.title` as const)}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                        placeholder="ชื่อกิจกรรม"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ปี</label>
                      <input
                        {...register(`activities.${index}.year` as const)}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                        placeholder="2019"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">รายละเอียด</label>
                    <textarea
                      {...register(`activities.${index}.description` as const)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                      placeholder="รายละเอียดกิจกรรม"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ระดับ</label>
                      <select
                        {...register(`activities.${index}.level` as const)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      >
                        <option value="school">โรงเรียน</option>
                        <option value="district">เขต/อำเภอ</option>
                        <option value="province">จังหวัด</option>
                        <option value="national">ประเทศ</option>
                        <option value="international">นานาชาติ</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">อันดับ/รางวัล</label>
                      <input
                        {...register(`activities.${index}.rank` as const)}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                        placeholder="รองชนะเลิศอันดับที่ 1"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Certificates */}
              {certificateFields.map((field, index) => (
                <div key={field.id} className="border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-green-900">ใบรับรอง #{index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeCertificate(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ลบ
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อใบรับรอง</label>
                      <input
                        {...register(`certificates.${index}.title` as const)}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                        placeholder="ชื่อใบรับรอง"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ปี</label>
                      <input
                        {...register(`certificates.${index}.year` as const)}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                        placeholder="2019"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">รายละเอียด</label>
                    <textarea
                      {...register(`certificates.${index}.description` as const)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                      placeholder="รายละเอียดใบรับรอง"
                    />
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">หน่วยงานที่ออกใบรับรอง</label>
                    <input
                      {...register(`certificates.${index}.issuer` as const)}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                      placeholder="หน่วยงานที่ออกใบรับรอง"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-between pt-6 border-t border-gray-200 mt-8">
            <div className="flex space-x-2">
              {currentSection !== 'personal' && (
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = sections.findIndex(s => s.id === currentSection);
                    if (currentIndex > 0) {
                      setCurrentSection(sections[currentIndex - 1].id as any);
                    }
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  ก่อนหน้า
                </button>
              )}
              
              {currentSection !== 'activities' && (
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = sections.findIndex(s => s.id === currentSection);
                    if (currentIndex < sections.length - 1) {
                      setCurrentSection(sections[currentIndex + 1].id as any);
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  ถัดไป
                </button>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'กำลังบันทึก...' : editingStudent ? 'อัพเดท Portfolio' : 'บันทึก Portfolio'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}