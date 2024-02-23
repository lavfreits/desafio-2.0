/* eslint-disable linebreak-style */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("courses", table => {
    // table.integer("category_id").references("id").inTable("categories").notNullable();
    table.integer("category_id").notNullable().defaultTo(0).alter();
    table.string("professor").notNullable().defaultTo("N/A");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table("courses", table => {
    table.dropColumn("professor");
    table.integer("category_id").nullable().alter();
  });
};
