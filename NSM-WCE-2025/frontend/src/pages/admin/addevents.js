import React, { useState } from "react";
import axios from "axios";
import { FaUpload, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    month: "",
    year: "",
    location: "",
    participants: "",
    summary: ""
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    if (file) data.append("file", file);

    try {
      await axios.post(`${API_BASE_URL}/events`, data);
      setMessage("Event added successfully!");
      setError(false);
      setFormData({ title: "", month: "", year: "", location: "", participants: "", summary: "" });
      setFile(null);
    } catch (err) {
      setMessage("Failed to add event");
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" style={styles.container}>
      <h3>Add Event Report</h3>

      {["title", "month", "year", "location", "participants"].map((field) => (
        <input
          key={field}
          name={field}
          type="text"
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field]}
          onChange={handleChange}
          required
          style={styles.input}
        />
      ))}

      <textarea
        name="summary"
        placeholder="Event Summary"
        value={formData.summary}
        onChange={handleChange}
        required
        rows={4}
        style={{ ...styles.input, resize: "vertical" }}
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        required
        style={styles.input}
      />

      <button type="submit" style={styles.button}>
        <FaUpload /> Upload
      </button>

      {message && (
        <div style={{ ...styles.message, ...(error ? styles.error : styles.success) }}>
          {error ? <FaTimesCircle /> : <FaCheckCircle />} {message}
        </div>
      )}
    </form>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "2rem auto",
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px"
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    width: "100%",
    fontSize: "14px"
  },
  button: {
    padding: "10px",
    backgroundColor: "#004080",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  message: {
    marginTop: "10px",
    padding: "10px",
    borderRadius: "4px"
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

export default AddEvent;
