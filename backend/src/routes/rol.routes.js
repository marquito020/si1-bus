const { Router } = require("express");

const {
    getRoles,
    createRol,
    updateRol,
    getRol,
    deleteRol
    } = require("../controllers/rol.controller");

const router = Router();

router.get("/roles", getRoles);
router.get("/roles/:id", getRol);
router.post("/roles", createRol);
router.put("/roles/:id", updateRol);
router.delete("/roles/:id", deleteRol);

module.exports = router;