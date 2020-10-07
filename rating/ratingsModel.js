const db = require("../data/config")

function findById(id) {
    return db("ratings").where({id}).first()
}

async function add(data){
    const [id] = await db("ratings").insert(data).returning("id")
    return findById(id)
}

async function update(data, id){
    await db("ratings").where({id}).update(data)
    return findById(id)
}

function remove(id) {
    return db("ratings").where({id}).del()
}

module.exports = {
    findById,
    add,
    update,
    remove
}