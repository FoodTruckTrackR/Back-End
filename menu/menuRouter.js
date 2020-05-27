const express = require("express")
const Operators = require("../operator/operatorsModel")
const Trucks = require("../truck/trucksModel")
const Menu = require("../menu/menuModel")

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

function validateMenuItem() {
    return async (req, res, next) => {
        const menuItem = await Menu.findById(req.params.menu_id)
        if (!menuItem) {
            res.status(404).json({
                message: "Menu item not found"
            })
        }

        next()
    }
}

function validateMenuData() {
    return (req, res, next) => {
        
    }
}