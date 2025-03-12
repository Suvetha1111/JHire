import { FaInstagram, FaGlobe, FaWhatsapp } from "react-icons/fa";

const About = () => {
  return (
    <footer className="bg-green-900 text-gray-200 p-10">
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white">The Ultimate Job Portal</h2>
          <p className="text-gray-400">Join JHIRE and explore thousands of opportunities.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="/alljobs" className="px-4 py-2 border border-green-500 text-green-400 rounded-lg hover:bg-green-600 hover:text-white">
              Find a Job
            </a>
            <a href="/post-job" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Post a Job
            </a>
          </div>
        </div>

        {/* Footer Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-white">JHIRE</h3>
            </div>
            <p className="text-green-400 mt-2">support@jhire.com</p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white">Services</h3>
            <ul className="mt-2 space-y-2 text-gray-400">
              <li>
                <a href="/alljobs" className="hover:text-green-300">Find Jobs</a>
              </li>
              <li>
                <a href="/companies" className="hover:text-green-300">Browse Companies</a>
              </li>
              <li>
                <a href="/info" className="hover:text-green-300">For Recruiters</a>
              </li>
              <li>
                <a href="/info" className="hover:text-green-300">Premium Plans</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <ul className="mt-2 space-y-2 text-gray-400">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Help Center</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 flex justify-between items-center text-sm text-gray-500">
          <p>© 2025 JHIRE Inc. All rights reserved.</p>
          <div className="flex space-x-4">
            <FaWhatsapp className="text-xl cursor-pointer hover:text-green-500" />
            <FaGlobe className="text-xl cursor-pointer hover:text-blue-500" />
            <FaInstagram className="text-xl cursor-pointer hover:text-pink-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default About;
