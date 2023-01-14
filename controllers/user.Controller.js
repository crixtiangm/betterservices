

const userHome = (req, res) => {
    res.render('user/home',{
        pagina: 'Home'
    })
}

const userNewService = (req, res) => {

   res.render('user/new-service',{ 
    pagina: 'New Service'
   } ) 
};

module.exports = { 
    userHome,
    userNewService
}
