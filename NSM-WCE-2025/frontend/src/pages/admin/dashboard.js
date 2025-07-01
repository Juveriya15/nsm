import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import {
  FaUpload,
  FaBookOpen,
  FaUsers,
  FaLink,
  FaCamera,
  FaUniversity,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

import AdminNavbar from "../../components/adminnavbar";
import AdminFooter from "../../components/adminfooter";
import UploadMaterial from "./uploadmaterial";
import ViewMaterials from "./viewmaterial";
import Coordinators from "./coordinators";
import ViewCoordinators from "./viewcoordinators";
import ImportantLinks from "./importantlinks";
import EventPhotos from "./eventphotos";
import SisterNodalCenters from "./sisternodal";
import ViewEventPhotos from "./vieweventphotos";
import ViewImportantLinks from "./viewimportantlinks";
import ViewSisterNodals from "./viewsisternodals";
import AddEvent from "./addevents";
import ViewEvents from "./viewevents";

const Dashboard = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>

      <AdminNavbar />

      <div style={{ display: "flex", flex: 1 }}>
        
        <nav
          style={{
            width: "250px",
            background: "#003366",
            color: "white",
            padding: "30px 20px",
            overflowY: "auto",
          }}
        >
          <h1 style={{ fontSize: "24px", marginBottom: "30px", textAlign: "center" }}>
            Admin Panel
          </h1>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {/* [All your <Link> items remain unchanged] */}
            <li style={{ marginBottom: "20px" }}>
              <Link to="/admin/upload" style={linkStyle}>
                <FaUpload style={{ marginRight: "8px" }} /> Upload Material
              </Link>
            </li>
            <li style={{ marginBottom: "20px" }}>
              <Link to="/admin/view" style={linkStyle}>
                <FaBookOpen style={{ marginRight: "8px" }} /> View Materials
              </Link>
            </li>
            <li style={{ marginBottom: "20px" }}>
              <Link to="/admin/add-event" style={linkStyle}>
                <FaUpload style={{ marginRight: "8px" }} /> Upload Reports
              </Link>
            </li>
            <li style={{ marginBottom: "20px" }}>
              <Link to="/admin/view-events" style={linkStyle}>
                <FaBookOpen style={{ marginRight: "8px" }} /> View Reports
              </Link>
            </li>
            <li style={{ marginBottom: "20px" }}>
              <Link to="/admin/coordinators" style={linkStyle}>
                <FaUsers style={{ marginRight: "8px" }} /> Coordinators
              </Link>
            </li>
            <li style={{ marginBottom: "20px" }}>
              <Link to="/admin/manage-coordinators" style={linkStyle}>
                <FaBookOpen style={{ marginRight: "8px" }} /> View Coordinators
              </Link>
            </li>
            <li style={{ marginBottom: "20px" }}>
              <Link to="/admin/links" style={linkStyle}>
                <FaLink style={{ marginRight: "8px" }} /> Important Links
              </Link>
            </li>
            <li style={{ marginBottom: "20px" }}>
              <Link to="/admin/imp-links" style={linkStyle}>
                <FaBookOpen style={{ marginRight: "8px" }} /> View Important
                Links
              </Link>
            </li>
            <li style={{ marginBottom: "20px" }}>
              <Link to="/admin/eventphotos" style={linkStyle}>
                <FaCamera style={{ marginRight: "8px" }} /> Event Photos
              </Link>
            </li>
            <li style={{ marginBottom: "20px" }}>
              <Link to="/admin/event-photos" style={linkStyle}>
                <FaBookOpen style={{ marginRight: "8px" }} /> View Event Photos
              </Link>
            </li>
            <li style={{ marginBottom: "20px" }}>
              <Link to="/admin/sisternodal" style={linkStyle}>
                <FaUniversity style={{ marginRight: "8px" }} /> Nodal
                Centers
              </Link>
            </li>
            <li style={{ marginBottom: "20px" }}>
              <Link to="/admin/sister-nodals" style={linkStyle}>
                <FaBookOpen style={{ marginRight: "8px" }} /> View Nodal
              </Link>
            </li>
            
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem("isAdmin");
                  window.location.href = "/admin";
                }}
                style={{
                  marginTop: "30px",
                  background: "#cc0000",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <FiLogOut style={{ marginRight: "8px" }} />
                Logout
              </button>
            </li>
          </ul>
        </nav>

       
        <main
          style={{
            flex: 1,
            padding: "30px",
            background: "#f4f6f8",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Routes>
              <Route path="upload" element={<UploadMaterial />} />
              <Route path="view" element={<ViewMaterials />} />
              <Route path="coordinators" element={<Coordinators />} />
              <Route path="manage-coordinators" element={<ViewCoordinators />} />
              <Route path="links" element={<ImportantLinks />} />
              <Route path="eventphotos" element={<EventPhotos />} />
              <Route path="sisternodal" element={<SisterNodalCenters />} />
              <Route path="event-photos" element={<ViewEventPhotos />} />
              <Route path="imp-links" element={<ViewImportantLinks />} />
              <Route path="sister-nodals" element={<ViewSisterNodals />} />
              <Route path="add-event" element={<AddEvent />} />
              <Route path="view-events" element={<ViewEvents />} />
            </Routes>
          </div>
        </main>
      </div>

      <AdminFooter />
    </div>
  );
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
  padding: "8px 12px",
  borderRadius: "6px",
  display: "inline-block",
  transition: "background 0.3s",
};

export default Dashboard;
