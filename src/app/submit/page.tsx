'use client';

import { useState } from 'react';
import { usePortfolioActions } from '@/app/store/portfolio';
import { useRouter } from 'next/navigation';

export default function SubmitPortfolioPage() {
  const { addStudent } = usePortfolioActions();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    // ข้อมูลส่วนตัว
    firstName: '',
    lastName: '',
    nickname: '',
    birthDate: '',
    bloodType: '',
    religion: 'พุทธ',
    ethnicity: 'ไทย',
    nationality: 'ไทย',
    
    // ที่อยู่และการติดต่อ
    address: '',
    district: '',
    province: '',
    postalCode: '',
    phoneNumber: '',
    email: '',
    instagram: '',
    facebook: '',
    
    // การศึกษา
    school: '',
    program: '',
    gpa: '',
    
    // ความสามารถพิเศษและงานอิดเรก
    specialAbilities: '',
    hobbies: '',
    
    // การสมัคร
    selectedMajor: '',
    selectedUniversity: '',
    applicationReason: ''
  });

  const [images, setImages] = useState({
    profileImage: null as File | null,
    activityImages: [] as File[],
    certificateImages: [] as File[],
    portfolioImages: [] as File[]
  });

  const [imagePreviews, setImagePreviews] = useState({
    profileImage: '',
    activityImages: [] as string[],
    certificateImages: [] as string[],
    portfolioImages: [] as string[]
  });

  const [activities, setActivities] = useState([{
    title: '',
    description: '',
    year: '',
    level: 'school' as 'school' | 'district' | 'province' | 'national' | 'international',
    rank: ''
  }]);

  const [certificates, setCertificates] = useState([{
    title: '',
    description: '',
    year: '',
    issuer: ''
  }]);

  const [portfolioProjects, setPortfolioProjects] = useState([{
    title: '',
    description: '',
    year: '',
    category: '',
    technology: ''
  }]);

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // ตรวจสอบข้อมูลที่จำเป็น
    if (!formData.firstName.trim()) newErrors.firstName = 'กรุณากรอกชื่อ';
    if (!formData.lastName.trim()) newErrors.lastName = 'กรุณากรอกนามสกุล';
    if (!formData.birthDate) newErrors.birthDate = 'กรุณาเลือกวันเกิด';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'กรุณากรอกหมายเลขโทรศัพท์';
    if (!formData.address.trim()) newErrors.address = 'กรุณากรอกที่อยู่';
    if (!formData.school.trim()) newErrors.school = 'กรุณากรอกชื่อโรงเรียน';
    if (!formData.gpa || parseFloat(formData.gpa) < 0 || parseFloat(formData.gpa) > 4) {
      newErrors.gpa = 'กรุณากรอก GPA ที่ถูกต้อง (0.00-4.00)';
    }
    if (!formData.selectedMajor.trim()) newErrors.selectedMajor = 'กรุณาเลือกสาขาที่ต้องการสมัคร';
    if (!formData.selectedUniversity.trim()) newErrors.selectedUniversity = 'กรุณาเลือกมหาวิทยาลัย';
    if (!formData.applicationReason.trim()) newErrors.applicationReason = 'กรุณากรอกเหตุผลในการสมัคร';

    // ตรวจสอบรูปแบบหมายเลขโทรศัพท์
    if (formData.phoneNumber && !/^[0-9-]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'หมายเลขโทรศัพท์ควรประกอบด้วยตัวเลขและเครื่องหมาย - เท่านั้น';
    }

    // ตรวจสอบอีเมล
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Convert images to base64 for persistent storage
      const profileImageUrl = images.profileImage ? await fileToBase64(images.profileImage) : '';
      
      const activityImageUrls = await Promise.all(images.activityImages.map(file => fileToBase64(file)));
      const certificateImageUrls = await Promise.all(images.certificateImages.map(file => fileToBase64(file)));
      const portfolioImageUrls = await Promise.all(images.portfolioImages.map(file => fileToBase64(file)));

      // เตรียมข้อมูลสำหรับส่ง
      const portfolioData = {
        ...formData,
        studentId: '', // Since students don't have numbers yet in portfolio stage
        gpa: parseFloat(formData.gpa),
        specialAbilities: formData.specialAbilities ? formData.specialAbilities.split(',').map(s => s.trim()) : [],
        hobbies: formData.hobbies ? formData.hobbies.split(',').map(s => s.trim()) : [],
        activities: activities.map((activity, index) => ({
          id: `activity-${Date.now()}-${index}`,
          title: activity.title || `กิจกรรม ${index + 1}`,
          description: activity.description,
          year: activity.year,
          level: activity.level,
          rank: activity.rank,
          images: activityImageUrls.slice(index, index + 1) // Assign one image per activity
        })),
        certificates: certificates.map((certificate, index) => ({
          id: `certificate-${Date.now()}-${index}`,
          title: certificate.title || `รางวัล ${index + 1}`,
          description: certificate.description,
          year: certificate.year,
          issuer: certificate.issuer,
          images: certificateImageUrls.slice(index, index + 1) // Assign one image per certificate
        })),
        portfolioProjects: portfolioProjects.map((project, index) => ({
          id: `portfolio-${Date.now()}-${index}`,
          title: project.title || `ผลงาน ${index + 1}`,
          description: project.description,
          year: project.year,
          category: project.category,
          technology: project.technology,
          images: portfolioImageUrls.slice(index, index + 1) // Assign one image per project
        })),
        profileImage: profileImageUrl
      };

      // เพิ่มข้อมูลลงใน store
      console.log('Submitting portfolio data...');
      addStudent(portfolioData);
      console.log('Portfolio submitted successfully');
      
      // แสดงข้อความสำเร็จและเปลี่ยนหน้า
      alert('ส่ง Portfolio สำเร็จ! ขอบคุณสำหรับการสมัคร');
      
      // Force manual persistence and wait longer before navigation
      setTimeout(() => {
        // Try to manually force persistence by accessing the store
        try {
          const storageData = localStorage.getItem('portfolio-storage');
          if (storageData) {
            const parsed = JSON.parse(storageData);
            console.log('Manual persistence check - localStorage has:', parsed.state?.students?.length || 0, 'students');
            
            // If the new student isn't in localStorage yet, wait a bit more
            if (parsed.state?.students?.length < 47) {
              console.log('New student not yet persisted, waiting longer...');
              setTimeout(() => {
                router.push('/portfolio-list');
              }, 1000);
              return;
            }
          }
        } catch (e) {
          console.error('Error checking persistence:', e);
        }
        
        router.push('/portfolio-list');
      }, 1000);
      
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // ลบ error เมื่อผู้ใช้เริ่มพิมพ์
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleImageUpload = async (type: 'profileImage' | 'activityImages' | 'certificateImages' | 'portfolioImages', file: File) => {
    if (type === 'profileImage') {
      setImages(prev => ({ ...prev, profileImage: file }));
      const base64 = await fileToBase64(file);
      setImagePreviews(prev => ({ ...prev, profileImage: base64 }));
    } else {
      setImages(prev => ({ 
        ...prev, 
        [type]: [...prev[type], file] 
      }));
      const base64 = await fileToBase64(file);
      setImagePreviews(prev => ({ 
        ...prev, 
        [type]: [...prev[type], base64] 
      }));
    }
  };

  const removeImage = (type: 'profileImage' | 'activityImages' | 'certificateImages' | 'portfolioImages', index?: number) => {
    if (type === 'profileImage') {
      setImages(prev => ({ ...prev, profileImage: null }));
      setImagePreviews(prev => ({ ...prev, profileImage: '' }));
    } else if (typeof index === 'number') {
      setImages(prev => ({ 
        ...prev, 
        [type]: prev[type].filter((_, i) => i !== index) 
      }));
      setImagePreviews(prev => ({ 
        ...prev, 
        [type]: prev[type].filter((_, i) => i !== index) 
      }));
    }
  };

  const addActivity = () => {
    setActivities(prev => [...prev, {
      title: '',
      description: '',
      year: '',
      level: 'school' as const,
      rank: ''
    }]);
  };

  const removeActivity = (index: number) => {
    setActivities(prev => prev.filter((_, i) => i !== index));
  };

  const updateActivity = (index: number, field: string, value: string) => {
    setActivities(prev => prev.map((activity, i) => 
      i === index ? { ...activity, [field]: value } : activity
    ));
  };

  const addCertificate = () => {
    setCertificates(prev => [...prev, {
      title: '',
      description: '',
      year: '',
      issuer: ''
    }]);
  };

  const removeCertificate = (index: number) => {
    setCertificates(prev => prev.filter((_, i) => i !== index));
  };

  const updateCertificate = (index: number, field: string, value: string) => {
    setCertificates(prev => prev.map((certificate, i) => 
      i === index ? { ...certificate, [field]: value } : certificate
    ));
  };

  const addPortfolioProject = () => {
    setPortfolioProjects(prev => [...prev, {
      title: '',
      description: '',
      year: '',
      category: '',
      technology: ''
    }]);
  };

  const removePortfolioProject = (index: number) => {
    setPortfolioProjects(prev => prev.filter((_, i) => i !== index));
  };

  const updatePortfolioProject = (index: number, field: string, value: string) => {
    setPortfolioProjects(prev => prev.map((project, i) => 
      i === index ? { ...project, [field]: value } : project
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📝 แบบฟอร์ม Portfolio สำหรับสมัคร TCAS69
          </h1>
          <p className="text-gray-600">
            กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง เพื่อใช้ในการสมัครเข้าศึกษาต่อระดับอุดมศึกษา
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ข้อมูลส่วนตัว */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
              ข้อมูลส่วนตัว
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="กรอกชื่อของคุณ"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  นามสกุล <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="กรอกนามสกุลของคุณ"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อเล่น</label>
                <input
                  type="text"
                  value={formData.nickname}
                  onChange={(e) => handleInputChange('nickname', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="ชื่อเล่น (ถ้ามี)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  วันเกิด <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.birthDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">หมู่เลือด</label>
                <select
                  value={formData.bloodType}
                  onChange={(e) => handleInputChange('bloodType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">เลือกหมู่เลือด</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                </select>
              </div>
            </div>
          </div>

          {/* ที่อยู่และการติดต่อ */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
              ที่อยู่และการติดต่อ
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ที่อยู่ <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows={3}
                  placeholder="บ้านเลขที่ ถนน ตำบล/แขวง"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">อำเภอ/เขต</label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="อำเภอ/เขต"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">จังหวัด</label>
                <input
                  type="text"
                  value={formData.province}
                  onChange={(e) => handleInputChange('province', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="จังหวัด"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">รหัสไปรษณีย์</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="รหัสไปรษณีย์ 5 หลัก"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  หมายเลขโทรศัพท์ <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0XX-XXX-XXXX"
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">อีเมล</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="example@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => handleInputChange('instagram', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="@username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                <input
                  type="text"
                  value={formData.facebook}
                  onChange={(e) => handleInputChange('facebook', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="ชื่อ Facebook"
                />
              </div>
            </div>
          </div>

          {/* การศึกษา */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
              ข้อมูลการศึกษา
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  โรงเรียน <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.school}
                  onChange={(e) => handleInputChange('school', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.school ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="ชื่อโรงเรียนที่กำลังศึกษา"
                />
                {errors.school && <p className="text-red-500 text-sm mt-1">{errors.school}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">แผนการเรียน</label>
                <input
                  type="text"
                  value={formData.program}
                  onChange={(e) => handleInputChange('program', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="เช่น วิทย์-คณิต, คณิต-อังกฤษ"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GPA <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  value={formData.gpa}
                  onChange={(e) => handleInputChange('gpa', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.gpa ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00 - 4.00"
                />
                {errors.gpa && <p className="text-red-500 text-sm mt-1">{errors.gpa}</p>}
              </div>
            </div>
          </div>

          {/* ความสามารถพิเศษ */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
              ความสามารถพิเศษและงานอดิเรก
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ความสามารถพิเศษ</label>
                <textarea
                  value={formData.specialAbilities}
                  onChange={(e) => handleInputChange('specialAbilities', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  rows={3}
                  placeholder="เช่น ภาษาต่างประเทศ, กีฬา, ดนตรี (คั่นด้วยเครื่องหมายจุลภาค)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">งานอดิเรก</label>
                <textarea
                  value={formData.hobbies}
                  onChange={(e) => handleInputChange('hobbies', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  rows={3}
                  placeholder="เช่น อ่านหนังสือ, ออกกำลังกาย, เล่นเกม (คั่นด้วยเครื่องหมายจุลภาค)"
                />
              </div>
            </div>
          </div>

          {/* การสมัคร */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">5</span>
              ข้อมูลการสมัคร
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  สาขาที่ต้องการสมัคร <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.selectedMajor}
                  onChange={(e) => handleInputChange('selectedMajor', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.selectedMajor ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">เลือกสาขา</option>
                  <option value="วิทยาศาสตร์คอมพิวเตอร์">วิทยาศาสตร์คอมพิวเตอร์</option>
                  <option value="วิศวกรรมซอฟต์แวร์">วิศวกรรมซอฟต์แวร์</option>
                  <option value="เทคโนโลยีสารสนเทศ">เทคโนโลยีสารสนเทศ</option>
                  <option value="วิศวกรรมคอมพิวเตอร์">วิศวกรรมคอมพิวเตอร์</option>
                  <option value="ระบบสารสนเทศ">ระบบสารสนเทศ</option>
                </select>
                {errors.selectedMajor && <p className="text-red-500 text-sm mt-1">{errors.selectedMajor}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  มหาวิทยาลัยที่ต้องการสมัคร <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.selectedUniversity}
                  onChange={(e) => handleInputChange('selectedUniversity', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.selectedUniversity ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">เลือกมหาวิทยาลัย</option>
                  <option value="มหาวิทยาลัยแม่โจ้">มหาวิทยาลัยแม่โจ้</option>
                  <option value="มหาวิทยาลัยเชียงใหม่">มหาวิทยาลัยเชียงใหม่</option>
                  <option value="จุฬาลงกรณ์มหาวิทยาลัย">จุฬาลงกรณ์มหาวิทยาลัย</option>
                  <option value="มหาวิทยาลัยมหิดล">มหาวิทยาลัยมหิดล</option>
                  <option value="มหาวิทยาลัยธรรมศาสตร์">มหาวิทยาลัยธรรมศาสตร์</option>
                </select>
                {errors.selectedUniversity && <p className="text-red-500 text-sm mt-1">{errors.selectedUniversity}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เหตุผลในการสมัครเข้าเรียน <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.applicationReason}
                  onChange={(e) => handleInputChange('applicationReason', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.applicationReason ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows={4}
                  placeholder="อธิบายเหตุผลที่ต้องการสมัครเข้าเรียนในสาขาและมหาวิทยาลัยนี้"
                />
                {errors.applicationReason && <p className="text-red-500 text-sm mt-1">{errors.applicationReason}</p>}
              </div>
            </div>
          </div>

          {/* รูปภาพและผลงาน */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">6</span>
              รูปภาพและผลงาน
            </h2>
            
            <div className="space-y-6">
              {/* รูปภาพนักเรียน */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">รูปภาพนักเรียน</label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  {imagePreviews.profileImage ? (
                    <div className="relative inline-block">
                      <img 
                        src={imagePreviews.profileImage} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage('profileImage')}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="cursor-pointer">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="mt-2 text-sm text-gray-600">คลิกเพื่ออัพโหลดรูปภาพนักเรียน</p>
                      <p className="text-xs text-gray-500">PNG, JPG, JPEG ขนาดไม่เกิน 5MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload('profileImage', file);
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* รูปภาพกิจกรรม */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700">กิจกรรมและรางวัล</label>
                  <button
                    type="button"
                    onClick={addActivity}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                  >
                    + เพิ่มกิจกรรม
                  </button>
                </div>
                
                {activities.map((activity, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-900">กิจกรรม {index + 1}</h4>
                      {activities.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeActivity(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          ลบ
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อกิจกรรม</label>
                        <input
                          type="text"
                          value={activity.title}
                          onChange={(e) => updateActivity(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                          placeholder="เช่น แข่งขัน World Robot Olympiad Thailand 2019"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ปี</label>
                        <input
                          type="text"
                          value={activity.year}
                          onChange={(e) => updateActivity(index, 'year', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                          placeholder="2019"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ระดับ</label>
                        <select
                          value={activity.level}
                          onChange={(e) => updateActivity(index, 'level', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        >
                          <option value="school">ระดับโรงเรียน</option>
                          <option value="district">ระดับเขต/อำเภอ</option>
                          <option value="province">ระดับจังหวัด</option>
                          <option value="national">ระดับประเทศ</option>
                          <option value="international">ระดับนานาชาติ</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">รางวัล (ถ้ามี)</label>
                        <input
                          type="text"
                          value={activity.rank}
                          onChange={(e) => updateActivity(index, 'rank', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                          placeholder="เช่น รองชนะเลิศอันดับที่ 1"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">รายละเอียด</label>
                      <textarea
                        value={activity.description}
                        onChange={(e) => updateActivity(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        rows={3}
                        placeholder="เช่น เข้ารอบ 32 ทีม แข่งขัน WRO ระดับประเทศ"
                      />
                    </div>
                    
                    {/* รูปภาพกิจกรรม */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">รูปภาพกิจกรรม</label>
                      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          {imagePreviews.activityImages.slice(index, index + 1).map((preview, imgIndex) => (
                            <div key={imgIndex} className="relative">
                              <img 
                                src={preview} 
                                alt={`Activity ${index + 1} - ${imgIndex + 1}`} 
                                className="w-full h-20 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage('activityImages', index + imgIndex)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="text-center cursor-pointer">
                          <svg className="mx-auto h-6 w-6 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <p className="mt-1 text-xs text-gray-600">คลิกเพื่ออัพโหลดรูปภาพ</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload('activityImages', file);
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ใบรับรองและประกาศนียบัตร */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700">ใบรับรองและประกาศนียบัตร</label>
                  <button
                    type="button"
                    onClick={addCertificate}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                  >
                    + เพิ่มใบรับรอง
                  </button>
                </div>
                
                {certificates.map((certificate, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-900">ใบรับรอง {index + 1}</h4>
                      {certificates.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCertificate(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          ลบ
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อรางวัล/ใบรับรอง</label>
                        <input
                          type="text"
                          value={certificate.title}
                          onChange={(e) => updateCertificate(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                          placeholder="เช่น แข่งขัน WRO ระดับประเทศ"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ปี</label>
                        <input
                          type="text"
                          value={certificate.year}
                          onChange={(e) => updateCertificate(index, 'year', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                          placeholder="2019"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">หน่วยงานที่ออกใบรับรอง</label>
                        <input
                          type="text"
                          value={certificate.issuer}
                          onChange={(e) => updateCertificate(index, 'issuer', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                          placeholder="เช่น Robot Olympiad Thailand"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">รายละเอียด</label>
                      <textarea
                        value={certificate.description}
                        onChange={(e) => updateCertificate(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        rows={3}
                        placeholder="เช่น การแข่งขัน World Robot รายการ Robot Olympiad Thailand 2019 เข้ารอบ 32 ทีม"
                      />
                    </div>
                    
                    {/* รูปภาพใบรับรอง */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">รูปภาพใบรับรอง</label>
                      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          {imagePreviews.certificateImages.slice(index, index + 1).map((preview, imgIndex) => (
                            <div key={imgIndex} className="relative">
                              <img 
                                src={preview} 
                                alt={`Certificate ${index + 1} - ${imgIndex + 1}`} 
                                className="w-full h-20 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage('certificateImages', index + imgIndex)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="text-center cursor-pointer">
                          <svg className="mx-auto h-6 w-6 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <p className="mt-1 text-xs text-gray-600">คลิกเพื่ออัพโหลดรูปภาพ</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload('certificateImages', file);
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ผลงาน/โครงงาน */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700">ผลงาน/โครงงาน</label>
                  <button
                    type="button"
                    onClick={addPortfolioProject}
                    className="px-3 py-1 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700"
                  >
                    + เพิ่มผลงาน
                  </button>
                </div>
                
                {portfolioProjects.map((project, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-900">ผลงาน {index + 1}</h4>
                      {portfolioProjects.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePortfolioProject(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          ลบ
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อผลงาน/โครงงาน</label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => updatePortfolioProject(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                          placeholder="เช่น ระบบจัดการห้องสมุดออนไลน์"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ปี</label>
                        <input
                          type="text"
                          value={project.year}
                          onChange={(e) => updatePortfolioProject(index, 'year', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                          placeholder="2024"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ประเภทผลงาน</label>
                        <select
                          value={project.category}
                          onChange={(e) => updatePortfolioProject(index, 'category', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        >
                          <option value="">เลือกประเภท</option>
                          <option value="เว็บไซต์">เว็บไซต์</option>
                          <option value="แอปพลิเคชัน">แอปพลิเคชัน</option>
                          <option value="เกม">เกม</option>
                          <option value="โครงงานวิทยาศาสตร์">โครงงานวิทยาศาสตร์</option>
                          <option value="ระบบฐานข้อมูล">ระบบฐานข้อมูล</option>
                          <option value="AI/Machine Learning">AI/Machine Learning</option>
                          <option value="IoT">IoT</option>
                          <option value="อื่นๆ">อื่นๆ</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">เทคโนโลยีที่ใช้</label>
                        <input
                          type="text"
                          value={project.technology}
                          onChange={(e) => updatePortfolioProject(index, 'technology', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                          placeholder="เช่น React, Node.js, MySQL"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">รายละเอียดผลงาน</label>
                      <textarea
                        value={project.description}
                        onChange={(e) => updatePortfolioProject(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        rows={3}
                        placeholder="เช่น ระบบสำหรับจัดการการยืม-คืนหนังสือ มีฟีเจอร์ค้นหา จองหนังสือล่วงหน้า และติดตามสถานะการยืม"
                      />
                    </div>
                    
                    {/* รูปภาพผลงาน */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">รูปภาพผลงาน</label>
                      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          {imagePreviews.portfolioImages.slice(index, index + 1).map((preview, imgIndex) => (
                            <div key={imgIndex} className="relative">
                              <img 
                                src={preview} 
                                alt={`Portfolio ${index + 1} - ${imgIndex + 1}`} 
                                className="w-full h-20 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage('portfolioImages', index + imgIndex)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="text-center cursor-pointer">
                          <svg className="mx-auto h-6 w-6 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <p className="mt-1 text-xs text-gray-600">คลิกเพื่ออัพโหลดรูปภาพ</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload('portfolioImages', file);
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ปุ่มส่ง */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 bg-green-600 text-white rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>กำลังส่ง...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>ส่ง Portfolio</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}