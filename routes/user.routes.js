const express = require('express');
const { userHome, userNewService } = require('../controllers/user.Controller.js');
const isLoggedInUser = require("../middleware/isLoggedInUser");
const router = express.Router();
const User = require('../models/User.model');


router.get("/home",isLoggedInUser, userHome);


router.get("/new-service", isLoggedInUser,userNewService );



// Crear servicio



module.exports = router;