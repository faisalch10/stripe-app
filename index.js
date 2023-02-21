import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });

const app = express();
// const port = 3000; //add your port here
const PUBLISHABLE_KEY =
  "pk_test_51Mdbj6DyF0mL72AbpdhHPQTGxn6d9IKRPly4EePYmyQwGJVx4qAiV19QWWP88kOGfoLf0sIzvxrcM5nhCRorRmVJ00TrIKRqi9";
const SECRET_KEY = process.env.SECRET_KEY;
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2022-11-15" });

app.post("/create-payment-intent", async (req, res) => {
  try {
    console.log("muneeb");
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, //lowest denomination of particular currency
      currency: "usd",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});

app.get("/hello", (req, res) => {
  res.send("hello world");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Example app listening at http://10.0.19045.2604:${PORT}`);
});
