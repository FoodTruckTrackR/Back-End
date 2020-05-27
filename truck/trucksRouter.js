const express = require("express")
const Trucks = require("./trucksModel")
const Operators = require("../operator/operatorsModel")
const menuRouter = require("../menu/menuRouter")
const ratingsRouter = require("../rating/ratingsRouter")

const router = express.Router({mergeParams: true})

router.use("/:truck_id/menu-items", menuRouter)
router.use("/:truck_id/ratings", ratingsRouter)

router.post("/", validateTruckData(), async (req, res, next) => {
    try {
        const truck = {
            cuisineType: req.body.cuisineType,
            imageOfTruck: req.body.imageOfTruck,
            operatorId: req.params.operator_id
        }
        const newTruck = await Trucks.add(truck)
        res.status(201).json(newTruck)
    } catch(err) {
        next(err)
    }
})

router.get("/",  async (req, res, next) => {
    try {
        if (req.params.operator_id) {
            const operator = await Operators.findById(req.params.operator_id)
            if (!operator) {
                return res.status(404).json({
                    message: "Operator not found"
                })
            }
            res.json(await Trucks.findByOperatorId(req.params.operator_id))
        } else {
            res.json (await Trucks.find())
        }
        
    } catch(err) {
        next(err)
    }
})

router.get("/:truck_id", validateTruck(), async (req, res, next) => {
    const id = req.params.truck_id
    const truck = await Trucks.findById(id)
    if (req.params.operator_id) {
        const operator = await Operators.findById(req.params.operator_id)
        if (!operator) {
            return res.status(404).json({
                message: "Operator not found"
            })
        } else if (truck.operatorId !== operator.id) {
            return res.status(401).json({
                message: "Truck does not belong to operator"
            })
        }
        res.json(truck)
    } else {
        res.json(truck)
    }
})

router.put("/:truck_id", validateTruck(), validateTruckOwnership(), async (req, res, next) => {
    try {
        const updatedTruck = await Trucks.update(req.body, req.params.truck_id)
        res.json(updatedTruck)
    } catch(err) {
        next(err)
    }
})

router.delete("/:truck_id", validateTruck(), validateTruckOwnership(), async (req, res, next) => {
    try {
        await Trucks.remove(req.params.truck_id)
        res.status(204).end()
    } catch(err) {
        next(err)
    }
})

function validateTruckData() {
    return (req, res, next) => {
        const { imageOfTruck, cuisineType } = req.body
        if (!imageOfTruck || !cuisineType) {
            return res.status(404).json({
                message: "Please complete all fields"
            })
        }
        next()
        
    }
}

function validateTruck() {
    return async (req, res, next) => {
        try {
            const id = req.params.truck_id
            const truck = await Trucks.findBy({id})
            if (!truck) {
                return res.status(404).json({
                    message: "Truck not found"
                })
            }
            req.truck = truck
            next()
        } catch(err) {
            next(err)
        }
    }
}

function validateTruckOwnership() {
    return async (req, res, next) => {
        const operatorId = req.truck.operatorId
        const operator = await Operators.findById(req.params.operator_id)
        if (operatorId !== operator.id) {
            return res.status(401).json({
                message: "Truck does not belong to operator"
            })
        }

        next()
    }
}

module.exports = router