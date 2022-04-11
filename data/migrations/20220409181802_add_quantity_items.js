/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("items", (tbl) => {
    tbl.integer("swab_quantity").nullable();
    tbl.integer("print_quantity").nullable();
    tbl.integer("syringe_quantity").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
