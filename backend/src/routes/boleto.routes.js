const { Router } = require("express");

const {
  getBoletos,
  getBoleto,
  createBoleto,
} = require("../controllers/boleto.controller");

const router = Router();

router.get("/boletos", getBoletos);
router.get("/boletos/:cod_boleto", getBoleto);
router.post("/boletos", createBoleto);

module.exports = router;
