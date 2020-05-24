
exports.seed = async function(knex) {
  await knex("diners").insert([
    {username: "diner1", password: "hello"},
    {username: "diner2", password: "hello"}
  ])
};
