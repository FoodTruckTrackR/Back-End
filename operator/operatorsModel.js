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
    operator.trucks = await db("trucks").where("operatorId", id)
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