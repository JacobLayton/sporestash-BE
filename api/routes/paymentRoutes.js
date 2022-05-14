const express = require("express");
const router = express.Router();

const db = require("../../data/dbConfig");

// const bodyParser = require("body-parser");
// const jsonParser = bodyParser.json();

// const { checkJwt } = require("../check-jwt");

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SERCET;

function getDate() {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  todayString = yyyy + "-" + mm + "-" + dd;
  return todayString;
}

function buildItemPricesObj(items) {
  const itemPricesObj = new Map([]);
  for (let i = 0; i < items.length; i++) {
    if (items[i].item_category !== "merch") {
      if (items[i].swab_available) {
        itemPricesObj.set(`${items[i].item_id}-swab`, {
          priceInCents: Number(items[i].swab_price) * 100,
          name: items[i].item_name,
        });
      }
      if (items[i].print_available) {
        itemPricesObj.set(`${items[i].item_id}-print`, {
          priceInCents: Number(items[i].print_price) * 100,
          name: items[i].item_name,
        });
      }
      if (items[i].syringe_available) {
        itemPricesObj.set(`${items[i].item_id}-syringe`, {
          priceInCents: Number(items[i].syringe_price) * 100,
          name: items[i].item_name,
        });
      }
    } else {
      itemPricesObj.set(String(items[i].item_id), {
        priceInCents: Number(items[i].item_price) * 100,
        name: items[i].item_name,
      });
    }
  }
  return itemPricesObj;
}

function buildMetadata(cart) {
  const metaData = {};
  const itemsArray = [];
  for (let i = 0; i < cart.length; i++) {
    itemsArray.push({
      id: cart[i].id,
      item_category: cart[i].item_category,
      item_name: cart[i].item_name,
      item_type: cart[i].order_type,
      item_price: cart[i].item_price,
      item_quantity: cart[i].cart_quantity,
      item_size: cart[i].order_size,
    });
  }
  metaData.order_details = JSON.stringify(itemsArray);
  return metaData;
}

async function handleCustomerCreated(customer) {
  const phoneNumber = customer.phone ? customer.phone : "N/A";
  const customerObj = {
    created_date: getDate(),
    first_name: customer.name,
    last_name: customer.name,
    address_1: customer.address.line1,
    address_2: customer.address.line2,
    city: customer.address.city,
    state: customer.address.state,
    zip: customer.address.postal_code,
    country: customer.address.country,
    phone: phoneNumber,
    email: customer.email,
    stripe_id: customer.id,
    customer_number: customer.invoice_prefix,
  };
  await db("customers")
    .insert(customerObj)
    .then((customer) => {
      if (customer) {
        console.log("Customer Created: ", customer);
      } else {
        console.log("Could not create customer");
      }
      return;
    })
    .catch((err) => {
      console.log("Error creating customer: ", err);
      return;
    });
}

async function handleInventoryUpdate(orderDetails) {
  const orderItems = JSON.parse(orderDetails);
  console.log("orderItems: ", orderItems);
  for (let i = 0; i < orderItems.length; i++) {
    if (orderItems[i].item_category !== "merch") {
      const itemArr = orderItems[i].id.split("-");
      const itemId = Number(itemArr[0]);
      const columnName = `${itemArr[1]}_quantity`;
      try {
        console.log(
          `Updating item ${itemId} column ${columnName} minus ${orderItems[i].item_quantity}`
        );
        const query = await db.raw(
          `UPDATE items SET ${columnName} = ${columnName} - ${orderItems[i].item_quantity} WHERE item_id = ${itemId}`
        );
        console.log("Inventory update: ", query.rowCount);
      } catch (err) {
        console.error("Could not update item inventory: ", err);
      }
    } else {
      if (!orderItems[i].item_size || orderItems[i].item_size.length === 0) {
        try {
          console.log(
            `Updating item ${orderItems[i].id} column item_quantity minus ${orderItems[i].item_quantity}`
          );
          const query = await db.raw(
            `UPDATE items SET item_quantity = item_quantity - ${orderItems[i].item_quantity} WHERE item_id = ${orderItems[i].id}`
          );
          console.log("Inventory update: ", query.rowCount);
        } catch (err) {
          console.error("Could not update item iinventory: ", err);
        }
      }
    }
  }
}

async function handlePaymentSuccess(paymentData) {
  const orderDetails = paymentData.metadata.order_details;
  const orderTotal = Number(paymentData.amount_received) / 100;
  const paymentSuccess = paymentData.status === "succeeded";
  const cancellation =
    paymentData.canceled_at !== null &&
    paymentData.cancellation_reason !== null;
  const orderObj = {
    order_number: paymentData.id,
    order_date: getDate(),
    order_details: orderDetails,
    order_total: orderTotal,
    paid: paymentSuccess,
    payment_id: paymentData.charges.data[0].id,
    payment_date: getDate(),
    stripe_cust_id: paymentData.customer,
    error_msg: paymentData.charges.data[0].failure_message,
    canceled: cancellation,
    stripe_id: paymentData.id,
  };
  await db("orders")
    .insert(orderObj)
    .then((order) => {
      if (order) {
        console.log("Order Created: ", order);
        return handleInventoryUpdate(orderDetails);
      } else {
        console.log("Could not create order");
        return;
      }
    })
    .catch((err) => {
      console.log("Error creating order: ", err);
      return;
    });
}

router.post("/create-checkout-session", async (req, res) => {
  await db("items")
    .then(async (items) => {
      const storeItems = buildItemPricesObj(items);
      const cart = req.body;
      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          shipping_address_collection: {
            allowed_countries: ["US", "CA"],
          },
          line_items: cart.map((cartItem) => {
            let storeItem;
            if (!cartItem.order_size || cartItem.order_size.length === 0) {
              storeItem = storeItems.get(cartItem.id);
            } else {
              storeItem = storeItems.get(String(cartItem.item_id));
            }
            return {
              price_data: {
                currency: "usd",
                product_data: {
                  name: storeItem.name,
                },
                unit_amount: storeItem.priceInCents,
              },
              quantity: Number(cartItem.cart_quantity),
            };
          }),
          success_url: `${process.env.CLIENT_ORIGIN_URL}/payment-succeeded`,
          cancel_url: `${process.env.CLIENT_ORIGIN_URL}/shop`,
          payment_intent_data: {
            metadata: buildMetadata(cart),
          },
        });
        res.json({ url: session.url });
      } catch (err) {
        console.log("stripe session catch: ", err);
        res.status(500).json({ error: err.message });
      }
    })
    .catch((err) => {
      console.log("err: ", err);
      res.status(500).json({ message: "Could not build item list" });
    });
});

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    switch (event.type) {
      case "customer.created":
        const customer = event.data.object;
        handleCustomerCreated(customer);
        break;
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log(
          `PaymentIntent for ${paymentIntent.amount} was successful!`
        );
        handlePaymentSuccess(paymentIntent);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.send();
  }
);

module.exports = router;
