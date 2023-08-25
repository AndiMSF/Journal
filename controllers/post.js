const User = require("../models/User.js")

const post = async (req, res) => {
    try {
        const postId = req.params.postId
        const userId = req.user.id
        
        const user = await User.findById(userId)

        if (!user) {
            console.log("User not found!");
            return
        }

        const foundPost = user.posts.find(post => postId == post._id)

        if (!foundPost) {
            console.log("Post not found!");
            return
        }

        res.render("post", {title: foundPost.title, description: foundPost.description })
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

module.exports = post