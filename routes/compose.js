const express = require("express")
const verifyToken = require("../middleware/auth.js")
const { getCompose, postCompose } = require("../controllers/compose.js")

const router = express.Router()

router.get("/", verifyToken, getCompose)
router.post("/", verifyToken, postCompose)

module.exports = router