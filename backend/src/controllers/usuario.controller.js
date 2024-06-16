const pool = require("../db");
/* const bcrypt = require("bcryptjs");
const { createAccessToken } = require("../libs/jwt");
const { TOKEN_SECRET } = require("../config"); */
const { User } = require("../models/user.model");

// tabla global a usar
const tabla = "public.usuario";
const orden = "id_persona";

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    console.log("getUsuarios");
    const result = await pool.query(`SELECT * FROM ${tabla} ORDER BY ${orden} ASC`);
    console.log(result.rows);
    res.json(result.rows);
  } catch (error) {
    res.json(error);
  }
};

// Obtener un usuario por ID
const getUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`SELECT * FROM ${tabla} WHERE id = $1`, [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.json(error);
  }
};

// Crear un nuevo usuario
const createUsuario = async (req, res) => {
  const { nombre, apellido, ci, fecha_nacimiento, telefono } = req.body;
};

const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  try {
    const existingUser = await pool.query(
      `SELECT * FROM ${tabla} WHERE id = $1`,
      [id]
    );

    if (existingUser.rowCount === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const updateResult = await client.query(
        `UPDATE ${tabla} SET username = $1, password = $2 WHERE id = $3 RETURNING *`,
        [username, password, id]
      );

      await client.query("COMMIT");

      res.json(updateResult.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getUsuarios,
  createUsuario,
  getUsuario,
  updateUsuario,
};
