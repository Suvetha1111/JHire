import { FaCheckCircle } from "react-icons/fa";

const Info = () => {
  return (
    <div className="bg-green-100 text-gray-800 min-h-screen p-10">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-900">Welcome to JHIRE</h1>
        <p className="text-gray-600 mt-4">Your ultimate job portal for endless opportunities!</p>
      </header>

      {/* Photos Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-green-900 text-center mb-8">Explore JHIRE</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <a href="/alljobs"><img
            src="jobsearch.jpg"
            alt="Job Portal"
            className="w-80 h-52 object-cover rounded-lg shadow-lg"
          /></a>
          <a href="/companies">
          <img
            src="office.jpg"
            alt="Company Listing"
            className="w-80 h-52 object-cover rounded-lg shadow-lg"
          /></a>
          <a href="/candidates">
          <img
            src="seekers.jpg"
            alt="Job Seeker"
            className="w-80 h-52 object-cover rounded-lg shadow-lg"
          /></a>
        </div>
      </section>

      {/* Services Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-green-900 text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-green-900">Find Jobs</h3>
            <p className="text-gray-600 mt-4">Explore thousands of job listings across various industries.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-green-900">Browse Companies</h3>
            <p className="text-gray-600 mt-4">Find and connect with top companies that are hiring.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-green-900">For Recruiters</h3>
            <p className="text-gray-600 mt-4">Post job openings, manage applicants, and hire the best talent.</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-green-900 text-white p-12 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-8">Why Choose JHIRE?</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <FaCheckCircle className="text-green-400 text-2xl mr-4" />
            <p className="text-lg">Access a wide range of job opportunities and employers.</p>
          </div>
          <div className="flex items-center">
            <FaCheckCircle className="text-green-400 text-2xl mr-4" />
            <p className="text-lg">Easy to use platform for both job seekers and recruiters.</p>
          </div>
          <div className="flex items-center">
            <FaCheckCircle className="text-green-400 text-2xl mr-4" />
            <p className="text-lg">Get personalized job recommendations based on your profile.</p>
          </div>
          <div className="flex items-center">
            <FaCheckCircle className="text-green-400 text-2xl mr-4" />
            <p className="text-lg">Stay updated with notifications and alerts on the latest job openings.</p>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Info;
