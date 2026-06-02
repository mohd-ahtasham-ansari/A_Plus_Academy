import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Hero from '../components/Hero';
import Slideshow from '../components/Slideshow';
import Facilities from '../components/Facilities';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import { getStats } from '../services/statService';

const Home = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);
  return (
    <>
      <Helmet>
        <title>A Plus Academy | Best Maths & Science Coaching in Delhi</title>
        <meta name="description" content="A Plus Academy provides expert coaching for Maths, Science, English, and Social Science from Classes 6th to 12th with weekly tests, AC classrooms, personalized mentoring, and result-oriented learning." />
      </Helmet>
      
      <Hero />
      <Slideshow />
      <Facilities />
      
      {/* Results Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-12">Our Track Record</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-3 text-gray-500 font-semibold py-8">Loading track record...</div>
            ) : (
              stats.map((stat) => (
                <div key={stat.id} className={`bg-white p-8 rounded-xl shadow-lg border-b-4 border-${stat.color} transform transition hover:-translate-y-2`}>
                  <div className={`text-5xl font-extrabold text-${stat.color} mb-2`}>{stat.value}</div>
                  <p className="text-gray-600 font-semibold">{stat.label}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <Testimonials />
      <FAQ />
    </>
  );
};

export default Home;
