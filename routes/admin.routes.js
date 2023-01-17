const express = require('express');
const { admin, adminNewService } = require('../controllers/admin.Controller.js');
const isLoggedInAdmin = require("../middleware/isLoggedInAdmin");
const router = express.Router();

/* GET home page */
router.get("/", isLoggedInAdmin, admin);

/* GET service page */
router.get("/new-service",isLoggedInAdmin, adminNewService);

module.exports = router;