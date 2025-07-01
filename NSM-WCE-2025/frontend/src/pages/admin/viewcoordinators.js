import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;
const STATIC_BASE_URL = process.env.REACT_APP_STATIC_URL;

const ViewCoordinators = () => {
  const [coordinators, setCoordinators] = useState([]);
  const [editingCoordinator, setEditingCoordinator] = useState(null);
  const [newPhoto, setNewPhoto] = useState(null);

  const fetchCoordinators = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/coordinators`);
      setCoordinators(res.data);
    } catch (err) {
      console.error("Error fetching coordinators:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this coordinator?")) {
      try {
        await axios.delete(`${API_BASE_URL}/coordinators/${id}`);
        fetchCoordinators();
      } catch (err) {
        console.error("Error deleting coordinator:", err);
      }
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingCoordinator((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", editingCoordinator.name);
    formData.append("email", editingCoordinator.email);
    formData.append("url", editingCoordinator.url);
    if (newPhoto) formData.append("photo", newPhoto);

    try {
      await axios.put(`${API_BASE_URL}/coordinators/${editingCoordinator._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEditingCoordinator(null);
      setNewPhoto(null);
      fetchCoordinators();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  useEffect(() => {
    fetchCoordinators();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ color: "#003366", textAlign: "center" }}>Manage Coordinators</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "20px" }}>
        {coordinators.map((coordinator) => (
          <div key={coordinator._id} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "1rem", textAlign: "center" }}>
            <a href={coordinator.url} target="_blank" rel="noreferrer">
              <img
                src={`${STATIC_BASE_URL}/uploads/${coordinator.photo}`}
                alt={coordinator.name}
                style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }}
              />
            </a>
            <p style={{ marginTop: "10px", fontWeight: "bold" }}>{coordinator.name}</p>
            <p style={{ color: "#666", fontSize: "0.9rem" }}>{coordinator.email}</p>
            <button onClick={() => handleDelete(coordinator._id)} style={btnRed}><FaTrash /> Delete</button>
            <button onClick={() => setEditingCoordinator(coordinator)} style={btnGreen}><FaEdit /> Edit</button>
          </div>
        ))}
      </div>

      {/* Modal for editing */}
      {editingCoordinator && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h3>Edit Coordinator</h3>
            <form onSubmit={handleEditSubmit}>
              <input name="name" value={editingCoordinator.name} onChange={handleEditChange} placeholder="Name" style={inputStyle} required />
              <input name="email" value={editingCoordinator.email} onChange={handleEditChange} placeholder="Email" style={inputStyle} required />
              <input name="url" value={editingCoordinator.url} onChange={handleEditChange} placeholder="Portfolio URL" style={inputStyle} />
              <input type="file" onChange={(e) => setNewPhoto(e.target.files[0])} style={inputStyle} />

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button type="submit" style={btnGreen}>Update</button>
                <button type="button" onClick={() => setEditingCoordinator(null)} style={btnRed}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const btnRed = {
  backgroundColor: "#cc0000",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  margin: "5px",
  cursor: "pointer",
};

const btnGreen = {
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  margin: "5px",
  cursor: "pointer",
};

const inputStyle = {
  display: "block",
  margin: "10px 0",
  padding: "10px",
  width: "100%",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const modalOverlay = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContent = {
  background: "white",
  padding: "30px",
  borderRadius: "10px",
  maxWidth: "400px",
  width: "100%",
};

export default ViewCoordinators;
