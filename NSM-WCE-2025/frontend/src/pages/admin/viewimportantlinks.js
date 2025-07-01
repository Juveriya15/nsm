import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;
const STATIC_BASE_URL=process.env.REACT_APP_STATIC_URL;


const ViewImportantLinks = () => {
  const [links, setLinks] = useState([]);

  const fetchLinks = async () => {
    const res = await axios.get(`${API_BASE_URL}/importantlinks`);
    setLinks(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this link?")) {
      await axios.delete(`${API_BASE_URL}/importantlinks/${id}`);
      fetchLinks();
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h3>Manage Important Links</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {links.map((link) => (
          <li
            key={link._id}
            style={{
              marginBottom: "15px",
              background: "#f0f0f0",
              padding: "10px",
              borderRadius: "6px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <a
              href={`${STATIC_BASE_URL}/uploads/${link.filename}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: "black", textDecoration: "none" }}
            >
              📎 {link.title}
            </a>
            <button
              onClick={() => handleDelete(link._id)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <FaTrash /> Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewImportantLinks;
