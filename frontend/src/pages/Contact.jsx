import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { submitContactQuery } from '../services/contactService';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });
    
    try {
      await submitContactQuery(formData);
      setStatus({ type: 'success', message: 'Your query has been sent successfully. We will get back to you soon!' });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Failed to submit contact query:', error);
      setStatus({ type: 'error', message: 'Failed to send query. Please try calling or WhatsApp directly.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | A Plus Academy</title>
        <meta name="description" content="Contact A Plus Academy in Shastri Nagar, Delhi for Maths and Science coaching." />
      </Helmet>

      <div className="bg-primary pt-20 pb-16 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto px-4">
          We are here to help. Reach out to us for any queries or admissions.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-secondary">
            <h2 className="text-2xl font-bold text-primary mb-6">Send Us a Query</h2>
            
            {status.message && (
              <div className={`mb-6 p-4 rounded-md ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input type="tel" name="phone" required pattern="[0-9]{10}" title="10 digit phone number" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Message *</label>
                <textarea name="message" rows="4" required value={formData.message} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"></textarea>
              </div>
              <button type="submit" disabled={loading} className={`w-full py-3 px-4 text-white font-bold rounded-md shadow-md transition ${loading ? 'bg-gray-400' : 'bg-primary hover:bg-opacity-90'}`}>
                {loading ? 'Sending...' : 'Submit Query'}
              </button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-primary mb-8">Get In Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:border-primary transition-colors">
                <div className="bg-blue-100 p-4 rounded-full text-primary mr-6">
                  <FaMapMarkerAlt className="text-2xl" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-textMain mb-1">Our Address</h4>
                  <p className="text-gray-600">
                    223 Ground Floor<br />
                    New Lahore, Shastri Nagar<br />
                    Delhi 110031
                  </p>
                  <a href="https://maps.app.goo.gl/qBHQ2yesyjvqj6rk7" target="_blank" rel="noreferrer" className="inline-block mt-2 text-sm text-secondary font-semibold hover:underline">
                    Get Directions
                  </a>
                </div>
              </div>

              <div className="flex items-start p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:border-primary transition-colors">
                <div className="bg-blue-100 p-4 rounded-full text-primary mr-6">
                  <FaPhoneAlt className="text-2xl" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-textMain mb-1">Phone Number</h4>
                  <p className="text-gray-600 mb-2">Call us for immediate assistance</p>
                  <a href="tel:+918860255259" className="text-lg font-bold text-primary hover:text-secondary">+91 8860255259</a>
                </div>
              </div>

              <div className="flex items-start p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:border-primary transition-colors">
                <div className="bg-blue-100 p-4 rounded-full text-primary mr-6">
                  <FaEnvelope className="text-2xl" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-textMain mb-1">Email Address</h4>
                  <p className="text-gray-600 mb-2">Drop us a mail for queries</p>
                  <a href="mailto:enrollaplusacademy05@gmail.com" className="text-lg font-bold text-primary hover:text-secondary">enrollaplusacademy05@gmail.com</a>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <a href="tel:+918860255259" className="flex-1 bg-primary text-white text-center py-3 rounded-md font-bold hover:bg-opacity-90 transition shadow-md flex justify-center items-center">
                <FaPhoneAlt className="mr-2" /> Call Now
              </a>
              <a href="https://wa.me/918860255259" target="_blank" rel="noreferrer" className="flex-1 bg-green-500 text-white text-center py-3 rounded-md font-bold hover:bg-green-600 transition shadow-md flex justify-center items-center">
                <FaWhatsapp className="mr-2 text-xl" /> WhatsApp
              </a>
            </div>
          </div>

        </div>

        {/* Map */}
        <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-lg border-4 border-white">
          <iframe 
            src="https://maps.google.com/maps?q=223+Ground+Floor,+New+Lahore,+Shastri+Nagar,+Delhi+110031&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="A Plus Academy Location">
          </iframe>
        </div>

      </div>
    </>
  );
};

export default Contact;
