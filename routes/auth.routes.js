const express = require("express");
const {formLogin, sendLogin, formSignup, sendSignup, formForgotPassword} = require('../controllers/auth.Controller.js');
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

//GET /auth/forgot-password
router.get('/forgot-password',isLoggedOut, formForgotPassword)

// GET /auth/logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).render("auth/logout", { errorMessage: err.message });
      return;
    }

    res.redirect("/");
  });
});

module.exports = router;
