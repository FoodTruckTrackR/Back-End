const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Diners = require("./dinersModel")


const router = express.Router()

router.post("/register", async (req, res, next) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            res.status(404).json({
                message: "Please enter valid username and password"
            })
        }
        const user = await Diners.findBy({username})
        if (user) {
            res.status(409).json({
                message: "Username is already taken. Please select another"
            })
        }
        const newDiner = await Diners.add(req.body)
        res.status(201).json(newDiner)
    } catch(err) {
        next(err)
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const {username, password} = req.body
        const user = await Diners.findBy({username})
        const validPassword = await bcrypt.compare(password, user.password)
        if (!user || !validPassword) {
            res.status(401).json({
                message: "Invalid Credentials"
            })
        }
        const user1 = await Diners.findById(user.id)
        const tokenPayload = {
            dinerId: user.id,
            dinerName: user.username
        }
        res.json({
            message: `Welcome ${user1.username}`,
            token: jwt.sign(tokenPayload, process.env.JWT_SECRET)
        })
    } catch (err){
        next(err)
    }
})

router.get("/", async (req, res, next) => {
    try {
        res.json(await Diners.find())
    } catch(err) {
        next(err)
    }
})
router.get("/:id", validateDiner(), async (req, res, next) => {
    try {
        res.json(req.diner)
    } catch(err) {
        next(err)
    }
})

router.put("/:id", validateDiner(), async (req, res, next) => {
    try {
        const diner = await Diners.update(req.body, req.params.id)
        res.json(diner)
    } catch(err) {
        next(err)
    }
})

router.delete("/:id", validateDiner(), async (req, res, next) => {
    try {
        await Diners.remove(req.params.id)
        res.status(204).end()
    } catch(err) {
        next(err)
    }
})

function validateDiner() {
    return async (req, res, next) => {
        try {
            const diner = await Diners.findById(req.params.id)
            if (!diner) {
                return res.status(404).json({
                    message: "User not found"
                })
            }
    
            req.diner = diner
            next()
        } catch(err) {
            next(err)
        }
    }
}

module.exports = router