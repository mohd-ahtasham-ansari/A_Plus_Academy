import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNotes, uploadNote, deleteNote } from '../services/notesService';
import { getCourses, addCourse, deleteCourse } from '../services/courseService';
import { getStats, addStat, deleteStat } from '../services/statService';
import { getFaculty, addFaculty, deleteFaculty } from '../services/facultyService';
import { FaTrash, FaUpload, FaSignOutAlt, FaPlus } from 'react-icons/fa';

const AdminMaterials = () => {
  const [activeTab, setActiveTab] = useState('materials');
  
  // Materials State
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    subject: 'Mathematics',
    class: '10',
    chapter: '',
  });
  const [file, setFile] = useState(null);

  // Courses State
  const [courses, setCourses] = useState([]);
  const [courseFormData, setCourseFormData] = useState({
    title: '',
    classes: '',
    desc: '',
    icon: 'FaBookOpen',
    color: 'bg-blue-500',
    taughtBy: ''
  });

  // Stats State
  const [stats, setStats] = useState([]);
  const [statFormData, setStatFormData] = useState({
    value: '',
    label: '',
    color: 'secondary'
  });

  // Faculty State
  const [faculty, setFaculty] = useState([]);
  const [facultyFormData, setFacultyFormData] = useState({
    name: '',
    subject: '',
    qualification: '',
    experience: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchMaterials();
    fetchCourses();
    fetchStats();
    fetchFaculty();
  }, [navigate]);

  const fetchMaterials = async () => {
    try {
      const data = await getNotes();
      setMaterials(data);
    } catch (error) {
      console.error('Failed to fetch materials', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.error('Failed to fetch courses', error);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats', error);
    }
  };

  const fetchFaculty = async () => {
    try {
      const data = await getFaculty();
      setFaculty(data);
    } catch (error) {
      console.error('Failed to fetch faculty', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a PDF file');
      return;
    }
    const data = new FormData();
    data.append('subject', formData.subject);
    data.append('class', formData.class);
    data.append('chapter', formData.chapter);
    data.append('file', file);
    setUploading(true);
    try {
      await uploadNote(data);
      alert('Material uploaded successfully!');
      setFormData({ ...formData, chapter: '' });
      setFile(null);
      fetchMaterials();
    } catch (error) {
      console.error('Upload failed', error);
      alert('Upload failed. Only PDFs are allowed, or check server connection.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      try {
        await deleteNote(id);
        fetchMaterials();
      } catch (error) {
        console.error('Delete failed', error);
        alert('Failed to delete material.');
      }
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await addCourse(courseFormData);
      alert('Course added successfully!');
      setCourseFormData({ title: '', classes: '', desc: '', icon: 'FaBookOpen', color: 'bg-blue-500', taughtBy: '' });
      fetchCourses();
    } catch (error) {
      console.error('Failed to add course', error);
      alert('Failed to add course.');
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteCourse(id);
        fetchCourses();
      } catch (error) {
        console.error('Delete failed', error);
        alert('Failed to delete course.');
      }
    }
  };

  const handleAddStat = async (e) => {
    e.preventDefault();
    try {
      await addStat(statFormData);
      alert('Statistic added successfully!');
      setStatFormData({ value: '', label: '', color: 'secondary' });
      fetchStats();
    } catch (error) {
      console.error('Failed to add stat', error);
      alert('Failed to add statistic.');
    }
  };

  const handleDeleteStat = async (id) => {
    if (window.confirm('Are you sure you want to delete this statistic?')) {
      try {
        await deleteStat(id);
        fetchStats();
      } catch (error) {
        console.error('Delete failed', error);
        alert('Failed to delete statistic.');
      }
    }
  };

  const handleAddFaculty = async (e) => {
    e.preventDefault();
    try {
      await addFaculty(facultyFormData);
      alert('Faculty added successfully!');
      setFacultyFormData({ name: '', subject: '', qualification: '', experience: '' });
      fetchFaculty();
    } catch (error) {
      console.error('Failed to add faculty', error);
      alert('Failed to add faculty.');
    }
  };

  const handleDeleteFaculty = async (id) => {
    if (window.confirm('Are you sure you want to delete this faculty member?')) {
      try {
        await deleteFaculty(id);
        fetchFaculty();
      } catch (error) {
        console.error('Delete failed', error);
        alert('Failed to delete faculty.');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
        <button 
          onClick={handleLogout}
          className="flex items-center text-red-600 hover:text-red-800 font-semibold"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>

      <div className="flex space-x-4 mb-8 border-b pb-4 overflow-x-auto">
        <button 
          className={`px-4 py-2 font-bold whitespace-nowrap ${activeTab === 'materials' ? 'text-primary border-b-4 border-primary' : 'text-gray-500'}`}
          onClick={() => setActiveTab('materials')}
        >
          Study Materials
        </button>
        <button 
          className={`px-4 py-2 font-bold whitespace-nowrap ${activeTab === 'courses' ? 'text-primary border-b-4 border-primary' : 'text-gray-500'}`}
          onClick={() => setActiveTab('courses')}
        >
          Manage Batches
        </button>
        <button 
          className={`px-4 py-2 font-bold whitespace-nowrap ${activeTab === 'stats' ? 'text-primary border-b-4 border-primary' : 'text-gray-500'}`}
          onClick={() => setActiveTab('stats')}
        >
          Manage Statistics
        </button>
        <button 
          className={`px-4 py-2 font-bold whitespace-nowrap ${activeTab === 'faculty' ? 'text-primary border-b-4 border-primary' : 'text-gray-500'}`}
          onClick={() => setActiveTab('faculty')}
        >
          Manage Faculty
        </button>
      </div>

      {activeTab === 'materials' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md border border-gray-100 h-fit">
            <h2 className="text-xl font-bold text-primary mb-4 border-b pb-2">Upload New Material</h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                  <option value="Social Science">Social Science</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2" value={formData.class} onChange={(e) => setFormData({...formData, class: e.target.value})}>
                  {[6,7,8,9,10,11,12].map(num => (
                    <option key={num} value={num.toString()}>Class {num}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chapter Name</label>
                <input type="text" required placeholder="e.g. Light Reflection" className="w-full border border-gray-300 rounded-md px-3 py-2" value={formData.chapter} onChange={(e) => setFormData({...formData, chapter: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PDF File</label>
                <input type="file" accept="application/pdf" required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100" onChange={(e) => setFile(e.target.files[0])} />
              </div>
              <button type="submit" disabled={uploading} className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${uploading ? 'bg-gray-400' : 'bg-secondary hover:bg-red-700'}`}>
                <FaUpload className="mr-2" /> {uploading ? 'Uploading...' : 'Upload PDF'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-primary">Existing Materials</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Details</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Chapter</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr><td colSpan="3" className="px-6 py-4 text-center">Loading...</td></tr>
                  ) : materials.length === 0 ? (
                    <tr><td colSpan="3" className="px-6 py-4 text-center text-gray-500">No materials uploaded yet.</td></tr>
                  ) : (
                    materials.map((mat) => (
                      <tr key={mat.id}>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{mat.subject}</div>
                          <div className="text-sm text-gray-500">Class {mat.student_class}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{mat.chapter}</td>
                        <td className="px-6 py-4 text-right text-sm font-medium">
                          <a href={mat.pdfUrl} target="_blank" rel="noreferrer" className="text-primary hover:text-blue-900 mr-4">View</a>
                          <button onClick={() => handleDelete(mat.id)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md border border-gray-100 h-fit">
            <h2 className="text-xl font-bold text-primary mb-4 border-b pb-2">Create New Batch</h2>
            <form onSubmit={handleAddCourse} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                <input type="text" required placeholder="e.g. Mathematics" className="w-full border border-gray-300 rounded-md px-3 py-2" value={courseFormData.title} onChange={(e) => setCourseFormData({...courseFormData, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Classes (e.g. 6th to 12th)</label>
                <input type="text" required placeholder="6th to 12th" className="w-full border border-gray-300 rounded-md px-3 py-2" value={courseFormData.classes} onChange={(e) => setCourseFormData({...courseFormData, classes: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea required rows="3" placeholder="Course description..." className="w-full border border-gray-300 rounded-md px-3 py-2" value={courseFormData.desc} onChange={(e) => setCourseFormData({...courseFormData, desc: e.target.value})}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Taught By (Optional)</label>
                <input type="text" placeholder="e.g. Faisal Sir" className="w-full border border-gray-300 rounded-md px-3 py-2" value={courseFormData.taughtBy} onChange={(e) => setCourseFormData({...courseFormData, taughtBy: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2" value={courseFormData.icon} onChange={(e) => setCourseFormData({...courseFormData, icon: e.target.value})}>
                    <option value="FaSquareRootAlt">Math</option>
                    <option value="FaFlask">Science</option>
                    <option value="FaBookOpen">Book</option>
                    <option value="FaLanguage">Language</option>
                    <option value="FaMicrophoneAlt">Speaking</option>
                    <option value="FaGlobeAmericas">Globe</option>
                    <option value="FaChartLine">Economics</option>
                    <option value="FaMap">Geography</option>
                    <option value="FaLandmark">Political</option>
                    <option value="FaCalculator">Accounts</option>
                    <option value="FaHistory">History</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Theme Color</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2" value={courseFormData.color} onChange={(e) => setCourseFormData({...courseFormData, color: e.target.value})}>
                    <option value="bg-blue-500">Blue</option>
                    <option value="bg-green-500">Green</option>
                    <option value="bg-purple-500">Purple</option>
                    <option value="bg-pink-500">Pink</option>
                    <option value="bg-yellow-500">Yellow</option>
                    <option value="bg-indigo-500">Indigo</option>
                    <option value="bg-teal-500">Teal</option>
                    <option value="bg-emerald-500">Emerald</option>
                    <option value="bg-cyan-500">Cyan</option>
                    <option value="bg-orange-500">Orange</option>
                    <option value="bg-red-500">Red</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-red-700">
                <FaPlus className="mr-2" /> Create Batch
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-primary">Existing Batches</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Title & Classes</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Taught By</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {courses.length === 0 ? (
                    <tr><td colSpan="3" className="px-6 py-4 text-center text-gray-500">No batches created yet.</td></tr>
                  ) : (
                    courses.map((course) => (
                      <tr key={course.id}>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-gray-900">{course.title}</div>
                          <div className="text-xs font-medium text-primary bg-blue-50 inline-block px-2 py-1 rounded mt-1">{course.classes}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{course.taughtBy || '-'}</td>
                        <td className="px-6 py-4 text-right text-sm font-medium">
                          <button onClick={() => handleDeleteCourse(course.id)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md border border-gray-100 h-fit">
            <h2 className="text-xl font-bold text-primary mb-4 border-b pb-2">Add New Statistic</h2>
            <form onSubmit={handleAddStat} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value (e.g. 500+)</label>
                <input type="text" required placeholder="e.g. 500+" className="w-full border border-gray-300 rounded-md px-3 py-2" value={statFormData.value} onChange={(e) => setStatFormData({...statFormData, value: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <input type="text" required placeholder="e.g. Students Taught" className="w-full border border-gray-300 rounded-md px-3 py-2" value={statFormData.label} onChange={(e) => setStatFormData({...statFormData, label: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Theme Color</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2" value={statFormData.color} onChange={(e) => setStatFormData({...statFormData, color: e.target.value})}>
                  <option value="secondary">Red (Secondary)</option>
                  <option value="accent">Gold (Accent)</option>
                  <option value="primary">Blue (Primary)</option>
                  <option value="green-500">Green</option>
                  <option value="purple-500">Purple</option>
                </select>
              </div>
              
              <button type="submit" className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-red-700">
                <FaPlus className="mr-2" /> Add Statistic
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-primary">Live Track Record Stats</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Value</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Label</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stats.length === 0 ? (
                    <tr><td colSpan="3" className="px-6 py-4 text-center text-gray-500">No statistics created yet.</td></tr>
                  ) : (
                    stats.map((stat) => (
                      <tr key={stat.id}>
                        <td className="px-6 py-4 font-bold text-xl text-gray-800">{stat.value}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{stat.label}</td>
                        <td className="px-6 py-4 text-right text-sm font-medium">
                          <button onClick={() => handleDeleteStat(stat.id)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'faculty' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md border border-gray-100 h-fit">
            <h2 className="text-xl font-bold text-primary mb-4 border-b pb-2">Add New Faculty</h2>
            <form onSubmit={handleAddFaculty} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" required placeholder="e.g. Ravi Kumar" className="w-full border border-gray-300 rounded-md px-3 py-2" value={facultyFormData.name} onChange={(e) => setFacultyFormData({...facultyFormData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input type="text" required placeholder="e.g. Physics" className="w-full border border-gray-300 rounded-md px-3 py-2" value={facultyFormData.subject} onChange={(e) => setFacultyFormData({...facultyFormData, subject: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
                <input type="text" required placeholder="e.g. MSc Physics" className="w-full border border-gray-300 rounded-md px-3 py-2" value={facultyFormData.qualification} onChange={(e) => setFacultyFormData({...facultyFormData, qualification: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                <input type="text" required placeholder="e.g. 5+ Years" className="w-full border border-gray-300 rounded-md px-3 py-2" value={facultyFormData.experience} onChange={(e) => setFacultyFormData({...facultyFormData, experience: e.target.value})} />
              </div>
              <button type="submit" className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-red-700">
                <FaPlus className="mr-2" /> Add Faculty
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-primary">Existing Faculty</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Details</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Qual/Exp</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {faculty.length === 0 ? (
                    <tr><td colSpan="3" className="px-6 py-4 text-center text-gray-500">No faculty added yet.</td></tr>
                  ) : (
                    faculty.map((member) => (
                      <tr key={member.id}>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-gray-900">{member.name}</div>
                          <div className="text-sm text-primary font-semibold">{member.subject}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">{member.qualification}</div>
                          <div className="text-sm text-gray-500">{member.experience}</div>
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium">
                          <button onClick={() => handleDeleteFaculty(member.id)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminMaterials;
