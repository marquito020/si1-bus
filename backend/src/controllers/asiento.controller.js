const pool = require("../db");

const tabla = "public.asiento";
const tablaFlota = "flota";

// Obtener todos los asientos
const getAsientos = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM ${tabla} ORDER BY cod_asiento ASC`
    );
    res.json(result.rows);
  } catch (error) {
    res.json(error);
  }
};

// Obtener un asiento por flota
const getAsiento = async (req, res) => {
  const { placa } = req.params;
  console.log(placa);

  try {
    const result = await pool.query(
      `SELECT * FROM ${tabla} WHERE placa_flota = $1`,
      [placa]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Asiento no encontrado" });
    }
    res.json(result.rows);
  } catch (error) {
    res.json(error);
  }
};

const getAsientosByViaje = async (req, res) => {
  const { cod_viaje } = req.params;
  console.log(cod_viaje);

  try {
    const result = await pool.query(
      `SELECT viaje.placa_flota
        FROM public.viaje
        JOIN public.flota ON viaje.placa_flota = flota.placa
        WHERE cod = $1`,
      [cod_viaje]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Viaje no encontrado" });
    }
    const placa = result.rows[0].placa_flota;

    const result2 = await pool.query(
      `SELECT * FROM ${tabla} WHERE placa_flota = $1`,
      [placa]
    );
    if (result2.rows.length === 0) {
      return res.status(404).json({ error: "Asiento no encontrado" });
    }

    res.json(result2.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getAsientosByViajeBoleto = async (req, res) => {
  const { cod_viaje } = req.params;
  console.log(cod_viaje);

  try {
    const boletos = await pool.query(
      `SELECT id_asiento FROM public.boleto WHERE cod_viaje = $1`,
      [cod_viaje]
    );

    console.log(boletos.rows);

    if (boletos.rows.length === 0) {
      return res.json([]);
    }

    var asientos = [];
    for (var i = 0; i < boletos.rows.length; i++) {
      if (i === 0) {
        asientos = await pool.query(
          `SELECT * FROM ${tabla} WHERE id = $1`,
          [boletos.rows[i].id_asiento]
        );
      } else {
        const asiento = await pool.query(
          `SELECT * FROM ${tabla} WHERE id = $1`,
          [boletos.rows[i].id_asiento]
        );
        asientos.rows.push(asiento.rows[0]);
      }
    }

    console.log(asientos.rows);

    if (asientos.rows.length === 0) {
      return res.status(404).json({ error: "Asiento no encontrado" });
    }

    res.json(asientos.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}


const updateAsiento = async (req, res) => {
  const { placa, numero } = req.params;
  const { estado } = req.body;

  try {
    if (!estado) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." });
    }

    const result = await pool.query(
      `UPDATE ${tabla} SET estado = $1 WHERE placa_flota = $2 AND numero = $3 RETURNING *`,
      [estado, placa, numero]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Asiento no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getAsientos,
  getAsiento,
  updateAsiento,
  getAsientosByViaje,
  getAsientosByViajeBoleto,
};
