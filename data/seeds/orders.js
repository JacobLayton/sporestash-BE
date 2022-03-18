/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("orders").del();
  await knex("orders").insert([
    {
      order_id: 1,
      order_number: "fe3cbc46-6091-4475-982c-3d7ab480d1ab",
      order_date: "2022-03-17",
      order_details: "{}",
      order_total: "rowValue1",
      paid: "rowValue1",
      payment_id: "rowValue1",
      payment_date: "rowValue1",
      ship_date: "rowValue1",
      fulfilled: "rowValue1",
      customer_id: "rowValue1",
      error_msg: "rowValue1",
      canceled: "rowValue1",
      deleted: "rowValue1",
      stripe_id: "rowValue1",
    },
  ]);
};
