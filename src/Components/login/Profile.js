import React, { useState, useEffect } from "react";
import{ Link }from "react-router-dom";
import HeadTitle from "../../Common/HeadTitle/HeadTitle";
import axios from "axios";
import "./cardstyle.css";
import 'react-pro-sidebar/dist/css/styles.css'
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter} from 'react-pro-sidebar';;
const Profile = ({ email }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [livrets, setLivrets] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(`http://localhost:3001/profile/${email}`);
        setProfileData(response.data);
        if (response.data.profileImage) {
          setProfileImageUrl(response.data.profileImage);
        }
        setLoading(false);
       
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    
    const fetchLivrets = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/livrets/${email}`);
        setLivrets(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchProfileData();
    fetchLivrets();
  }, [email]);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };
  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", profileImage);

      // Send the image to the backend API for upload
      const response = await axios.post(`http://localhost:3001/upload-profile-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Response will contain the image URL saved in the database
      const imageUrl = response.data.imageUrl;

      // Update the profileData state with the new image URL
      setProfileData({ ...profileData, imageUrl });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <HeadTitle />
      <section className='profile-section'>
        <div className='container'>
          <div className='profile-box'>
            {loading ? (
              <p>Loading...</p>
            ) : profileData ? (
              <>
              <>

      <div className="container1">
        <div className="card1">
        <h3 className="name1">{profileData.name}</h3>
           <h3 className="sub-name1">{profileData.surname}</h3>
      

          <div className="content1">
           
           
           
              {profileImageUrl ? (<>
          
              <img src={profileData.profileImage}  alt="Profile" />
              </>
               
             ) : (<>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              <button className="btn" onClick={handleImageUpload}>Upload</button>
              
             </>
                 )}
               
            

            
          </div>
          {livrets.length > 0 ? (
            <> <h3>livrets</h3>
                    <div className="side">
                 
                 <ProSidebar className="co" onToggle={false}  >
                       < Menu iconShape="square"  >
             
                  <SubMenu  >
                 {livrets.map((livret) => (
                    <MenuItem>
                  <Link  to  =  {`/your-livret/${livret._id}`}  ><div  key={livret._id} > {livret.name} </div></Link>   
                  </MenuItem>
                ))}
                  </SubMenu>
                  </Menu>
               <SidebarFooter>
              
                </SidebarFooter>
                  </ProSidebar>
                 </div>
               </>
      
             
                
             
               
              
          
            ) : (
              <p>No livrets found.</p>
            )}
          <Link to='/new-livret' >
                <button className='btn'>CREATE YOU LIVRET</button>
                </Link>
           
                <Link to='/sign-in' >
            <button className='btn'>Back to Login</button>
              
            </Link>
            
        </div>
        
      </div>
    
    </>

               
              </>
            ) : (
              <p>Profile data not found.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
