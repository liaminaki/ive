import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Discography = () => {
    const type = {
        mini: 'Mini Album',
        studio: 'Studio Album',
        single: 'Single Album',
        'digital-single': 'Digital Single',
    };

    const [album, setAlbum] = useState([]);

    // Run for every render
    useEffect(() => {
        const fetchAllAlbum = async () => {
            try{
                const res = await axios.get("http://localhost:8800/discography");
                console.log(res);
                setAlbum(res.data);
            } catch(err){
                console.log(err);
            }
        };
        fetchAllAlbum();
    }, []);
   
    const filterAlbumsByType = (aType) => album.filter((album) => album.albType === aType);
    const limitAlbums = (albums, limit) => albums.slice(0, limit);
  
    return (
      <div>
        <h1>Discography</h1>
        <div className="album-type">
          {Object.keys(type).map((aType) => {
            const filteredAlbums = filterAlbumsByType(aType);
            const limitedAlbums = limitAlbums(filteredAlbums, 3);
  
            return (
              <div key={aType}>
                <h2>{type[aType]}</h2>
                {limitedAlbums.map((album) => (
                  <div className="album" key={album.albID}>
                    <p>{album.albTitle}</p>
                  </div>
                ))}
                <Link to={`/discography/${encodeURIComponent(aType)}`}>See All</Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

export default Discography;