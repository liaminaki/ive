import React, { useState, useEffect } from 'react';
import axios from 'axios' // HTTP client use to communicate with backend
import { useParams, Link } from 'react-router-dom'

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
        <h1>Profile</h1>

        {members.map((member)=>(
            <div className="members" key={member.mID}>
            <Link to={`/profile/${member.mID}/${member.mStageName}`}><img src={`http://localhost:8800/img/${member.mPhoto}`} width="100px" alt="Preview" /></Link>
                       
            </div>
        ))}
    </div>
    
  )
}

export default Profile