const pool = require("../db");

const tabla = "nota_venta";
const tablaBoleto = "public.boleto";

// Obtener todas las notas de venta
const getNotasVenta = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT DISTINCT
    nota_venta.id,
    nota_venta.fecha,
    nota_venta.precio_total,
    nota_venta.id_cliente,
    nota_venta.id_metodo_pago,
    cliente.id_persona AS id_cliente,
    persona.nombre AS nombre_cliente,
    persona.apellido AS apellido_cliente,
    persona.ci AS ci_cliente,
    metodo_pago.tipo AS metodo_pago
    FROM public.${tabla} AS nota_venta
    JOIN public.cliente ON nota_venta.id_cliente = cliente.id_persona
    JOIN public.metodo_pago ON nota_venta.id_metodo_pago = metodo_pago.id
    JOIN public.persona ON cliente.id_persona = persona.id
    ORDER BY nota_venta.id ASC`
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Obtener una nota de venta por su código
const getNotaVenta = async (req, res) => {
  const { id_nota_venta } = req.params;

  try {
    const result = await pool.query(
      `SELECT DISTINCT
        nota_venta.id,
        nota_venta.fecha,
        nota_venta.precio_total,
        nota_venta.id_cliente,
        nota_venta.id_metodo_pago,
        cliente.id_persona AS id_cliente,
        persona.nombre AS nombre_cliente,
        persona.apellido AS apellido_cliente,
        persona.ci AS ci_cliente,
        metodo_pago.tipo AS metodo_pago
      FROM public.${tabla} AS nota_venta
      JOIN public.cliente ON nota_venta.id_cliente = cliente.id_persona
      JOIN public.metodo_pago ON nota_venta.id_metodo_pago = metodo_pago.id
      JOIN public.persona ON cliente.id_persona = persona.id
      WHERE nota_venta.id = $1`,
      [id_nota_venta]
    );

    console.log("Nota de venta encontrada: ", result.rows[0]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Nota de venta no encontrada" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
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

//Nota Venta Cliente
const getNotaVentaCliente = async (req, res) => {
  const { id_cliente } = req.params;
  console.log(id_cliente);

  try {
    const result = await pool.query(
      `SELECT DISTINCT
    nota_venta.id,
    nota_venta.fecha,
    nota_venta.precio_total,
    nota_venta.id_cliente,
    nota_venta.id_metodo_pago,
    cliente.id_persona AS id_cliente,
    persona.nombre AS nombre_cliente,
    persona.apellido AS apellido_cliente,
    persona.ci AS ci_cliente,
    metodo_pago.tipo AS metodo_pago
    FROM public.${tabla} AS nota_venta
    JOIN public.cliente ON nota_venta.id_cliente = cliente.id_persona
    JOIN public.metodo_pago ON nota_venta.id_metodo_pago = metodo_pago.id
    JOIN public.persona ON cliente.id_persona = persona.id
    WHERE cliente.id_persona = $1
    ORDER BY nota_venta.id DESC`,
      [id_cliente]
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getNotasVenta,
  getNotaVenta,
  createNotaVenta,
  getNotaVentaCliente,
};
