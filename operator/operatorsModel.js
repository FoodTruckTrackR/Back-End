const bcrypt = require("bcryptjs")
const db = require("../data/config")

function find() {
    return db("operators").select("id", "username")
}
function findBy(filter){
    return db("operators")
        .where(filter)
        .first()
}

async function findById(id){
    const operator = await db("operators")
        .where({id})
        .select("id", "username")
        .first()
    const trucks = await db("trucks").where("operatorId", id).select("id", "imageOfTruck", "cuisineType")
    operator.trucks = await Promise.all(trucks.map(async truck => {
        const truckRatings = await db("ratings").where("truckId", truck.id).select("rating")
        const menuItems = await db("menu-items").where("truckId", truck.id).select("id", "itemName", "itemDescription", "itemPrice", "itemPhoto")
        const ratings = truckRatings.map(rating => rating.rating)
        const ratingAvg = (ratings.reduce((a, b) => a + b, 0))/ratings.length
        return {
            ...truck,
            menuItems: menuItems,
            ratings: ratings,
            ratingAvg: ratingAvg
        }
    }))
    return operator
}

async function add(data) {
    data.password = await bcrypt.hash(data.password, 13)
    const [id] = await db("operators").insert(data)
    return findById(id)
    
}

async function update(data, id) {
    data.password = await bcrypt.hash(data.password, 13)
    await db("operators").where({id}).update(data)
    return findById(id)
}

function remove(id) {
    return db("operators").where({id}).del()
}

module.exports = {
    find,
    findBy,
    findById,
    add,
    update,
    remove
}