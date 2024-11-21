import React from "react"
import "./download.css"

const Download = () => {
  return (
    <>
      <section className='download top'>
        <div className='container flex_space'>
          <div className='row'>
            <h3>Call Us Now</h3>
            <h1>Looking for a meeting venue?</h1>
            <ul>
              <li>&#10003; That offers top-notch facilities and exceptional service</li>
              <li>&#10003; Our meeting and event spaces are equipped with everything</li>
              <li>&#10003; Our dedicated event team will be on hand to ensure everything you need is taken care of</li>
              <li>&#10003; Book with us today and experience the ultimate in business hospitality.</li>
              <li>&#10003; No booking or credit card fees</li>
              <li>&#10003; No booking or credit card fees</li>
              <li>&#10003; Add your own reviews and photos</li>
            </ul>
            <div className='img flex'>
              <img src='/images/appstore-button.png' alt='' />
              <img src='/images/google-play-button.png' alt='' />
              
            </div>
          </div>
          <div className='row row2'>
          <img src='/images/app-image-1.png' alt='' className='image' />
          </div>
        </div>
      </section>
    </>
  )
}

export default Download