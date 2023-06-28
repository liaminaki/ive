import React, {useState} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import "../styles/EditAlbum.css"

const AddAlbum = () => {
    const { albType } = useParams(); // Retrieve the album type from the URL parameters
    
    const [errorMessage, setErrorMessage] = useState('');

    const [albumData, setAlbumData] = useState({
        albTitle: "",
        albPhoto: null,
        previewAlbPhoto: `http://localhost:8800/img/defaultAlbumPhoto.svg`,
        albLanguage: "",
        albRelDate: null,
        albType: albType,
        albGenre: '',
      });
    
      const handleChange = (e) => {
        const { name, value, files } = e.target;
    
        if (name === "albPhoto" && files[0]) {
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
    
      const navigate = useNavigate();
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { albTitle, albPhoto, albLanguage, albRelDate, albType, albGenre} = albumData;
        const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        
        // Check for unsupported media format
        if (!allowedFileTypes.includes(albPhoto.type)) {
                    setErrorMessage('Media format not supported. Try again using png, jpeg, jpg for album photo.');
                    return;
                }

        // Check for incomplete details and unsupported media
        if (!albTitle || !albPhoto || !albLanguage || !albRelDate || !albGenre) {
            setErrorMessage('Incomplete details. Try again.');
            return;
        }
  
        const albumDataToAdd = new FormData();
        albumDataToAdd.append("albTitle", albTitle);
        albumDataToAdd.append("albPhoto", albPhoto);
        albumDataToAdd.append("albLanguage", albLanguage);
        albumDataToAdd.append("albRelDate", albRelDate);
        albumDataToAdd.append("albType", albType);
        albumDataToAdd.append("albGenre", albGenre);
    
        try {
          await axios.post("http://localhost:8800/album", albumDataToAdd);
          navigate(`/discography/${albType}`);
        } catch (err) {
          console.log(err);
        }
      };
    
      return (
        <div>
          <div className='spacer'></div>
          <h1 className='header'>Add new album</h1>
          <form onSubmit={handleSubmit} action="/discography" encType="multipart/form-data" method="post">
            <div className="form-container">
              <div className="album-photo">
              <p className='attribute'>Album Photo</p>
                {albumData.previewAlbPhoto && (
                  <img src={albumData.previewAlbPhoto} alt="Preview" width="200px" height="200px" />
                )}
                <input type="file" onChange={handleChange} name="albPhoto" />
              </div>
              <div className="album-details">
                <p className='attribute'>Album Title</p>
                <input type="text" onChange={handleChange} name="albTitle" />
                <p className='attribute'>Language</p>
                <input type="text" onChange={handleChange} name="albLanguage" />
                <p className='attribute'>Genre</p>
                <input type="text" value={albumData.albGenre} onChange={handleChange} name="albGenre" />
                <p className='attribute'>Release Date</p>
                <input type="date" placeholder="Release Date" onChange={handleChange} name="albRelDate" />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className='button-container'>
                  <button type="submit">Add</button>
                  <button className="cancel-button"><Link to={`/discography/${albType}`} style={{ textDecoration: 'none', color: 'black' }}>Cancel</Link></button>
                </div>
              </div>
            </div>
          </form>
        </div>
      );
}

export default AddAlbum