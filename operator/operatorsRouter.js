const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Operators = require("./operatorsModel")
const trucksRouter = require("../truck/trucksRouter")


const router = express.Router()

router.use("/:operator_id/trucks", trucksRouter)

router.post("/register", async (req, res, next) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            res.status(404).json({
                message: "Please enter valid username and password"
            })
        }
        const user = await Operators.findBy({username})
        if (user) {
            res.status(409).json({
                message: "Username is already taken. Please select another"
            })
        }
        const newOperator = await Operators.add(req.body)
        res.status(201).json(newOperator)
    } catch(err) {
        next(err)
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const {username, password} = req.body
        const user = await Operators.findBy({username})
        const validPassword = await bcrypt.compare(password, user.password)
        if (!user || !validPassword) {
            res.status(401).json({
                message: "Invalid Credentials"
            })
        }
        const user1 = await Operators.findById(user.id)
        const tokenPayload = {
            operatorId: user.id,
            operatorName: user.username
        }
        res.json({
            ...user1,
            token: jwt.sign(tokenPayload, process.env.JWT_SECRET),
        })
    } catch (err){
        next(err)
    }
})

router.get("/", async (req, res, next) => {
    try {
        res.json(await Operators.find())
    } catch(err) {
        next(err)
    }
})
router.get("/:operator_id", validateOperator(), async (req, res, next) => {
    try {
        res.json(req.operator)
    } catch(err) {
        next(err)
    }
})

router.put("/:operator_id", validateOperator(), async (req, res, next) => {
    try {
        const operator = await Operators.update(req.body, req.params.operator_id)
        res.json(operator)
    } catch(err) {
        next(err)
    }
})

router.delete("/:operator_id", validateOperator(), async (req, res, next) => {
    try {
        await Operators.remove(req.params.operator_id)
        res.status(204).end()
    } catch(err) {
        next(err)
    }
})

function validateOperator() {
    return async (req, res, next) => {
        try {
            const operator = await Operators.findById(req.params.operator_id)
            if (!operator) {
                return res.status(404).json({
                    message: "User not found"
                })
            }
    
            req.operator = operator
            next()
        } catch(err) {
            next(err)
        }
    }
}

module.exports = router