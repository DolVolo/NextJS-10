
'use client';

import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    const socialLinks = [
        { 
            name: "GitHub", 
            href: "https://github.com", 
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
            )
        },
        { 
            name: "Facebook", 
            href: "https://facebook.com", 
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
            )
        },
        { 
            name: "Twitter", 
            href: "https://twitter.com", 
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
            )
        },
        { 
            name: "Instagram", 
            href: "https://instagram.com", 
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.23 18.148c-2.016 0-3.658-1.642-3.658-3.66 0-2.017 1.642-3.658 3.658-3.658s3.658 1.64 3.658 3.658c0 2.018-1.642 3.66-3.658 3.66zm7.675 0c-2.016 0-3.658-1.642-3.658-3.66 0-2.017 1.642-3.658 3.658-3.658s3.658 1.64 3.658 3.658c0 2.018-1.642 3.66-3.658 3.66z"/>
                </svg>
            )
        },
    ];

    const quickLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Member", href: "/member" },
        { name: "Contact", href: "/contact" },
        { name: "Admin", href: "/admin" }
    ];

    return (
        <footer className="relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"></div>
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-float"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-pink-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 px-6 py-16">
                <div className="max-w-6xl mx-auto">
                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {/* Brand Section */}
                        <div className="lg:col-span-2 animate-slide-in">
                            <h3 className="text-2xl font-bold gradient-text mb-4">
                                📚 Portfolio TCAS69
                            </h3>
                            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                                ระบบจัดการ Portfolio ที่ทันสมัยสำหรับนักศึกษาที่สมัครเข้าศึกษาต่อในระดับอุดมศึกษา 
                                พัฒนาด้วย Next.js และ Zustand เพื่อประสบการณ์ที่ดีที่สุด
                            </p>
                            
                            {/* Social Links */}
                            <div className="flex gap-3">
                                {socialLinks.map((social, index) => (
                                    <Link
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all duration-300 hover-lift hover-glow backdrop-blur-sm border border-white/10 animate-slide-in"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                        aria-label={social.name}
                                    >
                                        {social.icon}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
                            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <span className="text-blue-400">🔗</span>
                                Quick Links
                            </h4>
                            <div className="space-y-3">
                                {quickLinks.map((link, index) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="block text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 animate-slide-in"
                                        style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="animate-slide-in" style={{ animationDelay: '0.4s' }}>
                            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <span className="text-green-400">📞</span>
                                Contact
                            </h4>
                            <div className="space-y-4 text-gray-300">
                                <div className="flex items-center gap-3">
                                    <span className="text-blue-400">📧</span>
                                    <span>portfolio@tcas69.com</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-green-400">📱</span>
                                    <span>096-751-7739</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-purple-400">📍</span>
                                    <span>โรงเรียนอัสสัมชัญลำปาง</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

                    {/* Bottom Section */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 animate-fade-in">
                        <div className="text-gray-400 text-sm flex items-center gap-2">
                            <span className="animate-pulse">💙</span>
                            <span>© {currentYear} Portfolio TCAS69. สงวนลิขสิทธิ์</span>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-400">
                            <Link href="/privacy" className="hover:text-white transition-colors duration-300">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="hover:text-white transition-colors duration-300">
                                Terms of Service
                            </Link>
                        </div>
                    </div>

                    {/* Tech Stack Badge */}
                    <div className="mt-8 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-xs text-gray-400 backdrop-blur-sm border border-white/10 animate-glow">
                            <span className="animate-pulse">⚡</span>
                            <span>Built with Next.js • TypeScript • Tailwind CSS • Zustand</span>
                            <span className="animate-pulse">⚡</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}