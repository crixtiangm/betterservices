const Service = require ('../models/Service.model')

const userProfile = (req, res, next) => {
    res.render('user/profile', {
        pagina:'Profile',
        dataUser: req.userRest
    });

};

const userHome = (req, res) => {
    res.render('user/home',{
        pagina: 'Home',
        dataUser: req.userRest
    })
}

const userNewService = (req, res) => {

   res.render('user/new-service',{ 
    pagina: 'New Service',
    dataUser: req.userRest
   } ) 
};

const userPostNewService = async(req, res,next) => {
    try {
        const {serviceName,serviceDescription,serviceImage,serviceAddress,serviceLatitude,serviceLongitude} = req.body;
        await Service.create({name: serviceName, description: serviceDescription, image: serviceImage,address:serviceAddress, latitude: serviceLatitude, longitude: serviceLongitude,_user: req.userRest._id})
        res.render("user/new-service",{
            pagina: 'New Service',
            dataUser: req.userRest
        } )
    } catch (error) {
        next(error)
    }
};



const userSearch = async(req, res) => {

    res.render('user/search',{ 
     pagina: 'Search',
     dataUser: req.userRest
    } ) 
 };

module.exports = { 
    userHome,
    userNewService,
    userSearch,
    userPostNewService,
    userProfile
}
