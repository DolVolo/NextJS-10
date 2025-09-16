// EXO Members page with admin styling
'use client';

import Link from "next/link";
import { useMembers } from "../../store/member";

export default function MemberPage() {
    const members = useMembers();
    
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">EXO Members</h1>
                    <p className="text-gray-600">Meet our talented 12-member K-pop group</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <span className="text-blue-600 text-xl">👥</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Members</p>
                                <p className="text-2xl font-bold text-gray-900">{members.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <span className="text-green-600 text-xl">🎵</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Active Since</p>
                                <p className="text-2xl font-bold text-gray-900">2012</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <span className="text-purple-600 text-xl">🏆</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Awards Won</p>
                                <p className="text-2xl font-bold text-gray-900">200+</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Members Grid */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-900">All Members</h2>
                        <p className="text-gray-600 mt-1">Click on any member to view their profile</p>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {members.map((m) => (
                                <Link 
                                    key={m.id}
                                    href={`/member/${m.id}`} 
                                    className="block p-4 rounded-lg border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all group"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <span className="text-white font-bold text-lg">{m.id}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                {m.name}
                                            </h3>
                                            {m.role && (
                                                <p className="text-sm text-gray-500 mt-1">{m.role}</p>
                                            )}
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-gray-100 border px-2 py-1 rounded-full text-gray-700">
                                                    <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c1.657 0 3-1.567 3-3.5S13.657 1 12 1s-3 1.567-3 3.5S10.343 8 12 8Zm0 0v13m5-6c0 3.314-2.239 6-5 6s-5-2.686-5-6" /></svg>
                                                    Age {m.age}
                                                </span>
                                                <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-gray-100 border px-2 py-1 rounded-full text-gray-700">
                                                    <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 21V3m0 0L8 7m4-4 4 4" /></svg>
                                                    {m.height} cm
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
