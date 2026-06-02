import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & About */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <span className="text-accent text-3xl mr-1">A+</span> Academy
            </h3>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              Specialisation in Maths & Science. Providing expert coaching for Classes 6th to 12th with a focus on fundamental concepts and 100% result-oriented learning.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/faisal.rehman.1865904" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition"><FaFacebook size={20} /></a>
              <a href="https://www.instagram.com/a_plus_academy_fsl?igsh=MW5yYWFqbDR1eHRjYQ==" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition"><FaInstagram size={20} /></a>
              <a href="https://youtube.com/@fastlearningbyfsl?si=6DvZ_1QaOMAi5Qwx" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition"><FaYoutube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:text-accent transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-accent transition">About Us</Link></li>
              <li><Link to="/courses" className="hover:text-accent transition">Courses</Link></li>
              <li><Link to="/materials" className="hover:text-accent transition">Study Materials</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2 inline-block">Our Courses</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Mathematics (6th - 12th)</li>
              <li>Science (6th - 10th)</li>
              <li>English Literature & Grammar</li>
              <li>Social Science</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2 inline-block">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mr-3 mt-1 text-accent flex-shrink-0" />
                <a href="https://maps.app.goo.gl/qBHQ2yesyjvqj6rk7" target="_blank" rel="noreferrer" className="hover:text-white">
                  223 Ground Floor, New Lahore, Shastri Nagar, Delhi 110031
                </a>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="mr-3 text-accent flex-shrink-0" />
                <a href="tel:+918860255259" className="hover:text-white">+91 8860255259</a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-accent flex-shrink-0" />
                <a href="mailto:enrollaplusacademy05@gmail.com" className="hover:text-white">enrollaplusacademy05@gmail.com</a>
              </li>
              <li className="flex items-center">
                <FaWhatsapp className="mr-3 text-accent flex-shrink-0 text-lg" />
                <a href="https://wa.me/918860255259" target="_blank" rel="noreferrer" className="hover:text-white">WhatsApp Us</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} A Plus Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
