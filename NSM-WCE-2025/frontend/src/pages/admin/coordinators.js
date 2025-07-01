import React, { useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle, FaUserPlus } from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;



const AddCoordinator = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    url:"",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("url", formData.url);
    if (image) {
      data.append("photo", image);
    }

    try {
      await axios.post(`${API_BASE_URL}/coordinators`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Coordinator added successfully!");
      setFormData({ name: "", email: "", url:"" });
      setImage(null);
      setError(false);
    } catch (err) {
      setMessage("Failed to add coordinator.");
      setError(true);
    }
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "2rem auto",
      padding: "1rem",
      border: "1px solid #ccc",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      fontFamily: "Arial, sans-serif"
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column"
    },
    label: {
      marginBottom: "0.3rem",
      fontWeight: "bold"
    },
    input: {
      padding: "0.5rem",
      borderRadius: "4px",
      border: "1px solid #ccc"
    },
    button: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      backgroundColor: "#17a2b8",
      color: "#fff",
      border: "none",
      padding: "0.6rem 1rem",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold"
    },
    message: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem",
      borderRadius: "4px",
      fontWeight: "500"
    },
    success: {
      backgroundColor: "#d4edda",
      color: "#155724"
    },
    error: {
      backgroundColor: "#f8d7da",
      color: "#721c24"
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" style={styles.container}>
      <h3 style={{ textAlign: "center" }}>Add Coordinator</h3>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Name</label>
        <input
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          style={styles.input}
        />
      </div>
       <div style={styles.inputGroup}>
        <label style={styles.label}>Url</label>
        <input
          type="url"
          placeholder="Portfolio URL"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          required
          style={styles.input}
        />
      </div>


      <div style={styles.inputGroup}>
        <label style={styles.label}>Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      <button type="submit" style={styles.button}>
        <FaUserPlus /> Add
      </button>

      {message && (
        <div style={{ ...styles.message, ...(error ? styles.error : styles.success) }}>
          {error ? <FaTimesCircle /> : <FaCheckCircle />}
          {message}
        </div>
      )}
    </form>
  );
};

export default AddCoordinator;
