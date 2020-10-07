
const knexCleaner = require("knex-cleaner");
exports.seed = function(knex) {
  return knexCleaner.clean(knex, {
    ignoreTables: ["knex_migrations", "knex_migrations_lock"]
  });
};

// exports.seed = async function(knex) {
//   await knex("ratings").truncate()
//   await knex("menu-items").truncate()
//   await knex("trucks").truncate()
//   await knex("operators").truncate()
//   await knex("diners").truncate()
// };
