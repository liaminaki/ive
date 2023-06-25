import React, { useState, useEffect } from 'react';
import axios from 'axios' // HTTP client use to communicate with backend
import { useParams, Link } from 'react-router-dom'

const Member = () => {
    const { mID } = useParams()
    const [member, setMemberData] = useState([])
    const [membersExcOne, setMembersExcOne] = useState([])

    // Run for every render
    useEffect(() => {
        
        const fetchMemberData = async () => {
            try{
                const res = await axios.get(`http://localhost:8800/member/${mID}`)
                console.log(res)
                setMemberData(res.data);
                console.log(member)
            } catch(err){
                console.log(err)
            }
        }

        const fetchMembersExcOne = async () => {
            try{
                const res = await axios.get(`http://localhost:8800/membersExc/${mID}`)
                console.log(res)
                setMembersExcOne(res.data);
            } catch(err){
                console.log(err)
            }
        }

        fetchMembersExcOne()
        fetchMemberData()
    },[mID])
  
  return (
    <div>
        <h1>HI</h1>
        <h1>{member.mStageName}</h1>
        <img src={`http://localhost:8800/img/${member.mPhoto}`} width="100px" alt="Preview" />
        <p>Birth Name: {member.mBirthName}</p>
        <p>English Name: {member.mEnglishName}</p>

        {membersExcOne.map((member)=>(
            <div className="members" key={member.mID}>
            <Link to={`/profile/${member.mID}/${member.mStageName}`}><img src={`http://localhost:8800/img/${member.mPhoto}`} width="100px" alt="Preview" /></Link>
            </div>
        ))}
    </div>
    
  )
}

export default Member