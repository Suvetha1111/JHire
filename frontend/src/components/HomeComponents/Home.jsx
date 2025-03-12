import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [float, setFloat] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFloat((prev) => (prev === 10 ? 0 : prev + 1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-green-50 min-h-screen font-sans">
      {/* Background Image */}
      <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block">
        <img
          src="home_1.png"
          alt="Background"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Hero Section */}
      <div className="relative py-20 text-left px-6 max-w-2xl ml-10 lg:ml-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 leading-tight">
          Your Dream Job is Just a Click Away
        </h1>
        <p className="text-green-700 mt-3 max-w-lg text-lg">
          Explore thousands of job opportunities and take the next step in your career.
        </p>
        <Link to="/alljobs" className="mt-6 bg-green-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-700 block w-full md:w-auto text-center font-semibold text-lg transition-all">
          Explore All Jobs
        </Link>
      </div>

      {/* How it Works Section */}
      <div className="relative text-left py-16 px-6 md:px-16">
        <h2 className="text-3xl font-semibold text-center text-green-800">How it Works?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {["Create Account", "Complete Profile", "Apply or Hire"].map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:scale-105 max-w-xs mx-auto"
            >
              <h3 className="text-lg font-semibold text-green-800">{step}</h3>
              <p className="text-green-600 mt-2 text-sm md:text-base">
                {step === "Create Account" && "Sign up and get access to thousands of job listings tailored to your skills and preferences."}
                {step === "Complete Profile" && "Fill in your details to match with the best job opportunities for your career growth."}
                {step === "Apply or Hire" && "Easily apply to jobs or hire top talent through our seamless platform."}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-10 bg-green-100 text-center px-6">
        <h2 className="text-3xl font-semibold text-green-900">Why Choose Us?</h2>
        <p className="text-green-700 mt-2 max-w-3xl mx-auto text-lg">
          We connect job seekers with top employers, providing a hassle-free and effective job search experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {["7M+ Jobs", "30K+ Clients", "13B+ Earnings"].map((stat, index) => (
            <div key={index} className="text-center bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-green-700">{stat.split(" ")[0]}</h3>
              <p className="text-green-600 text-sm md:text-base">{stat.split(" ")[1]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Job Categories */}
      <div className="relative py-16 text-center px-6">
        <h2 className="text-3xl font-semibold text-green-900">Top Job Categories</h2>
        <p className="text-green-700 mt-2 max-w-2xl mx-auto text-lg">
          Discover a variety of job categories that suit your skills and interests.
        </p>
        <div className="flex flex-wrap justify-center mt-6 gap-4">
          {["Marketing", "Software Dev", "Business", "Design"].map((job, index) => (
            <div
              key={index}
              className="bg-green-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-700 cursor-pointer text-lg transition"
            >
              {job}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
