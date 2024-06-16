const pool = require("../db");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config");

// Obtener todas las flotas con su estado y tipo
const getFlotas = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT flota.placa, flota.marca, flota.modelo, flota.capacidad,
             tipo_flota.descripcion AS tipo, estado_flota.descripcion AS estado
      FROM flota
      JOIN tipo_flota ON flota.cod_tipo_flota = tipo_flota.cod
      JOIN estado_flota ON flota.cod_estado_flota = estado_flota.cod
      ORDER BY flota.placa ASC
    `);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// Obtener una flota por su placa
const getFlota = async (req, res) => {
  const { placa } = req.params;
  const { accessToken } = req.cookies;
  console.log("placa", placa);
  console.log("token", accessToken);

  try {
    const result = await pool.query(
      `
      SELECT flota.placa, flota.marca, flota.modelo, flota.capacidad, flota.cod_tipo_flota, flota.cod_estado_flota
      FROM flota
      WHERE flota.placa = $1
    `,
      [placa]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Flota no encontrada" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la flota." });
  }
};

// Crear una nueva flota
const createFlota = async (req, res) => {
  const { placa, marca, modelo, capacidad, cod_tipo_flota, cod_estado_flota } =
    req.body;

  try {
    if (
      !placa ||
      !marca ||
      !modelo ||
      !capacidad ||
      !cod_tipo_flota ||
      !cod_estado_flota
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." });
    }

    const existingFlota = await pool.query(
      "SELECT * FROM flota WHERE placa = $1",
      [placa]
    );

    if (existingFlota.rowCount > 0) {
      return res.status(400).json({ error: "La flota ya existe." });
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const insertResult = await client.query(
        "INSERT INTO flota (placa, marca, modelo, capacidad, cod_tipo_flota, cod_estado_flota) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [placa, marca, modelo, capacidad, cod_tipo_flota, cod_estado_flota]
      );

      await client.query("COMMIT");

      await createAsiento(placa, capacidad);

      res.json(insertResult.rows[0]);
    } catch (error) {
      console.log(error);
      await client.query("ROLLBACK");
      res.status(500).json({ error: "Error en la creación de la flota." });
    } finally {
      client.release();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error en la creación de la flota." });
  }
};

const createAsiento = async (placa, capacidad) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    for (let i = 1; i <= capacidad; i++) {
      await client.query(
        "INSERT INTO Asiento (numero, estado, placa_flota) VALUES ($1, $2, $3)",
        [i, "Disponible", placa]
      );
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

// Actualizar una flota
const updateFlota = async (req, res) => {
  const { placa } = req.params;
  const { marca, modelo, capacidad, cod_tipo_flota, cod_estado_flota } =
    req.body;

  try {
    if (
      !marca ||
      !modelo ||
      !capacidad ||
      !cod_tipo_flota ||
      !cod_estado_flota
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." });
    }

    const updateResult = await pool.query(
      "UPDATE flota SET marca = $1, modelo = $2, capacidad = $3, cod_tipo_flota = $4, cod_estado_flota = $5 WHERE placa = $6 RETURNING *",
      [marca, modelo, capacidad, cod_tipo_flota, cod_estado_flota, placa]
    );

    if (updateResult.rowCount === 0) {
      return res.status(404).json({ error: "Flota no encontrada." });
    }

    res.json(updateResult.rows[0]);
  } catch (error) {
    res.json(error);
  }
};

// Eliminar una flota
const deleteFlota = async (req, res) => {
  const { placa } = req.params;

  try {
    const existingFlota = await pool.query(
      `SELECT * FROM flota WHERE placa = $1`,
      [placa]
    );

    if (existingFlota.rowCount != 0) {
      await pool.query(`DELETE FROM flota WHERE placa = $1`, [placa]);
      res.json({ success: "Flota eliminada correctamente" });
    } else {
      res.status(400).json({ error: "La flota no existe." });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getFlotas,
  getFlota,
  createFlota,
  updateFlota,
  deleteFlota,
};
