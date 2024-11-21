import React, { useState } from "react"
import "./Navbar.css"
import { Link } from "react-router-dom"
// import Darkmode, { IS_BROWSER } from './darkmode';
const Navbar = () => {
  const [click, setClick] = useState(false)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  return (
    <>
      <nav className='navbar'>
        <div className='container flex_space'>
        <div className='logo'>
            <img src='images/logo1.png' alt='' height={70}  width={200}/>
          </div>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? "fas fa-times" : " fas fa-bars"}></i>
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li>
              <Link to='/' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to='/about' onClick={closeMobileMenu}>
                About us
              </Link>
            </li>
            <li>
              <Link to='/blog' onClick={closeMobileMenu}>
                 Blog
              </Link>
            </li>
            <li>
              <Link to='/contact' onClick={closeMobileMenu}>
                Contact Us
              </Link>
            </li>
           

            <li>
              <Link to='/sign-in'>
                <i class='far fa-chevron-right' ></i>Sign in
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <i class='far fa-chevron-right'></i>Register
              </Link>
            </li>
            <li>
              <Link to='/contact'>
              <i class='far fa-chevron-right'></i>Request a Quote
              </Link>
            </li>
          
          </ul>


        </div>
      </nav>

      <header>
        <div className='container flex_space'>
          

          <div className='contact flex_space '>
            <div className='box flex_space'>
              <div className='icons'>
                <i class='fal fa-clock'></i>
              </div>
              <div className='text'>
                <h4>Working Hours</h4>
                <Link to='/contact'><h4>Always Open</h4></Link>
              </div>
            </div>
            <div className='box flex_space'>
              <div className='icons'>
                <i class='fas fa-phone-volume'></i>
              </div>
              <div className='text'>
                <h4>Call Us</h4>
                <Link to='/contact'><h4>+216 22 225 161</h4> </Link>
              </div>
            </div>
            <div className='box flex_space'>
              <div className='icons'>
                <i class='far fa-envelope'></i>
              </div>
              <div className='text'>
                <h4>Mail Us</h4>
                <Link to='/contact' ><h4>contact@wow-soft.com</h4></Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar