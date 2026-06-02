import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSquareRootAlt, FaFlask, FaBookOpen, FaLanguage, FaMicrophoneAlt, FaGlobeAmericas, FaChartLine, FaMap, FaLandmark, FaCalculator, FaHistory } from 'react-icons/fa';
import { getCourses } from '../services/courseService';

const iconMap = {
  FaSquareRootAlt: <FaSquareRootAlt />,
  FaFlask: <FaFlask />,
  FaBookOpen: <FaBookOpen />,
  FaLanguage: <FaLanguage />,
  FaMicrophoneAlt: <FaMicrophoneAlt />,
  FaGlobeAmericas: <FaGlobeAmericas />,
  FaChartLine: <FaChartLine />,
  FaMap: <FaMap />,
  FaLandmark: <FaLandmark />,
  FaCalculator: <FaCalculator />,
  FaHistory: <FaHistory />
};

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Courses | A Plus Academy</title>
        <meta name="description" content="Explore courses for Maths, Science, English, and Social Science for classes 6th to 12th." />
      </Helmet>

      <div className="bg-primary pt-20 pb-16 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Courses</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto px-4">
          Comprehensive curriculum designed for academic excellence and conceptual clarity.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {loading ? (
          <div className="text-center py-20 text-xl font-bold text-gray-500">Loading courses...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.id || index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 10) * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow flex flex-col h-full"
              >
                <div className={`${course.color} h-2 w-full`}></div>
                <div className="p-8 flex-grow">
                  <div className={`w-12 h-12 ${course.color} text-white rounded-xl flex items-center justify-center text-2xl mb-6 shadow-md`}>
                    {iconMap[course.icon] || <FaBookOpen />}
                  </div>
                  <h3 className="text-2xl font-bold text-textMain mb-2">{course.title}</h3>
                  <span className="inline-block bg-gray-100 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4">
                    Classes: {course.classes}
                  </span>
                  {course.taughtBy && (
                    <div className="mb-4 text-sm font-semibold text-secondary">
                      Taught by: {course.taughtBy}
                    </div>
                  )}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {course.desc}
                  </p>
                </div>
                <div className="p-6 bg-gray-50 border-t border-gray-100 mt-auto">
                  <Link
                    to={`/enroll?subject=${encodeURIComponent(course.title)}`}
                    className="block w-full text-center bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-2 rounded-md transition-colors"
                  >
                    Join Batch
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Courses;
