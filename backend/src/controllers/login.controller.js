const pool = require("../db");
const { loginSchema } = require("../schemas/auth.schema");
const { createAccessToken } = require("../libs/jwt");

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    await loginSchema.parse({ username, password });

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

    const roles = await pool.query(
      "SELECT * FROM public.rol"
    );

    const rolUsuario = roles.rows.find(
      (rol) => rol.id === user.rows[0].id_rol
    );

    const accessToken = await createAccessToken({
      username: user.rows[0].username,
    });

    res.json({
      accessToken,
      user: {
        username: user.rows[0].username,
        rol: rolUsuario,
        id: user.rows[0].id,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { login };
