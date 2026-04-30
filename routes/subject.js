const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");

// Middleware
function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    next();
}

// READ
router.get("/", isLoggedIn, async (req, res) => {
    const subjects = await Subject.find();
    res.render("subjects/index", { subjects });
});

// CREATE
router.get("/new", isLoggedIn, (req, res) => {
    res.render("subjects/new");
});

router.post("/", isLoggedIn, async (req, res) => {
    await Subject.create(req.body);
    res.redirect("/subject");
});

// EDIT
router.get("/:id/edit", isLoggedIn, async (req, res) => {
    const subject = await Subject.findById(req.params.id);
    res.render("subjects/edit", { subject });
});

router.put("/:id", isLoggedIn, async (req, res) => {
    await Subject.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/subject");
});

// DELETE (optional)
router.delete("/:id", isLoggedIn, async (req, res) => {
    await Subject.findByIdAndDelete(req.params.id);
    res.redirect("/subject");
});

module.exports = router;