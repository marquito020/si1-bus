const { Router } = require("express");

const { getProvincias, getProvincia, createProvincia, updateProvincia, deleteProvincia } = require("../controllers/provincia.controller");

const router = Router();

router.get("/provincias", getProvincias);
router.get("/provincias/:cod", getProvincia);
router.post("/provincias", createProvincia);
router.put("/provincias/:cod", updateProvincia);
router.delete("/provincias/:cod", deleteProvincia);

module.exports = router;
