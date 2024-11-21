import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import HeadTitle from "../../Common/HeadTitle/HeadTitle";
import "./design.css";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const checkProfileExists = async () => {
    try {
      const response = await axios.post("http://localhost:3001/check-profile", { email });
      return response.data.exists;
    } catch (error) {
      console.log("Error checking profile:", error);
      // Handle error if needed
      return false;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const userCredentials = { email, password };

    try {
      const response = await axios.post("http://localhost:3001/login", userCredentials);
      const token = response.data.token;
      localStorage.setItem("token", token);
     
      const profileExists = await checkProfileExists();

      if (profileExists) {
        history.push(`/profile/${email}`);

      } else {
        history.push(`/profile-save/${email}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      // Handle login errors here
    }

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <HeadTitle />
      <section className='forms top'>
        <div className='containe'>
          <div className='card4'>
            <p>Enter your e-mail and password below to log in to your account and use the benefits of our website.</p>
            <form action='' onSubmit={submitForm}>
              <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
              <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />

              <div className='flex_space'>
                <div className='flex'>
                  <input type='checkbox' />
                  <label>Remember Me</label>
                </div>
                <div className='flex'>
                  <span>I forgot my password</span>
                </div>
              </div>

              <button type='submit' className='btn'>
                Sign In
              </button>
              <p>
                Don't have an account? <Link to='/register'>Signup!</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
