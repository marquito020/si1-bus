const { Router } = require("express");

const {
  getAsientos,
  getAsiento,
  updateAsiento,
  getAsientosByViaje,
  getAsientosByViajeBoleto
} = require("../controllers/asiento.controller");

const router = Router();

router.get("/asientos", getAsientos);
router.get("/asientos/:placa", getAsiento);
router.put("/asientos/:placa/:numero", updateAsiento);
router.get("/asientos/viaje/:cod_viaje", getAsientosByViaje);
router.get("/asientos/viaje/:cod_viaje/boleto", getAsientosByViajeBoleto);

module.exports = router;
