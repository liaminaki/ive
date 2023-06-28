import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "../styles/EditAlbum.css"

const AddSong = () => {
  const { albType } = useParams();
  const { albID } = useParams();
  const { albTitle } = useParams();

  const [albPhoto, setAlbPhoto] = useState();
  const [countSameOrder, setCountSameOrder] = useState();
  const [errorMessage, setErrorMessage] = useState('');

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

    const fetchCountSameOrder = async (sOrder) => {
        try{
            const res = await axios.get(`http://localhost:8800/count/${songData.sOrder}/${albID}`)
            console.log(res)
            setCountSameOrder(res.data);
        } catch(err){
            console.log(err)
        }
    }

    fetchCountSameOrder();
    fetchAlbPhoto();
},[songData.sOrder])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setSongData((prevSongData) => ({ ...prevSongData, [name]: value }));
  };

  const navigate = useNavigate();

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
      await axios.post("http://localhost:8800/album/albType/albTitle/songs/", songData);
      navigate(`/discography/${albType}/${albID}/${albTitle}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className='spacer'></div>
      <h1 className='header'>Add new song</h1>
      <form onSubmit={handleSubmit}>
      <div className="form-container">
            <div className="album-photo">
                <p className='attribute'>Album Photo</p>
                <img src={`http://localhost:8800/img/album-photo/${albPhoto}`} width="200px" heigh="200px" alt="Preview" />
            </div>
            
            <div className="album-details">
                <p className='attribute'>Track Number</p>
                <input type="number" onChange={handleChange} name="sOrder" />
                <p className='attribute'>Song Title</p>
                <input type="text" onChange={handleChange} name="sTitle" />
                <div className='length'>
                    <div className='length-time'>
                    <p className='attribute'>Hours</p>
                    <input type="number" onChange={handleChange} name="sLengthInHours" />
                    </div>
                    <div className='length-time'>
                    <p className='attribute'>Minutes</p>
                    <input type="number" onChange={handleChange} name="sLengthInMinutes" />
                    </div>
                    <div className='length-time'>
                    <p className='attribute'>Seconds</p>
                    <input type="number" onChange={handleChange} name="sLengthInSeconds" />
                    </div>
                </div>
            <p className='attribute'>Release Date</p>
            <input type="date" onChange={handleChange} name="sRelDate" />
                {errorMessage && <p>Error: {errorMessage}</p>}
                <div className='button-container'>
                    <button type="submit">Add</button>
                    <Link to={`/discography/${albType}/${albID}/${albTitle}`}><button className='cancel-button'>Cancel</button></Link>
                </div>
            </div>
        </div>
      </form>
    </div>
    
  );
};

export default AddSong;
