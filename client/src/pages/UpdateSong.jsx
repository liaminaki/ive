import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "../styles/EditAlbum.css"

const UpdateSong= () => {
  const { albType } = useParams();
  const { albID } = useParams();
  const { albTitle } = useParams();
  const { sID } = useParams();
  const [countSameOrder, setCountSameOrder] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [albPhoto, setAlbPhoto] = useState();

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

    if (name === 'sOrder') {
        fetchCountSameOrder(parseInt(value));
      }
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

    if (countSameOrder > 1) {
        setErrorMessage('Track Number already taken');
        return;
    }

    if (!songData.sOrder || !songData.sTitle || !songData.sRelDate || (!songData.sLengthInHours && !songData.sLengthInMinutes && !songData.sLengthInSeconds)) {
        setErrorMessage('Incomplete details. Make sure to fill up required information.');
        return;
      }

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

    const fetchAlbPhoto = async () => {
        try{
            const res = await axios.get(`http://localhost:8800/albumPhoto/${albID}`)
            console.log(res)
            setAlbPhoto(res.data);
        } catch(err){
            console.log(err)
        }
    }

    fetchCountSameOrder();
    fetchAlbPhoto ()
    fetchSongData();
  }, [sID]);

  const fetchCountSameOrder = async (sOrder) => {
    try {
      const res = await axios.get(`http://localhost:8800/count/${sOrder}/${albID}`);
      setCountSameOrder(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  const handleDeleteSong = async (sID) =>{
    try{
        await axios.delete(`http://localhost:8800/album/albType/albTitle/songs/${sID}`)
        navigate(`/discography/${albType}/${albID}/${albTitle}`);
    }
    catch(err){
        console.log(err)
    }
}

  return (
    <div>
      <div className='spacer'></div>
      <h1 className='header'>Update song</h1>
      <form onSubmit={handleSubmit}>
       <div className="form-container">
            <div className="album-photo">
            <p className='attribute'>Album Photo</p>
                <img src={`http://localhost:8800/img/album-photo/${albPhoto}`} width="200px" heigh="200px" alt="Preview" />
            </div>
            
            <div className="album-details">
                <p className='attribute'>Track Number</p>
                <input type="number" value={songData.sOrder} onChange={handleChange} name="sOrder" />
            <p className='attribute'>Song Title</p>
            <input type="text" value={songData.sTitle} onChange={handleChange} name="sTitle" />
            <div className='length'>
                <div className='length-time'>
                    <p className='attribute'>Hours</p>
                    <input type="number" value={songData.sLengthInHours} onChange={handleChange} name="sLengthInHours" />
                </div>
                <div className='length-time'>
                    <p className='attribute'>Minutes</p>
                    <input type="number" value={songData.sLengthInMinutes} onChange={handleChange} name="sLengthInMinutes" />
                </div>
                <div className='length-time'>
                    <p className='attribute'>Seconds</p>
                    <input type="number" value={songData.sLengthInSeconds} onChange={handleChange} name="sLengthInSeconds" />
                </div>
            </div>
            <p className='attribute'>Release Date</p>
            <input type="date" value={songData.sRelDate} onChange={handleChange} name="sRelDate" />
            {errorMessage && <p>Error: {errorMessage}</p>}
            <div className='button-container'>
            <button type="submit">Update</button>
            <button className='delete-button' onClick={()=>handleDeleteSong(sID)}>Delete</button>
            <Link to={`/discography/${albType}/${albID}/${albTitle}`}><button className='cancel-button'>Cancel</button></Link>
            </div>
            </div>

       </div>

      </form>

    </div>
  );
};

export default UpdateSong;
