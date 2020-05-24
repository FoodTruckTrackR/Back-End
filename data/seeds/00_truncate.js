
exports.seed = async function(knex) {
  await knex("operators").truncate()
  await knex("diners").truncate()
};
