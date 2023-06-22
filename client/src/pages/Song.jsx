import React, { useEffect, useState } from 'react'  // Build UI
import axios from 'axios' // HTTP client use to communicate with backend
import { useParams, Link } from 'react-router-dom'

const Song = () => {

    const { albTitle } = useParams(); // Retrieve the album ID from the URL parameters

    const [song, setSong] = useState([])

    // Run for every render
    useEffect(() => {
        const fetchAllSong = async () => {
            try{
                const res = await axios.get(`http://localhost:8800/discography/albType/${albTitle}/songs`)
                console.log(res)
                setSong(res.data);
            } catch(err){
                console.log(err)
            }
        }
        fetchAllSong()
    },[])

    const handleDelete = async (sID) =>{
        try{
            await axios.delete(`http://localhost:8800/discography/albType/albTitle/songs/${sID}`)
            window.location.reload() // Refresh page
        }
        catch(err){
            console.log(err)
        }
    }
  
    return (
        <div>
            <h1>Songs</h1>
            <div className="song">
                <h2>{albTitle}</h2>
                {song.map((song)=>(
                    <div className="song" key={song.sID}>
                        <p>{song.sTitle}</p>
                        {/* <img src={song.image} alt="Song" style={{ width: '200px' }} /> */}
                        <button className='delete' onClick={()=>handleDelete(song.sID)}>Delete</button>          
                        {/* <button className='update'><Link to={`/discography/update/${song.albID}`}>Update</Link></button>                   */}
                    </div>
                ))}
            </div>
            <button>
                Add{/* <Link to={`/discography/${albTitle}/add`}>Add new song</Link> */}
            </button>
        </div>
    )
}

export default Song