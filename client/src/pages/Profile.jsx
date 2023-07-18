import React, { useState, useEffect } from 'react';
import axios from 'axios' // HTTP client use to communicate with backend
import { useParams, Link } from 'react-router-dom'
import "../styles/Profile.css"

const Profile = () => {
    const [members, setMembers] = useState([])

    // Run for every render
    useEffect(() => {
        const fetchAllMembers = async () => {
            try{
                const res = await axios.get(`http://localhost:8800/member`)
                console.log(res)
                setMembers(res.data);
            } catch(err){
                console.log(err)
            }
        }
        fetchAllMembers()
    },[])
  
  return (
    <div>
        <div className='header'>Profile</div>
        <div className='allMembers'>
            {members.map((member)=>(
                <div className="allMembers-photos" key={member.mID}>
                <Link to={`/profile/${member.mID}/${member.mStageName}`}><img src={`../../img/member-photo/${member.mPhoto}`} width="200px" className="allMembers-photo" alt="Preview" /></Link>
                </div>
            ))}
        </div>

    </div>
    
  )
}

export default Profile