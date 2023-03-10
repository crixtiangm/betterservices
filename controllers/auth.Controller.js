const { check,validationResult } = require('express-validator');
const User = require('../models/User.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const saltRound = 10;

const formLogin = (req, res) => {
    res.render('auth/login',{
        pagina: 'Log In'
    })
}

const sendLogin = async (req,res) => {
    const { emailLogin, passwordlogin } = req.body;
    //Validamos los campos de email y password en login
    await check('emailLogin').isEmail().withMessage('El Email es obligatorio').run(req);
    await check('passwordlogin').notEmpty().withMessage('El campo de Password es obligatorio').run(req);
    let resultado = validationResult(req);

    //Validamos el resultado
    if(!resultado.isEmpty()){
        return res.render('auth/login', {
            pagina: 'Log In',
            errores: resultado.array()//Se mandan los errores como array 
        })
    }

    //Validamos si el usuario existe
    const user = await User.findOne({email:emailLogin})
    if(!user){
        return res.render('auth/login', {
            pagina: 'Log In',
            errores: [{msg:'El usuario no existe'}] 
        })
    }

    //Validamos el Password
    let isTheSame = bcrypt.compareSync(passwordlogin,user.password)
    if(!isTheSame){
        return res.render('auth/login', {
            pagina: 'Log In',
            errores: [{msg:'El password es incorrecto'}]
        })
    }

    //Autenticamos al usuario
    const token = jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email
    }, process.env.SESSION_SECRET, { expiresIn: '1d'})

    //Almacenar en un cookie
    if(user.role === 'Admin'){
        return res.cookie('_token', token, {
            httpOnly:true
        }).redirect('/')
    }

    return res.cookie('_token', token, {
        httpOnly:true
    }).redirect('/user/home')
}

const formSignup = (req, res) => {
    res.render('auth/signup', {
        pagina: 'Sign Up'
    })
}

const logOut = (req, res) => {
    return res.clearCookie('_token').status(200).redirect('/auth/login')
}

const sendSignup = async (req, res) => {
    const { yourname,yoursurname,email,yourpassword,repeatpassword, ...restRegistro } = req.body;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){12,30}$/;
    await check('yourname').notEmpty().withMessage('El campo de nombre es obligatorio').run(req); //Se utiliza para validacion de campos importando el modulo de express-validator
    await check('yoursurname').notEmpty().withMessage('El campo de apellido es obligatorio').run(req);
    await check('email').isEmail().withMessage('Eso no parece un email').run(req);
    await check('yourpassword').isLength({ min:12 }).withMessage('El password debe contener al menos 12 caracteres').run(req);
    await check('yourpassword').matches(regex).withMessage('El password debe contener una mayuscula, una minuscula, un n??mero y un caracter especial "$#@!"').run(req);
    await check('repeatpassword').equals(yourpassword).withMessage('Los passwords no son iguales').run(req);
    let resultado = validationResult(req);

    if(!resultado.isEmpty()){
        return res.render('auth/signup', {
            pagina: 'Sign Up',
            errores: resultado.array(),
            usuario:{
                yourname: yourname,
                yoursurname: yoursurname,
                email: email
            }
        })
    }
    
    const existeUsuario = await User.findOne({email})
    if(existeUsuario){
        return res.render('auth/signup',{
            pagina: 'Sign Up',
            errores: [{ msg: 'El usuario ya esta registrado' }],
            usuario:{
                yourname: yourname,
                yoursurname: yoursurname,
                email: email
            }
        })
    }

    //Ciframos el password con bcrypt generando un salt con un saltRound de 10 pasadas
    const salt = bcrypt.genSaltSync(saltRound);
    const passwordHashed = bcrypt.hashSync(yourpassword,salt);

    const user = await User.create({
        name:yourname,
        surname:yoursurname,
        email,
        password:passwordHashed
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

module.exports = { formLogin, sendLogin, logOut, formSignup, sendSignup, formForgotPassword }