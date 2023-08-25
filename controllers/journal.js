const User = require("../models/User.js")

const journal = (req, res) => {
    try {
        const userId = req.user.id
        console.log("User Id : "+userId);
        User.findOne({ _id: userId })
        .exec()
        .then((foundUser) => {
            if(!foundUser) {
                res.redirect("/auth/login")
            } else {
                const userPosts = foundUser.posts
                res.render("journal", {
                    posts: userPosts
                })
            }
        })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
    
}

module.exports = journal