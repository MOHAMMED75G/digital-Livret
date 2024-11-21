import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LivretsPage = () => {
  const [livrets, setLivrets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLivrets = async () => {
      try {
        const response = await axios.post("http://localhost:3001/livrets"); // Endpoint to fetch all livrets
        setLivrets(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchLivrets();
  }, []);

  return (
    <>
      <h1>Livrets</h1>
      {loading ? (
        <p>Loading...</p>
      ) : livrets.length === 0 ? (
        <p>No livrets found.</p>
      ) : (
        <div className="livrets-container">
          {livrets.map((livret) => (
            <div key={livret._id} className="livret-card">
             
              <div className="livret-details">
                {/* <h2>{livret.name}</h2> */}
                {/* Add more livret details as needed */}
              </div>
            </div>
          ))}
        </div>
      )}
      <Link to="/profile/:email">Back to Profile</Link>
    </>
  );
};

export default LivretsPage;
