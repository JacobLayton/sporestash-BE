const express = require("express");
const router = express.Router();

const db = require("../../data/dbConfig");

// const bodyParser = require("body-parser");
// const jsonParser = bodyParser.json();

// const { checkJwt } = require("../check-jwt");

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SERCET;

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
        itemPricesObj[`${items[i].item_id}-syringe`] =
          Number(items[i].syringe_price) * 100;
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

function handlePaymentSuccess(paymentData) {
  console.log("=====Payment Data: ", paymentData);
  console.log("******OrderData: ", paymentData.charges.data[0]);
  return;
}

router.post("/create-checkout-session", async (req, res) => {
  console.log("endpoint pinged");
  await db("items")
    .then(async (items) => {
      console.log("db items then");
      const storeItems = buildItemPricesObj(items);
      const cart = req.body;
      try {
        console.log("stripe session try");
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: cart.map((cartItem) => {
            const storeItem = storeItems.get(cartItem.id);
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
          success_url: `${process.env.CLIENT_ORIGIN_URL}/info`,
          cancel_url: `${process.env.CLIENT_ORIGIN_URL}/shop`,
        });
        res.json({ url: session.url });
      } catch (err) {
        console.log("stripe session catch: ", err);
        res.status(500).json({ error: err.message });
      }
    })
    .catch((err) => {
      console.log("db items catch");
      console.log("err: ", err);
      res.status(500).json({ message: "Could not build item list" });
    });
  console.log("end");
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
    console.log("eventType: ", event.type);
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log(
          `PaymentIntent for ${paymentIntent.amount} was successful!`
        );
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        handlePaymentSuccess(paymentIntent);
        break;
      case "customer.created":
        const customer = event.data.object;
        // Then define and call a function to handle the event customer.created
        console.log("Customer: ", customer);
        break;
      case "order.payment_failed":
        const orderFail = event.data.object;
        // Then define and call a function to handle the event order.payment_failed
        console.log("order fail: ", orderFail);
        break;
      case "order.payment_succeeded":
        const orderSucc = event.data.object;
        // Then define and call a function to handle the event order.payment_succeeded
        console.log("order succ: ", orderSucc);
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.send();
  }
);

module.exports = router;
