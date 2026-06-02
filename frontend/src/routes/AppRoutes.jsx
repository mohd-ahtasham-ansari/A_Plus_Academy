import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Courses = lazy(() => import("../pages/Courses"));
const StudyMaterials = lazy(() => import("../pages/StudyMaterials"));
const Enrollment = lazy(() => import("../pages/Enrollment"));
const Contact = lazy(() => import("../pages/Contact"));
const AdminLogin = lazy(() => import("../pages/AdminLogin"));
const AdminMaterials = lazy(() => import("../pages/AdminMaterials"));

const LoadingFallback = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/materials" element={<StudyMaterials />} />
        <Route path="/enroll" element={<Enrollment />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/materials" element={<AdminMaterials />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
