import React, { useEffect, useState } from 'react'  // Build UI
import axios from 'axios' // HTTP client use to communicate with backend
import { useParams, Link } from 'react-router-dom'

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
            <h1>Albums</h1>
            <div className="album">
                <h2>{albType}</h2>
                {editMode ? (
                    <div>
                        {album.map((album) => (
                        <div className="album" key={album.albID}>
                            <Link to={`/discography/${albType}/${album.albID}/${album.albTitle}`}>{album.albTitle}</Link>
                            <button className="delete" onClick={() => handleDeleteAlbum(album.albID)}>Delete</button>
                            <button className="update"><Link to={`/discography/update/${album.albID}/${album.albTitle}`}>Update</Link></button>
                        </div>
                        ))}
                        <button><Link to={`/discography/${albType}/add`}>Add new album</Link></button>
                        <button onClick={handleDoneEdit}>Done</button>
                    </div>
                    ) : (
                    <div>
                        <button onClick={handleEditClick}>Edit</button>
                        {album.map((album) => (
                        <div className="album" key={album.albID}>
                            <Link to={`/discography/${albType}/${album.albID}/${album.albTitle}`}>{album.albTitle}</Link>
                        </div>
                        ))}
                    </div>
                    )}
                </div>
        </div>
    )
}

export default Album