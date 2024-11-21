import React from "react"
import "./About.css"
import AboutCard from "./AboutCard"
import HeadTitle from "../../Common/HeadTitle/HeadTitle"

const About = () => {
  return (
    <>
      <HeadTitle />

      <section className='about top'>
        <div className='container'>
          <AboutCard />
        </div>
      </section>

      <section className='features top'>
        <div className='container aboutCard flex_space'>
          <div className='row row1'>
            <h1>
              Our <span>Features</span>
            </h1>
            <p className="justify-text">By leveraging the power of QR codes, you can conveniently share the Livret Digital with your hotel's clientele. Each QR code acts as a direct link to the specific Livret Digital, allowing guests to access all the relevant information right from their smartphones. It's a seamless and efficient way to keep your guests informed, engaged, and satisfied throughout their stay.

With our user-friendly interface and intuitive design tools, you can effortlessly customize and tailor each Livret Digital to suit your hotel's unique branding and style. Whether you're a small boutique hotel or a large resort, our website empowers you to create compelling digital booklets that reflect the essence and personality of your establishment.

Join us today and unlock the potential of Livret Digital for your hotel. Enhance guest communication, streamline information sharing, and create unforgettable experiences with our user-friendly platform. Experience the power of digital innovation and elevate your hotel's guest services with our cutting-edge solution.

Discover the possibilities and start creating your Livret Digital today!




</p>
  
            <button className='secondary-btn'>
              Explore More <i className='fas fa-long-arrow-alt-right'></i>
            </button>
          </div>
          <div className='row image'>
            <img src='/images/feature-img-1.jpg' alt='' />
            <div className='control-btn'>
              <button className='prev'>
                <i className='fas fa-play'></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About