import React, { useEffect, useState } from 'react'  // Build UI
import axios from 'axios' // HTTP client use to communicate with backend
import { Link } from 'react-router-dom'

const Album = () => {
    
    const [album, setAlbum] = useState([])

    // Run for every render
    useEffect(() => {
        const fetchAllAlbum = async () => {
            try{
                const res = await axios.get("http://localhost:8800/discography")
                console.log(res)
                setAlbum(res.data);
            } catch(err){
                console.log(err)
            }
        }
        fetchAllAlbum()
    },[])

    // const handleDelete = async (id) =>{
    //     try{
    //         await axios.delete("http://localhost:8800/album/"+id)
    //         window. location.reload() // Refresh page
    //     }
    //     catch(err){
    //         console.log(err)
    //     }
    // }
  
    return (
        <div>
            <h1>Albums</h1>
            <div className="album">
                {album.map((album)=>(
                    <div className="album" key={album.albID}>
                        <p>{album.albTitle}</p>
                        {/* <img src={album.image} alt="Album" style={{ width: '200px' }} />
                        <button className='delete' onClick={()=>handleDelete(album.id)}>Delete</button>          
                        <button className='update'><Link to={`/update/${album.id}`}>Update</Link></button>                   */}
                    </div>
                ))}
            </div>
            <button>
                <Link to="/discography/add">Add new album</Link>
            </button>
        </div>
    )
}

export default Album