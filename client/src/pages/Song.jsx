import React, { useEffect, useState } from 'react'  // Build UI
import axios from 'axios' // HTTP client use to communicate with backend
import { useParams, Link } from 'react-router-dom'

const Song = () => {

    const { albID } = useParams(); // Retrieve the album ID from the URL parameters

    const [song, setSong] = useState([])

    // Run for every render
    useEffect(() => {
        const fetchAllSong = async () => {
            try{
                const res = await axios.get(`http://localhost:8800/discography/albType/${albID}/songs`)
                console.log(res)
                setSong(res.data);
            } catch(err){
                console.log(err)
            }
        }
        fetchAllSong()
    },[])

    // const handleDelete = async (albID) =>{
    //     try{
    //         await axios.delete("http://localhost:8800/discography/"+albID)
    //         window.location.reload() // Refresh page
    //     }
    //     catch(err){
    //         console.log(err)
    //     }
    // }
  
    return (
        <div>
            <h1>Songs</h1>
            <div className="song">
                <h2>{albID}</h2>
                {song.map((song)=>(
                    <div className="song" key={song.sID}>
                        <p>{song.sTitle}</p>
                        {/* <img src={song.image} alt="Song" style={{ width: '200px' }} /> */}
                        {/* <button className='delete' onClick={()=>handleDelete(song.albID)}>Delete</button>          
                        <button className='update'><Link to={`/discography/update/${song.albID}`}>Update</Link></button>                   */}
                    </div>
                ))}
            </div>
            <button>
                <Link to={`/discography/${albID}/add`}>Add new song</Link>
            </button>
        </div>
    )
}

export default Song