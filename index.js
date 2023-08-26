const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const ejs = require("ejs")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const flash = require("connect-flash")

// Import verifyToken
const verifyToken = require("./middleware/auth.js")


// Import Routes
const authRoutes = require("./routes/auth.js")
const journalRoutes = require("./routes/journal.js")
const composeRoutes = require("./routes/compose.js")
const postRoutes = require("./routes/post.js")
const deleteRoutes = require("./routes/delete.js")
const editRoutes = require("./routes/edit.js")

// Configuration
const app = express()
dotenv.config()
app.use(cookieParser())
app.set('view engine', 'ejs');
app.use(express.static(__dirname+ "/public"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000 },
    saveUninitialized: false,
    resave: false
}))
app.use(flash())


// MongoDB Setup
const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://'+process.env.DB_USERNAME+':'+process.env.DB_PASSWORD+'@cluster0.vqcsdra.mongodb.net/30Days_remake',
            {
                useNewUrlParser:true,
                useUnifiedTopology:true
            }
        )
        console.log("Database Connected "+conn)
    } catch (err) {
        console.log(err)
    }  
}
const PORT = 8080
connectDatabase().then(() => {
    app.listen(PORT, function() {
        console.log("Server berjalan di port "+PORT);
      })
})

app.get("/", (req, res) => {
    if(req.cookies.jwt){
        res.redirect("/userhome")
    } else {
        res.render("home")
    }
})
app.get("/userhome", verifyToken, (req, res) => {
    res.render("homeLoggedUser")
})
app.get("/logout", (req, res) => {
   res.cookie("jwt", "", { maxAge: 1 })
   res.redirect("/")
})


app.use("/auth", authRoutes)
app.use("/journal", journalRoutes)
app.use("/posts", postRoutes)
app.use("/compose", composeRoutes)
app.use("/delete", deleteRoutes)
app.use("/edit", editRoutes)