const express = require('express');
const { userHome } = require('../controllers/user.Controller.js');
const isLoggedIn = require("../middleware/isLoggedIn");
const router = express.Router();


router.get("/home",isLoggedIn, userHome);




module.exports = router;