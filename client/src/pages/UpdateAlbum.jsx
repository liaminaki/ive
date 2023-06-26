import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const UpdateAlbum = () => {
  const { albID } = useParams(); // Retrieve the album ID from the URL parameters
  const { albType } = useParams();
  const { albTitle } = useParams();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const [albumData, setAlbumData] = useState({
    albTitle: '',
    albPhoto: null,
    previewAlbPhoto: null,
    albLanguage: '',
    albRelDate: new Date().toISOString().split('T')[0], // Set initial value to current date
    albType: '',
    albGenre: '',
  });

  // Prefill
  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/album/albType/${albID}`);
        const album = res.data;

        console.log(album)
    
        setAlbumData({
          albTitle: album.albTitle,
          albLanguage: album.albLanguage,
          albRelDate: album.albRelDate ? adjustToClientTimezone(album.albRelDate) : '',
          albType: album.albType,
          albPhoto: album.albPhoto,
          previewAlbPhoto: album.albPhoto ? `http://localhost:8800/img/album-photo/${album.albPhoto}` : null, 
          albGenre: album.albGenre,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchAlbumData();
  }, [albID]);

  // Ensure prefilled date is accurate
  const adjustToClientTimezone = (dateString) => {
    const clientOffset = new Date().getTimezoneOffset() * 60000; // Get client time zone offset in milliseconds
    const serverDate = new Date(dateString); // Convert server date string to Date object
    const adjustedDate = new Date(serverDate.getTime() - clientOffset); // Adjust the date using the time zone offset

    return adjustedDate.toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'albPhoto' && files[0]) {
      const selectedAlbPhoto = files[0];
      setAlbumData((prevAlbumData) => ({
        ...prevAlbumData,
        albPhoto: selectedAlbPhoto,
        previewAlbPhoto: URL.createObjectURL(selectedAlbPhoto)
      }));


    } else {
      setAlbumData((prevAlbumData) => ({ ...prevAlbumData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { albTitle, albPhoto, albLanguage, albRelDate, albType, albGenre } = albumData;
    
    const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    
    // Check for incomplete details and unsupported media
    if (!albTitle || !albPhoto || !albLanguage || !albRelDate || !albGenre) {
        setErrorMessage('Incomplete details. Make sure to fill up all required information.');
        return;
    }

    // Check for unsupported media format
    if (!allowedFileTypes.includes(albPhoto.type)) {
        setErrorMessage('Media format not supported. Use png, jpeg, jpg for album photo.');
        return;
    }

    const albumDataToUpdate = new FormData();
    albumDataToUpdate.append('albTitle', albTitle);
    albumDataToUpdate.append('albPhoto', albPhoto); 
    albumDataToUpdate.append('albLanguage', albLanguage);
    albumDataToUpdate.append('albRelDate', albRelDate);
    albumDataToUpdate.append('albType', albType);
    albumDataToUpdate.append('albGenre', albGenre);

    try {
      await axios.put(`http://localhost:8800/album/${albID}`, albumDataToUpdate);
      navigate(`/discography/${albType}/${albID}/${albTitle}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteAlbum = async (albID) =>{
    try{
        await axios.delete(`http://localhost:8800/album/${albID}`)
        navigate(`/discography`);
    }
    catch(err){
        console.log(err)
    }
}

  return (
    <div>
      <h1>Update Album</h1>
      <form onSubmit={handleSubmit} action={`/discography/${albID}`} encType="multipart/form-data" method="put">
        <input type="text" placeholder="Album Title" value={albumData.albTitle} onChange={handleChange} name="albTitle" />
        <input type="file" onChange={handleChange} name="albPhoto" />
        {albumData.previewAlbPhoto && (
          <div>
            <h2>Preview Album Photo:</h2>
            <img src={albumData.previewAlbPhoto} alt="Preview" />
          </div>
        )}
        <input type="text" placeholder="Album Language" value={albumData.albLanguage} onChange={handleChange} name="albLanguage" />
        <input type="date" value={albumData.albRelDate} onChange={handleChange} name="albRelDate"/>
        <select name="albType" value={albumData.albType} onChange={handleChange}>
            <option value="">Select Album Type</option>
            <option value="Studio Album">Studio Album</option>
            <option value="Single Album">Single Album</option>
            <option value="Mini Album">Mini Album</option>
            <option value="Digital Single">Digital Single</option>
        </select>
        <input type="text" placeholder="Album Genre" value={albumData.albGenre} onChange={handleChange} name="albGenre" />
        <button type="submit">Update</button>
      </form>
      <button className='delete' onClick={()=>handleDeleteAlbum(albID)}>Delete</button>  
      <Link to={`/discography/${albType}/${albID}/${albTitle}`}><button className='cancel'>Cancel</button></Link>
    </div>

  );
};

export default UpdateAlbum;