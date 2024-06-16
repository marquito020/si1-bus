const { Router } = require("express");

const {
    getMetodosPago,
    getMetodoPago,
    createMetodoPago,
    deleteMetodoPago,
    updateMetodoPago
    } = require("../controllers/metodo_pago.controller");

const router = Router();

router.get("/metodos-pago", getMetodosPago);
router.get("/metodos-pago/:id", getMetodoPago);
router.post("/metodos-pago", createMetodoPago);
router.delete("/metodos-pago/:id", deleteMetodoPago);
router.put("/metodos-pago/:id", updateMetodoPago);

module.exports = router;