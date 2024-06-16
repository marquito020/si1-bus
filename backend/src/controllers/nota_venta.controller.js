const pool = require("../db");

const tabla = "public.nota_venta";
const tablaBoleto = "public.boleto";

// Obtener todas las notas de venta
const getNotasVenta = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM ${tabla} ORDER BY id_nota_venta ASC`
    );
    res.json(result.rows);
  } catch (error) {
    res.json(error);
  }
};

// Obtener una nota de venta por su código
const getNotaVenta = async (req, res) => {
  const { id_nota_venta } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM ${tabla} WHERE id_nota_venta = $1`,
      [id_nota_venta]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Nota de venta no encontrada" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.json(error);
  }
};

// Crear una nueva nota de venta
const createNotaVenta = async (req, res) => {
  const { fecha, precio_total, id_cliente, id_metodo_pago } = req.body;

  try {
    if (!fecha || !precio_total || !id_cliente || !id_metodo_pago) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." });
    }

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const result = await client.query(
        `INSERT INTO ${tabla} (fecha, precio_total, id_cliente, id_metodo_pago) VALUES ($1, $2, $3, $4) RETURNING *`,
        [fecha, precio_total, id_cliente, id_metodo_pago]
      );

      await client.query("COMMIT");
      res.status(201).json(result.rows[0]);
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

module.exports = {
  getNotasVenta,
  getNotaVenta,
  createNotaVenta,
};
