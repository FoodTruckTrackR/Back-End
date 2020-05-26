const db = require("../data/config")

function find() {
    return db("trucks")
}

function findBy(filter) {
    return db("trucks").where(filter).first()
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
    findByOperatorId,
    add,
    update,
    remove

}