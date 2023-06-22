import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <h1>IVE</h1>
        <Link to={"/discography"}>Discography</Link>
    </div>
  )
}

export default Home