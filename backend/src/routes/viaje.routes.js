const { Router } = require("express");

const { getViajes, getViaje, createViaje, updateViaje, deleteViaje, getDepartamentos, getProvincias, cancelViaje } = require("../controllers/viaje.controllers");

const router = Router();

router.get("/viajes", getViajes);
router.get("/viajes/:cod", getViaje);
router.post("/viajes", createViaje);
router.put("/viajes/:cod", updateViaje);
router.delete("/viajes/:cod", deleteViaje);
router.put("/viajes/cancel/:cod", cancelViaje);

// Nuevas rutas para obtener provincias y departamentos
/* router.get("/provincias", getProvincias); */
router.get("/departamentos", getDepartamentos);
module.exports = router;

