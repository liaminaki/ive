import React, {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddAlbum = () => {
    const { albType } = useParams(); // Retrieve the album type from the URL parameters


    const [albumData, setAlbumData] = useState({
        albTitle: "",
        albPhoto: null,
        previewAlbPhoto: null,
        albLanguage: "",
        albRelDate: null,
        // albLength: null,
        albType: albType
        // albNoOfSongs: null
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
    
        const { albTitle, albPhoto, albLanguage, albRelDate, albLength, albType, albNoOfSongs } = albumData;
    
        const albumDataToAdd = new FormData();
        albumDataToAdd.append("albTitle", albTitle);
        albumDataToAdd.append("albPhoto", albPhoto);
        albumDataToAdd.append("albLanguage", albLanguage);
        albumDataToAdd.append("albRelDate", albRelDate);
        // albumDataToAdd.append("albLength", albLength);
        albumDataToAdd.append("albType", albType);
        // albumDataToAdd.append("albNoOfSongs", albNoOfSongs);
    
        try {
          await axios.post("http://localhost:8800/discography", albumDataToAdd);
          navigate("/");
        } catch (err) {
          console.log(err);
        }
      };
    
      return (
        <div>
            <h1>Add new album</h1>
            <form onSubmit={handleSubmit} action="/discography" encType="multipart/form-data" method="post">
                <input type="text" placeholder="Album Title" onChange={handleChange} name="albTitle" />
                <input type="file" onChange={handleChange} name="albPhoto" />
                {albumData.previewAlbPhoto && (
                <div>
                    <h2>Preview Album Photo:</h2>
                    <img src={albumData.previewAlbPhoto} alt="Preview" />
                </div>
                )}
                <input type="text" placeholder="Album Language" onChange={handleChange} name="albLanguage" />
                <input type="date" onChange={handleChange} name="albRelDate" />
                {/* <input type="time" onChange={handleChange} name="albLength" /> */}
                {/* <select name="albType" onChange={handleChange}>
                    <option value="">Select Album Type</option>
                    <option value="single">Single Album</option>
                    <option value="mini">Mini Album</option>
                    <option value="studio">Studio Album</option>
                    <option value="digitalSingle">Digital Single</option>
                </select> */}
                {/* <input type="number" placeholder="Number of Songs" onChange={handleChange} name="albNoOfSongs" /> */}
                <button type="submit">Add</button>
          </form>
        </div>
      );
}

export default AddAlbum