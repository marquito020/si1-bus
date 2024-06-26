const pool = require("../db");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config");
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

    /* Bitacora */
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString();

    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const user = jwt.verify(token, TOKEN_SECRET);
    const accion = `Creación de rol ${nombre}`;

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    const ipArray = ip.split(',').map(item => item.trim());
    const clientIp = ipArray[0]; // La primera IP en la lista es la IP real del cliente

    await pool.query(
      `INSERT INTO public.bitacora (fecha_hora, accion, id_usuario, ip) VALUES ($1, $2, $3, $4)`,
      [fechaFormateada, accion, user.id, clientIp]
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

      /* Bitacora */
      const fechaActual = new Date();
      const fechaFormateada = fechaActual.toISOString();

      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      const user = jwt.verify(token, TOKEN_SECRET);

      const accion = `Actualizar rol ${id}`;

      await pool.query(
        `INSERT INTO public.bitacora (fecha_hora, accion, id_usuario) VALUES ($1, $2, $3)`,
        [fechaFormateada, accion, user.id]
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

    /* Bitacora */
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString();
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const accion = `Eliminación de rol con ID ${id}`;

    const user = jwt.verify(token, TOKEN_SECRET);

    console.log("user", user);

    await pool.query(
      `INSERT INTO public.bitacora (fecha_hora, accion, id_usuario) VALUES ($1, $2, $3)`,
      [fechaFormateada, accion, user.id]
    );
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
