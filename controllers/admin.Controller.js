const { check,validationResult } = require('express-validator');
const User = require('../models/User.model.js');
const Service =  require('../models/Service.model.js');
const Comment = require('../models/Comment.model.js')


const admin = async (req, res) => {
    const allServices = await Service.find();
    res.render('admin/home',{
        pagina: 'Home',
        header: true,
        allServices
    })
}

const adminNewService = (req, res) => {
    res.render("admin/new-service",{
        pagina: 'New Service',
        header: true
    })
}

const adminCreateNewService = async (req, res, next) => {
   
    await check('servicename').notEmpty().withMessage('El nombre del servicio es obligatorio').run(req);
    await check('servicedescription').notEmpty().withMessage('El campo de descripción no puede ir vacio').isLength({max: 200}).withMessage('La descripción es muy larga').run(req);
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

    const { _id:_user } = req.userRest;

    const existeServicio = await Service.findOne({_user})
    if(existeServicio){
        return res.render('admin/service-created',{
            pagina: 'Existing Service',
            header: true,
            mensaje: 'This user already has a service, to create another it is necessary to delete the existing one',
            error: true
        })
    }

    const { 
        servicename,
        servicedescription, 
        streetservice, 
        servicelatitud,
        servicelongitud
    } = req.body;

    try {
            await Service.create({
            name: servicename,
            description: servicedescription,
            images: '',
            address: streetservice,
            latitude: servicelatitud,
            longitude: servicelongitud,
            _user,
        })

        res.render('admin/service-created',{
            pagina: 'Service Created',
            header: true,
            mensaje: 'Service created successfully'
        })
        
    } catch (error) {
        console.log(error)
    }
}

const adminAddImageService = ( req, res, next) => {
    res.render('admin/add-image', {
        pagina: 'Add Image',
        header: true
    })
}

const adminStorageImageService = async ( req, res, next) => {
    
    if(req.files.length == 0){
        await check('serviceimage').notEmpty().withMessage('Para poder guardar la imagen es necesario agregar un archivo').run(req);

        let resultado = validationResult(req);

        if(!resultado.isEmpty()){
            return res.render('admin/add-image', {
                pagina: 'Add Image',
                header: true,
                errores: resultado.array(),//Se mandan los errores como array 
            })
        }
    } 
    
    try {
        const { _id:_user } = req.userRest;
    
        const myService = await Service.findOne({_user})
        if(myService){
            const imgs = req.files.map(item => item.path);
            myService.images = imgs;
            await Service.updateOne({_id:myService._id},{
                $set: {
                    images: imgs
                }
            })

            return res.render('admin/image-update',{
                        pagina: 'Updated Image',
                        header: true,
                        mensaje: 'The image was added successfully'
                    })
        }

        res.render('admin/image-update',{
            pagina: 'Image',
            header: true,
            error: true,
            mensaje: 'You havent created a service yet'
        })
    } catch (error) {
        console.log(error)
    }
}

const adminMyService = async ( req, res, next) => {
    const { _id:_user } = req.userRest._id;
    const myService = await Service.findOne({_user})
        if(myService == null){
            return res.render('admin/service-not-created', {
                pagina: 'Not Service',
                header: true,
                mensaje: 'You havent created a service yet'
            })
        }
        res.render('admin/my-service', {
            pagina: 'My Service',
            header: true,
            _id: myService._id,
            image: myService.images,
            name: myService.name,
            description: myService.description,
            address: myService.address
        })
}

const adminEditMyService = async ( req, res, next) => {
    try {

        const { idMyService:_id } = req.params;
        const datos = await Service.findById({_id});
        const { name, description, address, latitude, longitude, ...serviceRest} = datos;
        res.render("admin/edit-my-service", {
            pagina: 'Edit Service',
            header: true,
            _id,
            name,
            description,
            address,
            latitude,
            longitude
        })
    } catch (error) {
           console.log(error); 
    }
}

const adminSendEditMyService = async ( req, res, next) => {
    try {
        const { 
            servicename: name,
            servicedescription: description, 
            streetservice: address, 
            servicelatitud: latitude,
            servicelongitud: longitude
        } = req.body;

        await check('servicename').notEmpty().withMessage('El nombre del servicio es obligatorio').run(req);
        await check('servicedescription').notEmpty().withMessage('El campo de descripción no puede ir vacio').isLength({max: 200}).withMessage('La descripción es muy larga').run(req);
        await check('streetservice').notEmpty().withMessage('Es necesario que ingrese la ubicación del servicio en el mapa').run(req);

        let resultado = validationResult(req);

        if(!resultado.isEmpty()){
            return res.render('admin/edit-my-service', {
                pagina: 'Edit Service',
                header: true,
                errores: resultado.array(),//Se mandan los errores como array 
                name,
                description,
                address,
                latitude,
                longitude
            })
        }

        const { idMyService:_id } = req.params;

        await Service.updateOne({_id},{
            $set: {
                name,
                description,
                address,
                latitude,
                longitude
            }
        })

        res.redirect("/my-service")

    } catch (error) {
        console.log(error)
    }
}

const adminDeleteMyService = async (req, res, next) => {
    try {
        const { idMyService:_id} = req.params;
        console.log(_id)
        await Service.findOneAndDelete({_id});
        res.redirect("/new-service");
    } catch (error) {
        console.log(error)
    }
}


const adminServiceComment = async (req, res, next) => {
    const { idService: _id} = req.params
    try {
        const serviceSelected = await Service.findById({_id})
        const { name, description, images, address, _user, ...serviceRest} = serviceSelected
        
        res.render("admin/service-comment", {
            pagina: 'Comments',
            header: true,
            _id,
            name,
            description,
            images,
            address,
            _user
        })
    } catch (error) {
        console.log(error)
    }
}

const adminSendServiceComment = async ( req, res, next ) => {
    
    const { idService: _id} = req.params;

    const serviceSelected = await Service.findById({_id})
    const { name, description, images, address, _user, ...serviceRest} = serviceSelected

    await check('servicecomment').notEmpty().withMessage('Introduzca el comentario en la caja de texto').run(req);

    let resultado = validationResult(req);

        if(!resultado.isEmpty()){
            return res.render( `admin/service-comment`, {
                pagina: 'Comments',
                header: true,
                errores: resultado.array(),//Se mandan los errores como array 
                _id,
                name,
                description,
                images,
                address,
                _user
            })
        }
}



module.exports = {
    admin,
    adminNewService,
    adminCreateNewService,
    adminAddImageService,
    adminStorageImageService,
    adminMyService,
    adminEditMyService,
    adminSendEditMyService,
    adminDeleteMyService,
    adminServiceComment,
    adminSendServiceComment
}