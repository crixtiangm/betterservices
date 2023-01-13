const express = require('express');
const { admin } = require('../controllers/admin.Controller.js');
const isLoggedIn = require("../middleware/isLoggedIn");
const router = express.Router();

/* GET home page */
router.get("/", isLoggedIn, admin);

module.exports = router;