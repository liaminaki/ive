import React, { useState, useEffect } from 'react';
import axios from 'axios' // HTTP client use to communicate with backend
import { useParams, Link } from 'react-router-dom'

const About = () => {
    const [group, setGroup] = useState([])

    // Run for every render
    useEffect(() => {
        const fetchAllGroup = async () => {
            try{
                const res = await axios.get(`http://localhost:8800/group`)
                console.log(res)
                setGroup(res.data);
            } catch(err){
                console.log(err)
            }
        }
        fetchAllGroup()
    },[])
  
  return (
    <div>
        <h1>{group.gName}</h1>
        <img src={`http://localhost:8800/img/${group.gPhoto}`} width="100px" alt="Preview" />
        <p>{group.gDescription}</p>
        <p></p>
        
    </div>
    
  )
}

export default About