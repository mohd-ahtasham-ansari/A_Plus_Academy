import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import faisalSirImage from '../assets/faisal_sir.jpg';
import { getFaculty } from '../services/facultyService';

const About = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const data = await getFaculty();
        setFaculty(data);
      } catch (error) {
        console.error("Failed to fetch faculty", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);
  return (
    <>
      <Helmet>
        <title>About Us | A Plus Academy</title>
        <meta name="description" content="Learn about A Plus Academy and our Founding Director Faisal Rahman." />
      </Helmet>

      <div className="bg-primary pt-20 pb-16 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About A Plus Academy</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto px-4">
          Empowering students through quality education, stress on fundamentals, and result-oriented learning.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          <div className="w-full md:w-1/3">
            <div className="relative">
              <div className="absolute inset-0 bg-accent rounded-xl transform translate-x-3 translate-y-3"></div>
              {/* Using Faisal Sir's actual photo */}
              <img 
                src={faisalSirImage} 
                alt="Faisal Rahman - Director" 
                className="relative rounded-xl shadow-lg w-full h-auto object-cover border-4 border-white"
              />
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <h2 className="text-3xl font-bold text-primary mb-2">Faisal Rahman</h2>
            <h3 className="text-xl text-secondary font-semibold mb-6">Founding Director & Expert Educator</h3>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-6 border-l-4 border-primary">
              <h4 className="font-bold text-textMain mb-2">Qualifications & Experience:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Electrical Engineering from Jamia Millia Islamia, Delhi</li>
                <li>10+ years of experience in teaching</li>
              </ul>
            </div>
            
            <p className="text-gray-600 mb-4 leading-relaxed">
              With over 10+ years of teaching experience and a strong foundation in Electrical Engineering, Faisal Sir brings a unique, analytical approach to education. His teaching philosophy revolves around building rock-solid fundamental concepts rather than rote memorization.
            </p>
            
            <p className="text-gray-600 leading-relaxed mb-8">
              "Every child has the potential to excel in Maths and Science. All they need is the right guidance, regular practice, and an environment that encourages them to ask questions." - <span className="font-semibold italic">Faisal Sir</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h4 className="text-lg font-bold text-primary mb-2">Our Mission</h4>
                <p className="text-gray-600 text-sm">To provide high-quality, accessible education that focuses on conceptual clarity, regular assessment, and holistic development of students.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h4 className="text-lg font-bold text-primary mb-2">Our Vision</h4>
                <p className="text-gray-600 text-sm">To become the most trusted educational institution in Delhi by consistently producing excellent academic results and confident individuals.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Our Expert Faculty Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Expert Faculty</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Learn from the best educators who are passionate about teaching and dedicated to student success.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center text-gray-500 font-semibold py-8">Loading faculty profiles...</div>
            ) : faculty.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-8">No faculty added yet.</div>
            ) : (
              faculty.map((member) => (
                <div key={member.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transform transition hover:-translate-y-2">
                  <div className="h-2 bg-secondary"></div>
                  <div className="px-6 py-6">
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-secondary font-semibold mb-4">{member.subject}</p>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-start">
                        <span className="font-bold text-primary mr-2 min-w-24">Qualification:</span>
                        <span>{member.qualification}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-bold text-primary mr-2 min-w-24">Experience:</span>
                        <span>{member.experience}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </>
  );
};

export default About;
