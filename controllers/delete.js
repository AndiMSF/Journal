const User = require("../models/User.js")

const deletePost = async (req, res) => {
    try {
        const checkedItemById = req.body.checkbox
        const userId = req.user.id
        
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ error: "User not found!" })
        }
        // Find Post By index
        const postIndex = user.posts.findIndex(post => post._id.equals(checkedItemById))

        // If Post Not Found
        if (postIndex === -1) {
            return res.status(404).json({ error: "Post not found!" })
        }

        // Remove post from an array
        user.posts.splice(postIndex, 1)
        await user.save()
        console.log("Post deleted!");
        res.redirect("/journal")
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}   

module.exports = deletePost