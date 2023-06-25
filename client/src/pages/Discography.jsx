import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Discography = () => {
  const [albumTypes, setAlbumTypes] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbumTypes = async () => {
      try {
        const res = await axios.get('http://localhost:8800/albumTypes');
        setAlbumTypes(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchAllAlbums = async () => {
      try {
        const res = await axios.get('http://localhost:8800/album');
        setAlbums(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAlbumTypes();
    fetchAllAlbums();
  }, []);

  const filterAlbumsByType = (type) => albums.filter((album) => album.albType === type);
  const limitAlbums = (albums, limit) => albums.slice(0, limit);

  return (
    <div>
      <h1>Discography</h1>
      <div className="album-type">
        {albumTypes.map((anAlbumType) => {
          
          if (anAlbumType.albType !== 'All Songs') {
            const filteredAlbums = filterAlbumsByType(anAlbumType.albType);
            const limitedAlbums = limitAlbums(filteredAlbums, 3);

            return (
              <div key={anAlbumType.albType}>
                <Link to={`/discography/${anAlbumType.albType}`}><h2>{anAlbumType.albType}</h2></Link>
                {limitedAlbums.map((album) => (
                  <div className="album" key={album.albID}>
                    <Link to={`/discography/${anAlbumType.albType}/${album.albID}/${album.albTitle}`}>{album.albTitle}</Link>
                  </div>
                ))}
              </div>
            );
          } else {
            return (
                <div key={anAlbumType.albType}>
                <Link to={`/discography/all-songs`}><h2>{anAlbumType.albType}</h2></Link>
                </div>
            ); 
          }
        })}
      </div>
    </div>
  );
};

export default Discography;