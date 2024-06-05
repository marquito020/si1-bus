const { Router } = require("express");

const { getUsuarios, createUsuario, updateUsuario, getUsuario } = require("../controllers/usuario.controller");

const router = Router();

router.get("/usuarios", getUsuarios);
router.get("/usuarios/:id", getUsuario);
router.post("/usuarios", createUsuario);
router.put("/usuarios/:id", updateUsuario);

module.exports = router;