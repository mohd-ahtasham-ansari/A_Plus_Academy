import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/918860255259"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-colors duration-300 animate-bounce hover:animate-none group"
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute inset-0 rounded-full animate-ping bg-green-500 opacity-20"></div>
      <FaWhatsapp className="text-3xl relative z-10" />
      <span className="absolute right-full mr-4 bg-gray-800 text-white px-3 py-1 text-sm rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none top-1/2 -translate-y-1/2">
        Chat with us!
      </span>
    </a>
  );
};

export default WhatsAppButton;
