import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;
const STATIC_BASE_URL=process.env.REACT_APP_STATIC_URL;


const ViewMaterials = () => {
  const [materials, setMaterials] = useState([]);

  const fetchMaterials = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/materials`);
      setMaterials(res.data);
    } catch (err) {
      console.error("Error fetching materials:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this material?")) {
      try {
        await axios.delete(`${API_BASE_URL}/materials/${id}`);
        fetchMaterials();
      } catch (err) {
        console.error("Error deleting material:", err);
      }
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>View Uploaded Materials</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Topic</th>
            <th style={thStyle}>File</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((mat) => (
            <tr key={mat._id}>
              <td style={tdStyle}>{mat.title}</td>
              <td style={tdStyle}>{mat.topic}</td>
              <td style={tdStyle}>
                <a
                  href={`${STATIC_BASE_URL}/uploads/${mat.filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </td>
              <td style={tdStyle}>
                <button
                  onClick={() => handleDelete(mat._id)}
                  style={deleteBtnStyle}
                >
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ddd",
};

const deleteBtnStyle = {
  backgroundColor: "#cc0000",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "4px",
  cursor: "pointer",
};

export default ViewMaterials;
