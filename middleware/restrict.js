const jwt = require("jsonwebtoken")

function restrictAccess(access) {
    return async (req, res, next) => {
        console.log(access)
        const authError = {
            message: "Invalid Credentials"
        }
        try {
            const token = req.headers.authorization
            console.log(token)
            if (!token) {
                return res.status(401).json(authError)
            }
            console.log("working")
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
            console.log(process.env.JWT_SECRET)
            console.log(decodedPayload)
            if (err || decodedPayload.access !== access) {
                return res.status(401).json(authError)
            }
            req.token = decodedPayload
            next()
        })
        } catch(err) {
            next(err)
        }
    }
}

function restrict() {
    return async (req, res, next) => {
        const authError = {
            message: "Invalid Credentials"
        }
        try {
            const token = req.headers.authorization
            if (!token) {
                return res.status(401).json(authError)
            }
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
            if (err) {
                return res.status(401).json(authError)
            }
            req.token = decodedPayload
            next()
        })
        } catch(err) {
            next(err)
        }
    }
}

module.exports = {
    restrictAccess,
    restrict
}