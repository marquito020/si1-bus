const pool = require("../db");
const { loginSchema } = require("../schemas/auth.schema");
const { createAccessToken } = require("../libs/jwt");
const moment = require('moment-timezone');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    loginSchema.parse({ username, password });

    const user = await pool.query("SELECT * FROM usuario WHERE username = $1", [
      username,
    ]);

    if (user.rowCount === 0) {
      return res
        .status(401)
        .json({ error: "Usuario o contraseña incorrectos." });
    }

    const validPassword = user.rows[0].password === password;

    if (!validPassword) {
      return res
        .status(401)
        .json({ error: "Usuario o contraseña incorrectos." });
    }

    const roles = await pool.query("SELECT * FROM public.rol");
    const rolUsuario = roles.rows.find((rol) => rol.id === user.rows[0].id_rol);

    const accessToken = await createAccessToken({
      username: user.rows[0].username,
      rol: rolUsuario,
      id: user.rows[0].id_persona,
    });

    /* Bitacora */
    const fechaActual = moment.tz("America/La_Paz").format();
    console.log("fechaActual con Moment:", fechaActual);
    /* const fechaFormateada = fechaActual.toISOString(); */
    const accion = `inicio sesion`;

    await pool.query(
      `INSERT INTO public.bitacora (fecha_hora, accion, id_usuario) VALUES ($1, $2, $3)`,
      [fechaActual, accion, user.rows[0].id_persona]
    );

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });

    res.json({
      accessToken,
      user: {
        username: user.rows[0].username,
        rol: rolUsuario,
        id: user.rows[0].id_persona,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/* Login Cliente */
const loginCliente = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query(
      "SELECT * FROM public.cliente WHERE email = $1",
      [email]
    );

    console.log("user", user.rows[0]);

    if (user.rowCount === 0) {
      return res
        .status(401)
        .json({ error: "Usuario o contraseña incorrectos." });
    }

    const validPassword = user.rows[0].password === password;

    if (!validPassword) {
      return res
        .status(401)
        .json({ error: "Usuario o contraseña incorrectos." });
    }

    const accessToken = await createAccessToken({
      email: user.rows[0].email,
      id: user.rows[0].id,
    });

    /* Bitacora */
    const fechaActual = moment.tz("America/La_Paz").format();
    /* const fechaFormateada = fechaActual.toISOString(); */
    const accion = `Inicio sesion de cliente`;

    await pool.query(
      `INSERT INTO public.bitacora (fecha_hora, accion, id_persona) VALUES ($1, $2, $3)`,
      [fechaActual, accion, user.rows[0].id_persona]
    );

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });

    res.json({
      accessToken,
      user: {
        email: user.rows[0].email,
        id: user.rows[0].id_persona,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { login, loginCliente };
