import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Discography = () => {
  const [mediaTypes, setMediaTypes] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchMediaTypes = async () => {
      try {
        const res = await axios.get('http://localhost:8800/mediaTypes');
        setMediaTypes(res.data);
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

    fetchMediaTypes();
    fetchAllAlbums();
  }, []);

  const filterAlbumsByType = (type) => albums.filter((album) => album.albType === type);
  const limitAlbums = (albums, limit) => albums.slice(0, limit);

  return (
    <div>
      <h1>Discography</h1>
      <div className="media-type">
        {mediaTypes.map((aMediaType) => {
          
          if (aMediaType.mediaType !== 'All Songs') {
            const filteredAlbums = filterAlbumsByType(aMediaType.mediaType);
            const limitedAlbums = limitAlbums(filteredAlbums, 3);

            return (
              <div key={aMediaType.mediaType}>
                <Link to={`/discography/${aMediaType.mediaType}`}><h2>{aMediaType.mediaType}</h2></Link>
                {limitedAlbums.map((album) => (
                  <div className="album" key={album.albID}>
                    <Link to={`/discography/${aMediaType.mediaType}/${album.albID}/${album.albTitle}`}>{album.albTitle}</Link>
                  </div>
                ))}
              </div>
            );
          } else {
            return (
                <div key={aMediaType.mediaType}>
                <Link to={`/discography/all-songs`}><h2>{aMediaType.mediaType}</h2></Link>
                </div>
            ); 
          }
        })}
      </div>
    </div>
  );
};

export default Discography;