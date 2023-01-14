const express = require('express');
const { userHome } = require('../controllers/user.Controller.js');
const isLoggedInUser = require("../middleware/isLoggedInUser");
const router = express.Router();
const User = require('../models/User.model');


router.get("/home",isLoggedInUser, userHome);


// Crear servicio
router.get("/createService",isLoggedIn, (req,res,next) => {
    User.find()
    .then((user) => {

        res.render("user/service/serviceList",{user}  )
    })
    .catch((error) => next(error))
});

router.post("/createService",isLoggedIn, (req,res,next) => {

});


module.exports = router;