import React, { useState } from "react";
import axios from "axios";
import { FaUpload, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const AddEventPhoto = () => {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [caption, setCaption] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    try {
      await axios.post(`${API_BASE_URL}/eventphotos`, formData);
      setMessage("Event photo uploaded!");
      setError(false);
      setImage(null);
    } catch (err) {
      setMessage("Upload failed.");
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
      fontFamily: "Arial, sans-serif",
    },
    input: {
      padding: "0.5rem",
      borderRadius: "4px",
      border: "1px solid #ccc",
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
      fontWeight: "bold",
    },
    message: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem",
      borderRadius: "4px",
      fontWeight: "500",
    },
    success: {
      backgroundColor: "#d4edda",
      color: "#155724",
    },
    error: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
    },
  };

  return (
    <form
      onSubmit={handleUpload}
      encType="multipart/form-data"
      style={styles.container}
    >
      <h3 style={{ textAlign: "center" }}>Upload Event Photo</h3>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        required
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Enter caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
      />

      <button type="submit" style={styles.button}>
        <FaUpload /> Upload
      </button>

      {message && (
        <div
          style={{
            ...styles.message,
            ...(error ? styles.error : styles.success),
          }}
        >
          {error ? <FaTimesCircle /> : <FaCheckCircle />}
          {message}
        </div>
      )}
    </form>
  );
};

export default AddEventPhoto;
