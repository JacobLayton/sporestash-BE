/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("items", (tbl) => {
    tbl.decimal("swab_price", null, 2).nullable();
    tbl.decimal("print_price", null, 2).nullable();
    tbl.decimal("syringe_price", null, 2).nullable();
    tbl.boolean("swab_available").notNull();
    tbl.boolean("print_available").notNull();
    tbl.boolean("syringe_available").notNull();
    tbl.boolean("hide_type").nullable();
    tbl.boolean("display_size").nullable();
    tbl.json("sizes_available").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
