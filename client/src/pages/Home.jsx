import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <h1>IVE</h1>
        <ul>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/profile"}>Profile</Link></li>
            <li><Link to={"/discography"}>Discography</Link></li>
            <li><Link to={"/about"}>About</Link></li>
        </ul>
    </div>
  )
}

export default Home