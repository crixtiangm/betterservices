

const admin = (req, res) => {
    res.render('admin/home',{
        pagina: 'Home',
        header: true
    })
}



module.exports = {
    admin
}