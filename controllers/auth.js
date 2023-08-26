const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User.js")

// REGISTER
const register = async (req, res) => {
    try {
        // get data from frontend
        const {
            email,
            password
        } = req.body

        // hashing a password
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        // data user for send to database
        const newUser = new User({
            email,
            password: passwordHash
        })
        
        const savedUser = await newUser.save()
        console.log(savedUser);
        res.redirect("/auth/login")
    } catch (err) {
        req.flash("message", "Duplicate email / password < 6 characters")
        res.redirect("/auth/register")
    }
}

// LOGIN
const login = async (req, res) => {
    try {
        // waktu expired token
        const maxAge = 3 * 24 * 60 * 60
        // get data from frontend
        const {
            email,
            password
        } = req.body

        // let's search a user in database by an email...
        const user = await User.findOne({ email: email })
        if (!user)  {
            req.flash("message", "User doesn't Exist")
            return res.redirect("/auth/login")
        }

        // Check if password that sent in frontend is equal to hashed password in database
        const checkHashPassword = await bcrypt.compare(password, user.password)
        if (!checkHashPassword) {
            req.flash("message", "Wrong email / password")
            return res.redirect("/auth/login")
        }
        // Then we give the user a password
        const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET, {
            expiresIn: maxAge
        })
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        })
        delete user.password
        res.redirect("/userhome")
    } catch (err) {
        req.flash("message", err.message)
        res.redirect("/auth/login")
    } 
}

module.exports = {
    login,
    register
}