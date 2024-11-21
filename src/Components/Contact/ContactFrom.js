import React, { useState } from "react"
import axios from 'axios';
import "./Contact.css"



const ContactFrom = () => {
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [company, setCompany] = useState("")
  const [message, setMessage] = useState("")

  const [allValue, setAllValue] = useState([])
  const formSubmit = (e) => {
    e.preventDefault()

    const newValue = { fname, lname, phone, email, subject, company, message }
    setAllValue([...allValue, newValue])
    axios
      .post('http://localhost:3001/contact', newValue)
      .then((response) => {
        console.log(response.data);
        // Handle success, e.g., show a success message to the user
      })
      .catch((error) => {
        console.error(error);
        // Handle error, e.g., show an error message to the user
      });
    setFname("");
    setLname("");
    setPhone("");
    setEmail("");
    setSubject("");
    setCompany("");
    setMessage("");

    
  }
  return (
    <>
      <section className='contact mtop'>
        <div className='contain flex'>
          <div className='card4'>
            <h2>Contact From</h2>
            <p>Fill out the form below, we will get back you soon.</p>

            <form onSubmit={formSubmit}>
              <div className='grid1'>
                <div className='input'>
                  <span>
                    First Name <label>*</label>
                  </span>
                  <input type='text' name='fname' value={fname} onChange={(e) => setFname(e.target.value)} required />
                </div>
                <div className='input'>
                  <span>
                    Last Name <label>*</label>
                  </span>
                  <input type='text' name='lname' value={lname} onChange={(e) => setLname(e.target.value)} required />
                </div>
                <div className='input'>
                  <span>
                    Phone Number <label>*</label>
                  </span>
                  <input type='number' name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className='input'>
                  <span>
                    Email <label>*</label>
                  </span>
                  <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='input'>
                  <span>Subject</span>
                  <input type='text' name='subject' value={subject} onChange={(e) => setSubject(e.target.value)} />
                </div>
                <div className='input'>
                  <span>Your Company</span>
                  <input type='text' name='company' value={company} onChange={(e) => setCompany(e.target.value)} />
                </div>
              </div>
              <div className='input inputlast'>
                <span>
                  Write Your Message <label>*</label>
                </span>
                <textarea cols='30' rows='10' name='message' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
              </div>
              <button className='btn'>Submit Now</button>
            </form>
          </div>

          <div className='card4'>
            <h3>Visit our location</h3>
            <a href="https://www.google.com/maps?q=latitude,longituhttps://www.google.tn/maps/place/Cyberparc+Tataouine/" target="_blank" rel="noopener noreferrer">
     <button className="btn" > View Location on Google Maps</button>  
      </a>
            <br />
            <br />
            <h3>Message us</h3>
            <span>contact@wow-soft.com</span>
            <br />
            <br />
            <h3>Call Us</h3>
            <span>+216 22 225 161</span>
            <br />

            <div className='icon'>
              <h3>Follow Us</h3>
       
              <div className='flex_space'>
                <i className='fab fa-facebook-f'></i>
                <i className='fab fa-twitter'></i>
                <i className='fab fa-linkedin'></i>
                <i className='fab fa-instagram'></i>
                <i className='fab fa-pinterest'></i>
                <i className='fab fa-youtube'></i>
              </div>
            </div>
           <img src="https://st2.depositphotos.com/1265075/7365/i/450/depositphotos_73656201-stock-photo-web-contact-us-icons-cubes.jpg" alt="" className="image5"/>  
            
          </div>
        </div>
      </section>

      <section className='show-data'>
        {allValue.map((cureentValue) => {
          const { fname, lname, phone, email, subject, company, message } = cureentValue
          return (
            <>
              <div className='sign-box'>
                <h1>Send Successfully</h1>
                <h3>
                  First Name : <p>{fname}</p>
                </h3>
                <h3>
                  Last Name : <p>{lname}</p>
                </h3>
                <h3>
                  Contact Number : <p>{phone}</p>
                </h3>
                <h3>
                  Email : <p>{email}</p>
                </h3>
                <h3>
                  Subject : <p>{subject}</p>
                </h3>
                <h3>
                  Company Name: <p>{company}</p>
                </h3>
                <h3>
                  Your Message : <p>{message}</p>
                </h3>
              </div>
            </>
          )
        })}
      </section>
    </>
  )
}

export default ContactFrom