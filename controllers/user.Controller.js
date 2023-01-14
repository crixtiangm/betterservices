

const userHome = (req, res) => {
    res.render('user/home',{
        pagina: 'Home',
        header: true
    })
}

module.exports = { 
    userHome 
}
