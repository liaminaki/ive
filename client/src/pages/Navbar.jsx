import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar () {
  return (
    <div className='navbar-container'>
        <Link to='/' className='home-container'>Home</Link>
        <Link to='/profile' className='profile-container'>Profile</Link>
        <Link to='/discography'className='discography-container'>Discography</Link>
        <Link to= '/about'className='about-container'>About</Link>
        <div className='navbar-logo'></div>
        <div className='spacer'></div>
    </div>
  )
}
        
export default Navbar