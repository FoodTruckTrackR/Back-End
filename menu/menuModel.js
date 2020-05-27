const db = require("../data/config")

function findById(id) {
    return db("menu-items").where("id", id).first()
}

async function add(data) {
    const [id] = await db("menu-items").insert(data)
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

    findById,
    add,
    update,
    remove
}
