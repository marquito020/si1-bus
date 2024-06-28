const pool = require("../db");

const tabla = "public.bitacora";

// Obtener todos los registros de la bitácora
const getBitacora = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
    bit.id,
    bit.fecha_hora,
    bit.accion,
    bit.id_usuario,
    bit.id_persona,
    COALESCE(per_persona.nombre, per_usuario.nombre) AS nombre_usuario,
    COALESCE(per_persona.apellido, per_usuario.apellido) AS apellido_usuario,
    COALESCE(per_persona.ci, per_usuario.ci) AS ci_usuario
FROM ${tabla} bit
LEFT JOIN public.persona per_persona ON bit.id_persona = per_persona.id
LEFT JOIN public.usuario usu ON bit.id_usuario = usu.id_persona
LEFT JOIN public.persona per_usuario ON usu.id_persona = per_usuario.id
ORDER BY bit.id DESC;
`
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getBitacora,
};
