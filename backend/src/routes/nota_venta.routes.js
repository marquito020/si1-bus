const { Router } = require("express");

const { getNotasVenta, getNotaVenta, createNotaVenta, getNotaVentaCliente } = require("../controllers/nota_venta.controller");

const router = Router();

router.get("/notas-venta", getNotasVenta);
router.get("/notas-venta/:id_nota_venta", getNotaVenta);
router.post("/notas-enta", createNotaVenta);
router.get("/notas-venta-cliente/:id_cliente", getNotaVentaCliente);

module.exports = router;