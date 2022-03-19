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
      order_details:
        '{"item_id":"1","item_name":"Shroom Variant One","item_price":"22.0","quantity":"1","item_id":"2","item_name":"Another Kind of Shroom","item_price":"18.0","quantity":"1"}',
      order_total: 40.0,
      paid: false,
      payment_id: null,
      payment_date: "2022-03-17",
      ship_date: null,
      fulfilled: false,
      customer_id: 1,
      error_msg: "STRIPE ERROR MESSAGE",
      canceled: false,
      deleted: false,
      stripe_id: null,
    },
    {
      order_id: 2,
      order_number: "44226bfb-5d31-41cf-8b68-09605fa6711a",
      order_date: "2022-03-18",
      order_details:
        '{"item_id":"2","item_name":"Another Kind of Shroom","item_price":"18.0","quantity":"1","item_id":"3","item_name":"Yet Another Shroom","item_price":"24.0","quantity":"1"}',
      order_total: 42.0,
      paid: true,
      payment_id: "c66e0918-4fad-42f9-9d44-692556a4876a",
      payment_date: "2022-03-18",
      ship_date: "2022-03-19",
      fulfilled: true,
      customer_id: 2,
      error_msg: null,
      canceled: false,
      deleted: false,
      stripe_id: "5f5c1ff2-0c32-4364-a6af-eaba7357e354",
    },
  ]);
};
