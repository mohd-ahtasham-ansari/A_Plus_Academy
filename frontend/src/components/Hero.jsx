import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-primary to-blue-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" id="patternId" width="100" height="100">
          <defs>
            <pattern id="a" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="scale(3) rotate(0)">
              <rect x="0" y="0" width="100%" height="100%" fill="none"/>
              <path d="M0 10h20z" strokeWidth="1" stroke="currentColor" fill="none"/>
              <path d="M10 0v20z" strokeWidth="1" stroke="currentColor" fill="none"/>
            </pattern>
          </defs>
          <rect width="800%" height="800%" transform="translate(0,0)" fill="url(#a)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="pt-20 pb-24 md:pt-32 md:pb-40 flex flex-col md:flex-row items-center">
          
          <div className="w-full md:w-3/5 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-accent text-primary font-bold px-4 py-1.5 rounded-full text-sm mb-6 shadow-lg shadow-accent/30 animate-pulse"
            >
              LIMITED SEATS! Admissions Open
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
            >
              Transform Your Child's <span className="text-accent">Academic Future</span>
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl font-medium text-gray-200 mb-4"
            >
              Expert Coaching in Maths & Science <br className="hidden md:block" />
              <span className="text-blue-300 text-lg">Classes 6th to 12th</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-300 mb-10 max-w-2xl text-base md:text-lg"
            >
              Weekly Tests • Doubt Sessions • Parent Feedback • Result-Oriented Learning
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Link
                to="/enroll"
                className="w-full sm:w-auto bg-secondary text-white hover:bg-red-700 px-8 py-3.5 rounded-md font-bold shadow-lg transform transition-transform hover:-translate-y-1 text-center"
              >
                Enroll Now
              </Link>
              <a
                href="tel:+918860255259"
                className="w-full sm:w-auto flex items-center justify-center bg-white text-primary hover:bg-gray-100 px-8 py-3.5 rounded-md font-bold shadow-lg transform transition-transform hover:-translate-y-1"
              >
                <FaPhoneAlt className="mr-2" /> Call Now
              </a>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full md:w-2/5 mt-12 md:mt-0 flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-accent rounded-full opacity-20 blur-2xl animate-pulse"></div>
              {/* Replace with actual banner image or a high quality placeholder */}
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Students studying"
                className="relative rounded-2xl shadow-2xl border-4 border-white/10 z-10 object-cover h-80 w-80 md:h-[400px] md:w-[400px]"
              />
              {/* Floating badges */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Success Rate</p>
                  <p className="text-lg font-bold text-primary">95%+</p>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
};

export default Hero;
