const { Router } = require("express");

const {
    getMetodosPago,
    getMetodoPago,
    createMetodoPago,
    } = require("../controllers/metodo_pago.controller");

const router = Router();

router.get("/metodos_pago", getMetodosPago);
router.get("/metodos_pago/:id", getMetodoPago);
router.post("/metodos_pago", createMetodoPago);

module.exports = router;