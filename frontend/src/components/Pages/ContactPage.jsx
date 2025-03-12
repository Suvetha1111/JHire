import { useState } from "react";
import { FaPlay, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

const ContactPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const toggleFAQ = (index) => setOpenFAQ(openFAQ === index ? null : index);

  return (
    <div className="bg-green-50 min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-16 bg-green-100">
        <h1 className="text-5xl font-bold text-gray-800">We've been helping customers globally.</h1>
      </div>
      
      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto my-10">
        {[
          { question: "Who we are?", answer: "Our founders met while leading teams at Facebook..." },
          { question: "What's our goal", answer: "We aim to connect top talent with global opportunities..." },
          { question: "Our vision", answer: "Empowering businesses with the best professionals..." }
        ].map((item, index) => (
          <div key={index} className="border-b py-3 cursor-pointer" onClick={() => toggleFAQ(index)}>
            <h2 className="text-lg font-semibold text-green-700">{item.question}</h2>
            {openFAQ === index && <p className="text-gray-600 mt-2">{item.answer}</p>}
          </div>
        ))}
      </div>
      
      <div className="max-w-4xl mx-auto relative">
        <img src="office.jpg" alt="Office" className="w-full rounded-lg" />
      </div>

      <div className="text-center my-10 flex justify-center gap-10">
        {[['7million', 'Completed Jobs'], ['30k+', 'Worldwide Clients'], ['13billion', 'Dollar Payout']].map(([num, label]) => (
          <div key={num}>
            <h3 className="text-3xl font-bold text-green-700">{num}</h3>
            <p className="text-gray-600">{label}</p>
          </div>
        ))}
      </div>
      
      {/* Contact Form */}
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-green-800 mb-6 text-center">Get in touch</h2>
        <form className="grid gap-4">
          <input type="text" placeholder="Your Name" className="border p-3 rounded" />
          <input type="email" placeholder="Your Email" className="border p-3 rounded" />
          <input type="text" placeholder="Subject" className="border p-3 rounded" />
          <textarea placeholder="Your Message" className="border p-3 rounded h-32"></textarea>
          <button className="bg-green-600 text-white py-3 rounded">Send Message</button>
        </form>
      </div>
      
      {/* Contact Details */}
      <div className="flex justify-center gap-10 my-10 text-green-700">
        {[['Our Address', 'Chennai, India', <FaMapMarkerAlt />],
          ['Email', 'support@jhire.com', <FaEnvelope />],
          ['Call Us', '678-878-9898', <FaPhone />]
        ].map(([title, value, icon]) => (
          <div key={title} className="text-center">
            <div className="text-3xl">{icon}</div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactPage;
