import React, { useEffect, useState } from 'react'  // Build UI
import axios from 'axios' // HTTP client use to communicate with backend
import { useParams, Link } from 'react-router-dom'
import '../styles/Album.css';

const Album = () => {
    const { albType } = useParams(); // Retrieve the album type from the URL parameters
    const [album, setAlbum] = useState([])
    const [editMode, setEditMode] = useState(false);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleDoneEdit = () => {
        setEditMode(false);
    };


    // Run for every render
    useEffect(() => {
        const fetchAllAlbum = async () => {
            try{
                const res = await axios.get(`http://localhost:8800/album/${albType}`)
                console.log(res)
                setAlbum(res.data);
            } catch(err){
                console.log(err)
            }
        }
        fetchAllAlbum()
    },[])

    const handleDeleteAlbum = async (albID) =>{
        try{
            await axios.delete(`http://localhost:8800/album/${albID}`)
            window.location.reload() // Refresh page
        }
        catch(err){
            console.log(err)
        }
    }
  
    return (
        <div>
            
                <h2 className='header'>{albType}</h2>
                {editMode ? ( 
                    <div className="albumsByType">
                        <div className="albums"> 
                            {album.map((album) => (
                            <div className="anAlbum" key={album.albID}>
                                <Link to={`/discography/${albType}/${album.albID}/${album.albTitle}`}>
                                    <div className='anAlbumPhoto'><img src={`http://localhost:8800/img/album-photo/${album.albPhoto}`} alt="Preview" width="300px"/></div>
                                    <div className='anAlbumTitle'>{album.albTitle}</div>
                                </Link>
                                <button className="delete" onClick={() => handleDeleteAlbum(album.albID)}>Delete</button>
                                <button className="update"><Link to={`/discography/update/${album.albID}/${album.albTitle}`}>Update</Link></button>
                            </div>
                            ))}
                        </div>
                        <button><Link to={`/discography/${albType}/add`}>Add new album</Link></button>
                        <button onClick={handleDoneEdit}>Done</button>
                    </div>
                    ) : (
                        <div className="albumsByType">
                            <button onClick={handleEditClick}>Edit</button>
                            <div className="albums"> 
                                {album.map((album) => (
                                <div className="anAlbum" key={album.albID}>
                                    <Link to={`/discography/${albType}/${album.albID}/${album.albTitle}`}>
                                        <div className='anAlbumPhoto'><img src={`http://localhost:8800/img/album-photo/${album.albPhoto}`} alt="Preview" width="300px"/></div>
                                        <div className='anAlbumTitle'>{album.albTitle}</div>
                                    </Link>
                                </div>
                                ))}
                            </div>
                        </div>
                    )}
                
        </div>
    )
}

export default Album