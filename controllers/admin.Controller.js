const { check,validationResult } = require('express-validator');
const User = require('../models/User.model.js');
const Service =  require('../models/Service.model.js');


const admin = (req, res) => {
    res.render('admin/home',{
        pagina: 'Home',
        header: true,
        dataUser: req.userRest
    })
}

const adminNewService = (req, res) => {
    res.render("admin/new-service",{
        pagina: 'New Service',
        header: true,
        dataUser: req.userRest
    })
}

const adminCreateNewService = async (req, res, next) => {
   
    await check('servicename').notEmpty().withMessage('El nombre del servicio es obligatorio').run(req);
    await check('servicedescription').notEmpty().withMessage('El campo de descripción no puede ir vacio').isLength({max: 200}).withMessage('La descripción es muy larga').run(req);
    await check('serviceimage').notEmpty().withMessage('El campo de imagen es necesario con esto los usuarios pueden reconocer mejor su servicio').run(req);
    await check('streetservice').notEmpty().withMessage('Es necesario que ingrese la ubicación del servicio en el mapa').run(req);

    let resultado = validationResult(req);

    if(!resultado.isEmpty()){
        return res.render('admin/new-service', {
            pagina: 'New Service',
            header: true,
            errores: resultado.array(),//Se mandan los errores como array 
            datos: req.body
        })
    }

    const { 
        servicename,
        servicedescription, 
        serviceimage, 
        streetservice, 
        servicelatitud,
        servicelongitud
    } = req.body;

    const { _id: userId } = req.userRest

    try {
        const serviceCreate = await Service.create({
            name: servicename,
            description: servicedescription,
            images: '',
            address: streetservice,
            latitude: servicelatitud,
            longitude: servicelongitud,
            _user: userId,
        })

        const { _user } = serviceCreate;
        res.redirect(`/admin/add-image/${_user}`) 
        
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    admin,
    adminNewService,
    adminCreateNewService
}