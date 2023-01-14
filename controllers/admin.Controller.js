

const admin = (req, res) => {
    res.render('admin/home',{
        pagina: 'Home'
    })
}



module.exports = {
    admin
}