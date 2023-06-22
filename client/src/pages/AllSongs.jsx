import React, { useEffect, useState } from 'react'  // Build UI
import axios from 'axios' // HTTP client use to communicate with backend

const AllSongs = () => {

    const [allSongs, setAllSongs] = useState([])

    // Run for every render
    useEffect(() => {
        const fetchAllSongs = async () => {
            try{
                const res = await axios.get("http://localhost:8800/allSongs")
                console.log(res)
                setAllSongs(res.data);
            } catch(err){
                console.log(err)
            }
        }
        fetchAllSongs()
    },[])
  
    return (
        <div>
            <h1>All Songs</h1>
            <div className="all-songs">
                {allSongs.map((song)=>(
                    <div className="song" key={song.sID}>
                        <p>{song.sTitle}</p>
                        {/* <img src={song.image} alt="Song" style={{ width: '200px' }} /> */}
                        {/* <button className='delete' onClick={()=>handleDelete(song.sID)}>Delete</button>           */}
                        {/* <button className='update'><Link to={`/discography/update/${song.albID}`}>Update</Link></button>                   */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllSongs