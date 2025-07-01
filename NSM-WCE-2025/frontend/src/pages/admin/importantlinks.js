import React, { useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle, FaLink } from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;


const AddImportantLink = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("title", title);
  if (file) formData.append("file", file);
  if (url) formData.append("url", url);

  try {
    await axios.post(`${API_BASE_URL}/importantlinks`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    setMessage("Notice uploaded successfully");
    setError(false);
    setTitle("");
    setFile(null);
    setUrl("");
  } catch (err) {
    console.error(err);
    setMessage("Failed to upload notice");
    setError(true);
  }
};


  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" style={styles.container}>
  <h3 style={{ textAlign: "center" }}>Add Important Link</h3>

  <input
    type="text"
    placeholder="Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    required
    style={styles.input}
  />

  <label>Upload File:</label>
  <input
    type="file"
    onChange={(e) => setFile(e.target.files[0])}
    style={styles.input}
  />

  <label>Or Enter URL:</label>
  <input
    type="url"
    placeholder="https://example.com"
    value={url}
    onChange={(e) => setUrl(e.target.value)}
    style={styles.input}
  />

  <button type="submit" style={styles.button}>
    <FaLink /> Upload
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

export default AddImportantLink;
