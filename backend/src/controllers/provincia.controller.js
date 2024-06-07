const pool = require("../db");

// Controladores de Provincias
const getProvincias = async (req, res) => {
    try {
      const result = await pool.query("SELECT cod, nombre, cod_departamento FROM provincia ORDER BY cod ASC");
      res.json(result.rows);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  // Obtener una provincia por su código
  const getProvincia = async (req, res) => {
    const { cod } = req.params;
    try {
      const result = await pool.query("SELECT cod, nombre, cod_departamento FROM provincia WHERE cod = $1", [cod]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Provincia no encontrada' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json(error);
    }
  };
const createProvincia = async (req, res) => {
  const { cod, nombre, cod_departamento } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO provincia (cod, nombre, cod_departamento) VALUES ($1, $2, $3) RETURNING *",
      [cod, nombre, cod_departamento]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateProvincia = async (req, res) => {
  const { cod } = req.params;
  const { nombre, cod_departamento } = req.body;
  try {
    const result = await pool.query(
      "UPDATE provincia SET nombre = $1, cod_departamento = $2 WHERE cod = $3 RETURNING *",
      [nombre, cod_departamento, cod]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Provincia no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteProvincia = async (req, res) => {
  const { cod } = req.params;
  try {
    const result = await pool.query("DELETE FROM provincia WHERE cod = $1 RETURNING *", [cod]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Provincia no encontrada' });
    }
    res.json({ success: 'Provincia eliminada correctamente' });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getProvincias,
  getProvincia,
  createProvincia,
  updateProvincia,
  deleteProvincia
};
