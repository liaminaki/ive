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
      cb(null, './album-photo/'); // Destination directory for storing uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename for each uploaded file
    }
});

const upload = multer({ storage }); // Create a Multer instance with the configured storage engine

const app = express()

app.use(express.json()) // Allow sending json file using a client
app.use(cors()) 
app.use('/album-photo', express.static('album-photo'))

app.get("/", (req,res)=>{  
    res.json("This is the backend!")
})

app.get("/discography", (req,res)=>{
    const q = "SELECT * FROM album"
    db.query(q,(err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/discography", upload.single('albPhoto'), (req,res)=>{
    
    const values = [req.body.albTitle,
                    req.file.filename,
                    req.body.albLanguage,
                    req.body.albRelDate,
                    req.body.albType];
    
    const q = "INSERT INTO album (`albTitle`, `albPhoto`, `albLanguage`, `albRelDate`, `albType`) VALUES (?)";
    
    db.query(q,[values],(err, data)=>{
        if(err) return res.json(err);
        return res.json("Album added.");
    })
})

app.delete("/discography/:albID", (req,res)=>{
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
      const deleteQuery = "DELETE FROM album WHERE albID = ?";
  
      db.query(deleteQuery, [albID], (err, data) => {
        if (err) {
          return res.json(err);
        }

        return res.json("Album deleted.");
      });
    });
})

app.put("/discography/:albID", upload.single('albPhoto'), (req, res) => {
    const albID = req.params.albID;
  
    const values = [
      req.body.albTitle,
      req.file ? req.file.filename : null, // Check if a new albPhoto is provided
      req.body.albLanguage,
      req.body.albRelDate,
      req.body.albType
    ];
  
    const q = "UPDATE album SET `albTitle` = ?, `albPhoto` = IFNULL(?, `albPhoto`), `albLanguage` = ?, `albRelDate` = ?, `albType` = ? WHERE `albID` = ?";
  
    db.query(q, [...values, albID], (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json("Album updated.");
    });
  });

app.get("/discography/:albID", (req, res) => {
    const albID = req.params.albID;
  
    const q = "SELECT albTitle, albLanguage, albRelDate, albType, albPhoto FROM album WHERE albID = ?";
  
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


app.listen(8800, ()=>{
    console.log("Connected to backend!")
})

