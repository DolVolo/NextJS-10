"use client";

import { useState } from "react";
import Link from "next/link";
import { useMembers, useMemberActions, useIsFormOpen } from "../../store/member";
import MemberForm from "../../components/MemberForm";

export default function AdminPage() {
  const members = useMembers();
  const { openForm, deleteMember, setEditingMember } = useMemberActions();
  const isFormOpen = useIsFormOpen();
  
  const [stats] = useState({
    activeUsers: 2847,
    totalViews: 15632,
    revenue: 89500
  });

  const [recentActivity] = useState([
    { id: 1, action: "New member profile viewed", user: "User123", time: "2 min ago" },
    { id: 2, action: "Contact form submitted", user: "Jane Doe", time: "5 min ago" },
    { id: 3, action: "About page updated", user: "Admin", time: "1 hour ago" },
    { id: 4, action: "Member data exported", user: "Manager", time: "2 hours ago" },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening with your site.</p>
            </div>
            <button
              onClick={openForm}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Member
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                <span className="text-green-600 text-xl">👤</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Members</p>
                <p className="text-2xl font-bold text-gray-900">{members.filter(m => m.isActive).length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-purple-600 text-xl">�</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Age</p>
                <p className="text-2xl font-bold text-gray-900">
                  {members.length > 0 ? Math.round(members.reduce((acc, m) => acc + m.age, 0) / members.length) : 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <span className="text-yellow-600 text-xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${stats.revenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">by {activity.user} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6 space-y-3">
              <button 
                onClick={openForm}
                className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <span className="text-lg mr-3">➕</span>
                  <div>
                    <p className="font-medium text-gray-900">Add New Member</p>
                    <p className="text-sm text-gray-500">Create a new band member profile</p>
                  </div>
                </div>
              </button>

              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <span className="text-lg mr-3">📊</span>
                  <div>
                    <p className="font-medium text-gray-900">View Analytics</p>
                    <p className="text-sm text-gray-500">Check site performance</p>
                  </div>
                </div>
              </button>

              <Link 
                href="/member/addmember"
                className="block w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <span className="text-lg mr-3">👥</span>
                  <div>
                    <p className="font-medium text-gray-900">Full Member Manager</p>
                    <p className="text-sm text-gray-500">Advanced member management</p>
                  </div>
                </div>
              </Link>

              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <span className="text-lg mr-3">⚙️</span>
                  <div>
                    <p className="font-medium text-gray-900">Site Settings</p>
                    <p className="text-sm text-gray-500">Configure website options</p>
                  </div>
                </div>
              </button>

              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <span className="text-lg mr-3">📧</span>
                  <div>
                    <p className="font-medium text-gray-900">Messages</p>
                    <p className="text-sm text-gray-500">View contact form submissions</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Member Management */}
        <div className="mt-6 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Member Management</h2>
              <button
                onClick={openForm}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                Add Member
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Member</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Role</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Age/Height</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Skills</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                    <th className="text-right py-3 text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white font-bold text-xs">{member.id}</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                            <div className="text-xs text-gray-500">Member #{member.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="text-sm text-gray-900">{member.role || 'No role assigned'}</span>
                      </td>
                      <td className="py-4">
                        <div className="text-sm text-gray-900">
                          <div>{member.age} years</div>
                          <div className="text-xs text-gray-500">{member.height}cm</div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex flex-wrap gap-1">
                          {member.skills.slice(0, 2).map((skill, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {skill}
                            </span>
                          ))}
                          {member.skills.length > 2 && (
                            <span className="text-xs text-gray-500">+{member.skills.length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            member.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {member.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditingMember(member)}
                            className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded hover:bg-blue-50"
                            title="Edit member"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete ${member.name}?`)) {
                                deleteMember(member.id);
                              }
                            }}
                            className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded hover:bg-red-50"
                            title="Delete member"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {members.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-gray-500">
                    <p className="text-lg font-medium">No members found</p>
                    <p className="text-sm">Add your first band member to get started</p>
                  </div>
                  <button
                    onClick={openForm}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Add First Member
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Member Form Modal */}
        {isFormOpen && <MemberForm />}
      </div>
    </div>
  );
}