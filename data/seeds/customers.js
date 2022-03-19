/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("customers").del();
  await knex("customers").insert([
    {
      customer_id: 1,
      customer_number: "1e84f795-f65f-4f3c-9b3c-8ecc4977e3eb",
      created_date: "2022-03-17",
      first_name: "Jacob",
      last_name: "Layton",
      address_1: "980 NE Orence Station Loop",
      address_2: "Apt. 610",
      city: "Hillsboro",
      state: "OR",
      zip: "97124",
      country: "Unites States",
      phone: "5038400115",
      email: "jacoblayton@msn.com",
      stripe_id: "218a33d6-f40d-4e4b-b240-3d94be65c0ea",
    },
    {
      customer_id: 2,
      customer_number: "3591dcf1-b1d3-4b38-967c-e42d04cbcb69",
      created_date: "2022-03-18",
      first_name: "Ian",
      last_name: "Walker",
      address_1: "2123 SW Camelot Court",
      address_2: "",
      city: "Portland",
      state: "OR",
      zip: "97005",
      country: "Unites States",
      phone: "5031234567",
      email: "sporestash@gmail.com",
      stripe_id: "1e84f795-f65f-4f3c-9b3c-8ecc4977e3eb",
    },
  ]);
};
