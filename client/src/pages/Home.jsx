import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css';

const Home = () => {
  return (
    <div className='Homepage'>
        <img src="img/hero.jpg" className='hero'></img>
        <div className='home-members-container'>
          <div className='home-members'>
            <img src="img/hero.jpg" className='home-member'></img>
            <img src="img/hero.jpg" className='home-member'></img>
            <img src="img/hero.jpg" className='home-member'></img>
            <img src="img/hero.jpg" className='home-member'></img>
            <img src="img/hero.jpg" className='home-member'></img>
            <img src="img/hero.jpg" className='home-member'></img>
          </div>
        </div>
    </div>
  )
}

export default Home