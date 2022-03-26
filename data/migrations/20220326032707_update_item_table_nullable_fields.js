/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("items", (tbl) => {
    tbl.boolean("swab_available").nullable().alter();
    tbl.boolean("print_available").nullable().alter();
    tbl.boolean("syringe_available").nullable().alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("items");
};
