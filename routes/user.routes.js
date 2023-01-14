const express = require('express');
const { userHome } = require('../controllers/user.Controller.js');
const isLoggedInUser = require("../middleware/isLoggedInUser");
const router = express.Router();


router.get("/home",isLoggedInUser, userHome);




module.exports = router;