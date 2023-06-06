// CREATE DATABASE

var mysql = require('mysql2');
var namaDatabase='mydata_Siswa'

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password:null
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(`CREATE DATABASE ${namaDatabase}`, function (err, result) {
    if (err) throw err;
    console.log(`Database created with name ${namaDatabase}`);
  });
});
