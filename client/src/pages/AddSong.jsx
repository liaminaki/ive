import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AddSong = () => {
  const { albType } = useParams();
  const { albID } = useParams();
  const { albTitle } = useParams();

  const [albPhoto, setAlbPhoto] = useState();

  const [songData, setSongData] = useState({
    sOrder: null, // Integer data type
    sTitle: '', // Varchar
    sLengthInHours: 0,
    sLengthInMinutes: 0,
    sLengthInSeconds: 0, // Integer
    sRelDate: null, // Date
    albID: albID, // Integer
  });

  // Run for every render
  useEffect(() => {
    const fetchAlbPhoto = async () => {
        try{
            const res = await axios.get(`http://localhost:8800/albumPhoto/${albID}`)
            console.log(res)
            setAlbPhoto(res.data);
        } catch(err){
            console.log(err)
        }
    }

    fetchAlbPhoto();
},[])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setSongData((prevSongData) => ({ ...prevSongData, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/album/albType/albTitle/songs/", songData);
      navigate(`/discography/${albType}/${albID}/${albTitle}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Add new song in {albTitle}</h1>
      <img src={`http://localhost:8800/img/album-photo/${albPhoto}`} width="100px" alt="Preview" />
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Song Order" onChange={handleChange} name="sOrder" />
        <input type="text" placeholder="Song Title" onChange={handleChange} name="sTitle" />
        <input type="number" placeholder="Length (hours)" onChange={handleChange} name="sLengthInHours" />
        <input type="number" placeholder="Length (minutes)" onChange={handleChange} name="sLengthInMinutes" />
        <input type="number" placeholder="Length (seconds)" onChange={handleChange} name="sLengthInSeconds" />
        <input type="date" onChange={handleChange} name="sRelDate" />
        <button type="submit">Add</button>
      </form>
      <Link to={`/discography/${albType}/${albID}/${albTitle}`}><button className='cancel'>Cancel</button></Link>
    </div>
  );
};

export default AddSong;
