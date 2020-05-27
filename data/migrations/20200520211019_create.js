
exports.up = async function(knex) {
  await knex.schema.createTable("operators", table => {
      table.increments()
      table.text("username").notNull().unique()
      table.text("password").notNull()
  })

  await knex.schema.createTable("trucks", table => {
      table.increments()
      table.text("imageOfTruck").notNull()
      table.text("cuisineType")
      table.integer("operatorId")
        .references("id")
        .inTable("operators")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
  })

  await knex.schema.createTable("menu-items", table => {
    table.increments()
    table.text("itemName").notNull()
    table.text("itemDescription").notNull()
    table.text("itemPhoto").notNull()
    table.float("itemPrice").notNull()
    table.integer("truckId")
      .references("id")
      .inTable("trucks")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
  })

  await knex.schema.createTable("ratings", table => {
    table.increments()
    table.integer("rating").notNull()
    table.integer("truckId")
      .notNull()
      .references("id")
      .inTable("trucks")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
  })

  await knex.schema.createTable("locations", table => {
    table.increments()
    table.text("location").notNull()
    table.text("arrivalTime")
    table.text("departureTime")
    table.integer("truckId")
      .references("id")
      .inTable("trucks")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
  })
  
  await knex.schema.createTable("diners", table => {
    table.increments()
    table.text("username").notNull().unique()
    table.text("password").notNull()
  })

  await knex.schema.createTable("diners-trucks", table => {
    table.integer("dinerId")
      .references("id")
      .inTable("diners")
      .onUpdate("CASCADE")
      .onDelete("CASCADE")
    table.integer("truckId")
      .references("id")
      .inTable("trucks")
      .onUpdate("CASCADE")
      .onDelete("CASCADE")
    table.primary(["dinerId", "truckId"])
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("diners-trucks")
  await knex.schema.dropTableIfExists("diners")
  await knex.schema.dropTableIfExists("ratings")
  await knex.schema.dropTableIfExists("locations")
  await knex.schema.dropTableIfExists("menu-items")
  await knex.schema.dropTableIfExists("trucks")
  await knex.schema.dropTableIfExists("operators")

};
