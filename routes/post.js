const express = require("express")
const verifyToken = require("../middleware/auth.js")
const post = require("../controllers/post.js")

const router = express.Router()

router.get("/:postId", verifyToken, post)

module.exports = router