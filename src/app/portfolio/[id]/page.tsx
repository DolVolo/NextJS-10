'use client';

import { useParams, notFound } from 'next/navigation';
import { usePortfolioActions } from '../../store/portfolio';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Student } from '../../store/portfolio';

// Force dynamic rendering to avoid prerender issues with Zustand
export const dynamic = 'force-dynamic';

export default function StudentDetailPage() {
  const params = useParams();
  const { getStudent } = usePortfolioActions();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const studentId = params.id as string;
    if (studentId) {
      const foundStudent = getStudent(studentId);
      if (foundStudent) {
        setStudent(foundStudent);
      }
      setLoading(false);
    }
  }, [params.id, getStudent]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!student) {
    return notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getLevelText = (level: string) => {
    const levels = {
      'school': 'โรงเรียน',
      'district': 'เขต/อำเภอ', 
      'province': 'จังหวัด',
      'national': 'ประเทศ',
      'international': 'นานาชาติ'
    };
    return levels[level as keyof typeof levels] || level;
  };

  const getGpaColor = (gpa: number) => {
    if (gpa >= 3.5) return 'text-green-600 bg-green-50 border-green-200';
    if (gpa >= 3.0) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (gpa >= 2.5) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/teacher"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Portfolio - {student.firstName} {student.lastName}
                </h1>
                <p className="text-sm text-gray-600">รหัสนักศึกษา: {student.studentId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-4 py-2 rounded-lg text-sm font-medium border ${getGpaColor(student.gpa)}`}>
                GPA: {student.gpa.toFixed(2)}
              </span>
              <Link
                href={`/teacher`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                กลับสู่รายการ
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center mb-6">
                {student.profileImage ? (
                  <div className="w-24 h-24 mx-auto mb-4 relative">
                    <img
                      src={student.profileImage}
                      alt={`${student.firstName} ${student.lastName}`}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) {
                          fallback.style.display = 'flex';
                        }
                      }}
                    />
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center absolute top-0 left-0" style={{ display: 'none' }}>
                      <span className="text-2xl font-bold text-white">
                        {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-white">
                      {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                    </span>
                  </div>
                )}
                <h2 className="text-xl font-bold text-gray-900">
                  {student.firstName} {student.lastName}
                </h2>
                {student.nickname && (
                  <p className="text-gray-600">({student.nickname})</p>
                )}
                <p className="text-sm text-gray-500 mt-1">รหัสนักศึกษา: {student.studentId}</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 8h4m-4 0V9h4v6m-4 0H8a4 4 0 01-4-4V9a4 4 0 014-4h4" />
                  </svg>
                  <span className="text-gray-600">เกิด: {formatDate(student.birthDate)}</span>
                </div>
                
                {student.bloodType && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-gray-600">หมู่เลือด: {student.bloodType}</span>
                  </div>
                )}

                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-600">{student.phoneNumber}</span>
                </div>

                {student.email && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    <span className="text-gray-600">{student.email}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-200">
                  <div className="text-xs text-gray-500 mb-2">ที่อยู่:</div>
                  <p className="text-gray-700">
                    {student.address}<br />
                    ตำบล{student.district} จ.{student.province} {student.postalCode}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            {(student.instagram || student.facebook) && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media</h3>
                <div className="space-y-3">
                  {student.instagram && (
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-xs font-bold">IG</span>
                      </div>
                      <span className="text-gray-700">{student.instagram}</span>
                    </div>
                  )}
                  {student.facebook && (
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-xs font-bold">FB</span>
                      </div>
                      <span className="text-gray-700">{student.facebook}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Education */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                ข้อมูลการศึกษา
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-600">โรงเรียน</label>
                  <p className="text-gray-900 font-medium">{student.school}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">แผนการเรียน</label>
                  <p className="text-gray-900 font-medium">{student.program}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">GPA</label>
                  <p className={`text-xl font-bold ${student.gpa >= 3.5 ? 'text-green-600' : student.gpa >= 3.0 ? 'text-blue-600' : student.gpa >= 2.5 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {student.gpa.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Application Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                ข้อมูลการสมัคร
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-sm font-medium text-gray-600">สาขาที่เลือก</label>
                  <p className="text-gray-900 font-medium">{student.selectedMajor}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">มหาวิทยาลัย</label>
                  <p className="text-gray-900 font-medium">{student.selectedUniversity}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-2">เหตุผลในการสมัครเข้าเรียน</label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-800 leading-relaxed">{student.applicationReason}</p>
                </div>
              </div>
            </div>

            {/* Skills and Hobbies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Special Abilities */}
              {student.specialAbilities.length > 0 && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    ความสามารถพิเศษ
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {student.specialAbilities.map((ability, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                      >
                        {ability}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Hobbies */}
              {student.hobbies.length > 0 && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    งานอดิเรก
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {student.hobbies.map((hobby, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                      >
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Activities */}
            {student.activities.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  กิจกรรมและรางวัล
                </h3>
                <div className="space-y-6">
                  {student.activities.map((activity, _index) => (
                    <div key={activity.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{activity.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span>ปี {activity.year}</span>
                            <span>•</span>
                            <span>ระดับ{getLevelText(activity.level)}</span>
                            {activity.rank && (
                              <>
                                <span>•</span>
                                <span className="text-yellow-600 font-medium">{activity.rank}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      {activity.description && (
                        <p className="text-gray-700 leading-relaxed mb-4">{activity.description}</p>
                      )}
                      
                      {/* Activity Images */}
                      {activity.images && activity.images.length > 0 && (
                        <div className="mt-4">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">รูปภาพกิจกรรม:</h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {activity.images.map((image, imgIndex) => (
                              <div key={imgIndex} className="relative group">
                                <img
                                  src={image}
                                  alt={`${activity.title} - รูปที่ ${imgIndex + 1}`}
                                  className="w-full h-32 object-contain rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white relative z-10"
                                  style={{ minHeight: '128px' }}
                                  onLoad={() => console.log(`✅ Loaded: ${image.substring(0, 50)}...`)}
                                  onError={(e) => {
                                    console.error(`❌ Failed to load activity image`);
                                    e.currentTarget.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
                                      <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="200" height="150" fill="#f3f4f6"/>
                                        <text x="100" y="75" text-anchor="middle" font-family="Arial" font-size="12" fill="#6b7280">
                                          ไม่พบรูปภาพกิจกรรม
                                        </text>
                                      </svg>
                                    `)}`;
                                  }}
                                />
                                <div className="absolute inset-0 bg-transparent group-hover:bg-black group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center pointer-events-none">
                                  <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                  </svg>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certificates */}
            {student.certificates.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  ใบรับรองและประกาศนียบัตร
                </h3>
                <div className="space-y-6">
                  {student.certificates.map((certificate, _index) => (
                    <div key={certificate.id} className="border border-green-200 rounded-lg p-4 bg-green-50">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{certificate.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span>ปี {certificate.year}</span>
                            {certificate.issuer && (
                              <>
                                <span>•</span>
                                <span>โดย {certificate.issuer}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      {certificate.description && (
                        <p className="text-gray-700 leading-relaxed mb-4">{certificate.description}</p>
                      )}
                      
                      {/* Certificate Images */}
                      {certificate.images && certificate.images.length > 0 && (
                        <div className="mt-4">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">รูปภาพใบรับรอง:</h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {certificate.images.map((image, imgIndex) => (
                              <div key={imgIndex} className="relative group">
                                <img
                                  src={image}
                                  alt={`${certificate.title} - รูปที่ ${imgIndex + 1}`}
                                  className="w-full h-32 object-contain rounded-lg border border-green-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white relative z-10"
                                  style={{ minHeight: '128px' }}
                                  onLoad={() => console.log(`✅ Certificate Loaded: ${image.substring(0, 50)}...`)}
                                  onError={(e) => {
                                    console.error(`❌ Certificate Failed to load`);
                                    e.currentTarget.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
                                      <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="200" height="150" fill="#f0fdf4"/>
                                        <text x="100" y="75" text-anchor="middle" font-family="Arial" font-size="12" fill="#16a34a">
                                          ไม่พบใบรับรอง
                                        </text>
                                      </svg>
                                    `)}`;
                                  }}
                                />
                                <div className="absolute inset-0 bg-transparent group-hover:bg-black group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center pointer-events-none">
                                  <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                  </svg>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Portfolio Projects */}
            {student.portfolioProjects && student.portfolioProjects.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  ผลงาน/โครงงาน Portfolio
                </h3>
                <div className="space-y-6">
                  {student.portfolioProjects.map((project, _index) => (
                    <div key={project.id} className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{project.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span>ปี {project.year}</span>
                            {project.category && (
                              <>
                                <span>•</span>
                                <span>หมวดหมู่: {project.category}</span>
                              </>
                            )}
                            {project.technology && (
                              <>
                                <span>•</span>
                                <span className="text-purple-600 font-medium">เทคโนโลยี: {project.technology}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      {project.description && (
                        <p className="text-gray-700 leading-relaxed mb-4">{project.description}</p>
                      )}
                      
                      {/* Portfolio Project Images */}
                      {project.images && project.images.length > 0 && (
                        <div className="mt-4">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">รูปภาพผลงาน:</h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {project.images.map((image, imgIndex) => (
                              <div key={imgIndex} className="relative group">
                                <img
                                  src={image}
                                  alt={`${project.title} - รูปที่ ${imgIndex + 1}`}
                                  className="w-full h-32 object-contain rounded-lg border border-purple-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white relative z-10"
                                  style={{ minHeight: '128px' }}
                                  onLoad={() => console.log(`✅ Portfolio Project Loaded: ${image.substring(0, 50)}...`)}
                                  onError={(e) => {
                                    console.error(`❌ Portfolio Project Failed to load`);
                                    e.currentTarget.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
                                      <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="200" height="150" fill="#faf5ff"/>
                                        <text x="100" y="75" text-anchor="middle" font-family="Arial" font-size="12" fill="#9333ea">
                                          ไม่พบภาพผลงาน
                                        </text>
                                      </svg>
                                    `)}`;
                                  }}
                                />
                                <div className="absolute inset-0 bg-transparent group-hover:bg-black group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center pointer-events-none">
                                  <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                  </svg>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลเพิ่มเติม</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {student.religion && (
                  <div>
                    <span className="text-gray-600">ศาสนา:</span>
                    <span className="ml-2 text-gray-900">{student.religion}</span>
                  </div>
                )}
                {student.ethnicity && (
                  <div>
                    <span className="text-gray-600">เชื้อชาติ:</span>
                    <span className="ml-2 text-gray-900">{student.ethnicity}</span>
                  </div>
                )}
                {student.nationality && (
                  <div>
                    <span className="text-gray-600">สัญชาติ:</span>
                    <span className="ml-2 text-gray-900">{student.nationality}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-600">วันที่สร้าง:</span>
                  <span className="ml-2 text-gray-900">{formatDate(student.createdAt)}</span>
                </div>
                <div>
                  <span className="text-gray-600">อัพเดทล่าสุด:</span>
                  <span className="ml-2 text-gray-900">{formatDate(student.updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}