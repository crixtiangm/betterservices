

const userHome = (req, res) => {
    res.render('user/home',{
        pagina: 'Home'
    })
}

module.exports = { 
    userHome 
}
