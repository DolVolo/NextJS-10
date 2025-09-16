'use client';

import { useEffect, useState } from 'react';
import usePortfolioStore, { Student } from '@/app/store/portfolio';
import Link from 'next/link';

export default function InitPage() {
  const { students, initializeWithSampleData } = usePortfolioStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Initialize with the full class roster
    initializeWithSampleData();
    setIsHydrated(true);
  }, [initializeWithSampleData]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">TCAS69 Portfolio System</h1>
      
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
        <p className="font-semibold">✅ ระบบเริ่มต้นสำเร็จ</p>
        <p>ระบบฐานข้อมูลพอร์ตโฟลิโอได้ถูกเริ่มต้นแล้ว มีนักเรียน {isHydrated ? students.length : '...'} คน</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <Link 
          href="/teacher"
          className="block bg-blue-500 text-white px-6 py-4 rounded-lg text-center hover:bg-blue-600 transition-colors"
        >
          <div className="text-xl font-semibold">🏫 หน้าครู</div>
          <div className="text-sm opacity-90 mt-1">Teacher Dashboard</div>
        </Link>
        
        <Link 
          href="/"
          className="block bg-green-500 text-white px-6 py-4 rounded-lg text-center hover:bg-green-600 transition-colors"
        >
          <div className="text-xl font-semibold">🏠 หน้าหลัก</div>
          <div className="text-sm opacity-90 mt-1">Home Page</div>
        </Link>
      </div>

      {isHydrated && students.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            📋 รายชื่อนักเรียนในระบบ ({students.length} คน)
          </h2>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      รหัสนักเรียน
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ชื่อ-นามสกุล
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      GPA
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      โรงเรียน
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      พอร์ตโฟลิโอ
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student: Student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.studentId}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {student.firstName} {student.lastName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.gpa >= 3.5 ? 'bg-green-100 text-green-800' :
                          student.gpa >= 2.5 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {student.gpa.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {student.school}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        <Link 
                          href={`/portfolio/${student.id}`}
                          className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                        >
                          ดูพอร์ตโฟลิโอ →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}