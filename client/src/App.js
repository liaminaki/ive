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
import Home from './pages/Home';
import Profile from './pages/Profile';
import Member from './pages/Member';
import About from './pages/About';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          
          <Route path="/profile">
            <Route index element={<Profile/>}/>
            <Route path=":mID/:mStageName" element={<Member/>}/>
          </Route>

          <Route path="/about" element={<About/>}/>

          <Route path="/discography">
            <Route index element={<Discography/>}/>
            <Route path="all-songs" element={<AllSongs/>}/>
            <Route path="update/:albID/:albTitle" element={<UpdateAlbum/>}/>
            
            <Route path=":albType">
              <Route index element={<Album/>}/>
              <Route path="add" element={<AddAlbum/>}/>
              
              <Route path=":albID/:albTitle">
                <Route index element={<Song/>}/>
                <Route path="add" element={<AddSong/>}/>
                <Route path="update/:sID/:sTitle" element={<UpdateSong/>}/>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
