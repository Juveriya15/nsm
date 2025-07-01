import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;
const STATIC_BASE_URL = process.env.REACT_APP_STATIC_URL;
console.log("BAse URl:", API_BASE_URL);
console.log("Static Url:", STATIC_BASE_URL);

const Home = () => {
  const navigate = useNavigate();
  const [eventPhotos, setEventPhotos] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/eventphotos`)
      .then((res) => res.json())
      .then((data) => setEventPhotos(data))
      .catch((err) => console.error("Event photos error:", err));
  }, []);

  const [importantLinks, setImportantLinks] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/importantlinks`)
      .then((res) => res.json())
      .then((data) => setImportantLinks(data));
  }, []);

  const [coordinators, setCoordinators] = useState([]);

  useEffect(() => {
    const fetchCoordinators = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/coordinators`);
        const data = await res.json();
        setCoordinators(data);
      } catch (err) {
        console.error("Error fetching coordinators:", err);
      }
    };

    fetchCoordinators();
  }, []);

  const [sisterCenters, setSisterCenters] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/sisternodal`)
      .then((res) => res.json())
      .then((data) => setSisterCenters(data));
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        width: "100%",
        minHeight: "100vh",
        boxSizing: "border-box",
        boxShadow:"",
        backgroundColor: "#f2f6fa",
        fontFamily:"Montserrat"
      }}
    >
       {/* About Us Section */}
      <section id="aboutus">
        <h2
          style={{
            background: "#004080",
            width:"100%",
            height: "50px",
            color: "white",
            justifyContent:"center",
            textAlign:"center",
          }}
        >
          About WCE Nodal Center
        </h2>
        <div
          style={{
            background:"#ffff",
            borderRadius:"5px",
            padding: "25px",
            fontSize: "16px",
            textAlign: "justify",
            color: "#333",
          }}
        >
          <p>
            <strong>Walchand College of Engineering, Sangli</strong> has been
            selected as a nodal center under the prestigious{" "}
            <strong>National Supercomputing Mission (NSM)</strong>, an
            initiative by the Government of India. This mission aims to empower
            academic and R&D institutions nationwide by deploying supercomputers
            and fostering a highly skilled workforce in High-Performance
            Computing (HPC).
          </p>
          <p>
            As part of this initiative, WCE organizes various training programs
            for faculty and students, including:
          </p>
          <ul
            style={{
              paddingLeft: "20px",
              marginTop: "-10px",
              marginBottom: "10px",
            }}
          >
            <li>
              <strong>One-Day Orientation Program:</strong> For HoDs and BoS
              members, showcasing the role of HPC in AI and other emerging
              technologies.
            </li>
            <li>
              <strong>Five-Day Faculty Development Program (FDP):</strong>{" "}
              Hands-on workshops to train faculty in HPC and AI integration.
            </li>
            <li>
              <strong>Summer-Winter School:</strong> Intensive programs for
              undergraduate students.
            </li>
          </ul>
          <p>
            These programs are <strong>completely free</strong> for
            participants, with food and accommodation provided. Host institutes
            receive overhead expenses while contributing nominal charges to the
            nodal center.
          </p>
          <p>
            <strong>Benefits:</strong>
            <ol>
              <li>Collaboration under NSM </li>
              <li>Exposure to cutting-edge technologies</li>
              <li>Local coordination support.</li>
            </ol>
          </p>
          <b>
            We look forward to collaborating with you to promote excellence in
            HPC and AI education and research.
          </b>
        </div>
      </section>
      
      {/* Important Links Section */}
      <section style={{ marginTop: "20px", textAlign: "center" }}>
        <h2
          style={{
            background: "#004080",
            height: "50px",
            color: "white",
            lineHeight: "50px",
          }}
        >
          Important Links
        </h2>
        <ul
          style={{
            columns: 2,
            columnGap: "100px",
            maxWidth: "600px",
            margin: "20px auto",
            paddingLeft: "20px",
            listStyleType: "disc",
            textAlign: "left",
          }}
        >
          {importantLinks.map((link, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              {link.url ? (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#004080",
                    textDecoration: "none",
                    fontWeight: "500",
                  }}
                >
                  {link.title}
                </a>
              ) : (
                <a
                  href={`${STATIC_BASE_URL}/uploads/${link.filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#004080",
                    textDecoration: "none",
                    fontWeight: "500",
                  }}
                >
                  {link.title}
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Coordinators Section */}
      <section style={{ marginTop: "20px", textAlign: "center" }}>
        <h2 style={{ background: "#004080", height: "50px", color: "white" }}>
          Coordinators
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {coordinators.map((coordinator, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <a href={coordinator.url} target="_blank" rel="noreferrer">
                <img
                  src={`${STATIC_BASE_URL}/uploads/${coordinator.photo}`}
                  alt={coordinator.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </a>

              <p>{coordinator.name} </p>
            </div>
          ))}
        </div>
      </section>

      {/* Sister Nodal Centers Section */}
      <section style={{ marginTop: "20px", textAlign: "center" }}>
        <h2 style={{ background: "#004080", height: "50px", color: "white" }}>
          NSM Nodal Centers
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {sisterCenters.map((node, index) => (
            <div key={index}>
              <a
                href={node.url}
                target="_blank"
                rel="noreferrer"
                style={{ color: "black", textDecoration: "none" }}
              >
                <img
                  src={`${STATIC_BASE_URL}/uploads/${node.photo}`}
                  alt={node.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <p>{node.name}</p>
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
