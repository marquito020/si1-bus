const pool = require("../db");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config");

// Obtener todos los tipos de flota
const getTiposFlota = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tipo_flota ORDER BY cod ASC"
    );
    res.json(result.rows);
  } catch (error) {
    res.json(error);
  }
};

// Obtener un tipo de flota por su código
const getTipoFlota = async (req, res) => {
  const { cod } = req.params;

  try {
    const result = await pool.query("SELECT * FROM tipo_flota WHERE cod = $1", [
      cod,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tipo de flota no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.json(error);
  }
};

// Crear un nuevo tipo de flota
const createTipoFlota = async (req, res) => {
  const { descripcion } = req.body;

  try {
    if (!descripcion) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." });
    }

    const existingTipoFlota = await pool.query(
      "SELECT * FROM tipo_flota WHERE descripcion = $1",
      [descripcion]
    );

    if (existingTipoFlota.rowCount > 0) {
      return res.status(400).json({ error: "El tipo de flota ya existe." });
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const result = await client.query(
        "INSERT INTO tipo_flota (descripcion) VALUES ($1) RETURNING *",
        [descripcion]
      );
      await client.query("COMMIT");
      res.status(201).json(result.rows[0]);
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  } catch (error) {
    res.json(error);
  }
};

// Actualizar un tipo de flota
const updateTipoFlota = async (req, res) => {
  const { cod } = req.params;
  const { descripcion } = req.body;

  try {
    if (!descripcion) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." });
    }

    const existingTipoFlota = await pool.query(
      "SELECT * FROM tipo_flota WHERE cod = $1",
      [cod]
    );

    if (existingTipoFlota.rowCount === 0) {
      return res.status(404).json({ error: "Tipo de flota no encontrado." });
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const result = await client.query(
        "UPDATE tipo_flota SET descripcion = $1 WHERE cod = $2 RETURNING *",
        [descripcion, cod]
      );
      await client.query("COMMIT");
      res.json(result.rows[0]);
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  } catch (error) {
    res.json(error);
  }
};

// Eliminar un tipo de flota
const deleteTipoFlota = async (req, res) => {
  const { cod } = req.params;

  try {
    const existingTipoFlota = await pool.query(
      "SELECT * FROM tipo_flota WHERE cod = $1",
      [cod]
    );

    if (existingTipoFlota.rowCount === 0) {
      return res.status(404).json({ error: "Tipo de flota no encontrado." });
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query("DELETE FROM tipo_flota WHERE cod = $1", [cod]);
      await client.query("COMMIT");
      res.json({ message: "Tipo de flota eliminado." });
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getTiposFlota,
  getTipoFlota,
  createTipoFlota,
  updateTipoFlota,
  deleteTipoFlota,
};
