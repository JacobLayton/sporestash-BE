/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("items", function (tbl) {
    tbl.increments("item_id");
    tbl.string("item_name", 255).notNull();
    tbl.text("item_blurb").notNull();
    tbl.text("item_description").notNull();
    tbl.string("item_category", 255).notNull();
    tbl.integer("item_quantity").nullable();
    tbl.decimal("item_price", null, 2).notNull();
    tbl.integer("units_available").nullable();
    tbl.boolean("is_available").nullable();
    tbl.text("image_url").notNull();
    tbl.date("created_date").notNull();
    tbl.boolean("is_active").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("posts");
};
