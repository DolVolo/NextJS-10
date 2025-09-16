import Link from "next/link";

// Force dynamic rendering to avoid prerender issues
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl animate-float">
              <div className="text-6xl">📚</div>
            </div>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 animate-slide-up">
            ระบบจัดการ{' '}
            <span className="gradient-text">Portfolio</span>
          </h1>
          
          <h2 className="text-2xl lg:text-3xl text-blue-600 font-semibold mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            สำหรับสมัคร TCAS69 🎯
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            ระบบจัดการข้อมูล Portfolio ของนักศึกษาที่สมัครเข้าศึกษาต่อในระดับอุดมศึกษา 
            พร้อมฟีเจอร์ครบครันสำหรับอาจารย์และนักเรียน ✨
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="group bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 text-center hover-lift hover-glow transition-all duration-500 border border-white/20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg className="w-10 h-10 text-blue-600 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">จัดการ Portfolio 📋</h3>
            <p className="text-gray-600 leading-relaxed">
              สร้างและแก้ไขข้อมูล Portfolio ของนักศึกษา รวมถึงข้อมูลส่วนตัว การศึกษา และกิจกรรม
            </p>
          </div>

          <div className="group bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 text-center hover-lift hover-glow transition-all duration-500 border border-white/20 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg className="w-10 h-10 text-green-600 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">รายงานและสถิติ 📊</h3>
            <p className="text-gray-600 leading-relaxed">
              ดูสถิติ GPA เฉลี่ย มหาวิทยาลัยยอดนิยม และข้อมูลสรุปต่างๆ ของนักศึกษา
            </p>
          </div>

          <div className="group bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 text-center hover-lift hover-glow transition-all duration-500 border border-white/20 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg className="w-10 h-10 text-purple-600 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">ค้นหาและเรียงลำดับ 🔍</h3>
            <p className="text-gray-600 leading-relaxed">
              ค้นหาข้อมูลนักศึกษา และเรียงลำดับตาม GPA รหัสนักศึกษา หรือสาขาที่สมัคร
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-12 text-center border border-white/30 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="flex justify-center mb-6">
            <div className="text-4xl animate-float">🚀</div>
          </div>
          
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            เริ่มต้นใช้งานระบบ
          </h3>
          
          <p className="text-lg lg:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            เข้าสู่หน้าอาจารย์เพื่อจัดการข้อมูล Portfolio ของนักศึกษา 
            หรือเพิ่มข้อมูลนักศึกษาใหม่เข้าสู่ระบบ
          </p>
          
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
            <Link
              href="/submit"
              className="group px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 text-lg font-semibold flex items-center space-x-3 shadow-xl hover-lift hover-glow animate-slide-in"
              style={{ animationDelay: '0.7s' }}
            >
              <svg className="w-6 h-6 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>ส่ง Portfolio ของฉัน</span>
              <span className="text-xl">📤</span>
            </Link>
            
            <Link
              href="/teacher"
              className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-lg font-semibold flex items-center space-x-3 shadow-xl hover-lift hover-glow animate-slide-in"
              style={{ animationDelay: '0.8s' }}
            >
              <svg className="w-6 h-6 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>หน้าอาจารย์</span>
              <span className="text-xl">👨‍🏫</span>
            </Link>
            
            <Link
              href="/portfolio-list"
              className="group px-8 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-2xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 text-lg font-semibold flex items-center space-x-3 shadow-lg hover-lift animate-slide-in"
              style={{ animationDelay: '0.9s' }}
            >
              <svg className="w-6 h-6 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>ดู Portfolio ทั้งหมด</span>
              <span className="text-xl">📋</span>
            </Link>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-20 text-center animate-slide-up" style={{ animationDelay: '1s' }}>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-10 border-2 border-blue-100 shadow-xl backdrop-blur-sm">
            <div className="flex justify-center mb-6">
              <div className="text-3xl animate-float">🎓</div>
            </div>
            
            <h4 className="text-2xl font-bold text-blue-900 mb-6">
              เกี่ยวกับระบบ Portfolio TCAS69
            </h4>
            
            <p className="text-blue-800 leading-relaxed max-w-5xl mx-auto text-lg">
              ระบบนี้ถูกพัฒนาขึ้นเพื่อช่วยในการจัดการข้อมูล Portfolio ของนักศึกษาที่สมัครเข้าศึกษาต่อในระดับอุดมศึกษา 
              ผ่านระบบ TCAS (Thai University Central Admission System) รอบ Portfolio 
              โดยสามารถเก็บข้อมูลส่วนตัว การศึกษา ความสามารถพิเศษ กิจกรรม รางวัล และเหตุผลในการสมัครได้อย่างครบถ้วน
              พร้อมระบบค้นหา เรียงลำดับ และสรุปสถิติต่างๆ สำหรับอาจารย์ในการติดตามและประเมินผล 🌟
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center text-gray-500 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <div className="flex justify-center gap-2 items-center text-lg">
            <span className="animate-pulse">💻</span>
            <p>© 2025 ระบบจัดการ Portfolio TCAS69 - พัฒนาด้วย Next.js และ Zustand</p>
            <span className="animate-pulse">✨</span>
          </div>
        </div>
      </div>
    </div>
  );
}
