
exports.seed = async function(knex) {
  await knex("operators").insert([
    {username: "operator1", password: "opassword1"},
    {username: "operator2", password: "opassword2"},
    {username: "operator3", password: "opassword3"},
  ])
};
