const pool = require("../db");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config");

// Obtener todos los estados de flota
const getEstadosFlota = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM estado_flota ORDER BY cod ASC');
    res.json(result.rows);
  } catch (error) {
    res.json(error);
  }
};

// Obtener un estado de flota por su código
const getEstadoFlota = async (req, res) => {
  const { cod } = req.params;

  try {
    const result = await pool.query('SELECT * FROM estado_flota WHERE cod = $1', [cod]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Estado de flota no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.json(error);
  }
};

// Crear un nuevo estado de flota
const createEstadoFlota = async (req, res) => {
  const { descripcion } = req.body;

  try {
    if (!descripcion) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const existingEstadoFlota = await pool.query('SELECT * FROM estado_flota WHERE descripcion = $1', [descripcion]);

    if (existingEstadoFlota.rowCount > 0) {
      return res.status(400).json({ error: 'El estado de flota ya existe.' });
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const result = await client.query(
        'INSERT INTO estado_flota (descripcion) VALUES ($1) RETURNING *',
        [descripcion]
      );
      await client.query('COMMIT');
      res.status(201).json(result.rows[0]);
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  } catch (error) {
    res.json(error);
  }
};

// Actualizar un estado de flota
const updateEstadoFlota = async (req, res) => {
  const { cod } = req.params;
  const { descripcion } = req.body;

  try {
    if (!descripcion) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const result = await pool.query('UPDATE estado_flota SET descripcion = $1 WHERE cod = $2 RETURNING *', [descripcion, cod]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Estado de flota no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.json(error);
  }
};

// Eliminar un estado de flota
const deleteEstadoFlota = async (req, res) => {
  const { cod } = req.params;

  try {
    const result = await pool.query('DELETE FROM estado_flota WHERE cod = $1 RETURNING *', [cod]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Estado de flota no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getEstadosFlota,
  getEstadoFlota,
  createEstadoFlota,
  updateEstadoFlota,
  deleteEstadoFlota
};
