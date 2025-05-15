// src/server.js
// Nota: Ya no necesitas requerir express, cors, stripe, paypal aquí directamente
// Los obtienes de config si los necesitas para configuración general
const config = require("./config");
const express = config.express; // Obtener express de config
const cors = config.cors; // Obtener cors de config

const paymentRoutes = require("./api/routes/payment.routes");
// Cuando crees webhook.routes.js, lo importarás aquí:
// const webhookRoutes = require('./routes/webhook.routes');

const app = express();
const port = config.PORT;

app.use(cors());

// Middleware para parsear JSON. ¡IMPORTANTE! Para webhooks de Sanity/Stripe/PayPal,
// necesitarás un middleware raw ANTES de express.json en su ruta específica de webhook.
app.use(express.json());

// Montar las rutas de pago bajo el prefijo /api
app.use("/api/payments", paymentRoutes); // Prefijo /api/payments

// Cuando crees webhook.routes.js, lo montarás así:
// app.use('/api/webhooks', webhookRoutes); // Prefijo /api/webhooks

/* ----------------------------------
   Ruta de prueba (Opcional)
---------------------------------- */
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

/* ----------------------------------
   Iniciar servidor
---------------------------------- */
app.listen(port, () => {
  console.log(`Express corriendo en http://localhost:${port} 🎉`);
});
