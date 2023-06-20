import './App.css';
import { BrowserRouter, Routes, Route,} from "react-router-dom";
import Album from './pages/Album';
import AddAlbum from './pages/AddAlbum';

function App() {
  return (
    <div className="App">
      <h1>App</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/discography" element={<Album/>}/>
          <Route path="/add" element={<AddAlbum/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
