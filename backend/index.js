import express from "express"   // Build APIs
import mysql from "mysql"       // Database
import cors from "cors"         // Allow app to use backend API
import multer from "multer"     // Allow uploading files
import fs from "fs"             // File system module

// Connect to Database
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"pass123",
    database:"ive"
})

// Create a storage engine for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './img/album-photo/'); // Destination directory for storing uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename for each uploaded file
    }
});

const upload = multer({ storage }); // Create a Multer instance with the configured storage engine

const app = express()

app.use(express.json()) // Allow sending json file using a client
app.use(cors()) 
app.use('/img', express.static('img'))

app.get("/", (req,res)=>{  
    res.json("This is the backend!")
})

// Get all albums from latest to oldest
app.get("/album", (req, res) => {
    const q = "SELECT * FROM album ORDER BY albRelDate DESC"; // Sort list from latest to oldest
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
});

// Add album
app.post("/album", upload.single('albPhoto'), (req,res)=>{
    
    const values = [req.body.albTitle,
                    req.file.filename,
                    req.body.albLanguage,
                    req.body.albRelDate,
                    req.body.albType,
                    req.body.albGenre,
                    req.body.albColor];
    
    const q = "INSERT INTO album (`albTitle`, `albPhoto`, `albLanguage`, `albRelDate`, `albType`, `albGenre`, `albColor`) VALUES (?)";
    
    db.query(q,[values],(err, data)=>{
        if(err) return res.json(err);
        return res.json("Album added.");
    })
})

// Get album based on type
app.get("/album/:albType", (req, res) => {
    const albType = req.params.albType;
    const q = "SELECT * FROM album WHERE albType = ? ORDER BY albRelDate DESC";
    db.query(q, [albType], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Delete album based on ID
app.delete("/album/:albID", (req,res)=>{
    const albID = req.params.albID;
    
    const q = "SELECT albPhoto FROM album WHERE albID = ?";

    db.query(q, [albID], (err, data) => {
      if (err) {
        return res.json(err);
      }
  
      if (data.length === 0) {
        return res.status(404).json("Album not found.");
      }
  
      const album = data[0];
      const albPhotoPath = `./album-photo/${album.albPhoto}`;
  
      // Delete album photo from the local disk
      fs.unlink(albPhotoPath, (err) => {
        if (err) {
          console.log("Error deleting album photo:", err);
        }
      });
  
    // Delete album from the database
    const deleteAlbumQuery = "DELETE FROM album WHERE albID = ?";
    const deleteSongsQuery = "DELETE FROM song WHERE albID = ?";

    db.query(deleteSongsQuery, [albID], (err, songData) => {
      if (err) {
        return res.json(err);
      }

      db.query(deleteAlbumQuery, [albID], (err, albumData) => {
        if (err) {
          return res.json(err);
        }

        return res.json("Album and associated songs deleted.");
      });
    });
    });
})

// Update album based on ID
app.put("/album/:albID", upload.single('albPhoto'), (req, res) => {
    const albID = req.params.albID;
  
    const values = [
      req.body.albTitle,
      req.file ? req.file.filename : null, // Check if a new albPhoto is provided
      req.body.albLanguage,
      req.body.albRelDate,
      req.body.albType,
      req.body.albGenre,
      req.body.albColor,
    ];
  
    const q = "UPDATE album SET `albTitle` = ?, `albPhoto` = IFNULL(?, `albPhoto`), `albLanguage` = ?, `albRelDate` = ?, `albType` = ?, `albGenre` = ?, `albColor` = ? WHERE `albID` = ?";
  
    db.query(q, [...values, albID], (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json("Album updated.");
    });
  });

// Get album based on ID
app.get("/album/albType/:albID", (req, res) => {
    const albID = req.params.albID;
  
    const q = "SELECT albTitle, albLanguage, albRelDate, albType, albPhoto, albGenre, albColor FROM album WHERE albID = ?";
  
    db.query(q, [albID], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
  
      if (data.length === 0) {
        return res.status(404).json("Album not found.");
      }
  
      const album = data[0];
      return res.json(album);
    });
  });

// Get all media types
app.get("/albumTypes", (req, res) => {
    const q = "SELECT albType FROM albumTypes ORDER BY albType DESC";
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
});

// Get all song based on album title
app.get("/album/albType/:albTitle/songs", (req, res) => {
    const albTitle = req.params.albTitle;
  
    const q = "SELECT * FROM song WHERE albID in (SELECT albID FROM album WHERE albTitle = ?)";
  
    db.query(q, [albTitle], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json(data);
    });
  });

// Delete a song from album using ID
app.delete("/album/albType/albTitle/songs/:sID", (req,res)=>{
    
    const sID = req.params.sID;

    const q = "DELETE FROM song WHERE sID = ?";

    db.query(q, [sID], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json("Album deleted.");
    });
});

// Get all songs
app.get('/allSongs', (req, res) => {
    const q = 'SELECT * FROM song';
  
    db.query(q, (err, data) => {
      if (err) {
        console.error('Error executing the query:', err);
        return res.status(500).json(err);
      }
      return res.json(data);
    });
  });

// Get individual song
app.get("/album/albType/albTitle/songs/:sID", (req,res)=>{
    const sID = req.params.sID

    const q = "SELECT * FROM song WHERE sID = ?"; // Sort list from latest to oldest
    db.query(q, [sID], (err, data) => {
        if (err) {
            return res.status(500).json(err);
          }
      
          if (data.length === 0) {
            return res.status(404).json("Album not found.");
          }
      
          const song = data[0];
          return res.json(song);
    });
});

// Add song in album
app.post("/album/albType/albTitle/songs/", (req,res)=>{
    
    const values = [req.body.sOrder,
                    req.body.sTitle,
                    req.body.sLengthInHours,
                    req.body.sLengthInMinutes,
                    req.body.sLengthInSeconds,
                    req.body.sRelDate,
                    req.body.albID];

    const q = "INSERT INTO song (`sOrder`, `sTitle`, `sLengthInHours`, `sLengthInMinutes`,`sLengthInSeconds`, `sRelDate`, `albID`) VALUES (?)";

    db.query(q,[values],(err, data)=>{
    if(err) return res.json(err);
    return res.json("Album added.");
    })
});

// Update Song in album
app.put("/album/albType/albTitle/songs/:sID", (req,res)=>{
    
    const sID = req.params.sID;
  
    const values = [
      req.body.sOrder,
      req.body.sTitle,
      req.body.sLengthInHours,
      req.body.sLengthInMinutes,
      req.body.sLengthInSeconds,
      req.body.sRelDate,
    ];
  
    const q = "UPDATE song SET `sOrder` = ?, `sTitle` = ?, `sLengthInHours` = ?, `sLengthInMinutes` = ?,`sLengthInSeconds` = ?, `sRelDate` = ? WHERE `sID` = ?";
  
    db.query(q, [...values, sID], (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json("Song updated.");
    });
});

// Get member's id, stage name and photo
app.get("/member", (req, res) => {
    const q = "SELECT mID, mStageName, mPhoto FROM members";
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
});

// Get member data using IS
app.get("/member/:mID", (req, res) => {
    const mID = req.params.mID
    const q = "SELECT * FROM members WHERE `mID` = ?";
    db.query(q,[mID], (err, data) => {
      if (err) return res.json(err);
      if (data.length === 0) {
        return res.status(404).json("Album not found.");
      }
  
      const member = data[0];
      return res.json(member);
    });
});

// Get group data
app.get("/group", (req, res) => {
    const q = "SELECT * FROM kpopGroup";
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      if (data.length === 0) {
        return res.status(404).json("Not found.");
      }

      const group = data[0];
      return res.json(group);
    });
});

// Get total length of album in seconds
app.get("/albumLength/:albID", (req, res) => {
    const albID = req.params.albID
    const q = "SELECT SUM(COALESCE(sLengthInHours,0) * 3600 + COALESCE(sLengthInMinutes,0) * 60 + COALESCE(sLengthInSeconds,0)) AS totalLengthInSeconds FROM song WHERE albID = ?";
    db.query(q, [albID] ,(err, data) => {
      if (err) return res.json(err);
      
      const totalLengthInSeconds = data[0].totalLengthInSeconds;
      return res.json(totalLengthInSeconds);
        
    });
});

// Get total number of songs
app.get("/albumNumberOfSongs/:albID", (req, res) => {
    const albID = req.params.albID
    const q = "SELECT COUNT(*) AS numberOfSongs FROM song WHERE albID = ?";
    db.query(q, [albID] ,(err, data) => {
      if (err) return res.json(err);
      
      const numberOfSongs = data[0].numberOfSongs;
      return res.json(numberOfSongs);
        
    });
});

// Get album release year
app.get("/albumRelYear/:albID", (req, res) => {
    const albID = req.params.albID;
    const q = "SELECT YEAR(albRelDate) AS albRelYear FROM album WHERE albID = ?";
  
    db.query(q, [albID], (err, data) => {
      if (err) {
        return res.json(err);
      }
  
      const albRelYear = data[0].albRelYear;
      return res.json(albRelYear);
    });
});

app.listen(8800, ()=>{
    console.log("Connected to backend!")
})

