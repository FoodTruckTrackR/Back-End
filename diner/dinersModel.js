const bcrypt = require("bcryptjs")
const db = require("../data/config")

function find() {
    return db("diners").select("id", "username")
}
function findBy(filter){
    return db("diners")
        .where(filter)
        .first()
}

function findById(id){
    return db("diners")
        .where({id})
        .select("id", "username")
        .first()
}

async function add(data) {
    data.password = await bcrypt.hash(data.password, 13)
    const [id] = await db("diners").insert(data).returning("id")
    return findById(id)
    
}

async function update(data, id) {
    data.password = await bcrypt.hash(data.password, 13)
    await db("diners").where({id}).update(data)
    return findById(id)
}

function remove(id) {
    return db("diners").where({id}).del()
}

module.exports = {
    find,
    findBy,
    findById,
    add,
    update,
    remove
}