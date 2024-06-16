const { Router } = require('express');

const { getClientes, createCliente, getCliente } = require('../controllers/cliente.controller');

const router = Router();

router.get('/clientes', getClientes);
router.post('/clientes', createCliente);
router.get('/clientes/:id', getCliente);

module.exports = router;