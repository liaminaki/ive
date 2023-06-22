import React, { useEffect, useState } from 'react'  // Build UI
import axios from 'axios' // HTTP client use to communicate with backend
import { useParams, Link } from 'react-router-dom'

const Album = () => {
    const { albType } = useParams(); // Retrieve the album type from the URL parameters
    const [album, setAlbum] = useState([])

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

    const handleDelete = async (albID) =>{
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
                {album.map((album)=>(
                    <div className="album" key={album.albID}>
                        <Link to={`/discography/${albType}/${album.albID}/${album.albTitle}`}>{album.albTitle}</Link>
                        {/* <img src={album.image} alt="Album" style={{ width: '200px' }} /> */}
                        <button className='delete' onClick={()=>handleDelete(album.albID)}>Delete</button>          
                        <button className='update'><Link to={`/discography/update/${album.albID}/${album.albTitle}`}>Update</Link></button>                  
                    </div>
                ))}
            </div>
            <button>
                <Link to={`/discography/${albType}/add`}>Add new album</Link>
            </button>
        </div>
    )
}

export default Album