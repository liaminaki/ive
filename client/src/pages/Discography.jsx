import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Discography = () => {
  const [albumTypes, setAlbumTypes] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbumTypes = async () => {
      try {
        const res = await axios.get('http://localhost:8800/album-types');
        setAlbumTypes(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchAllAlbums = async () => {
      try {
        const res = await axios.get('http://localhost:8800/discography');
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
        {albumTypes.map((albumType) => {
          const filteredAlbums = filterAlbumsByType(albumType.albType);
          const limitedAlbums = limitAlbums(filteredAlbums, 3);

          return (
            <div key={albumType.albType}>
              <h2>{albumType.albType}</h2>
              {limitedAlbums.map((album) => (
                <div className="album" key={album.albID}>
                  <p>{album.albTitle}</p>
                </div>
              ))}
              <Link to={`/discography/${albumType.albType}`}>See All</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Discography;