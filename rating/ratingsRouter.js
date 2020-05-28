const express = require("express")
const Rating = require("./ratingsModel")
const Trucks = require("../truck/trucksModel")
const {restrictAccess} = require("../middleware/restrict")

const router = express.Router({
    mergeParams: true
})

router.post("/", validateRatingData(), restrictAccess("diner"), validateTruck(), async (req, res, next) => {
    try{
        const rating = {
            rating: req.body.rating,
            truckId: req.params.truck_id
        }
        res.status(201).json(await Rating.add(rating))
    } catch(err){
        next(err)
    }
})

router.put("/:rating_id", validateRatingData(), restrictAccess("diner"), validateTruck(), validateRating(), async (req, res, next) => {
    try {
        const rating = {
            rating: req.body.rating,
            truckId: req.params.truck_id
        }
        const updatedRating = await Rating.update(rating, req.params.rating_id)
        res.json(updatedRating)
    } catch(err) {
        next(err)
    }
})

router.delete("/:rating_id", restrictAccess("diner"), validateTruck(), validateRating(), async (req, res, next) => {
    try{
        await Rating.remove(req.params.rating_id)
        res.status(204).end()
    } catch(err){
        next(err)
    }
})

function validateRatingData() {
    return (req, res, next) => {
        const {rating} = req.body
        if (!rating || typeof rating !== "number") {
            return res.status(400).json({
                message: "Please enter a valid rating"
            })
        }

        next()
    }
} 

function validateRating(){
    return async (req, res, next) => {
        const rating = await Rating.findById(req.params.rating_id)
        if (!rating) {
            return res.status(404).json({
                message: "Rating not found"
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
module.exports = router