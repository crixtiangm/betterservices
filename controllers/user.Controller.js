

const userHome = (req, res) => {
    res.render('user/home',{
        headeruser:true,
        pagina: 'Home',
        dataUser: req.userRest
    })
}

const userNewService = (req, res) => {

   res.render('user/new-service',{ 
    pagina: 'New Service',
    headeruser: true,
    dataUser: req.userRest
   } ) 
};

const userSearch = (req, res) => {

    res.render('user/search',{ 
     pagina: 'Search',
     headeruser:true,
     dataUser: req.userRest
    } ) 
 };

module.exports = { 
    userHome,
    userNewService,
    userSearch
}
