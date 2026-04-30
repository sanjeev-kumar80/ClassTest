
const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    image: String,
    units: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Subject", subjectSchema);