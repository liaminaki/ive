import React, { useState, useEffect } from 'react';
import axios from 'axios' // HTTP client use to communicate with backend
import { useParams, Link } from 'react-router-dom'

const About = () => {
    const [group, setGroup] = useState([])
    const [socials, setSocials] = useState([])

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

        const fetchSocials = async () => {
            try{
                const res = await axios.get(`http://localhost:8800/socials`)
                console.log(res)
                setSocials(res.data);
            } catch(err){
                console.log(err)
            }
        }

        fetchAllGroup()
        fetchSocials()
    },[])
  
  return (
    <div>
        <h1>{group.gName}</h1>
        <img src={`http://localhost:8800/img/${group.gPhoto}`} width="100px" alt="Preview" />
        <p>{group.gDescription}</p>
        <p>Fandom Name: {group.gFandomName}</p>
        
        <p>Official Accounts</p>
        {socials.map((social)=>(
            <div className="socials" key={social.socID}>
            <span>{social.siteName}: </span>
            <Link to={`/`}>{social.userName}</Link>
            </div>
        ))}
    </div>
    
  )
}

export default About