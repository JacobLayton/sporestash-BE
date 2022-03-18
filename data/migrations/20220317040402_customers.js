/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("customers", function (tbl) {
    tbl.increments("customer_id").notNull();
    tbl.date("created_date").notNull();
    tbl.string("first_name", 255).notNull();
    tbl.string("last_name", 255).notNull();
    tbl.string("address_1", 255).notNull();
    tbl.string("address_2", 255).notNull();
    tbl.string("city", 255).notNull();
    tbl.string("state", 255).notNull();
    tbl.string("zip", 255).notNull();
    tbl.string("country", 255).notNull();
    tbl.string("phone", 255).notNull();
    tbl.string("email", 255).notNull();
    tbl.text("stripe_id").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("customers");
};
