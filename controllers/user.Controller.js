

const userHome = (req, res) => {
    res.render('user/home',{
        pagina: 'Home',
        header: true
    })
}

const userNewService = (req, res) => {

   res.render('user/new-service',{ 
    pagina: 'New Service',
    header: true
   } ) 
};

const userSearch = (req, res) => {

    res.render('user/search',{ 
     pagina: 'Search',
     header: true
    } ) 
 };

module.exports = { 
    userHome,
    userNewService,
    userSearch
}
