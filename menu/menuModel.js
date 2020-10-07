const db = require("../data/config")

function find(){
    return db("menu-items")
}
function findById(id) {
    return db("menu-items").where("id", id).first()
}

async function add(data) {
    const [id] = await db("menu-items").insert(data).returning("id")
    return findById(id)
}

async function update(data, id) {
    await db("menu-items").where({id}).update(data)
    return findById(id)
}

function remove(id) {
    return db("menu-items").where({id}).del()
}

module.exports = {
    find,
    findById,
    add,
    update,
    remove
}
