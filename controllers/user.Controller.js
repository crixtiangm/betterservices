const { check,validationResult } = require('express-validator');
const User = require('../models/User.model.js');
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const saltRound = 10;

const formLogin = (req, res) => {
    res.render('auth/login',{
        pagina: 'Log In'
    })
}

const formSignup = (req, res) => {
    res.render('auth/signup', {
        pagina: 'Sign Up'
    })
}

const sendSingup = async (req, res) => {
    const { yourname,yoursurname,youremail,yourpassword,repeatpassword, ...restRegistro } = req.body;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){12,30}$/;
    await check('yourname').notEmpty().withMessage('El campo de nombre es obligatorio').run(req); //Se utiliza para validacion de campos importando el modulo de express-validator
    await check('yoursurname').notEmpty().withMessage('El campo de apellido es obligatorio').run(req);
    await check('youremail').isEmail().withMessage('Eso no parece un email').run(req);
    await check('yourpassword').isLength({ min:12 }).withMessage('El password debe contener al menos 12 caracteres').run(req);
    await check('yourpassword').matches(regex).withMessage('El password debe contener una mayuscula, una minuscula, un número y un caracter especial "$#@!"').run(req);
    await check('repeatpassword').equals(yourpassword).withMessage('Los passwords no son iguales').run(req);
    let resultado = validationResult(req);

    if(!resultado.isEmpty()){
        return res.render('auth/signup', {
            pagina: 'Sign Up',
            errores: resultado.array(),
            usuario:{
                yourname: yourname,
                yoursurname: yoursurname,
                youremail: youremail
            }
        })
    }

    const existeUsuario = await User.findOne({youremail});
    if(existeUsuario){
        return res.render('auth/signup',{
            pagina: 'Sign Up',
            errores: [{ msg: 'El usuario ya esta registrado' }],
            usuario:{
                yourname: yourname,
                yoursurname: yoursurname,
                youremail: youremail
            }
        })
    }

    //Ciframos el password con bcrypt generando un salt con un saltRound de 10 pasadas
    const salt = bcrypt.genSaltSync(saltRound);
    const passwordHashed = bcrypt.hashSync(yourpassword,salt);

    const user = await User.create({
        name: yourname,
        surname: yoursurname,
        email: youremail,
        password: passwordHashed
    })

    if(!user){
        return res.render('auth/account-created', {
            pagina:'Error al crear tu cuenta',
            mensaje: 'Hubo un error al crear tu cuenta, intenta de nuevo',
            error: true
        })
    }

    res.render('auth/account-created', {
        pagina:'Cuenta creada correctamente',
        mensaje: 'La cuenta fue creada correctamente'
    })


}

const formForgotPassword = (req, res) => {
    res.render('auth/forgot-password', {
        pagina: 'Forgot Password'
    })
}

module.exports = { formLogin, formSignup, sendSingup, formForgotPassword}
