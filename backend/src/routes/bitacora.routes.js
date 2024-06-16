const { Router } = require("express");

const { getBitacora} = require("../controllers/bitacora.controller");

const router = Router();

router.get("/bitacora", getBitacora);

module.exports = router;