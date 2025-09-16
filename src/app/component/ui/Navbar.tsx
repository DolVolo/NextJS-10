'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { href: "/", label: "Home", icon: "🏠" },
        { href: "/about", label: "About", icon: "📝" },
        { href: "/member", label: "Member", icon: "👥" },
        { href: "/contact", label: "Contact", icon: "📞" },
        { href: "/admin", label: "Admin", icon: "⚙️" }
    ];

    const isActive = (href: string) => {
        return pathname === href;
    };

    return (
        <div className="w-full">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
                {navItems.map((item, index) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`
                            group relative px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ease-out
                            animate-slide-in hover-scale
                            ${isActive(item.href) 
                                ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30' 
                                : 'text-white/80 hover:text-white hover:bg-white/10'
                            }
                        `}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <span className="flex items-center gap-2">
                            <span className="text-lg group-hover:animate-float">{item.icon}</span>
                            <span className="tracking-wide">{item.label}</span>
                        </span>
                        
                        {/* Active indicator */}
                        {isActive(item.href) && (
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-glow"></div>
                        )}
                        
                        {/* Hover effect */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 via-white/10 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                ))}
            </nav>

            {/* Mobile Navigation Container - Right aligned */}
            <div className="md:hidden flex justify-end">
                {/* Hamburger Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="relative p-3 text-white hover:bg-white/10 rounded-xl transition-all duration-300 hover-scale z-50 bg-white/5 backdrop-blur-sm border border-white/20"
                    aria-label="Toggle menu"
                >
                    <div className="w-6 h-6 flex flex-col justify-center items-center">
                        <span className={`w-full h-0.5 bg-white rounded transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                        <span className={`w-full h-0.5 bg-white rounded mt-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`w-full h-0.5 bg-white rounded mt-1 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                    </div>
                </button>
            </div>

            {/* Mobile Menu Slide Down */}
            <div className={`
                md:hidden w-full bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 backdrop-blur-lg border-t border-white/20 overflow-hidden transition-all duration-500 ease-out
                ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
            `}>
                <div className="p-4 space-y-2">
                    {navItems.map((item, index) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`
                                flex items-center gap-4 px-4 py-4 rounded-xl font-medium transition-all duration-300 w-full
                                animate-slide-in hover-lift
                                ${isActive(item.href)
                                    ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30'
                                    : 'text-white/80 hover:text-white hover:bg-white/10'
                                }
                            `}
                            style={{ 
                                animationDelay: `${index * 0.1}s`,
                                transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
                                transition: `transform 0.3s ease-out ${index * 0.05}s, background-color 0.3s ease`
                            }}
                        >
                            <span className="text-2xl">{item.icon}</span>
                            <span className="tracking-wide text-lg">{item.label}</span>
                            {isActive(item.href) && (
                                <div className="ml-auto w-3 h-3 bg-white rounded-full animate-pulse"></div>
                            )}
                        </Link>
                    ))}
                </div>
                
                {/* Decorative gradient */}
                <div className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>
            </div>
        </div>
    );
}