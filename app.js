const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const flash = require("connect-flash");

const User = require("./models/User");

const app = express();

// DB
mongoose.connect("mongodb://127.0.0.1:27017/project");

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

// Passport
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
const userRoutes = require("./routes/user");
const subjectRoutes = require("./routes/subject");

app.use("/", userRoutes);
app.use("/subject", subjectRoutes);


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.listen(8080, () => {
    console.log("Server running on port 3000");
});


