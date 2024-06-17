const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createAccessToken } = require("../libs/jwt");
const { TOKEN_SECRET } = require("../config");

// tabla global a usar
const tabla = "chofer";

// Obtener todos los choferes
const getChoferes = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM ${tabla} ORDER BY ci_chofer ASC`
    );
    res.json(result.rows);
  } catch (error) {
    res.json(error);
  }
};

// Obtener un chofer por ID
const getChofer = async (req, res) => {
  const { ci_chofer } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM ${tabla} WHERE ci_chofer = $1`,
      [ci_chofer]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Chofer no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.json(error);
  }
};

// Crear un nuevo chofer
const createChofer = async (req, res) => {
  const { ci_chofer, licencia, nombre } = req.body;

  try {
    if (!ci_chofer || !licencia || !nombre) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." });
    }

    const existingChofer = await pool.query(
      "SELECT * FROM chofer WHERE ci_chofer = $1",
      [ci_chofer]
    );

    if (existingChofer.rowCount > 0) {
      return res.status(400).json({ error: "El chofer ya existe." });
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const insertResult = await client.query(
        "INSERT INTO chofer (ci_chofer, licencia, nombre) VALUES ($1, $2, $3) RETURNING *",
        [ci_chofer, licencia, nombre]
      );

      await client.query("COMMIT");

      /* Bitacora */
      const fechaActual = new Date();
      const fechaFormateada = fechaActual.toISOString();
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      const accion = `Insertar chofer ${ci_chofer}`;

      const user = jwt.verify(token, TOKEN_SECRET);

      await pool.query(
        `INSERT INTO public.bitacora (fecha_hora, accion, id_usuario) VALUES ($1, $2, $3)`,
        [fechaFormateada, accion, user.id]
      );

      res.json(insertResult.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      res.status(500).json({ error: "Error en la creación del chofer." });
    } finally {
      client.release();
    }
  } catch (error) {
    res.status(500).json({ error: "Error en la creación del chofer." });
  }
};

// Actualizar un chofer
const updateChofer = async (req, res) => {
  const { ci_chofer } = req.params;
  const { licencia, nombre } = req.body;

  try {
    if (!licencia || !nombre) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." });
    }

    const existingChofer = await pool.query(
      "SELECT * FROM chofer WHERE nombre = $1 AND ci_chofer <> $2",
      [nombre, ci_chofer]
    );

    if (existingChofer.rowCount > 0) {
      return res.status(400).json({ error: "El chofer ya existe." });
    }

    const updateResult = await pool.query(
      "UPDATE chofer SET licencia = $1, nombre = $2 WHERE ci_chofer = $3 RETURNING *",
      [licencia, nombre, ci_chofer]
    );

    if (updateResult.rowCount === 0) {
      return res.status(404).json({ error: "Chofer no encontrado." });
    }

    /* Bitacora */
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString();
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const accion = `Actualizar chofer ${ci_chofer}`;

    const user = jwt.verify(token, TOKEN_SECRET);

    console.log("user", user);

    await pool.query(
      `INSERT INTO public.bitacora (fecha_hora, accion, id_usuario) VALUES ($1, $2, $3)`,
      [fechaFormateada, accion, user.id]
    );

    res.json(updateResult.rows[0]);
  } catch (error) {
    res.json(error);
  }
};

// Eliminar un chofer
const deleteChofer = async (req, res) => {
  const { ci_chofer } = req.params;

  try {
    const existingChofer = await pool.query(
      `SELECT * FROM ${tabla} WHERE ci_chofer = $1`,
      [ci_chofer]
    );

    if (existingChofer.rowCount != 0) {
      await pool.query(`DELETE FROM ${tabla} WHERE ci_chofer = $1`, [
        ci_chofer,
      ]);

      /* Bitacora */
      const fechaActual = new Date();
      const fechaFormateada = fechaActual.toISOString();
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      const accion = `Eliminar chofer ${ci_chofer}`;

      const user = jwt.verify(token, TOKEN_SECRET);

      console.log("user", user);

      await pool.query(
        `INSERT INTO public.bitacora (fecha_hora, accion, id_usuario) VALUES ($1, $2, $3)`,
        [fechaFormateada, accion, user.id]
      );

      res.json({ success: "Chofer eliminado correctamente" });
    } else {
      res.status(400).json({ error: "El chofer no existe." });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getChoferes,
  getChofer,
  createChofer,
  updateChofer,
  deleteChofer,
};
