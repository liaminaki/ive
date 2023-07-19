import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import"../styles/Discography.css";

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
        <div className='discography'>
        <img class="album-type"src="img/Discography.png"></img>
        <Link to={`/discography/Studio%20Album`}><img class="album-type" src="img/StudioAlbum.png"></img> </Link>
        <Link to={`/discography/Single%20Album`}><img class="album-type"src="img/SingleAlbum.png"></img> </Link>
        <Link to={`/discography/Mini%20Album`}><img class="album-type"src="img/MiniAlbum.png"></img> </Link>
        <Link to={`/discography/Digital%20Single`}><img class="album-type"src="img/DigitalSingle.png"></img> </Link>
        <Link to={`/discography/all-songs`}><img class="album-type"src="img/AllSongs.png"></img> </Link>
        </div>
           
    </div>
  );
};

export default Discography;