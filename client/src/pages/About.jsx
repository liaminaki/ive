import React, { useState, useEffect } from 'react';
import axios from 'axios' // HTTP client use to communicate with backend
import { useParams, Link } from 'react-router-dom'
import "../styles/About.css";

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
    
    <div className="About">
        <div className='spacer'></div>
        
        <img src="img/groupPhoto.svg" alt='preview' width="1000px"></img>
        
            
        <div className="About-text">
            <img src="img/iveLogo.svg" alt='preview' width="50px" className='logo'></img>
            <div>{group.gDescription}</div>
            <p>Fandom Name: {group.gFandomName}</p>
            
            <p>Official Accounts</p>
            {socials.map((social)=>(
                <div className="Socials" key={social.socID}>
                <span>{social.siteName}: </span>
                <a href={social.link} target="_blank" rel="noopener noreferrer">{social.userName}</a>
                </div>
            ))}
        </div>

    </div>
    
  )
}

export default About