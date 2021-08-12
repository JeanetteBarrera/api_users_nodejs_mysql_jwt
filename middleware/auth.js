const jwt = require("jsonwebtoken");
const User = require("../database/models/user");

const auth = async( req, res, next) => {

    //const token = req.header("Authorization").replace("Bearer ", "");
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
            if(error){
                return res.status(403).json("ERROR DE CREDENCIALES")
            }
            req.user = user;
            next();
        })

    }else {
        res.status(401).json("HUBO UN ERROR")
    }
    
}
module.exports = auth;