const pool = require("../db");
const { v4: uuidv4 } = require("uuid");

const tabla = "Cliente";
const orden = "id_persona";
const tablePersona = "Persona";

const getClientes = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM ${tablePersona} JOIN ${tabla} ON ${tablePersona}.id = ${tabla}.${orden}`
    );
    res.json(result.rows);
  } catch (error) {
    res.json(error);
  }
};

const getCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM ${tablePersona} JOIN ${tabla} ON ${tablePersona}.id = ${tabla}.${orden} WHERE ${tablePersona}.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.json(error);
  }
};

const createCliente = async (req, res) => {
  const { nombre, apellido, ci, fecha_nacimiento, telefono } = req.body;

  console.log(req.body);

  try {
    if (!nombre || !apellido || !ci || !fecha_nacimiento || !telefono) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." });
    }

    const existingCliente = await pool.query(
      "SELECT * FROM public.persona WHERE ci = $1",
      [ci]
    );

    if (existingCliente.rowCount > 0) {
      return res.status(400).json({ error: "El cliente ya existe." });
    }

    // Reset the sequence for the 'id' column in the 'persona' table
    await pool.query(
      `SELECT setval(pg_get_serial_sequence('persona', 'id'), (SELECT GREATEST(MAX(id), 1) FROM persona))`
    );

    const insertPersona = await pool.query(
      `INSERT INTO persona (nombre, apellido, ci, fecha_nacimiento, telefono) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [nombre, apellido, ci, fecha_nacimiento, telefono]
    );

    const personaId = insertPersona.rows[0].id;

    await pool.query(`INSERT INTO cliente (id_persona) VALUES ($1)`, [
      personaId,
    ]);

    res.json({
      message: "Cliente creado correctamente",
      cliente: {
        id: personaId,
        nombre,
        apellido,
        ci,
        fecha_nacimiento,
        telefono,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el cliente" });
  }
};

module.exports = {
  getClientes,
  createCliente,
  getCliente,
};
