const { Router } = require("express");

const {
    getReservas,
    createReserva,
    getReservasByCliente,
    createNotaUpdateBoleto,
} = require("../controllers/reserva.controller");

const router = Router();

router.get("/reservas", getReservas);
router.post("/reservas", createReserva);
router.get("/reservas/cliente/:id_cliente", getReservasByCliente);
router.post("/reservas/nota-venta", createNotaUpdateBoleto);

module.exports = router;
