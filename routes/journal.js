const express = require("express")
const journal = require("../controllers/journal.js")
const verifyToken = require("../middleware/auth.js")

const router = express.Router()

router.get("/", verifyToken, journal)

module.exports = router