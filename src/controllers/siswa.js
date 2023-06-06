const { siswa } = require("../../models");
const bcrypt = require('bcrypt');
const joi = require('joi');
const jwt = require('jsonwebtoken');


exports.getAllSiswa = async (req, res) => {
    try {
        const data = await siswa.findAll({ attributes: { exclude: ["createdAt", "updatedAt"] } });
        console.log(JSON.stringify(data));
        res.render("datasiswa",{ title: "List Siswa", data: data });
    } catch (err) {
        console.log(err);
         
    }
};

exports.getRegister = async (req, res) => {
    try {
        const data = await siswa.findAll();
        console.log("Open Register page");
        res.render("register",{ title: "Register",data:data});
    } catch (err) {
        console.log(err);
         
    }
};

exports.getLogin = async (req, res) => {
    try {
        const data = await siswa.findAll();
        console.log("Open Login page");
        res.render("login",{title: "Login",data:data});
    } catch (err) {
        console.log(err);
         
    }
};

// mengambil data siswa berdasarkan id

exports.getSiswaById = async (req, res) => {
    console.log("Masuk")
try{
    const userId = req.body.id;
    console.log("Masuk profil")
    console.log(userId);
    let data = [];

    await new Promise((resolve,reject)=>{
        client.get(`dataSiswa Id : ${userId}`,(err,reply)=>{
            if (err){
                console.error(err);
                reject();
            }else {
                data.push(JSON.parse(reply));
                resolve();
            }
        });
    });

    if (data[0]==null){
        const dataSiswa = await siswa.findOne({
            where: { id:userId },
            attributes: {
                exclude: ["Password","createdAt", "updatedAt"]
            }
        });

        if(dataSiswa==undefined || dataSiswa==null){
            return res.status(404).send({
                message:`Siswa with id: ${userId} not found`,
            });
        }
        
        client.set(
            `dataSiswa Id : ${dataSiswa.id}`,
            JSON.stringify(dataSiswa.toJSON()),(err,reply) => {
                console.log("reply",reply);
            }
        );
        return res.status(200).send({
            message:`Get siswa with id: ${userId}`,
            data:dataSiswa,
        });
    } else {
        res.status(200).send({
            message:`Get siswa with id: ${userId}`,
            data:data[0],
        });
    }
}catch(error) {
    console.log(error.message);
    res.status(500).send({
        message:"Internal Server Error"
    });

}

}

// exports.getSiswaById = async (req, res) => {

//     const id = req.params.id

//     const data = await siswa.findOne({
//         where: { id },
//         attributes: {
//             exclude: ["createdAt", "updatedAt"]
//         }
//     })
//     res.send(data)
// }

exports.postSiswa = async (req, res) => {
    try {
        const body = req.body
        await siswa.create(body)
        res.send({
            status: 200,
            data: body
        })
    } catch (error) {
        console.log(error)
        return res.send({
            status: 500,
            message: 'Internal server error'
        })
    }
}

exports.registerSiswa = async (req, res) => {
    try {
        console.log("register");
        const Nama = req.body;
        console.log("ini dieksekusi")
        console.log(Nama);
        const schema = joi.object({
            Nama: joi.string().min(3).required(),
            Role: joi.string(),
            Password: joi.string().min(8).required(),
        });

        const { error } = schema.validate(req.body);

        if (error) return res.status(400).send({
            message: error.details[0].message
        });
        

        const hashedPassword = await bcrypt.hash(req.body.Password, 10);
        console.log("hashed password :"+hashedPassword)

        if (req.file != undefined) {
            image = req.protocol + "://" + req.get("host") + "/" + req.file.destination + "/" + req.file.filename;
        }

        const getSiswa = await siswa.create({
            id:id,
            Nama: req.body.Nama,
            Password: hashedPassword,
            Role: req.body.Role,
            Tanggal_Lahir: req.body.Tanggal_Lahir,
            Kelas: req.body.Kelas,
            Alamat: req.body.Alamat,
            Tempat: req.body.Tempat,
            No_HP: req.body.No_HP,
            Nama_Ortu: req.body.Nama_Ortu,
            No_HP_Ortu: req.body.No_HP_Ortu,
        })
        let dataSiswa = await siswa.findOne({
            where: {
                Nama: req.body.Nama
            },
            attributes: {
                exclude: ['password','image', 'createdAt', 'updatedAt']
            }
        })
        res.status(200).send({
            message: `Success create siswa with name: ${Nama}`,
            data: dataSiswa,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
}

exports.loginSiswa = async (req, res) => {
    try {
        const schema = joi.object({
            id: joi.number().integer().required(),
            Password: joi.string().min(8).required()
        });
        console.log(req.body)

        const { error } = schema.validate(req.body);

        if (error) return res.status(400).send({
            message: error.details[0].message
        });

        let dataSiswa = await siswa.findOne({
            where: {
                id: req.body.id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        if (!dataSiswa) {
            return res.status(401).send({
                message: `ID or Password doesn't match`
            });
        }

        console.log("sampai sini")

        if (req.body.Password !== dataSiswa.Password ){
                return res.status(401).send({
                message: `ID or Password doesn't match`  
        })}
        // console.log(dataSiswa.Password)
        // console.log(req.body.Password)

        // const match = await bcrypt.compare(req.body.Password, dataSiswa.Password);

        // if (!match) {
        //     return res.status(401).send({
                // message: 'ID or Password doesn't match1`
        //     }
        //     )
        // }

        // if (!dataSiswa) {
        //     return req.status(401).send({
        //         message: `ID or Password doen't match2`
        //     });
        // }

        // if (!match) {
        //     return res.status(401).send({
        //         message: `ID or Password doesn't match3`
        //     });
        // }

        // const accessToken = jwt.sign({ id: dataSiswa.id }, process.env.ACCESS_TOKEN_SECRET);

        dataSiswa = {
            id: dataSiswa.id,
            Nama: dataSiswa.Nama
            // token: accessToken
        }

        res.status(200).send({
            message: `Succesfully login`,
            data: dataSiswa
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
}

exports.editSiswa = async (req, res) => {
    try {
        const userID = req.params.id
        const name = req.body.name

        const siswaData = await siswa.findOne({
            where: { id: userID },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        if (!siswaData) {
            return res.status(404).send({
                message: `Siswa dengan ID : ${userID} tidak ditemukan`,
            });
        }

        const getSiswa = await siswaData.update({
            name: name
        })

        const dataSiswa = await siswa.findOne({
            where: { id: getSiswa.id },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.status(200).send({
            message: `Data berhasil diupdate dengan Nama : ${name}`,
            data: data
        });
    } catch (error) {
        console.log(error);
    }
}

exports.deleteSiswaById = async (req, res) => {
    try {
        const userId = req.params.id

        const siswaData = await siswa.findOne({
            where: { id: userId },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        if (!siswaData) {
            return res.status(404).send({
                message: `Siswa dengan ID : ${userId} tidak ditemukan`,
            });
        }

        await siswaData.destroy()

        res.status(200).send({
            message: `Data berhasil dihapus dengan ID : ${userId}`,
            data: siswaData
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal server error"
        });
    }
}

