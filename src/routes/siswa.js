const express = require('express')
const router = express.Router()

const siswaController = require('../controllers/siswa')
const {upload} = require('../middleware/uploadFile')
const {authenticateToken} = require('../middleware/auth')
const {roleAuthorize} = require('../middleware/roleAuthorize')
var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: null,
    database: "mydata_Siswa"
  });

router.get('/data-siswa', siswaController.getAllSiswa);
router.get('/register',siswaController.getRegister);
router.get('/login',siswaController.getLogin);

//REGISTER KE DATABASE
  router.post('/add', function(req,res){
  console.log("Connected!");
  console.log(req.body);

  var sql = `INSERT INTO siswas (id, Nama, Password, Role, Tanggal_Lahir, Kelas, Alamat, Tempat, No_HP, Nama_Ortu, No_HP_Ortu) VALUES (${req.body.id}, '${req.body.Nama}', '${req.body.Password}', '${req.body.Role}', '${req.body.Tanggal_Lahir}', '${req.body.Kelas}', '${req.body.Alamat}', '${req.body.Tempat}', ${req.body.No_HP}, '${req.body.Nama_Ortu}', ${req.body.No_HP_Ortu})`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Berhasil Register");
    res.send({
        status: 200,
        data: req.body
    })
  });
});
  

// Route for handling a GET request
router.get('/profile',authenticateToken,roleAuthorize,siswaController.getSiswaById);

// Route for handling a POST request
router.post('/add',upload.single('file'),siswaController.registerSiswa);

router.post('/login',upload.single('file'),siswaController.loginSiswa);

// Route for handling a PUT request
router.put('/siswa-edit/:id',upload.single('file'),siswaController.editSiswa);


// Route for handling a DELETE request
router.delete('/siswa-delete/:id',siswaController.deleteSiswaById);



module.exports = router
