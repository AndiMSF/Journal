const User = require("../models/User.js")
const mongoose = require("mongoose")
const getCompose = (req, res) => {
    res.render("compose")
}

const postCompose = (req, res) => {
    try {
        const userId = req.user.id
        const postUser = {
            _id: new mongoose.Types.ObjectId(),
            title: req.body.postTitle,
            description: req.body.postDescription
        }

        User.findOne({ _id: userId })
        .exec()
        .then((user) => {
            if (user) {
                user.posts.push(postUser)
                user.save()
                .then(() => {
                    console.log("Post Added "+ postUser);
                    res.redirect("/journal")
                }) 
            }
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = {
    getCompose,
    postCompose
}