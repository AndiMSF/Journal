const express = require("express") 
const { login, register } = require("../controllers/auth.js")

const router = express.Router()
router.get("/login", (req, res) => {
    res.render("login", { message: req.flash("message") })
})
router.get("/register", (req, res) => {
    res.render("register", { message: req.flash("message") })
})
router.post("/login", login)
router.post("/register", register)

module.exports = router