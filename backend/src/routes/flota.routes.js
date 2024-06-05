const { Router } = require("express");

const { getFlotas, createFlota, updateFlota, deleteFlota, getFlota } = require("../controllers/flota.controller");

const router = Router();

router.get("/flotas", getFlotas);
router.get("/flotas/:placa", getFlota);
router.post("/flotas", createFlota);
router.put("/flotas/:placa", updateFlota);
router.delete("/flotas/:placa", deleteFlota);

module.exports = router;
