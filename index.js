const express = require("express")
const cookieParser = require("cookie-parser")
const operatorsRouter = require("./operator/operatorsRouter")
const dinersRouter = require("./diner/dinersRouter")

const server = express()

const port = process.env.PORT || 5050
server.use(express.json())
server.use(cookieParser())

server.use("/operators", operatorsRouter)
server.use("/diners", dinersRouter)

server.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to your brand new app"
    })
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong"
    })
})

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})