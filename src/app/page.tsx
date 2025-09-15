import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Computer Science
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Welcome to our comprehensive computer science platform featuring cutting-edge research, 
            talented band members, and innovative projects.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl mb-2">🎵</div>
            <h3 className="text-2xl font-bold text-gray-900">12</h3>
            <p className="text-gray-600">Band Members</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl mb-2">📚</div>
            <h3 className="text-2xl font-bold text-gray-900">50+</h3>
            <p className="text-gray-600">Research Projects</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl mb-2">🎓</div>
            <h3 className="text-2xl font-bold text-gray-900">500+</h3>
            <p className="text-gray-600">Students</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <h3 className="text-2xl font-bold text-gray-900">25</h3>
            <p className="text-gray-600">Awards</p>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link href="/about" className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 group">
            <div className="text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">ℹ️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">About Us</h3>
              <p className="text-gray-600">Learn about our mission and values</p>
            </div>
          </Link>

          <Link href="/member" className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 group">
            <div className="text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">👥</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Members</h3>
              <p className="text-gray-600">Meet our talented band members</p>
            </div>
          </Link>

          <Link href="/contact" className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 group">
            <div className="text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📧</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Contact</h3>
              <p className="text-gray-600">Get in touch with us</p>
            </div>
          </Link>

          <Link href="/admin" className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 group">
            <div className="text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">⚙️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Admin</h3>
              <p className="text-gray-600">Administrative dashboard</p>
            </div>
          </Link>
        </div>

        {/* Featured Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Latest News</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900">New Album Release</h3>
                <p className="text-gray-600 text-sm">Our latest album featuring all 12 members is now available</p>
                <span className="text-xs text-gray-500">2 days ago</span>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-900">Research Breakthrough</h3>
                <p className="text-gray-600 text-sm">New AI algorithm developed by our CS team</p>
                <span className="text-xs text-gray-500">1 week ago</span>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-gray-900">Award Recognition</h3>
                <p className="text-gray-600 text-sm">Excellence award for innovation in technology</p>
                <span className="text-xs text-gray-500">2 weeks ago</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Links</h2>
            <div className="space-y-3">
              <a href="#" className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <span className="text-lg mr-3">🎵</span>
                  <div>
                    <p className="font-medium text-gray-900">Music Portfolio</p>
                    <p className="text-sm text-gray-500">Listen to our latest tracks</p>
                  </div>
                </div>
              </a>
              <a href="#" className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <span className="text-lg mr-3">📖</span>
                  <div>
                    <p className="font-medium text-gray-900">Documentation</p>
                    <p className="text-sm text-gray-500">Technical resources and guides</p>
                  </div>
                </div>
              </a>
              <a href="#" className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <span className="text-lg mr-3">🎯</span>
                  <div>
                    <p className="font-medium text-gray-900">Events</p>
                    <p className="text-sm text-gray-500">Upcoming performances and workshops</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
