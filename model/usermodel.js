const mongoose = require("mongoose");

const userschema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email address'],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be 6 characters long"]
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

const userModel = mongoose.model("users",userschema);
module.exports = userModel;