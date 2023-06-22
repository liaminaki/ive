import './App.css';
import { BrowserRouter, Routes, Route,} from "react-router-dom";
import Album from './pages/Album';
import AddAlbum from './pages/AddAlbum';
import UpdateAlbum from './pages/UpdateAlbum';
import Discography from './pages/Discography';
import Song from './pages/Song';
import AllSongs from './pages/AllSongs';
import AddSong from './pages/AddSong';
import UpdateSong from './pages/UpdateSong';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Discography/>}/>
          <Route path="/discography" element={<Album/>}/>
          <Route path="/discography/all-songs" element={<AllSongs/>}/>
          <Route path="/discography/:albType" element={<Album/>}/>
          <Route path="/discography/:albType/add" element={<AddAlbum/>}/>
          <Route path="/discography/update/:albID/:albTitle" element={<UpdateAlbum/>}/>
          <Route path="/discography/:albType/:albID/:albTitle" element={<Song/>}/>
          <Route path="/discography/:albType/:albID/:albTitle/add" element={<AddSong/>}/>
          <Route path="/discography/:albType/:albID/:albTitle/update/:sID/:sTitle" element={<UpdateSong/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
