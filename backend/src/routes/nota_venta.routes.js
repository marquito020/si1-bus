const { Router } = require("express");

const { getNotasVenta, getNotaVenta, createNotaVenta } = require("../controllers/nota_venta.controller");

const router = Router();

router.get("/notas_venta", getNotasVenta);
router.get("/notas_venta/:id_nota_venta", getNotaVenta);
router.post("/notas_venta", createNotaVenta);

module.exports = router;