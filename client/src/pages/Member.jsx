import React, { useState, useEffect } from 'react';
import axios from 'axios' // HTTP client use to communicate with backend
import { useParams, Link } from 'react-router-dom'
import "../styles/Member.css"

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
        <div className="a-member">
            <img src={`../../img/member-photo/${member.mPhoto}`} className="member-photo" width="100px" alt="Preview" />
            <div className="member-details">
                <p><span>Birth Name:</span> {member.mBirthName}</p>
                <p><span>English Name:</span> {member.mEnglishName}</p>
                <p><span>Position:</span> {member.mPosition}</p>
                <p><span>Zodiac Sign:</span> {member.mZodiacSign}</p>
                <p><span>Nationality:</span> {member.mNationality}</p>
                <p><span>Height:</span> {member.mHeight}</p>
                <p><span>Weight:</span> {member.mWeight}</p>
                <p><span>Blood Type:</span> {member.mBloodType}</p>
                <p><span>MBTI Type:</span> {member.mMBTIType}</p>
            </div>
        </div>
        
        <div className='other-members'>
            {membersExcOne.map((member)=>(
                <div className="other-member" key={member.mID}>
                <Link to={`/profile/${member.mID}/${member.mStageName}`}><img src={`../../img/member-photo/${member.mPhoto}`} alt="Preview" className='other-member-photo' /></Link>
                </div>
            ))}
        </div>
        
    </div>
    
  )
}

export default Member