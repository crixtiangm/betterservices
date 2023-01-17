const Service = require ('../models/Service.model')
const User = require ('../models/User.model')

const userProfile = async(req, res, next) => {
    const userInfo = await User.find();
    res.render('user/profile',{userInfo})
}

const userHome = (req, res) => {
    res.render('user/home',{
        headeruser:true,
        pagina: 'Home',
        dataUser: req.userRest
    })};

const userNewService = (req, res) => {
    console.log(req.body)
    const {name,surname} = req.userRest
   res.render('user/new-service',{ 
    pagina: 'New Service',
    headeruser: true,
    dataUser: req.userRest
   } ) 
};

const userPostNewService = async(req, res,next) => {
    try {
        const {serviceName,serviceDescription,serviceImage,serviceAddress,serviceLatitude,serviceLongitude} = req.body;
        await Service.create({name: serviceName, description: serviceDescription, image: serviceImage,address:serviceAddress, latitude: serviceLatitude, longitude: serviceLongitude,_user: req.userRest._id})
        console.log(req.body)
        if (Service.create) {
        res.render("user/home",{
            pagina: 'New Service',
            dataUser: req.userRest
        })}
    } catch (error) {
        next(error)
    } 
};
const renderYourService = async(req,res,next) => {
    const yourService = await Service.find();
    res.render('user/your-service',{yourService})
}


const userEditService = async(req, res, next) => {
    res.send('render edit form')
}

const updateService = async(req, res, next) => {
    res.send('render update service')
}



const userSearch = async(req, res) => {

    res.render('user/search',{ 
     pagina: 'Search',
     headeruser:true,
     dataUser: req.userRest
    } ) 
 };

module.exports = { 
    userHome,
    userNewService,
    userSearch,
    userPostNewService,
    userProfile,
    userEditService,
    updateService,
    renderYourService
}
