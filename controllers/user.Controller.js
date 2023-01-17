

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

const userSearch = (req, res) => {

    res.render('user/search',{ 
     pagina: 'Search',
     dataUser: req.userRest
    } ) 
 };

module.exports = { 
    userHome,
    userNewService,
    userSearch
}
