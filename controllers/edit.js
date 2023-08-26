const User = require("../models/User.js")
const mongoose = require("mongoose")

const getEdit = async (req, res) => {
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
        res.render("editPost", {title: foundPost.title, description: foundPost.description, post: foundPost })
    } catch (err) {
        res.status(500).json({ error: err.message })
        console.log(err.message);
    }
}

const postEdit = async (req, res) => {
    try {
       const postId = req.body.postId
       const postTitle = req.body.postTitle
       const postDescription = req.body.postDescription
       const userId = req.user.id

       const user = await User.findById(userId)

       if (!user) {
        return res.status(404).json({ error: "User not found!" })
       }

       // Search Post Inside user data
       const postIndex = user.posts.findIndex(post => post._id.equals(postId))

       // If Post Not Found
       if (postIndex === -1) {
        return res.status(404).json({ error: "Post not found!" })
       }

       // Update Post
       const updatedPost = {
        _id: new mongoose.Types.ObjectId(postId),
        title: postTitle,
        description: postDescription
       }
       
       // Replace the old post
       user.posts[postIndex] = updatedPost

       await user.save()

       res.redirect("/journal")

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = {
    getEdit,
    postEdit
}