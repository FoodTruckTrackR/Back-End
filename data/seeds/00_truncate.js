
exports.seed = async function(knex) {
  await knex("ratings").truncate()
  await knex("menu-items").truncate
  await knex("trucks").truncate()
  await knex("operators").truncate()
  await knex("diners").truncate()
};
