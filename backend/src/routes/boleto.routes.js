const { Router } = require("express");

const {
  getBoletos,
  getBoleto,
  createBoleto,
  getBoletoCliente,
  createBoletoCliente
} = require("../controllers/pasaje.controller");

const router = Router();

router.get("/boletos", getBoletos);
router.get("/boletos/:cod_boleto", getBoleto);
router.post("/boletos", createBoleto);
router.post("/boletos/cliente", createBoletoCliente);
router.get("/boletos/cliente/:id_cliente", getBoletoCliente);

module.exports = router;
