process.env.TZ = 'America/La_Paz';
const express = require("express");
const pool = require("pg");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const choferRoute = require("./routes/chofer.routes");
const flotaRoute = require("./routes/flota.routes");
const lugarRoute = require("./routes/lugar.routes");
const viajeRoute = require("./routes/viaje.routes");
const usuarioRoute = require("./routes/usuario.routes");
const loginRoute = require("./routes/login.routes");
const clienteRoute = require("./routes/cliente.routes");
const asientoRoute = require("./routes/asiento.routes");
const boletoRoute = require("./routes/boleto.routes");
const notaVentaRoute = require("./routes/nota_venta.routes");
const metodoPagoRoute = require("./routes/metodo_pago.routes");
const rolRoute = require("./routes/rol.routes");

const departamentoRoutes = require("./routes/departamento.routes");
const provinciaRoutes = require("./routes/provincia.routes");

const bitacoraRoutes = require("./routes/bitacora.routes");

const reservaRoutes = require("./routes/reserva.routes");

const app = express();

app.use(
  cors({
    /* origin: "https://7baf-181-41-146-171.ngrok-free.app", */
    /* origin: "https://si1-bus.onrender.com", */
    origin: [
      "http://localhost:5173",
      "https://7baf-181-41-146-171.ngrok-free.app",
      "https://si1-bus.onrender.com",
      "https://888e-181-41-146-164.ngrok-free.app",
      "http://162.243.169.215"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.set("trust proxy", true);

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/api", choferRoute);
app.use("/api", flotaRoute);
app.use("/api", lugarRoute);
app.use("/api", viajeRoute);

app.use("/api", loginRoute);
app.use("/api", usuarioRoute);

app.use("/api", departamentoRoutes);
app.use("/api", provinciaRoutes);
app.use("/api", clienteRoute);
app.use("/api", asientoRoute);
app.use("/api", boletoRoute);
app.use("/api", notaVentaRoute);
app.use("/api", metodoPagoRoute);
app.use("/api", rolRoute);
app.use("/api", bitacoraRoutes);
app.use("/api", reservaRoutes);

const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51NSaJVFjDDiJWQdFwuVodFucfIyb1Maz9CH2YUpkgEs5YGScROlPFTufV4Rp4Rho2gM0FKQkxQvQsxkPZzspFSNf00HbJej826"
);

app.use("/api/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // cantidad en centavos
      currency: "usd",
    });

    console.log("paymentIntent", paymentIntent);
    console.log("paymentIntent.client_secret", paymentIntent.client_secret);

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
