
exports.seed = async function(knex) {
  await knex("diners").insert([
    {username: "diner1", password: "dpassword1"},
    {username: "diner2", password: "dpassword2"},
    {username: "diner3", password: "dpassword3"},
  ])
};
