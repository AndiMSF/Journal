const express = require("express")
const deletePost = require("../controllers/delete.js")
const verifyToken = require("../middleware/auth.js")

const router = express.Router()

router.post("/", verifyToken, deletePost)

module.exports = router