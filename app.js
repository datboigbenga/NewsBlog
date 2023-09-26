require("dotenv").config()
require("express-async-errors")

const express = require("express")
const app = express()
const db= require("./db/database")
const cookiePaser = require("cookie-parser")


const cors = require("cors")
const helmet = require("helmet")
const xss = require("xss-clean")



const Authroute  = require("./routes/authRoute")
const Userroute  = require("./routes/userRoute")
const Blogroute = require("./routes/mainRoute")


const notFound = require("./middleware/not-found")
const errorHandler = require("./middleware/errorHandler")


app.use(express.static("./public"))
app.use("/uploads",express.static("uploads"))
app.use(cookiePaser(process.env.JWT_SECRET))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
// app.use(fileUpload({ useTempFiles: true}))
app.use(helmet())
app.use(xss())


app.use("/api/v1/auth", Authroute)
app.use("/api/v1/user", Userroute)
app.use("/api/v1/posts", Blogroute)

app.use(notFound)
app.use(errorHandler)


// const port = process.env.PORT || 5000


// const start = async()=>{
//     try {
//         await db.connectDb()
//         app.listen(port, ()=>{console.log("server listening on port " + port +"...")})
//     } catch (error) {
//         console.log("unnable to connnect to database")
//     }
// }

// start()

module.exports = app;
