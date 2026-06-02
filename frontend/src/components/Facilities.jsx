import { motion } from 'framer-motion';
import { FaSnowflake, FaClipboardCheck, FaComments, FaCalendarCheck, FaTrophy, FaLightbulb, FaUserFriends } from 'react-icons/fa';

const facilities = [
  { icon: <FaSnowflake />, title: "Fully Air Conditioned", desc: "Comfortable learning environment" },
  { icon: <FaClipboardCheck />, title: "Exclusive Weekly Tests", desc: "Regular assessment & tracking" },
  { icon: <FaComments />, title: "Regular Feedback To Parents", desc: "Keeping you informed always" },
  { icon: <FaCalendarCheck />, title: "Timely Completion", desc: "Of entire syllabus well in time" },
  { icon: <FaTrophy />, title: "100% Result Oriented", desc: "Coaching designed for success" },
  { icon: <FaLightbulb />, title: "Stress On Fundamentals", desc: "Building strong core concepts" },
  { icon: <FaUserFriends />, title: "One To One Doubt Clearing", desc: "Personalized attention sessions" }
];

const Facilities = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Why Choose A Plus Academy?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Experience premium education with our top-tier facilities designed to maximize student potential.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facilities.map((fac, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-accent group"
            >
              <div className="w-14 h-14 bg-blue-100 text-primary rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                {fac.icon}
              </div>
              <h3 className="text-xl font-bold text-textMain mb-2 group-hover:text-secondary transition-colors">{fac.title}</h3>
              <p className="text-gray-600 text-sm">{fac.desc}</p>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-gradient-to-br from-secondary to-red-800 p-6 rounded-2xl text-white shadow-lg flex flex-col justify-center items-center text-center"
          >
            <h3 className="text-2xl font-bold mb-2">Ready to Excel?</h3>
            <p className="text-red-100 mb-4 text-sm">Join the best coaching institute in Delhi.</p>
            <a href="/enroll" className="bg-white text-secondary font-bold py-2 px-6 rounded-md hover:bg-gray-100 transition shadow">
              Enroll Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Facilities;
