const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const helmet = require("helmet")

const operatorsRouter = require("./operator/operatorsRouter")
const dinersRouter = require("./diner/dinersRouter")
const trucksRouter = require("./truck/trucksRouter")

const server = express()
const port = process.env.PORT || 5050

server.use(cors())
server.use(helmet())
server.use(express.json())
server.use(cookieParser())

server.use("/operators", operatorsRouter)
server.use("/diners", dinersRouter)
server.use("/trucks", trucksRouter)

server.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to your new app"
    })
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong"
    })
})

if (!module.parent) {
    server.listen(port, () => {
        console.log(`Server is listening on port ${port}`)
    })
}

module.exports = server