const User = require("../models/User.js")

const post = async (req, res) => {
    try {
        const postId = req.params.postId
        const userId = req.user.id
        
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ error: "User not found!" })
        }

        const foundPost = user.posts.find(post => postId == post._id)

        if (!foundPost) {
            return res.status(404).json({ error: "Post not found!" })   
        }

        res.render("post", {title: foundPost.title, description: foundPost.description, post: foundPost })
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

module.exports = post