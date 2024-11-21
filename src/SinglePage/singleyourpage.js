import React, { useState, useEffect } from "react";
import Sdata from "../Components/login/Sdata";
import EmptyFile from "../Common/Empty/EmptyFile";
import { Link,useParams } from "react-router-dom";
import "./single.css";
import axios from "axios";
const singleyourpage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { livretId,id } = useParams();
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [item, setItem] = useState(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    let item = Sdata.find((item) => item.id === parseInt(id));
    if (item) {
      setItem(item);
    }
  }, [id]);

  const renderComponent = (itemId) => {
    switch (itemId) {
      case 1:
        return <Component1 />;
      case 3:
        return <Component2 />;
      case 4:
        return <Component4 />;
      case 5:
        return <Component5 />;
      case 7:
          return <Component7 />;
      default:
        return null;
    }
  };

  function Component1() {
  
    const [wifi, setwifi] = useState([]);
    useEffect(() => { 
      const fetchLivrets = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/1/${livretId}`);
          setwifi(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchLivrets();
    }, );
  
   
    return (
        <>
           {wifi ?(<>  
            <div className="card1">
        <p>{wifi.ssid}</p>
        <p>{wifi.password}</p>
     </div>
        
              </>     
             ):
             (<> 
             <div className="card2">
   
           <h2>NO Saved Information</h2>
        
           </div>
             
     </>)}
</>

    );
  }


    // Component2 code goes here
  
    
      
    
 
    
    function Component2() {
      const [numbers, setNumbers] = useState([]);
      useEffect(() => { 
        const fetchLivrets = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/3/${livretId}`);
            setNumbers(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchLivrets();
      }, );
     
    
    
      return (
     
           <>
           {numbers ?(<>  
            <div className="card3">
          <h1>Number List</h1>
          
          <ul>
            {numbers.map((numberData, index) => (
              <li key={index}>
               <h3>Number: {numberData.number} </h3> 
               <h3 >Description: {numberData.description}</h3> </li>
            ))}
          </ul>
        </div>
              </>     
             ):
             (<> 
             <div className="card2">
   
           <h2>NO Saved Information</h2>
        
           </div>
             
     </>)}
        
             </>
           
      );
    }
    // Component 4 code goes here
    const Component4  = () => {
  
      const [savedInfo, setSavedInfo] = useState([]);
    
   
      useEffect(() => {
        const fetchSavedInfo = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/4/${livretId}`);
            setSavedInfo(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchSavedInfo();
      }, []);
    
      return (
        <>
        {savedInfo ?(<>  
            <div className="card2">
   <h2>Saved Information</h2>
   <ul> 
   <h3 > title:  {savedInfo.Name}</h3>  
       
  <h3 >information :    {savedInfo.Message}</h3>    
   </ul>
 </div>
           </>     
          ):
          (<> 
          <div className="card2">

        <h2>NO Saved Information</h2>
     
        </div>
          
  </>)}
     
          </>
        
      );
    };

    function Component5() {
      const [savedInfo, setSavedInfo] = useState([]);

    
  
  useEffect(() => {
    const Info = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/5/${livretId}`);
        setSavedInfo(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    Info();
  }, []);
    
      return (
        <>
         {savedInfo ?(<>
            
            
            <div className="card2">
         
     
            <h2>Saved Information</h2>
                  <ul>
                   
                  <h3 > info:  {savedInfo.Name}</h3>  
                      
                 <h3 >time :    {savedInfo.Time}</h3>  
                    
                      
             
                  </ul>
        
        
            </div>
            </>
        
            
            
            
            
           ):
           (<> 
           <div className="card2">

         <h2>NO Saved Information</h2>
      
         </div>
           
   </>)}
      
           </>
      );
    }









    function Component7() {
      const [text, setText] = useState('');
      const [text1, setText1] = useState('');
      const [imageUrl, setImageUrl] = useState('');
      const [arrivalTime, setArrivalTime] = useState('');
      const [Image, setImage] = useState(null);
  const handleArrivalTimeChange = (event) => {
    setArrivalTime(event.target.value);
  };

      const handleTextChange = (event) => {
        setText(event.target.value);
      };
      const handleTextChange1 = (event) => {
        setText1(event.target.value);
      };
      
    
    
    
       
      const handleSubmit = async (event) => {
        event.preventDefault();

    try {
      // Replace 'LIVRET_ID' with the actual livret_id obtained from your Livret data
      
      
      const response = await axios.post(`http://localhost:3001/${id}/${livretId}`, {
        text,
        text1,
        arrivalTime,
        imageUrl,
      });

      console.log('Response:', response.data);
      // Reset state values after successful submission
      setText('');
      setText1('');
      setArrivalTime('');
      setImageUrl('');
    } catch (error) {
      console.log('Error:', error);
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };
  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", Image);

      // Send the image to the backend API for upload
      const response = await axios.post(`http://localhost:3001/upload-profile-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Response will contain the image URL saved in the database
      setImageUrl( response.data.imageUrl);

      // Update the profileData state with the new image URL
     

      // Update the profileData state with the new image URL
    } catch (error) {
      console.log(error);
    }
  };

    
      return (
        <form onSubmit={handleSubmit}>
          <h2>Give us some informations</h2>
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter RH name"
          />
          <h2>Bureau</h2>
          <h3>Enter Bureau RH</h3>
          
          <input type="file" accept="image/*" onChange={handleImageChange} />
              <button className="btn" onClick={handleImageUpload}>Upload</button>
          <h2>Parking</h2>
          <input
            type="text"
            value={text1}
            onChange={handleTextChange1}
            placeholder="Enter informations"
          />
          <h2>Tranche horaire d’arrivée
Horaires</h2>
<input
            type="text"
            value={arrivalTime}
            onChange={handleArrivalTimeChange}
            placeholder="Enter informations"
          />
          <button type="submit" className="btn">submit</button>
        </form>
      );
    }
    
    

  

  return (
    <>
     

      {item ? (
         <div className="cotainer">
        <section className="single-page top">
         
       

            {/* --------- main-content--------- */}
            <article className="cotainer1">
              <div className="card1">
                <div className="image1"><img src={item.image} alt="" /></div>
                <p>{item.desc}</p>
                {renderComponent(item.id)}
                {/* Rest of the content */}
              </div>
              {/* --------- main-content--------- */}

              {/* --------- side-content--------- */}
              <div className='side-content'>
                <div className='box'>
                  <h2>Feel Free ❤</h2>
                  <Link  to='/contact'  ><button className='btn'>  
                    <i className='fa fa-phone-alt'></i> Contact Us
                  </button></Link>
              
                </div>

                <div className='box2'>
                  <p>{item.sidepara}</p>
                </div>
              </div>
              {/* --------- side-content--------- */}
            </article>
         
        </section>
        </div>
      ) : (
        <EmptyFile />
      )}
    </>
  );
};

export default singleyourpage;
