
exports.seed = async function(knex) {
  await knex("operators").truncate()
  await knex("operators").insert([
    {username: "foodtruck1", password: "hello"},
    {username: "foodtruck2", password: "hello"}
  ])
};
