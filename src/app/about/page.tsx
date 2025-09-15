export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">About Computer Science</h1>
          <p className="text-gray-600">Discover our mission, values, and what makes us unique</p>
        </div>
        
        {/* Mission & Offering Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-blue-600 text-xl">🎯</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 ml-4">Our Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We are dedicated to advancing the field of computer science through education, 
              research, and innovation. Our goal is to prepare the next generation of 
              technology leaders and solve complex problems that impact society.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-green-600 text-xl">🎁</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 ml-4">What We Offer</h2>
            </div>
            <ul className="text-gray-700 space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Comprehensive CS Education
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Cutting-edge Research
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Industry Partnerships
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Innovation Hub
              </li>
            </ul>
          </div>
        </div>

        {/* Focus Areas */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-2">Our Focus Areas</h2>
            <p className="text-gray-600">Specialized departments driving innovation</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Artificial Intelligence</h3>
              <p className="text-gray-600">Machine learning, deep learning, and AI applications</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Software Engineering</h3>
              <p className="text-gray-600">Modern development practices and methodologies</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cybersecurity</h3>
              <p className="text-gray-600">Protecting digital assets and privacy</p>
            </div>
          </div>
        </div>

        {/* Statistics & Community */}
        <div className="bg-white rounded-lg shadow p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-2">Join Our Community</h2>
            <p className="text-gray-600">Be part of the future of technology and innovation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Students</div>
              <div className="text-sm text-gray-500 mt-1">Active learners</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600 font-medium">Faculty</div>
              <div className="text-sm text-gray-500 mt-1">Expert educators</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
              <div className="text-gray-600 font-medium">Research Projects</div>
              <div className="text-sm text-gray-500 mt-1">Ongoing innovations</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}