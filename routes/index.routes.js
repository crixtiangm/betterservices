const express = require('express');
const { admin } = require('../controllers/index.Controller.js');
const router = express.Router();

/* GET home page */
router.get("/", admin);

module.exports = router;
