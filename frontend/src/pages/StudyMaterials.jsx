import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { getNotes } from '../services/notesService';
import { FaDownload, FaSearch } from 'react-icons/fa';

const StudyMaterials = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [classFilter, setClassFilter] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
        // Fallback dummy data if API is not running
        setNotes([
          { id: 1, subject: "Science", class: "10", chapter: "Light Reflection", pdfUrl: "#" },
          { id: 2, subject: "Mathematics", class: "10", chapter: "Quadratic Equations", pdfUrl: "#" },
          { id: 3, subject: "English", class: "12", chapter: "The Last Lesson", pdfUrl: "#" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const filteredNotes = notes.filter(note => {
    return (
      (subjectFilter === '' || note.subject.toLowerCase() === subjectFilter.toLowerCase()) &&
      (classFilter === '' || note.student_class === classFilter) &&
      (searchTerm === '' || note.chapter.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <>
      <Helmet>
        <title>Study Materials | A Plus Academy</title>
        <meta name="description" content="Download free study notes and materials for Maths, Science, and English." />
      </Helmet>

      <div className="bg-primary pt-20 pb-16 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Study Materials</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto px-4">
          Access our comprehensive collection of notes, worksheets, and practice papers.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8 flex flex-col md:flex-row gap-4 border border-gray-100">
          <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by chapter name..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="w-full md:w-48 border border-gray-300 rounded-md px-4 py-2 focus:ring-primary focus:border-primary"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
          >
            <option value="">All Subjects</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="Social Science">Social Science</option>
          </select>

          <select
            className="w-full md:w-32 border border-gray-300 rounded-md px-4 py-2 focus:ring-primary focus:border-primary"
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
          >
            <option value="">All Classes</option>
            {[6,7,8,9,10,11,12].map(num => (
              <option key={num} value={num.toString()}>Class {num}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Chapter</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                      </div>
                    </td>
                  </tr>
                ) : filteredNotes.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                      No materials found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredNotes.map((note) => (
                    <tr key={note.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {note.subject}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Class {note.student_class}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {note.chapter}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href={note.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center text-primary hover:text-secondary transition-colors bg-blue-50 hover:bg-red-50 px-3 py-1.5 rounded-md"
                        >
                          <FaDownload className="mr-2" /> Download PDF
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  );
};

export default StudyMaterials;
