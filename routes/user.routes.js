const express = require('express');
const { userHome, userNewService,userSearch,userProfile, userPostNewService } = require('../controllers/user.Controller.js');
const isLoggedInUser = require("../middleware/isLoggedInUser");
const router = express.Router();
const User = require('../models/User.model');



router.get("/home",isLoggedInUser, userHome);

router.get("/new-service", isLoggedInUser,userNewService );

router.get("/search", isLoggedInUser, userSearch);

router.get('/profile',isLoggedInUser,userProfile );

router.post("/new-service",isLoggedInUser,userPostNewService);




// Crear servicio



module.exports = router;