import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./component/ui/Navbar";
import Footer from "./component/ui/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio TCAS69 - ระบบจัดการ Portfolio นักศึกษา",
  description: "ระบบจัดการ Portfolio ที่ทันสมัยสำหรับนักศึกษาที่สมัครเข้าศึกษาต่อในระดับอุดมศึกษา พัฒนาด้วย Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="relative overflow-hidden z-50">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-purple-300/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-0 left-1/2 w-32 h-32 bg-blue-300/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
          </div>

          {/* Geometric Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rotate-45 animate-pulse"></div>
            <div className="absolute top-20 right-20 w-16 h-16 border border-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-20 left-20 w-12 h-12 bg-white/10 rotate-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Header Content */}
          <div className="relative z-10 shadow-2xl backdrop-blur-sm">
            <div className="container mx-auto px-6 py-6">
              <div className="flex justify-between items-center">
                {/* Logo and Title */}
                <div className="flex items-center gap-4 animate-slide-in">
                  <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover-glow">
                    <div className="text-3xl animate-float">🎓</div>
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight animate-slide-in" style={{ animationDelay: '0.1s' }}>
                      <span className="text-white drop-shadow-lg">Portfolio</span>{' '}
                      <span className="text-yellow-300 drop-shadow-lg">TCAS69</span>
                    </h1>
                    <p className="text-blue-100 text-xs md:text-sm lg:text-base font-medium animate-slide-in drop-shadow" style={{ animationDelay: '0.2s' }}>
                      ระบบจัดการ Portfolio นักศึกษา
                    </p>
                  </div>
                </div>

                {/* Navigation - Right aligned */}
                <div className="animate-slide-in ml-auto" style={{ animationDelay: '0.3s' }}>
                  <Navbar />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom gradient border */}
          <div className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>
        </header>

        <main className="min-h-screen relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-pink-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          <div className="relative z-10">
            {children}
          </div>
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
