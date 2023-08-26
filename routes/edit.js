const express = require("express")
const verifyToken = require("../middleware/auth.js")
const { postEdit, getEdit } = require("../controllers/edit.js")

const router = express.Router()

router.post("/", verifyToken, postEdit)
router.get("/:postId", verifyToken, getEdit)

module.exports = router