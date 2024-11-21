import React, { useState } from "react"
import HeadTitle from "../../Common/HeadTitle/HeadTitle"
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./design.css"

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const history = useHistory(); 
  const [recValue, setRecValue] = useState([]);
  const [emailExists, setEmailExists] = useState(false);
  const submitForm = async (e) => {
    e.preventDefault();
  
    try{
    const response = await axios.get(`http://localhost:3001/check-email/${email}`,{email});

    if (response.data.exists) {
      console.error("Email already exists");
      setEmailExists(true); 
      // Show an error message to the user
    } else {
      // Make a POST request to your backend registration route
      const response = await axios.post("http://localhost:3001/register", {
        name,
        email,
        password,
        cpassword,
      });

      // Handle the response here (if needed)
      console.log(response.data); // Success message from the backend
      // You can also redirect the user to the login page or show a success message to the user
      history.push("/sign-in");
    } }
    catch (error) {
      console.error(error.response.data); // Error message from the backend
      // You can show an error message to the user
    }

    setName("");
    setEmail("");
    setPassword("");
    setCpassword("");

  }
  return (
    <>
      <HeadTitle />
      <section className='forms top'>
        <div className='containe'>
          <div className='card4'>
            <p>Don't have an account? Create your account, it takes less than a minute.</p>
            <form action='' onSubmit={submitForm}>
              <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' required />
              <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
              <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
              <input type='password' name='cpassword' value={cpassword} onChange={(e) => setCpassword(e.target.value)} placeholder='Confirm Password' required />

              <button type='submit' className='btn'>
                Create an Account
              </button>
              {emailExists && (
                <p className='error-message'>Email already exists. Please use a different email!</p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Register