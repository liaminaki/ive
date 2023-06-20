import express from "express"   // Build APIs
import mysql from "mysql"       // Database
import cors from "cors"         // Allow requests from other origins
import multer from "multer"     // Allow uploading files

// Connect to Database
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"pass123",
    database:"ive"
})


