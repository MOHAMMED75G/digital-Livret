import React, { useState } from "react";
import axios from "axios";
import{ Link }from "react-router-dom";
import HeadTitle from "../../Common/HeadTitle/HeadTitle";
import "./cardstyle.css";
const CreateLivret = ({ email }) => {
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState(null); // New state for selected background

  const backgroundOptions = [
    '/images/slider-1.jpg',
    '/images/slider-2.jpg',
    '/images/slider-3.jpg',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Assuming you have a backend route for creating Livrets
      const response = await axios.post(`http://localhost:3001/new-livret`, {
        name,
        interest,
        background: selectedBackground, // Pass the selected background to the backend
        date: new Date(),
        email,
      });

      if (response.status === 201) {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <>
      <HeadTitle />
      <div>
        {success ? (
          <>
           <div className="container1">
          
          <div className="card1">
            <p>Livret created successfully!</p>
            <Link to={`/profile/${email}`} >
              <button className='btn'>Go to your livret</button>
            </Link>
            </div> </div>        </>
        ) : (
          <div className="container1">
          
          <div className="card1">
          <h2>Create a Livret</h2>
                <form onSubmit={handleSubmit}>
            <div>
              <label><h3 className="sub-name1">Name</h3></label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label><h3 className="sub-name1">Interest</h3></label>
              <input
                type="text"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                required
              />
            </div>
            <h3 className="sub-name1">shoose background</h3>
            <div className="background-options">
            
  {backgroundOptions.map((image) => (
    <div
      key={image}
      className={`background-option ${selectedBackground === image ? 'selected' : ''}`}
      style={{
        backgroundImage: `url(${image})`, // Corrected style property with PUBLIC_URL
      }}
      onClick={() => setSelectedBackground(image)}
    >
      {selectedBackground === image && <span>Selected</span>}
    </div>
  ))}
</div>
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Livret"}
            </button>
          </form>
          </div>
          </div>
      
        )}
      </div>
    </>
  );
};

export default CreateLivret;
