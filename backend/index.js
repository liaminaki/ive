import express from "express"   // Build APIs
import mysql from "mysql"       // Database
import cors from "cors"         // Allow app to use backend API
import multer from "multer"     // Allow uploading files

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
      cb(null, './album_photo/'); // Destination directory for storing uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename for each uploaded file
    }
});

const upload = multer({ storage }); // Create a Multer instance with the configured storage engine

const app = express()

app.use(express.json()) // Allow sending json file using a client
app.use(cors()) 
app.use('/album_photo', express.static('album_photo'))

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
    const q = "DELETE FROM album WHERE albID = ?"

    db.query (q, [albID], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Deleted.");
    })
})


app.listen(8800, ()=>{
    console.log("Connected to backend!")
})

