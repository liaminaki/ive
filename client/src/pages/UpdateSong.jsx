import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateSong= () => {
  const { albType } = useParams();
  const { albID } = useParams();
  const { albTitle } = useParams();
  const { sID } = useParams();

  const [songData, setSongData] = useState({
    sOrder: 0, // Integer data type
    sTitle: '', // Varchar
    sLengthInHours: 0,
    sLengthInMinutes: 0,
    sLengthInSeconds: 0, // Integer
    sRelDate: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSongData((prevSongData) => ({ ...prevSongData, [name]: value }));
  };

  const navigate = useNavigate();

    // Ensure prefilled date is accurate
  const adjustToClientTimezone = (dateString) => {
    const clientOffset = new Date().getTimezoneOffset() * 60000; // Get client time zone offset in milliseconds
    const serverDate = new Date(dateString); // Convert server date string to Date object
    const adjustedDate = new Date(serverDate.getTime() - clientOffset); // Adjust the date using the time zone offset

    return adjustedDate.toISOString().split('T')[0];
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/album/albType/albTitle/songs/${sID}`, songData);
      navigate(`/discography/${albType}/${albID}/${albTitle}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchSongData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/album/albType/albTitle/songs/${sID}`);
        const song = res.data;

        console.log(song)

        setSongData({
            sOrder: song.sOrder || "", 
            sTitle: song.sTitle || '',
            sLengthInHours: song.sLengthInHours|| 0,
            sLengthInMinutes: song.sLengthInMinutes || 0,
            sLengthInSeconds: song.sLengthInSeconds || 0,
            sRelDate: song.sRelDate ? adjustToClientTimezone(song.sRelDate) : '',
        });

        console.log(songData.sOrder)
    
      } catch (err) {
        console.log(err);
      }
    };

    fetchSongData();
  }, [sID]);

  return (
    <div>
      <h1>Update song</h1>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Song Order" value={songData.sOrder} onChange={handleChange} name="sOrder" />
        <input type="text" placeholder="Song Title" value={songData.sTitle} onChange={handleChange} name="sTitle" />
        <input type="number" placeholder="Length (hours)" value={songData.sLengthInHours} onChange={handleChange} name="sLengthInHours" />
        <input type="number" placeholder="Length (minutes)" value={songData.sLengthInMinutes} onChange={handleChange} name="sLengthInMinutes" />
        <input type="number" placeholder="Length (seconds)" value={songData.sLengthInSeconds} onChange={handleChange} name="sLengthInSeconds" />
        <input type="date" value={songData.sRelDate} onChange={handleChange} name="sRelDate" />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateSong;
