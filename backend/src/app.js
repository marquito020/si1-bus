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

const app = express();

app.use(
  cors({
    /* origin: "http://localhost:5173", */
    origin: "https://si1-bus.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
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

module.exports = app;
