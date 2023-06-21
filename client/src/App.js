import './App.css';
import { BrowserRouter, Routes, Route,} from "react-router-dom";
import Album from './pages/Album';
import AddAlbum from './pages/AddAlbum';
import UpdateAlbum from './pages/UpdateAlbum';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/discography" element={<Album/>}/>
          <Route path="/discography/add" element={<AddAlbum/>}/>
          <Route path="/discography/update/:albID" element={<UpdateAlbum/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
