import React, { useState } from "react";
import Cards from "./dcard";
import "../gallery/Gallery.css";
import "../login/Destinations.css";
import axios from "axios";
import Sdata from "./Sdata";
import { useParams } from "react-router-dom";
const Livretpage = () => {
  const { livretId} = useParams();
  const [livrets, setLivrets] = useState([]);
  const [items, setItems] = useState(Sdata); // Corrected setItems function name
  const fetchLivrets = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/livrets/${livretId}`);
      setLivrets(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchLivrets();
  return (
    <>
      <section className='gallery desi mtop'>
    
          <div className='containe'>
            <div className="card2">
              <div className='content grid'>
                {items.map((item) => {
                  return <Cards key={item.id} item={item} />;
                })}
              </div>
            </div>
          </div>
        
      </section>
    </>
  );
};

export default Livretpage;
