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

function findById(id){
    return db("operators")
        .where({id})
        .select("id", "username")
        .first()
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