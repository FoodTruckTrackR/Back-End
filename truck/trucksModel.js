const db = require("../data/config")

function find(){
    return db("trucks")
}

async function find() {
    const trucks = await db("trucks")
    const newTrucks = await Promise.all(trucks.map(async truck => {
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
    return trucks
}

function findBy(filter) {
    return db("trucks").where(filter).first()
}

async function findById(id) {
    const truck = await db("trucks").where("id", id).first()
    truck.menuItems = await db("menu-items").where("truckId", id).select("id", "itemName", "itemDescription", "itemPrice", "itemPhoto")
    const ratings = await db("ratings").where("truckId", id).select("rating")
    truck.ratings = ratings.map(rating => rating.rating)
    truck.ratingAvg = (truck.ratings.reduce((a, b) => a + b, 0))/truck.ratings.length
    return truck
}

function findByOperatorId(id) {
    return db("trucks").where("operatorId", id)
}

async function add(data) {
    const [id] = await db("trucks").insert(data)
    return findBy({id})
}

async function update(data, id) {
    await db("trucks").where({id}).update(data)
    return findBy({id})
}

function remove(id){
    return db("trucks").where({id}).del()
}

module.exports = {
    find,
    findBy,
    findById,
    findByOperatorId,
    add,
    update,
    remove

}