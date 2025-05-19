
const config = require("./config");
const express = config.express; 
const cors = config.cors; 

const paymentRoutes = require("./api/routes/payment.routes");


const app = express();
const port = config.PORT;

app.use(cors());

app.use(express.json());


app.use("/api/payments", paymentRoutes); 


app.get("/", (req, res) => {
  res.send("Backend is running!");
});

/* ----------------------------------
   Iniciar servidor
---------------------------------- */
app.listen(port, () => {
  console.log(`Express corriendo en http://localhost:${port} 🎉`);
});
