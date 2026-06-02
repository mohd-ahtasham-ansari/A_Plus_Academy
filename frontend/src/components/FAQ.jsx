import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const faqs = [
  {
    question: "What classes are available?",
    answer: "We provide coaching for Classes 6th to 12th in Maths, Science, English (Literature, Grammar, Speaking), and Social Science."
  },
  {
    question: "Do you provide study notes?",
    answer: "Yes, comprehensive study materials and notes are provided to all enrolled students for their respective subjects."
  },
  {
    question: "Are weekly tests conducted?",
    answer: "Absolutely. We conduct exclusive weekly tests to assess student progress and we share regular feedback with parents."
  },
  {
    question: "How can I enroll?",
    answer: "You can enroll by visiting our institute at Shastri Nagar, calling us at +91 8860255259, or filling out the Enrollment form on our website."
  },
  {
    question: "Is there doubt clearing support?",
    answer: "Yes, we emphasize a stress-free learning environment and offer one-to-one basis doubt clearing sessions to strengthen core concepts."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Got questions? We've got answers.</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 flex justify-between items-center focus:outline-none"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-semibold text-textMain">{faq.question}</span>
                <FaChevronDown className={`text-primary transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-40 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
                }`}
              >
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
