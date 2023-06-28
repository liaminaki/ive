import React, { useEffect, useState } from 'react'  // Build UI
import axios from 'axios' // HTTP client use to communicate with backend
import { useParams, Link } from 'react-router-dom'
import "../styles/Song.css";

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
            {/* <h1>Songs</h1> */}
            <div className="song">
                <div className='spacer'></div>
                <div class="albumGradientBG"></div>
                <img class="albumPhoto" src={`http://localhost:8800/img/album-photo/${albPhoto}`} width="100px" alt="Preview" />
                <p class="albumType">{albType}</p>
                <p class="albumName">{albTitle}</p>
                <div class="albumDetails">
                <p>{albRelYear} • {numberOfSongs} {numberOfSongs === 1 ? 'song' : 'songs'}, {albumLength.hours !== 0 && `${albumLength.hours} hr `}
                    {albumLength.minutes !== 0 && `${albumLength.minutes} min `}
                    {albumLength.seconds !== 0 && `${albumLength.seconds} sec `}</p>
                    {/* <p>{numberOfSongs} {numberOfSongs === 1 ? 'song' : 'songs'}</p>
                    <p>{albumLength.hours !== 0 && `${albumLength.hours} hr `}
                    {albumLength.minutes !== 0 && `${albumLength.minutes} min `}
                    {albumLength.seconds !== 0 && `${albumLength.seconds} sec `}
                    </p> */}
            </div>
            
            <section>
            <Link to={`/discography/${albType}`} class="backButton"></Link>
                <div class="blackBG"></div>
                <div class="startLine"></div>

                <div class="endLine"></div>
            </section>

                    
                
                { editMode ? (
                    <div>
                        <button className='edit'><Link to={`/discography/update/${albID}/${albTitle}`}>Edit Album Data</Link></button>
                        <div class="blackBG"></div>
                        <div class="startLine"></div>
                        <table class="songlist">
                            <tr>
                                <th className='tracknum'>#</th> 
                                <th className='trackname'>Title</th>
                                <th></th>
                                <th></th>
                                
                            </tr>
                                {song.map((song)=>(
                                <tr key={song.sID}>
                                    <td className='tracknum'>{song.sOrder} </td> 
                                    <td className='trackname'>{song.sTitle} </td>
                                    <div className='b'>
                                    <td ><Link to={`/discography/${albType}/${albID}/${albTitle}/update/${song.sID}/${song.sTitle}`}><div className='update'></div></Link></td>
                                    <td className='delete' onClick={()=>handleDeleteSong(song.sID)}></td>
                                    </div>
                                    
                                </tr>
                                ))}
                          
                        </table>
                        <Link to={`/discography/${albType}/${albID}/${albTitle}/add`}><div className="addButton"></div></Link> 
                        <button className='done' onClick={handleDoneEdit}></button>
                    
                       
                    </div>
                ) : (
                    <div>
                    <button className='editButton' onClick={handleEditClick}></button>

                    <table class="songlist">
                            <tr>
                                <th className='tracknum'>#</th> 
                                <th className='trackname'>Title</th>
                                <th className='timeCategory'></th>
                                
                            </tr>
                                {song.map((song)=>(
                                <tr key={song.sID}>
                                    <td className='tracknum'>{song.sOrder} </td> 
                                    <td className='trackname'>{song.sTitle} </td>
                                    <td >
                                    <span className='tracklenght'>{song.sLengthInHours ? `${song.sLengthInMinutes}:` : ""}</span> 
                                    <span className='tracklenght'>{(song.sLengthInHours && song.sLengthInMinutes) ? `${song.sLengthInMinutes.toString().padStart(2, '0')}:` 
                                    : song.sLengthInMinutes ? `${song.sLengthInMinutes}:`
                                    : (!song.sLengthInHours && !song.sLengthInMinutes && song.sLengthInSeconds) ? "0:" 
                                    : !song.sLengthInSeconds ? ""
                                    : "00:"}
                                </span>
                            <span className='tracklenght'>{(song.sLengthInHours || song.sLengthInMinutes || song.sLengthInSeconds) ? song.sLengthInSeconds.toString().padStart(2, '0') : "N/A"}</span>                
                                    </td>
                                </tr>
                                ))}
                          
                        </table>
                    </div>
                )}
                
            </div>
        </div>

        
    )   
}

export default Song