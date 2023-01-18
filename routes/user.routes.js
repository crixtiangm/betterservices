const express = require('express');
const { userHome, userNewService, userSearch, userProfile, userPostNewService, userEditService, updateService,renderYourService } = require('../controllers/user.Controller.js');
const isLoggedInUser = require("../middleware/isLoggedInUser");
const router = express.Router();
const User = require('../models/User.model');



router.get("/home", isLoggedInUser, userHome);

//busqueda
router.get("/search", isLoggedInUser, userSearch);


router.get('/profile', isLoggedInUser, userProfile);


//Create new service & 
router.get("/new-service", isLoggedInUser, userNewService);

router.post("/new-service", isLoggedInUser, userPostNewService);

//Edit service

router.get("/edit-service/:id", isLoggedInUser, userEditService);

router.put("/edit-service/:id", isLoggedInUser, updateService);

// render tus servicios

router.get("/your-service", isLoggedInUser, renderYourService)




module.exports = router;