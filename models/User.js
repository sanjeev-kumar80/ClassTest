const mongoose = require("mongoose");

const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new mongoose.Schema({
    favSubject: {
        type: String,
        required: true
    },
    collegeYear: {
        type: Number,
        required: true
    },
    teacherName: String
});

// console.log(typeof passportLocalMongoose);

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);