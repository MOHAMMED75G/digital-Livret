import React from "react"
import "./About.css"

const AboutCard = () => {
  return (
    <>
      <div className='aboutCard mtop flex_space'>
        <div className='row row1'>
          <h1>About Us</h1>
          <h2>
            We <span>provide Solution</span> to make Livret Digital
          </h2>
          <p className="justify-text">Our platform simplifies the process of creating Livret Digital, enabling you to curate and present all the essential information about your hotel in a visually appealing and interactive format. From showcasing room amenities, providing local recommendations, and highlighting special offers to sharing hotel policies and services, our Digital Booklets serve as comprehensive guides that enhance the overall guest experience.</p>
          
          <button className='secondary-btn'>
            TRY <i className='fas fa-long-arrow-alt-right'></i>
          </button>
        </div>
        <div className='row image'>
          <img src='/images/photo.webp' alt='' height={300} width={400}  />
          <div className='control-btn'>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutCard