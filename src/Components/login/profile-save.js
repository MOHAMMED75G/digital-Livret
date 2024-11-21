import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import HeadTitle from "../../Common/HeadTitle/HeadTitle";
import "./design.css";
import axios from "axios";

const ProfileSave = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [location, setLocation] = useState("");
  const history = useHistory();

  const saveProfile = async (e) => {
    e.preventDefault();
    const profileData = { email,name, surname, location };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User not logged in");
        return;
      }

      await axios.post(`http://localhost:3001/save-profile/${email}`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      history.push(`/profile/${email}`);
    } catch (error) {
      console.error("Error saving profile:", error);
      // Handle error if needed
    }
    setEmail("");
    setName("");
    setSurname("");
    setLocation("");
  };

  return (
    <>
      <HeadTitle />
      <section className='forms top'>
        <div className='container'>
          <div className='sign-box'>
            <p>Enter your profile information below.</p>
            <form action='' onSubmit={saveProfile}>
            <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
              <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
              <input type='text' name='surname' value={surname} onChange={(e) => setSurname(e.target.value)} placeholder='Surname' />
              <input type='text' name='location' value={location} onChange={(e) => setLocation(e.target.value)} placeholder='Location' />

              <button type='submit' className='primary-btn'>
                Save Profile
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileSave;
