import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/home";
import Materials from "./pages/materials";
import AdminLogin from "./pages/adminlogin";
import Dashboard from "./pages/admin/dashboard";
import Events from "./pages/events";
import Trainings from "./pages/trainings";
import Gallery from "./pages/gallery"
import Contact from "./pages/contact";


const ConditionalLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/materials/:topicId" element={<Materials />} />
        <Route path="/events" element={<Events />} />
        <Route path="/trainings" element={<Trainings />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/*" element={<Dashboard />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <ConditionalLayout />
    </Router>
  );
};

export default App;
