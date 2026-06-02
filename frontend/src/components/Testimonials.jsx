import { FaStar } from 'react-icons/fa';

const reviews = [
  {
    name: "Mohd Anees (Taj Enclave)",
    role: "Parent of Class 10 Student",
    content: "A Plus Academy completely transformed my son's approach to Maths. The regular weekly tests and feedback keep us updated. Faisal Sir's teaching is exceptional.",
    rating: 5
  },
  {
    name: "Roop singh",
    role: "Class 12 Science Student",
    content: "The doubt clearing sessions are a game changer. The stress on fundamental concepts helped me score 95% in my board exams. Highly recommended!",
    rating: 5
  },
  {
    name: "Mohd Alam",
    role: "Parent of Class 8 Student",
    content: "Great environment and AC classrooms. The focus is always on result-oriented coaching. My daughter's confidence in Science has grown immensely.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Parents & Students Say</h2>
          <div className="flex justify-center items-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => <FaStar key={i} className="text-accent text-2xl" />)}
          </div>
          <p className="text-gray-300">5-Star Rated Coaching Institute in Delhi</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20">
              <div className="flex text-accent mb-4">
                {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
              </div>
              <p className="text-gray-200 mb-6 italic">"{review.content}"</p>
              <div>
                <h4 className="font-bold text-lg">{review.name}</h4>
                <p className="text-sm text-gray-400">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
