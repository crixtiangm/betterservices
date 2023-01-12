const express = require('express');
const { admin } = require('../controllers/index.Controller.js');
const isLoggedIn = require("../middleware/isLoggedIn");
const router = express.Router();

/* GET home page */
router.get("/admin",isLoggedIn, admin);

module.exports = router;
