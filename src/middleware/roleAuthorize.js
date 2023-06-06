const { response } = require("express")

exports.roleAuthorize = (request,response,next) =>{
    const roleAllowed = ['admin','superAdmin']
    let allowedBool = false

    roleAllowed.map((item) => {
        if (request.user.Role == item){
            allowedBool = true
        }
    })

    if (allowedBool) {
        return next()
    } else {
        return response.status(403).send({
            status:403,
            message:'Forbidden Access'
        })
    }
    
};