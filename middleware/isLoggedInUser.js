const jwt = require('jsonwebtoken');
const User = require('../models/User.model.js');


module.exports = async (req, res, next) => {
  //Verificamos si existe unn token
  const { _token } = req.cookies
  if(!_token){
    return res.redirect('/auth/login')
  }
  //Comprobamos que el token es valido utilizando jsonwebtoken verify
  try {
    const decodeJWT = jwt.verify(_token,process.env.SESSION_SECRET);
    const user = await User.findById(decodeJWT.id);
    const {password,status,createdAt,updatedAt,...userRest} = user.toObject();
    // Almacenamos el usuario
    if(userRest && userRest.role === 'User'){
      req.userRest = userRest
    }else{
      return res.redirect('/auth/login')
    }
    return next();
  } catch (error) {
      return res.clearCookie('_token').redirect('/auth/login');
  }
};