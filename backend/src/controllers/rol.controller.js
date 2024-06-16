const pool = require("../db");

const tabla = "public.rol";
const orden = "id";

// Obtener todos los roles
const getRoles = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM ${tabla} ORDER BY ${orden} ASC`
    );
    res.json(result.rows);
  } catch (error) {
    res.json(error);
  }
};

// Obtener un rol por ID
const getRol = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`SELECT * FROM ${tabla} WHERE id = $1`, [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Rol no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.json(error);
  }
};

// Crear un nuevo rol
const createRol = async (req, res) => {
  const { nombre } = req.body;

  console.log(nombre);

  const activo = true;

  try {
    const result = await pool.query(
      `INSERT INTO rol (nombre, activo) VALUES ($1, $2) RETURNING id`,
      [nombre, activo]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateRol = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    const existingRol = await pool.query(
      `SELECT * FROM ${tabla} WHERE id = $1`,
      [id]
    );

    if (existingRol.rowCount === 0) {
      return res.status(404).json({ error: "Rol no encontrado" });
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const updateResult = await client.query(
        `UPDATE ${tabla} SET nombre = $1 WHERE id = $2 RETURNING *`,
        [nombre, id]
      );

      await client.query("COMMIT");
      res.json(updateResult.rows[0]);
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteRol = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM ${tabla} WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Rol no encontrado" });
    }
    res.json({ success: "Rol eliminado correctamente" });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getRoles,
  getRol,
  createRol,
  updateRol,
  deleteRol,
};
