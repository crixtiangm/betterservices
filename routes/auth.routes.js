const express = require("express");
const {formLogin, sendLogin, logOut, formSignup, sendSignup, formForgotPassword} = require('../controllers/auth.Controller.js');
const router = express.Router();

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

// GET /auth/signup
router.get("/signup", isLoggedOut, formSignup);

// POST /auth/signup
router.post("/signup", isLoggedOut, sendSignup);

// GET /auth/login
router.get("/login", isLoggedOut, formLogin);

// POST /auth/login
router.post("/login", isLoggedOut, sendLogin);

//POST Cerrar Sesion
router.post('/log-out', logOut)

//GET /auth/forgot-password
router.get('/forgot-password',isLoggedOut, formForgotPassword)

module.exports = router;
