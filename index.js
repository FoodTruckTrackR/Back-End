const express = require("express")
const cookieParser = require("cookie-parser")
const operatorsRouter = require("./operator/operatorsRouter")
const dinersRouter = require("./diner/dinersRouter")

const server = express()

const port = 5050 || process.env.PORT
server.use(express.json())
server.use(cookieParser())

server.use("/operators", operatorsRouter)
server.use("/diners", dinersRouter)

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong"
    })
})

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})