/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("orders", function (tbl) {
    tbl.increments("order_id").notNull();
    tbl.string("order_number", 255).notNull();
    tbl.date("order_date").notNull();
    tbl.json("order_details").notNull();
    tbl.decimal("order_total", null, 2).notNull();
    tbl.boolean("paid").nullable();
    tbl.string("payment_id", 255).nullable();
    tbl.date("payment_date").nullable();
    tbl.date("ship_date").nullable();
    tbl.boolean("fulfilled").nullable();
    tbl.integer("customer_id").notNull();
    tbl.text("error_msg").nullable();
    tbl.boolean("canceled").nullable();
    tbl.boolean("deleted").nullable();
    tbl.text("stripe_id").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("orders");
};
