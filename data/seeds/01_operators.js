const bcrypt = require("bcryptjs")

exports.seed = async function(knex) {
  await knex("operators").insert([
    {username: "operator1", password: await bcrypt.hash("opassword1", 13)},
    {username: "operator2", password: "opassword2"},
    {username: "operator3", password: "opassword3"},
  ])
};
