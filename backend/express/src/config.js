// src/config.js
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const paypal = require("@paypal/checkout-server-sdk");
const PORT = process.env.PORT || 3001;
const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;


function PayPalClient() {
  const environment = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  );
  return new paypal.core.PayPalHttpClient(environment);
}


module.exports = {
  stripe,
  paypal,
  PayPalClient,
  SANITY_WEBHOOK_SECRET,
  cors,
  express,
  PORT,
};
