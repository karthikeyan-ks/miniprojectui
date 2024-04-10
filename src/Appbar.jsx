import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Appbar.css'
import { FaBars, FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import MenuIcon from '@mui/icons-material/Menu';

function Appbar({ navigateTo }) {
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
            <Link onClick={() => { navigateTo('existing') }} className="a" to="/existing">Existing</Link>
          </li>
          <li >
            <Link onClick={() => navigateTo('issued')} className="a" to="/issued">Issued</Link>
          </li>
          <li >
            <Link onClick={() => navigateTo('pending')} className="a" to="/pending">Pending</Link>
          </li>
          <li>
            <Link onClick={() => navigateTo('review')} className="a" to="/review">Review</Link>
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