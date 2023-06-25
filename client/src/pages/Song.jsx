import React, { useEffect, useState } from 'react'  // Build UI
import axios from 'axios' // HTTP client use to communicate with backend
import { useParams, Link } from 'react-router-dom'

const Song = () => {

    const { albType } = useParams(); // Retrieve the album Type from the URL parameters
    const { albID } = useParams();
    const { albTitle } = useParams(); // Retrieve the album Title from the URL parameters

    const [song, setSong] = useState([])
    const [totalLengthInSeconds, setTotalLengthInSeconds] = useState(0);
    const [numberOfSongs, setNumberOfSongs] = useState(0);

    // Run for every render
    useEffect(() => {
        const fetchSong = async () => {
            try{
                const res = await axios.get(`http://localhost:8800/album/albType/${albTitle}/songs`)
                console.log(res)
                setSong(res.data);
            } catch(err){
                console.log(err)
            }
        }

        const fetchTotalLengthInSeconds = async () => {
            try {
              const res = await axios.get(`http://localhost:8800/albumLength/${albID}`);
              setTotalLengthInSeconds(res.data);
            } catch (err) {
              console.log(err);
            }
          };
        
        const fetchNumberOfSongs  = async () => {
            try {
              const res = await axios.get(`http://localhost:8800/albumNumberOfSongs/${albID}`);
              setNumberOfSongs(res.data);
            } catch (err) {
              console.log(err);
            }
          };

        fetchSong()
        fetchTotalLengthInSeconds()
        fetchNumberOfSongs();
    },[albID, albTitle])

    const handleDeleteSong = async (sID) =>{
        try{
            await axios.delete(`http://localhost:8800/album/albType/albTitle/songs/${sID}`)
            window.location.reload() // Refresh page
        }
        catch(err){
            console.log(err)
        }
    }

    const handleDeleteAlbum = async (albID) =>{
        try{
            await axios.delete(`http://localhost:8800/album/${albID}`)
            window.location.reload() // Refresh page
        }
        catch(err){
            console.log(err)
        }
    }

    const convertSecondsToTime = (totalLength) => {
        const hours = Math.floor(totalLength/ 3600);
        const minutes = Math.floor((totalLength % 3600) / 60);
        const seconds = totalLength % 60;
      
        return {
          hours: hours,
          minutes: minutes,
          seconds: seconds
        };
      }
    
    const albumLength = convertSecondsToTime(totalLengthInSeconds);
    
  
    return (
        <div>
            <h1>Songs</h1>
            <div className="song">
                <h2>{albTitle}</h2>
                <p>{numberOfSongs} songs</p>
                <p>{albumLength.hours !== 0 && `${albumLength.hours} hr `}
                   {albumLength.minutes !== 0 && `${albumLength.minutes} min `}
                   {albumLength.seconds !== 0 && `${albumLength.seconds} sec `}
                </p>
                
                <button className='delete' onClick={()=>handleDeleteAlbum(albID)}>Delete</button>          
                <button className='update'><Link to={`/discography/update/${albID}/${albTitle}`}>Update</Link></button>

                {song.map((song)=>(
                    <div className="song" key={song.sID}>
                        <p>{song.sTitle}</p>
                        {/* <img src={song.image} alt="Song" style={{ width: '200px' }} /> */}
                        <button className='delete' onClick={()=>handleDeleteSong(song.sID)}>Delete</button>          
                        <button className='update'><Link to={`/discography/${albType}/${albID}/${albTitle}/update/${song.sID}/${song.sTitle}`}>Update</Link></button>                  
                    </div>
                ))}
            </div>
            <button>
                <Link to={`/discography/${albType}/${albID}/${albTitle}/add`}>Add new song</Link>
            </button>
        </div>
    )
}

export default Song