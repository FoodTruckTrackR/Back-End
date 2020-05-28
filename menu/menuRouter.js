const express = require("express")
const Operators = require("../operator/operatorsModel")
const Trucks = require("../truck/trucksModel")
const Menu = require("../menu/menuModel")
const { restrictAccess, restrict } = require("../middleware/restrict")

const router = express.Router({
    mergeParams: true
})

router.post("/", validateMenuData(), restrictAccess("operator"), validateOperator(), validateTruck(), validateOwnership(), async (req, res, next) => {
    try {
        const menuItem = {
            itemName: req.body.itemName,
            itemDescription: req.body.itemDescription,
            itemPhoto: req.body.itemPhoto,
            itemPrice: req.body.itemPrice,
            truckId: req.params.truck_id
        }
        res.status(201).json(await Menu.add(menuItem))
    } catch(err) {
        next(err)
    }
})

router.get("/", restrict(), async (req, res, next) => {
    try {
        res.json(await Menu.find())
    } catch(err) {
        next(err)
    }
})

router.put("/:menu_id", validateMenuData(), restrictAccess("operator"), validateMenuItem(), validateOperator(), validateTruck(), validateOwnership(), async (req, res, next) => {
    try {
        const updatedItem = {
            itemName: req.body.itemName,
            itemDescription: req.body.itemDescription,
            itemPhoto: req.body.itemPhoto,
            itemPrice: req.body.itemPrice
        }
        const newItem = await Menu.update(updatedItem, req.params.menu_id)
        res.json(newItem)
    } catch(err) {
        next(err)
    }
})

router.delete("/:menu_id", restrictAccess("operator"), validateMenuItem(), validateOperator(), validateTruck(), validateOwnership(), async (req, res, next) => {
    try {
        await Menu.remove(req.params.menu_id)
        res.status(204).end()
    } catch(errr) {
        next(err)
    }
})


function validateOperator() {
    return async (req, res, next) => {
        const operator = await Operators.findById(req.params.operator_id)
        if (!operator) {
            return res.status(404).json({
                message: "Operator not found"
            })
        }

        next()
    }
}

function validateTruck() {
    return async (req, res, next) => {
        const id = req.params.truck_id
        const truck = await Trucks.findBy({id})
        if (!truck) {
            return res.status(404).json({
                message: "Truck not found"
            })
        }

        next()
    }
}

function validateOwnership() {
    return async (req, res, next) => {
        const operator = await Operators.findById(req.params.operator_id)
        const id = req.params.truck_id
        const truck = await Trucks.findBy({id})
        if (truck.operatorId !== operator.id) {
            return res.status(401).json({
                message: "You are not authorized to change the menu"
            })
        }

        next()
    }
}

function validateMenuItem() {
    return async (req, res, next) => {
        const menuItem = await Menu.findById(req.params.menu_id)
        if (!menuItem) {
            return res.status(404).json({
                message: "Menu item not found"
            })
        }

        next()
    }
}

function validateMenuData() {
    return (req, res, next) => {
        const {itemName, itemDescription, itemPhoto, itemPrice } = req.body
        if (!itemName || !itemDescription || !itemPhoto || !itemPrice) {
            return res.status(400).json({
                message: "Please complete all fields"
            })
        }

        next()
    }
}

module.exports = router