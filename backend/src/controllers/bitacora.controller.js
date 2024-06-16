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
        per.nombre as nombre_usuario,
        per.apellido as apellido_usuario,
        per.ci as ci_usuario
        FROM ${tabla} bit
        JOIN public.usuario usu ON bit.id_usuario = usu.id_persona
        JOIN public.persona per ON usu.id_persona = per.id
        ORDER BY bit.fecha_hora DESC`
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
