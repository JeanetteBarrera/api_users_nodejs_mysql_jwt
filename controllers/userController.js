const db = require('../database/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    register: (req, res) => {

        db.User.findOne({ 
            where: { 
                email : req.body.email,
                status: true
            }
        }).then(result => {
            console.log(result)

            if(result){
                res.status(409).json("El email ya esta registrado");
            }else{
                const {name, surname, email, password } = req.body
                db.User.create({

                    name,
                    surname,
                    email,
                    password : bcrypt.hashSync(password,12),
                    status: true,
                    
                })
                .then((user) => {
                    res.status(201).json("Usuario registrado correctamente")
                })
                .catch(error => {
                    res.status(500).json("Ocurrio un error")
                })
            }
        }).catch(error => {
            res.status(500).json("Lo siento ocurrio un error!")
        })
        
        
    },

    login: (req, res) => {

        
        const { email, password} = req.body;
        
        db.User.findOne({
            where: {
                email : email,
                status : true
            }
        })
        .then(user => {
            if( user.email == email && bcrypt.compareSync(password, user.password)){
                
                const token = jwt.sign({
                    email
                }, process.env.SECRET_KEY, {
                    expiresIn: "3h",
                })
                res.status(200).json({token});

            }
            else{
                res.status(500).json("El email o contraseña son incorrectos")
            }
        })
        .catch(error => {
            res.status(500).json("Invalid user or password");
        })
          
    },
    profile: (req, res) => {

    }

}