const { Router } = require("express");

const { getDepartamentos, getDepartamento, createDepartamento, updateDepartamento, deleteDepartamento } = require("../controllers/departamento.controller");

const router = Router();

router.get("/departamentos", getDepartamentos);
router.get("/departamentos/:cod", getDepartamento);
router.post("/departamentos", createDepartamento);
router.put("/departamentos/:cod", updateDepartamento);
router.delete("/departamentos/:cod", deleteDepartamento);

module.exports = router;
