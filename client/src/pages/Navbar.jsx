import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar () {
  return (
    <div className='navbar'>
      <div className='navbar-container'>
        <div className='navbar-items left'>
          <Link to='/' className='menu'>Home</Link>
          <Link to='/profile' className='menu'>Profile</Link>
        </div>
        
        <div className='navbar-items center'>
          <Link to='/' className='menu'><img src={`../../img/iveLogo.svg`}></img></Link>
        </div>

        <div className='navbar-items right'>
          <Link to='/discography' className='menu'>Discography</Link>
          <Link to= '/about' className='menu'>About</Link>
        </div>
      </div>
    </div>
    
  )
}
        
export default Navbar