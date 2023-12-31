const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        posts: {
            type: Array,
            default: [],
        },
    }, { timestamps: true }
)

const User = mongoose.model("User", UserSchema)
module.exports = User