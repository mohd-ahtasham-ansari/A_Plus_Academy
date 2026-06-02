import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { enrollStudent } from '../services/enrollmentService';

const Enrollment = () => {
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    studentName: '',
    guardianName: '',
    phone: '',
    email: '',
    school: '',
    class: '',
    subjects: [],
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const subjectOptions = [
    "Maths", "Science", "English Literature", 
    "English Grammar", "English Speaking", "Social Science",
    "Economics", "Geography", "Political Science", "Accounts", "History"
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const preselectedSubject = params.get('subject');
    
    if (preselectedSubject && subjectOptions.includes(preselectedSubject)) {
      setFormData(prev => ({
        ...prev,
        subjects: prev.subjects.includes(preselectedSubject) ? prev.subjects : [...prev.subjects, preselectedSubject]
      }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        subjects: checked 
          ? [...prev.subjects, value]
          : prev.subjects.filter(sub => sub !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await enrollStudent(formData);
      setStatus({ type: 'success', message: 'Enrollment successful! We will contact you shortly.' });
      setFormData({
        studentName: '', guardianName: '', phone: '', email: '', 
        school: '', class: '', subjects: [], message: ''
      });
    } catch (error) {
      console.error('Enrollment error:', error);
      setStatus({ type: 'error', message: 'Something went wrong. Please try again or contact us directly.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Enroll Now | A Plus Academy</title>
        <meta name="description" content="Register your child for expert Maths and Science coaching at A Plus Academy." />
      </Helmet>

      <div className="bg-primary pt-20 pb-16 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Student Registration</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto px-4">
          Take the first step towards academic excellence. Fill the form below to enroll.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-secondary">
          
          {status.message && (
            <div className={`mb-6 p-4 rounded-md ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <h3 className="text-xl font-bold text-primary border-b pb-2">Student Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student Name *</label>
                <input
                  type="text" name="studentName" required
                  value={formData.studentName} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Name</label>
                <input
                  type="text" name="guardianName"
                  value={formData.guardianName} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel" name="phone" required pattern="[0-9]{10}" title="10 digit phone number"
                  value={formData.phone} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email" name="email"
                  value={formData.email} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                <input
                  type="text" name="school"
                  value={formData.school} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <h3 className="text-xl font-bold text-primary border-b pb-2 pt-4">Academic Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class *</label>
              <select
                name="class" required
                value={formData.class} onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              >
                <option value="">Select Class</option>
                {[6,7,8,9,10,11,12].map(num => (
                  <option key={num} value={num.toString()}>Class {num}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Subjects Interested</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {subjectOptions.map((subject) => (
                  <div key={subject} className="flex items-center">
                    <input
                      type="checkbox"
                      id={subject}
                      name="subjects"
                      value={subject}
                      checked={formData.subjects.includes(subject)}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor={subject} className="ml-2 text-sm text-gray-700">
                      {subject}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Message (Optional)</label>
              <textarea
                name="message" rows="3"
                value={formData.message} onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 text-white font-bold rounded-md shadow-md transition ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-opacity-90'
                }`}
              >
                {loading ? 'Submitting...' : 'Submit Registration'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Enrollment;
