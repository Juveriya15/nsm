import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTrash, FaEdit } from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;
const STATIC_BASE_URL = process.env.REACT_APP_STATIC_URL;

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/events`);
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this event report?")) {
      try {
        await axios.delete(`${API_BASE_URL}/events/${id}`);
        fetchEvents();
      } catch (err) {
        console.error("Error deleting event:", err);
      }
    }
  };

  const handleEditClick = (event) => {
    setEditingEvent(event);
    setShowModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_BASE_URL}/events/${editingEvent._id}`,
        editingEvent
      );
      setShowModal(false);
      setEditingEvent(null);
      fetchEvents();
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{marginBottom: "20px", color: "#003366", justifyContent:"center", textAlign:"center"}} >Event Reports</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Conducted on</th>
            <th style={thStyle}>Location</th>
            <th style={thStyle}>Participants</th>
            <th style={thStyle}>Summary</th>
            <th style={thStyle}>Report</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td style={tdStyle}>{event.title}</td>
              <td style={tdStyle}>
                {event.month}, {event.year}
              </td>
              <td style={tdStyle}>{event.location}</td>
              <td style={tdStyle}>{event.participants}</td>
              <td style={tdStyle}>{event.summary}</td>
              <td style={tdStyle}>
                {event.filename ? (
                  <a
                    href={`${STATIC_BASE_URL}/uploads/${event.filename}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                ) : (
                  "No File"
                )}
              </td>
              <td style={tdStyle}>
                <button
                  onClick={() => handleDelete(event._id)}
                  type="button"
                  className="btn btn-danger me-2 d-flex align-items-center gap-2"
                  style={{ padding: "8px 12px", borderRadius: "4px" }}
                >
                  <FaTrash /> Delete
                </button>
                <button
                  onClick={() => handleEditClick(event)}
                  type="button"
                  className="btn btn-success d-flex align-items-center gap-2"
                  style={{
                    padding: "8px 12px",
                    borderRadius: "4px",
                    marginTop: "5px",
                  }}
                >
                  <FaEdit /> Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && editingEvent && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h3>Edit Event</h3>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={editingEvent.title}
                onChange={handleEditChange}
                style={inputStyle}
                required
              />
              <input
                type="text"
                name="month"
                placeholder="Month"
                value={editingEvent.month}
                onChange={handleEditChange}
                style={inputStyle}
                required
              />
              <input
                type="text"
                name="year"
                placeholder="Year"
                value={editingEvent.year}
                onChange={handleEditChange}
                style={inputStyle}
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={editingEvent.location}
                onChange={handleEditChange}
                style={inputStyle}
                required
              />
              <input
                type="text"
                name="participants"
                placeholder="Participants"
                value={editingEvent.participants}
                onChange={handleEditChange}
                style={inputStyle}
                required
              />
              <textarea
                name="summary"
                placeholder="Summary"
                value={editingEvent.summary}
                onChange={handleEditChange}
                style={{ ...inputStyle, height: "100px" }}
                required
              />
              <div style={{ marginTop: "15px" }}>
                <button
                  type="submit"
                  style={{ ...btnStyle, backgroundColor: "#004080" }}
                >
                  Update
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  style={{
                    ...btnStyle,
                    backgroundColor: "gray",
                    marginLeft: "10px",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const thStyle = {
  borderBottom: "1px solid #ccc",
  padding: "10px",
  textAlign: "left",
  backgroundColor: "#f5f5f5",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

const btnStyle = {
  color: "white",
  padding: "8px 12px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginRight: "10px",
};

const inputStyle = {
  display: "block",
  margin: "10px 0",
  padding: "10px",
  width: "100%",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  width: "100vw",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const modalStyle = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "10px",
  maxWidth: "600px",
  width: "90%",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
};

export default ViewEvents;
