const { express, stripe, PayPalClient, paypal } = require("../../config");

const router = express.Router();

/* ----------------------------------
   STRIPE: Crear Payment Intent
---------------------------------- */
router.post("/create-payment-intent", async (req, res) => {
  const { amount, currency = "mxn" } = req.body;

  if (!amount || typeof amount !== "number" || amount <= 0) {
    return res
      .status(400)
      .json({ error: "Se requiere un 'amount' numérico positivo." });
  }

  const amountInSmallestUnit = Math.round(amount * 100);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInSmallestUnit,
      currency: currency.toLowerCase(),
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creando Payment Intent:", error);
    res
      .status(500)
      .json({ error: error.message || "Error interno con Stripe" });
  }
});

/* ----------------------------------
   PAYPAL: Crear Orden
---------------------------------- */
router.post("/create-paypal-order", async (req, res) => {
  const { amount, bookingId } = req.body;

  if (!amount || typeof amount !== "number" || amount <= 0) {
    return res
      .status(400)
      .json({ error: "Se requiere un 'amount' numérico positivo." });
  }

  // ¡Usa paypal.orders.OrdersCreateRequest() directamente del módulo 'paypal'!
  const request = new paypal.orders.OrdersCreateRequest(); // <--- CAMBIA ESTA LÍNEA
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "MXN",
          value: amount.toFixed(2),
        },
      },
    ],
    application_context: {
      return_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/checkout`,
      user_action: "PAY_NOW",
    },
  });

  try {
    const client = PayPalClient(); // Aquí sí usas el cliente para *ejecutar* la petición
    const order = await client.execute(request);
    const approveUrl = order.result.links.find(
      (link) => link.rel === "approve"
    ).href;

    res.json({
      orderID: order.result.id,
      approveUrl,
    });
  } catch (error) {
    console.error("Error creando orden de PayPal:", error);
    res
      .status(500)
      .json({ error: error.message || "Error interno con PayPal" });
  }
});

/* ----------------------------------
     PAYPAL: Capturar Orden
  ---------------------------------- */

router.post("/capture-paypal-order", async (req, res) => {
  const { orderID } = req.body; // Espera recibir el orderID del frontend

  if (!orderID) {
    return res.status(400).json({ error: "Falta el 'orderID'" });
  }

  // Usa paypal.orders.OrdersCaptureRequest(orderID) del módulo paypal
  const request = new paypal.orders.OrdersCaptureRequest(orderID);

  try {
    const client = PayPalClient();
    const capture = await client.execute(request);

    // <-- AQUÍ ES DONDE TU BACKEND DEBE ACTUALIZAR TU BD SQL
    //     Marcando la reserva como pagada/confirmada,
    //     basándose en el orderID o algún metadato que hayas asociado a la reserva
    //     cuando creaste la orden inicialmente.

    res.json({ status: "COMPLETED", details: capture.result }); // Envía la confirmación al frontend
  } catch (error) {
    console.error("Error capturando orden de PayPal:", error);
    res
      .status(500)
      .json({ error: error.message || "Error interno al capturar orden" });
  }
});

module.exports = router;
