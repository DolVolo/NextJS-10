import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            ระบบจัดการ Portfolio
          </h1>
          <h2 className="text-2xl text-blue-600 font-semibold mb-2">
            สำหรับสมัคร TCAS69
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ระบบจัดการข้อมูล Portfolio ของนักศึกษาที่สมัครเข้าศึกษาต่อในระดับอุดมศึกษา 
            พร้อมฟีเจอร์ครบครันสำหรับอาจารย์และนักเรียน
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">จัดการ Portfolio</h3>
            <p className="text-gray-600">
              สร้างและแก้ไขข้อมูล Portfolio ของนักศึกษา รวมถึงข้อมูลส่วนตัว การศึกษา และกิจกรรม
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">รายงานและสถิติ</h3>
            <p className="text-gray-600">
              ดูสถิติ GPA เฉลี่ย มหาวิทยาลัยยอดนิยม และข้อมูลสรุปต่างๆ ของนักศึกษา
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">ค้นหาและเรียงลำดับ</h3>
            <p className="text-gray-600">
              ค้นหาข้อมูลนักศึกษา และเรียงลำดับตาม GPA รหัสนักศึกษา หรือสาขาที่สมัคร
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            เริ่มต้นใช้งานระบบ
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            เข้าสู่หน้าอาจารย์เพื่อจัดการข้อมูล Portfolio ของนักศึกษา 
            หรือเพิ่มข้อมูลนักศึกษาใหม่เข้าสู่ระบบ
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/submit"
              className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold flex items-center space-x-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>ส่ง Portfolio ของฉัน</span>
            </Link>
            
            <Link
              href="/teacher"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold flex items-center space-x-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>หน้าอาจารย์</span>
            </Link>
            
            <Link
              href="/portfolio-list"
              className="px-8 py-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-lg font-semibold flex items-center space-x-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>ดู Portfolio ทั้งหมด</span>
            </Link>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-16 text-center">
          <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
            <h4 className="text-xl font-semibold text-blue-900 mb-3">
              🎓 เกี่ยวกับระบบ Portfolio TCAS69
            </h4>
            <p className="text-blue-800 leading-relaxed max-w-4xl mx-auto">
              ระบบนี้ถูกพัฒนาขึ้นเพื่อช่วยในการจัดการข้อมูล Portfolio ของนักศึกษาที่สมัครเข้าศึกษาต่อในระดับอุดมศึกษา 
              ผ่านระบบ TCAS (Thai University Central Admission System) รอบ Portfolio 
              โดยสามารถเก็บข้อมูลส่วนตัว การศึกษา ความสามารถพิเศษ กิจกรรม รางวัล และเหตุผลในการสมัครได้อย่างครบถ้วน
              พร้อมระบบค้นหา เรียงลำดับ และสรุปสถิติต่างๆ สำหรับอาจารย์ในการติดตามและประเมินผล
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500">
          <p>© 2025 ระบบจัดการ Portfolio TCAS69 - พัฒนาด้วย Next.js และ Zustand</p>
        </div>
      </div>
    </div>
  );
}
