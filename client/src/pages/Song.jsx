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
        
            
        <div className="song">
            <section id='backButton' className='content'><Link to={`/discography/${albType}`}><img src="/img/backButton.svg"></img></Link></section>
            <section className="albumGradientBG">
                <div className='albumDetails content'>
                    <img className="albumPhoto" src={`http://localhost:8800/img/album-photo/${albPhoto}`} width="100px" alt="Preview" />
                    <div className="right">
                        <div className='editButton' onClick={handleEditClick}><img src="/img/editButton.svg"></img></div>
                        <div className='lower'>
                            <p className="albumType">{albType}</p>
                            <p className="albumName">{albTitle}</p>
                            <p className="albumMoreDetails">
                                {albRelYear} • {numberOfSongs} {numberOfSongs === 1 ? 'song' : 'songs'} • {albumLength.hours !== 0 && `${albumLength.hours} hr `}
                                {albumLength.minutes !== 0 && `${albumLength.minutes} min `}
                                {albumLength.seconds !== 0 && `${albumLength.seconds} sec `}
                            </p>
                        </div>
                        
                    </div>
                    
                </div>
            </section>
        
            { editMode ? (
                <section className='songlist-section'>
                <table className="songlist content" id="no-margin">
                    <thead>
                        <tr>
                            <th className='tracknum'>#</th> 
                            <th className='trackname'>Title</th>
                            <th className='edit-buttons'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {song.map((song)=>(
                            <tr key={song.sID}>
                                <td className='tracknum'>{song.sOrder} </td> 
                                <td className='trackname'>{song.sTitle} </td>
                                <td className='edit-buttons'>
                                    <Link to={`/discography/${albType}/${albID}/${albTitle}/update/${song.sID}/${song.sTitle}`}><img src="/img/editSongButton.svg" className='update'></img></Link>
                                    <img src="/img/removeSongButton.svg" onClick={()=>handleDeleteSong(song.sID)} className='delete'></img>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='content'>
                    <hr className='end-line'></hr>
                    <Link to={`/discography/${albType}/${albID}/${albTitle}/add`}><img src="/img/addSongButton.svg" className='addButton'></img></Link>
                </div>
                <div className='content done'>
                    <img className='done' onClick={handleDoneEdit} src="/img/doneAlbumEditButton.svg"></img>
                </div>
            </section>
                

                    // <table className="songlist">
                        
                    //         <th className='tracknum'>#</th> 
                    //         <th className='trackname'>Title</th>
                    //         <th></th>
                            
                    //         {song.map((song)=>(
                    //         <tr key={song.sID}>
                    //             <td className='tracknum'>{song.sOrder} </td> 
                    //             <td className='trackname'>{song.sTitle} </td>
                    //             <div className='b'>
                    //             <td ><Link to={`/discography/${albType}/${albID}/${albTitle}/update/${song.sID}/${song.sTitle}`}><div className='update'></div></Link></td>
                    //             <td className='delete' ></td>
                    //             </div>
                                
                    //         </tr>
                    //         ))}
                        
                    // </table>
                    // <Link to={`/discography/${albType}/${albID}/${albTitle}/add`}><div className="addButton"></div></Link> 
                    // <button className='done' onClick={handleDoneEdit}></button>
                
                    
                
            ) : (
                
                <section className='songlist-section'>
                    <table className="songlist content" id="no-margin">
                        <thead>
                            <tr>
                                <th className='tracknum'>#</th> 
                                <th className='trackname'>Title</th>
                                <th className='tracklength logo'><img src="/img/timeCategory.svg"></img></th>
                            </tr>
                        </thead>
                        <tbody>
                            {song.map((song)=>(
                                <tr key={song.sID}>
                                    <td className='tracknum'>{song.sOrder} </td> 
                                    <td className='trackname'>{song.sTitle} </td>
                                    <td className='tracklength'>
                                        <span>{song.sLengthInHours ? `${song.sLengthInMinutes}:` : ""}</span> 
                                        <span>{(song.sLengthInHours && song.sLengthInMinutes) ? `${song.sLengthInMinutes.toString().padStart(2, '0')}:` 
                                            : song.sLengthInMinutes ? `${song.sLengthInMinutes}:`
                                            : (!song.sLengthInHours && !song.sLengthInMinutes && song.sLengthInSeconds) ? "0:" 
                                            : !song.sLengthInSeconds ? ""
                                            : "00:"}
                                        </span>
                                        <span>{(song.sLengthInHours || song.sLengthInMinutes || song.sLengthInSeconds) ? song.sLengthInSeconds.toString().padStart(2, '0') : "N/A"}</span>                
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='content'>
                        <hr className='end-line'></hr>
                    </div>
                </section>
                
                
                
            )}
            <div className='black-space'></div>
            
        </div>

        
    )   
}

export default Song