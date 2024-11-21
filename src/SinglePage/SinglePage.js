import React, { useState, useEffect } from "react";
import Sdata from "../Components/login/Sdata";
import EmptyFile from "../Common/Empty/EmptyFile";
import { Link,useParams } from "react-router-dom";
import HeadTitle from "../Common/HeadTitle/HeadTitle";
import "./singlepage.css";
import axios from "axios";
const SinglePage = () => {
  const { livretId,id } = useParams();
  
  const [item, setItem] = useState(null);

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
    const [wifiName, setWifiName] = useState('');
    const [wifiCode, setWifiCode] = useState('');
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
    const handleWifiNameChange = (event) => {
      setWifiName(event.target.value);
    };

    const handleWifiCodeChange = (event) => {
      setWifiCode(event.target.value);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
    
      try {
        // Replace 'LIVRET_ID' with the actual livret_id obtained from your Livret data
       
        
        const response = await axios.post(`http://localhost:3001/1/${livretId}`, {
          wifiName,
          wifiCode,
        });
  
        console.log('Response:', response.data);
        setWifiName('');
        setWifiCode('');
      } catch (error) {
        console.log('Error:', error);
      }
   
    };

    return (
      
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={wifiName}
            onChange={handleWifiNameChange}
            placeholder={wifi.ssid}
          />
          <input
            type="text"
            value={wifiCode}
            onChange={handleWifiCodeChange}
            placeholder={wifi.password}
          />
          <button type="submit" className="btn">Submit</button>
        </form>
        



    );
  }


    // Component2 code goes here
  
    function NumberInput({ onAddNumber }) {
      const [number, setNumber] = useState('');
      const [description, setDescription] = useState('');
    
      const handleNumberChange = (event) => {
        setNumber(event.target.value);
      };
    
      const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
      };
      const handleSubmit = async () => {
        try {
          // Replace 'LIVRET_ID' with the actual livret_id obtained from your Livret data
    
          
          const response = await axios.post(`http://localhost:3001/${id}/${livretId}`, {
            number,
            description,
          });
    
          console.log('Response:', response.data);
          setNumber('');
          setDescription('');
        } catch (error) {
          console.log('Error:', error);
        }
      };
      
    
      return (
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={number}
            onChange={handleNumberChange}
            placeholder="Enter a number"
          />
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter a description"
          />
          <button type="submit" className="btn">Add Number</button>
        </form>
      );
    }
    
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
     
      const handleAddNumber = (numberData) => {
        setNumbers([...numbers, numberData]);
      };
    
      return (
        <div>
          <h2>Number List</h2>
          <NumberInput onAddNumber={handleAddNumber} />
          <ul>
            {numbers.map((numberData, index) => (
              <li key={index}>
                Number: {numberData.number}, Description: {numberData.description}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    // Component 4 code goes here
    const Component4  = () => {
      const [name, setName] = useState('');
      const [message, setMessage] = useState('');
      const [savedInfo, setSavedInfo] = useState([]);
    
      const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(`http://localhost:3001/4/${livretId}`, { name, message });
          console.log('Saved data:', response.data);
          setName('');
          setMessage('');
        } catch (error) {
          console.error('Error saving data:', error);
        }
      };
    
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
        <div>
          <h2>Information Form</h2>
          <form onSubmit={handleFormSubmit}>
            <label>
              Name:
              <input type="text" placeholder="title"  value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <br />
            <label>
              Message:
              <textarea value={message} placeholder="your information message" onChange={(e) => setMessage(e.target.value)} />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
    
          <h2>Saved Information</h2>
          <ul>
           
              <li >
          title:    {savedInfo.Name}
              </li>
              <li >
           information :  {savedInfo.Message}
              </li>
     
          </ul>
        </div>
      );
    };

    function Component5() {
      const [text, setText] = useState('');
      const [arrivalTime, setArrivalTime] = useState('');
      const [savedInfo, setSavedInfo] = useState([]);
  const handleArrivalTimeChange = (event) => {
    setArrivalTime(event.target.value);
  };

      const handleTextChange = (event) => {
        setText(event.target.value);
      };
    
    
  
      const handleSubmit = async (event) => {
        event.preventDefault();

    try {
      // Replace 'LIVRET_ID' with the actual livret_id obtained from your Livret data
      const response = await axios.post(`http://localhost:3001/${id}/${livretId}`, {
       
        text,
        arrivalTime,
       
      });

      console.log('Response:', response.data);
      // Reset state values after successful submission
      setText('');
      setArrivalTime('');
    } catch (error) {
      console.log('Error:', error);
    }
  };
  useEffect(() => {
    const Info = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/4/${livretId}`);
        setSavedInfo(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    Info();
  }, []);
    
      return (
        <form onSubmit={handleSubmit}>
          <h2>Give us some informations</h2>
          <input
            type="text"
            value={text}
            
            onChange={handleTextChange}
            placeholder={savedInfo.text}
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









    function Component7() {
      const [text, setText] = useState('');
      const [text1, setText1] = useState('');
      const [ImageUrl,  setImageUrl] = useState('');
      let imageUrl;
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
          const formData = new FormData();
          formData.append("image", Image);
    
          // Send the image to the backend API for upload
          const response = await axios.post(`http://localhost:3001/upload-image`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
   
             imageUrl=response.data.Url;
    
          // Update the profileData state with the new image URL
         
    
          // Update the profileData state with the new image URL
        } catch (error) {
          console.log(error);
        }
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
      <HeadTitle />

      {item ? (
        <section className="single-page top">
          <div className="container">
       

            {/* --------- main-content--------- */}
            <article className="container1">
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
                  <h2>How can we help you?</h2>
                  <p>{item.sidepara}</p>
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
          </div>
        </section>
      ) : (
        <EmptyFile />
      )}
    </>
  );
};

export default SinglePage;
