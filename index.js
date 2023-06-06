const express = require('express')
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
// const cron =require("node-cron")
const app = express()
const port = 3000
require('dotenv').config()
var sqlite3 = require('sqlite3').verbose();
var http = require('http');
var path = require("path");
var helmet = require('helmet');
var rateLimit = require("express-rate-limit");


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'./public')));
app.use(helmet());

app.use(express.json())

app.use("fileUpload",express.static("fileUpload"))
const siswaRoutes = require("./src/routes/siswa")

app.get("/welcome",(req,res)=>{
    res.render("index", {item : "Welcome in ejs"})
})

app.use('/',siswaRoutes)

app.set('views', './views');


// const siswaController = require("./src/controllers/siswa")
// cron.schedule('*/3*****',() >{
//     console.log('create siswa auto');
//     siswaController.registerSiswaAuto()
// })

module.exports=app

app.listen(port,()=>{
    console.log(`Example app in port ${port}`);
})

