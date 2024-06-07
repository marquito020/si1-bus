const { Router } = require("express");

const {
  getFlotas,
  createFlota,
  updateFlota,
  deleteFlota,
  getFlota,
} = require("../controllers/flota.controller");

const {
  getEstadosFlota,
  createEstadoFlota,
  deleteEstadoFlota,
  getEstadoFlota,
  updateEstadoFlota,
} = require("../controllers/estado_flota.controller");

const {
  getTiposFlota,
  createTipoFlota,
  deleteTipoFlota,
  getTipoFlota,
  updateTipoFlota,
} = require("../controllers/tipo_flota.controller");

const router = Router();

router.get("/flotas", getFlotas);
router.get("/flotas/:placa", getFlota);
router.post("/flotas", createFlota);
router.put("/flotas/:placa", updateFlota);
router.delete("/flotas/:placa", deleteFlota);

router.get("/estado_flotas", getEstadosFlota);
router.get("/estado_flotas/:cod", getEstadoFlota);
router.post("/estado_flotas", createEstadoFlota);
router.put("/estado_flotas/:cod", updateEstadoFlota);

router.get("/tipo_flotas", getTiposFlota);
router.get("/tipo_flotas/:cod", getTipoFlota);
router.post("/tipo_flotas", createTipoFlota);
router.put("/tipo_flotas/:cod", updateTipoFlota);
router.delete("/tipo_flotas/:cod", deleteTipoFlota);

module.exports = router;
