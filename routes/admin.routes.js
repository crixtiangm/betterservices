const express = require('express');
const { admin } = require('../controllers/admin.Controller.js');
const isLoggedInAdmin = require("../middleware/isLoggedInAdmin");
const router = express.Router();

/* GET home page */
router.get("/", isLoggedInAdmin, admin);

module.exports = router;