const { Router } = require("express");

const { getChoferes, createChofer, updateChofer, deleteChofer, getChofer } = require("../controllers/chofer.controller");

const router = Router();

router.get("/choferes", getChoferes);
router.get("/choferes/:ci_chofer", getChofer);
router.post("/choferes", createChofer);
router.put("/choferes/:ci_chofer", updateChofer);
router.delete("/choferes/:ci_chofer", deleteChofer);

module.exports = router;