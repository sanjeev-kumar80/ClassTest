const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");

// Register
router.get("/register", (req, res) => {
    res.render("users/register");
});

router.post("/register", async (req, res) => {
    const { username, password, favSubject, collegeYear, teacherName } = req.body;

    const user = new User({ username, favSubject, collegeYear, teacherName });
    await User.register(user, password);

    res.redirect("/login");
});

// Login
router.get("/login", (req, res) => {
    res.render("users/login");
});

router.post("/login",
    passport.authenticate("local", {
        successRedirect: "/subject",
        failureRedirect: "/login"
    })
);

// Logout
router.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/login");
    });
});

module.exports = router;