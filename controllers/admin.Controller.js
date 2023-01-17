

const admin = (req, res) => {
    res.render('admin/home',{
        pagina: 'Home',
        dataUser: req.userRest
    })
}

const adminNewService = (req, res) => {
    res.render("admin/new-service",{
        pagina: 'New Service',
        dataUser: req.userRest
    })
}



module.exports = {
    admin,
    adminNewService
}