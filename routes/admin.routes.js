const express = require('express');
const { admin, adminSearch, adminSendSearch, adminNewService, adminCreateNewService, adminAddImageService, adminStorageImageService, adminMyService, adminEditMyService, adminSendEditMyService, adminDeleteMyService, adminServiceComment, adminSendServiceComment, adminCommentMyService } = require('../controllers/admin.Controller.js');
const isLoggedInAdmin = require("../middleware/isLoggedInAdmin");
const uploadImg = require('../config/cloudinary.js');
const router = express.Router();

/* GET home page */
router.get("/", isLoggedInAdmin, admin);

/** GET Search page */
router.get("/search", isLoggedInAdmin, adminSearch);

router.post("/search", isLoggedInAdmin, adminSendSearch);

/* GET service page */
router.get("/new-service", isLoggedInAdmin, adminNewService);

router.post("/new-service", isLoggedInAdmin, adminCreateNewService);

/** GET add-image page */
router.get("/add-image", isLoggedInAdmin, adminAddImageService);

router.post("/add-image", isLoggedInAdmin, uploadImg.array('serviceimage',2), adminStorageImageService);

/** GET my-service page */
router.get("/my-service", isLoggedInAdmin, adminMyService);

/** GET edit-my-service */
router.get("/:idMyService/edit-my-service", isLoggedInAdmin, adminEditMyService);

router.post("/:idMyService/edit-my-service", isLoggedInAdmin, adminSendEditMyService);

/** GET delete-my-service */
router.get("/:idMyService/delete-my-service", isLoggedInAdmin, adminDeleteMyService);

/** GET service-schedule page */
router.get("/:idService/service-comment", isLoggedInAdmin, adminServiceComment);

router.post("/:idService/service-comment", isLoggedInAdmin, adminSendServiceComment);

router.get("/comment-in-serv", isLoggedInAdmin, adminCommentMyService)

module.exports = router;