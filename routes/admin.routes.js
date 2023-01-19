const express = require('express');
const { body } = require('express-validator');
const { admin, adminNewService, adminCreateNewService, adminAddImageService, adminStorageImageService, adminMyService } = require('../controllers/admin.Controller.js');
const isLoggedInAdmin = require("../middleware/isLoggedInAdmin");
const uploadImg = require('../config/cloudinary.js');
const router = express.Router();

/* GET home page */
router.get("/", isLoggedInAdmin, admin);

/* GET service page */
router.get("/new-service", isLoggedInAdmin, adminNewService);

router.post("/new-service", isLoggedInAdmin, adminCreateNewService);

/** GET add-image page */
router.get("/add-image", isLoggedInAdmin, adminAddImageService);

router.post("/add-image", isLoggedInAdmin, uploadImg.array('serviceimage',2), adminStorageImageService);

/** GET my-service page */
router.get("/my-service", isLoggedInAdmin, adminMyService);

module.exports = router;