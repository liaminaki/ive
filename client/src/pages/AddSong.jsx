import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddSong = () => {
  const { albType } = useParams();
  const { albID } = useParams();
  const { albTitle } = useParams();

  const [songData, setSongData] = useState({
    sOrder: null, // Integer data type
    sTitle: '', // Varchar
    sLengthInSeconds: null, // Integer
    sRelDate: null, // Date
    albID: albID, // Integer
  });

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
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Song Order" onChange={handleChange} name="sOrder" />
        <input type="text" placeholder="Song Title" onChange={handleChange} name="sTitle" />
        <input type="number" placeholder="Length (seconds)" onChange={handleChange} name="sLengthInSeconds" />
        <input type="date" onChange={handleChange} name="sRelDate" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddSong;
