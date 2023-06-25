import React, { useState, useEffect } from 'react';
import axios from 'axios' // HTTP client use to communicate with backend
import { useParams, Link } from 'react-router-dom'

const Member = () => {
    const { mID } = useParams()
    const [memberData, setMemberData] = useState([])

    // Run for every render
    useEffect(() => {
        
        const fetchAllMemberData = async () => {
            try{
                const res = await axios.get(`http://localhost:8800/member/${mID}`)
                console.log(res)
                setMemberData(res.data);
                console.log(memberData)
            } catch(err){
                console.log(err)
            }
        }
        fetchAllMemberData()
    },[mID])
  
  return (
    <div>
        <h1>HI</h1>
        <h1>{memberData.mStageName}</h1>
        <img src={`http://localhost:8800/img/${memberData.mPhoto}`} width="100px" alt="Preview" />
        <p>Birth Name: {memberData.mBirthName}</p>
        <p>English Name: {memberData.mEnglishName}</p>
    </div>
    
  )
}

export default Member