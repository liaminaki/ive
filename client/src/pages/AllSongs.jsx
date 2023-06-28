import React, { useEffect, useState } from 'react'  // Build UI
import axios from 'axios' // HTTP client use to communicate with backend
import { Link } from 'react-router-dom'

const AllSongs = () => {

    const [allSongs, setAllSongs] = useState([])
    const [songsByAlbumType, setSongsByAlbumType] = useState([])
    const [selectedAlbumType, setSelectedAlbumType] = useState('');

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

        const fetchSongsByAlbumType = async (albType) => {
            try{
                const res = await axios.get(`http://localhost:8800/allSongs/${albType}`)
                console.log(res)
                setSongsByAlbumType (res.data);
            } catch(err){
                console.log(err)
            }
        }

        fetchAllSongs()
        fetchAllSongs();
        if (selectedAlbumType) {
          fetchSongsByAlbumType(selectedAlbumType);
        }
    },[selectedAlbumType])

    const handleFilterClick = (albType) => {
        setSelectedAlbumType(albType);
      };
  
    return (
        <div>
            <div className='spacer'></div>
            <h1 className='header'>Songs</h1>

            <button className="filter-button" onClick={() => handleFilterClick('')}>All</button>
            <button className="filter-button" onClick={() => handleFilterClick('Studio Album')}>Studio Album</button>
            <button className="filter-button" onClick={() => handleFilterClick('Mini Album')}>Mini Album</button>
            <button className="filter-button" onClick={() => handleFilterClick('Single Album')}>Single Album</button>
            <button className="filter-button" onClick={() => handleFilterClick('Digital Single')}>Digital Single</button>

            <div className="all-songs">
                {selectedAlbumType ? (
                    <div> 
                        {(selectedAlbumType ? songsByAlbumType : null).map((song, index)=>(
                            <div className="song" key={song.sID}>
                                <p>
                                    <span>{index + 1} |</span>
                                    <span> {song.sTitle} |</span>
                                    <span><Link to={`/discography/${song.albType}/${song.albID}/${song.albTitle}`}> {song.albTitle} |</Link></span>
                                    <span>{song.sLengthInHours ? `${song.sLengthInMinutes}:` : ""}</span> 
                                    <span>{(song.sLengthInHours && song.sLengthInMinutes) ? `${song.sLengthInMinutes.toString().padStart(2, '0')}:` 
                                            : song.sLengthInMinutes ? `${song.sLengthInMinutes}:`
                                            : (!song.sLengthInHours && !song.sLengthInMinutes && song.sLengthInSeconds) ? "0:" 
                                            : !song.sLengthInSeconds ? ""
                                            : "00:"}
                                    </span>
                                    <span>{(song.sLengthInHours || song.sLengthInMinutes || song.sLengthInSeconds) ? song.sLengthInSeconds.toString().padStart(2, '0') : "N/A"}</span>
                                </p>
                            </div>
                    ))}
                    </div>

                    ) : (
                    <div> 
                        {(allSongs ? allSongs : null).map((song, index)=>(
                            <div className="song" key={song.sID}>
                                <p>
                                    <span>{index + 1} |</span>
                                    <span> {song.sTitle} |</span>
                                    <span><Link to={`/discography/${song.albType}/${song.albID}/${song.albTitle}`}> {song.albTitle} |</Link></span>
                                    <span>{song.sLengthInHours ? `${song.sLengthInMinutes}:` : ""}</span> 
                                    <span>{(song.sLengthInHours && song.sLengthInMinutes) ? `${song.sLengthInMinutes.toString().padStart(2, '0')}:` 
                                            : song.sLengthInMinutes ? `${song.sLengthInMinutes}:`
                                            : (!song.sLengthInHours && !song.sLengthInMinutes && song.sLengthInSeconds) ? "0:" 
                                            : !song.sLengthInSeconds ? ""
                                            : "00:"}
                                    </span>
                                    <span>{(song.sLengthInHours || song.sLengthInMinutes || song.sLengthInSeconds) ? song.sLengthInSeconds.toString().padStart(2, '0') : "N/A"}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                    )

                }
            

            </div>
        </div>
    )
}

export default AllSongs