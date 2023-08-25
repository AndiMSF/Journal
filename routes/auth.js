const express = require("express") 
const { login, register } = require("../controllers/auth.js")

const router = express.Router()
router.get("/login", (req, res) => {
    res.render("login")
})
router.get("/register", (req, res) => {
    res.render("register")
})
router.post("/login", login)
router.post("/register", register)

module.exports = router