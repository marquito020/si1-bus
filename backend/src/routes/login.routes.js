const { Router } = require("express");

const { login, loginCliente } = require("../controllers/login.controller");

const router = Router();

router.post("/login", login);
router.post("/loginCliente", loginCliente);

module.exports = router;
