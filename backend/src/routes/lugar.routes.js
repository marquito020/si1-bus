const { Router } = require("express");

const { getLugares, createLugar, updateLugar, deleteLugar, getLugar, getCodigoLugarOrigen, getCodigoLugarDestino } = require("../controllers/lugar.controller");

const router = Router();

router.get("/lugares", getLugares);
router.get("/lugares/:cod_Departamento/:cod_Provincia/:cod", getLugar);
router.post("/lugares", createLugar);
router.put("/lugares/:cod_Departamento/:cod_Provincia/:cod", updateLugar);
router.delete("/lugares/:cod_Departamento/:cod_Provincia/:cod", deleteLugar);
router.get("/lugares/origen/:cod_Departamento/:cod_Provincia", getCodigoLugarOrigen);
router.get("/lugares/destino/:cod_Departamento/:cod_Provincia", getCodigoLugarDestino);

module.exports = router;
