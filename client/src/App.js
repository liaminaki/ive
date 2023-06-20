import './App.css';
import { BrowserRouter, Routes, Route,} from "react-router-dom";
import Album from './pages/Album';
import AddAlbum from './pages/AddAlbum';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/discography" element={<Album/>}/>
          <Route path="/discography/add" element={<AddAlbum/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
