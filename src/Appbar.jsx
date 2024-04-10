import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Appbar.css'
import { FaBars, FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import MenuIcon from '@mui/icons-material/Menu';

function Appbar({ navigateTo,progress}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen)
  }
  return (
    <nav className='navbar'>
      <div className="nav-wrapper">
        <div className='logo'>
          <a href="#" class="brand-logo custom-logo">
            Travancore Cements
          </a>
        </div>
        <ul class="right hide-on-med-and-down">
          <li >
            <Link onClick={() => {
              progress(100)
              setTimeout(()=>{
                console.log("navigating...")
                navigateTo('existing')
                progress(0)
              },1000)
            }} className="a" to="/existing">Existing</Link>
          </li>
          <li >
            <Link onClick={() => {
              progress(100)
              setTimeout(()=>{
                console.log("navigating...")
                navigateTo('issued')
                progress(0)
              },1000)
            }} className="a" to="/issued">Issued</Link>
          </li>
          <li >
            <Link onClick={() => {
              progress(100)
              setTimeout(()=>{
                console.log("navigating...")
                navigateTo('pending')
                progress(0)
              },1000)
            }} className="a" to="/pending">Pending</Link>
          </li>
          <li>
            <Link onClick={() => {
              progress(100)
              setTimeout(()=>{
                console.log("navigating...")
                navigateTo('review')
                progress(0)
              },1000)
            }} className="a" to="/review">Review</Link>
          </li>
        </ul>
        <div className="icons">
          <div className='menuDiv'>
            <FaBars onClick={toggleMenu} className='icon' id="menu-btn" />
            {isMenuOpen && (
              <div className="menu">
                {/* Add your menu items here */}
                <p>logout</p>
                <p>history</p>
              </div>
            )}
          </div>
          <div className='menuDiv'>
            <FaSearch onClick={toggleSearch} className='icon' id="search-btn" />
            {
              isSearchOpen && (
                <form className='form3'>
                  <input type="search" className='menu' name="search" id="search" placeholder='search here' />
                </form>
              )
            }
          </div>
          <img src="https://www.w3schools.com/howto/img_snow_wide.jpg" alt="" height={50} width={50} />
        </div>
      </div>
    </nav>
  );
}

export default Appbar;

/**
 *  
 */