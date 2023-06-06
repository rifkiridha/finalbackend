const jwt=require('jsonwebtoken');
const {siswa} = require('../../models');

exports.authenticateToken = async (req,res,next)=>{
    try{
        const header = req.headers['authorization'];
        const token = header && header.split(' ')[1];

        if (!header) {
            return res.status(401).send({
                status:'failed',
                message:'unauthorized'
            })
        }

        let userVerifiedId = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if (err) {
                return res.status(401).send({
                    status:'failed',
                    message:err.message,
                })
            }
            return user.id
        });

    const userVerified = await siswa.findOne({
        where: {
            id:userVerifiedId
        },
        attributes:{
            exclude:['Password','createdAt','updatedAt']
        }
    })
    console.log(userVerified);
    req.user = userVerified.dataValues
    next()
    } catch (error) {
        console.log(error);
        res.status(500).send({
        message: "Internal Server Error"
        });
    }
}