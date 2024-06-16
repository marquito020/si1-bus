const { Router } = require("express");

const { getNotasVenta, getNotaVenta, createNotaVenta } = require("../controllers/nota_venta.controller");

const router = Router();

router.get("/notas-venta", getNotasVenta);
router.get("/notas-venta/:id_nota_venta", getNotaVenta);
router.post("/notas-enta", createNotaVenta);

module.exports = router;