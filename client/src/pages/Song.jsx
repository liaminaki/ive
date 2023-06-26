import React, { useEffect, useState } from 'react'  // Build UI
import axios from 'axios' // HTTP client use to communicate with backend
import { useParams, Link } from 'react-router-dom'

const Song = () => {

    const { albType } = useParams(); // Retrieve the album Type from the URL parameters
    const { albID } = useParams();
    const { albTitle } = useParams(); // Retrieve the album Title from the URL parameters

    const [song, setSong] = useState([])
    const [totalLengthInSeconds, setTotalLengthInSeconds] = useState(0);
    const [numberOfSongs, setNumberOfSongs] = useState(0)
    const [albRelYear, setAlbRelYear] = useState();
    const [editMode, setEditMode] = useState(false);
    const [albPhoto, setAlbPhoto] = useState();

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleDoneEdit = () => {
        setEditMode(false);
    };

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

        const fetchAlbRelYear  = async () => {
            try {
              const res = await axios.get(`http://localhost:8800/albumRelYear/${albID}`);
              setAlbRelYear(res.data);
            } catch (err) {
              console.log(err);
            }
        };

        const fetchAlbPhoto = async () => {
            try{
                const res = await axios.get(`http://localhost:8800/albumPhoto/${albID}`)
                console.log(res)
                setAlbPhoto(res.data);
            } catch(err){
                console.log(err)
            }
        }
    
        fetchAlbPhoto();
        fetchSong()
        fetchTotalLengthInSeconds()
        fetchNumberOfSongs();
        fetchAlbRelYear();
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
                <img src={`http://localhost:8800/img/album-photo/${albPhoto}`} width="100px" alt="Preview" />
                <p>{albRelYear}</p>
                <p>{numberOfSongs} {numberOfSongs === 1 ? 'song' : 'songs'}</p>
                <p>{albumLength.hours !== 0 && `${albumLength.hours} hr `}
                   {albumLength.minutes !== 0 && `${albumLength.minutes} min `}
                   {albumLength.seconds !== 0 && `${albumLength.seconds} sec `}
                </p>
                
                { editMode ? (
                    <div>
                        <button className='edit'><Link to={`/discography/update/${albID}/${albTitle}`}>Edit Album Data</Link></button>

                        {song.map((song)=>(
                            <div className="song" key={song.sID}>
                                <p>{song.sTitle}</p>
                                <button className='delete' onClick={()=>handleDeleteSong(song.sID)}>Delete</button>          
                                <button className='update'><Link to={`/discography/${albType}/${albID}/${albTitle}/update/${song.sID}/${song.sTitle}`}>Update</Link></button>                  
                            </div>
                        ))}
                        <button><Link to={`/discography/${albType}/${albID}/${albTitle}/add`}>Add new song</Link></button>
                        <button onClick={handleDoneEdit}>Done</button>

                    </div>
                ) : (
                    <div>
                    <button className='edit' onClick={handleEditClick}>Edit</button>
                    {song.map((song)=>(
                        <div className="song" key={song.sID}>
                            <span>{song.sOrder} </span> 
                            <span>{song.sTitle} </span>
                            <span>{song.sLengthInHours ? `${song.sLengthInMinutes}:` : ""}</span> 
                            <span>{(song.sLengthInHours && song.sLengthInMinutes) ? `${song.sLengthInMinutes.toString().padStart(2, '0')}:` 
                                    : song.sLengthInMinutes ? `${song.sLengthInMinutes}:`
                                    : (!song.sLengthInHours && !song.sLengthInMinutes && song.sLengthInSeconds) ? "0:" 
                                    : !song.sLengthInSeconds ? ""
                                    : "00:"}
                            </span>
                            <span>{(song.sLengthInHours || song.sLengthInMinutes || song.sLengthInSeconds) ? song.sLengthInSeconds.toString().padStart(2, '0') : "N/A"}</span>                 
                        </div>
                    ))}
                    </div>
                )}
                
            </div>
        </div>
    )
}

export default Song