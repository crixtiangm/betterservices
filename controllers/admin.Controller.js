

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



module.exports = {
    admin,
    adminNewService
}