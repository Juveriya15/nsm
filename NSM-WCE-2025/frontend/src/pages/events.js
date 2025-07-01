import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;
const STATIC_BASE_URL=process.env.REACT_APP_STATIC_URL;

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/events`);
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };

    fetchReports();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Montserrat" }}>
      <h2 style={{ background: "#004080",
            width:"100%",
            height: "50px",
            color: "white",
            justifyContent:"center",
            textAlign:"center", }}>Event Reports</h2>

      {events.length === 0 ? (
        <p>No events uploaded yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>Events</th>
              <th style={thStyle}>Conducted on</th>
              <th style={thStyle}>Location</th>
              <th style={thStyle}>No. Of Participants</th>
              <th style={thStyle}>Agenda</th>
              <th style={thStyle}>Report</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td style={tdStyle}>{event.title}</td>
                <td style={tdStyle}>{event.month}, {event.year}</td>
                <td style={tdStyle}>{event.location}</td>
                <td style={tdStyle}>{event.participants}</td>
                <td style={tdStyle}>{event.summary}</td>
                <td style={tdStyle}>
                  <a
                    href={`${STATIC_BASE_URL}/uploads/${event.filename}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: "#004080",
                      textDecoration: "underline",
                      fontWeight: "500",
                    }}
                  >
                    View Report
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const thStyle = {
  textAlign: "center",
  padding: "10px",
  background: "#004080",
  color: "white",
  border: "1px solid #ddd",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "center",
};

export default Events;
