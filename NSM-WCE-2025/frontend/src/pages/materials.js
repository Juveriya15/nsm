import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;
const STATIC_BASE_URL=process.env.REACT_APP_STATIC_URL;


const Materials = () => {
  const { topicId } = useParams();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/materials/${topicId}`
        );
        const data = await res.json();
        setMaterials(data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, [topicId]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ textTransform: "capitalize" }}>{topicId} Materials</h2>

      {loading ? (
        <p>Loading...</p>
      ) : materials.length > 0 ? (
        <ul>
          {materials.map((mat) => (
            <li key={mat._id} style={{ marginBottom: "10px" }}>
              {mat.url ? (
                <a href={mat.url} target="_blank" rel="noreferrer">
                  {mat.title}
                </a>
              ) : (
                <a
                  href={`${STATIC_BASE_URL}/uploads/${mat.filename}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {mat.title}
                </a>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No materials available for this topic.</p>
      )}
    </div>
  );
};

export default Materials;
