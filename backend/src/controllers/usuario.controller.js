const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createAccessToken } = require("../libs/jwt");
const { TOKEN_SECRET } = require("../config");
const { User } = require("../models/user.model");

// tabla global a usar
const tabla = "public.usuario";
const orden = "id_persona";

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    console.log("getUsuarios");
    const result = await pool.query(`SELECT
    usuario.id_persona,
    usuario.username,
    usuario.password,
    persona.nombre,
    persona.apellido,
    persona.ci,
    persona.fecha_nacimiento,
    persona.telefono,
    rol.nombre AS rol
    FROM public.usuario
    JOIN public.persona ON usuario.id_persona = persona.id
    JOIN public.rol ON usuario.id_rol = rol.id
    ORDER BY usuario.id_persona ASC`);
    console.log(result.rows);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
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
  const {
    nombre,
    apellido,
    ci,
    fecha_nacimiento,
    telefono,
    id_rol,
    username,
    password,
  } = req.body;

  console.log(req.body);

  try {
    if (
      !nombre ||
      !apellido ||
      !ci ||
      !fecha_nacimiento ||
      !telefono ||
      !id_rol ||
      !username ||
      !password
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." });
    }

    const existingUser = await pool.query(
      "SELECT * FROM public.persona WHERE ci = $1",
      [ci]
    );

    if (existingUser.rowCount > 0) {
      return res.status(400).json({ error: "El usuario ya existe." });
    }

    // Reset the sequence for the 'id' column in the 'persona' table
    await pool.query(
      `SELECT setval(pg_get_serial_sequence('persona', 'id'), (SELECT GREATEST(MAX(id), 1) FROM persona))`
    );

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const resultPersona = await client.query(
        `INSERT INTO persona (nombre, apellido, ci, fecha_nacimiento, telefono) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [nombre, apellido, ci, fecha_nacimiento, telefono]
      );

      const id_persona = resultPersona.rows[0].id;

      const active = true;

      const resultUsuario = await client.query(
        `INSERT INTO usuario (id_persona, username, password, id_rol, activo) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [id_persona, username, password, id_rol, active]
      );

      /* Bitacora */
      const fechaActual = new Date();
      const fechaFormateada = fechaActual.toISOString();
      const { token } = req.cookies;
      const accion = `Creación de usuario ${username}`;

      const user = jwt.verify(token, TOKEN_SECRET);

      console.log("user", user);

      await pool.query(
        `INSERT INTO public.bitacora (fecha_hora, accion, id_usuario) VALUES ($1, $2, $3)`,
        [fechaFormateada, accion, user.id]
      );

      await client.query("COMMIT");

      res.json(resultUsuario.rows[0]);
    } catch (error) {
      console.log(error);
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
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
