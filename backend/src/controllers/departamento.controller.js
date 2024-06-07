const pool = require("../db");

// Controladores de Departamentos
const getDepartamentos = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM departamento ORDER BY cod ASC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getDepartamento = async (req, res) => {
  const { cod } = req.params;
  try {
    const result = await pool.query("SELECT * FROM departamento WHERE cod = $1", [cod]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Departamento no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createDepartamento = async (req, res) => {
  const { cod, nombre } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO departamento (cod, nombre) VALUES ($1, $2) RETURNING *",
      [cod, nombre]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateDepartamento = async (req, res) => {
  const { cod } = req.params;
  const { nombre } = req.body;
  try {
    const result = await pool.query(
      "UPDATE departamento SET nombre = $1 WHERE cod = $2 RETURNING *",
      [nombre, cod]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Departamento no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteDepartamento = async (req, res) => {
  const { cod } = req.params;
  try {
    const result = await pool.query("DELETE FROM departamento WHERE cod = $1 RETURNING *", [cod]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Departamento no encontrado' });
    }
    res.json({ success: 'Departamento eliminado correctamente' });
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
    getDepartamentos,
    getDepartamento,
    createDepartamento,
    updateDepartamento,
    deleteDepartamento,
}