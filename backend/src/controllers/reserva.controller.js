const pool = require("../db");

const tabla = "public.reserva";
const boleto = "public.boleto";
const notaVenta = "public.nota_venta";

// Obtener todas las reservas
const getReservas = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
    res.id,
    res.fecha,
    res.id_cliente,
    res.cod_viaje,
    res.estado,
    per.nombre AS nombre_cliente,
    per.apellido AS apellido_cliente,
    per.ci AS ci_cliente
    FROM ${tabla} res
    JOIN public.persona per ON res.id_cliente = per.id
    WHERE res.id_cliente = $1 AND res.estado = TRUE
    ORDER BY res.fecha DESC;
    `
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const createReserva = async (req, res) => {
  const { precio, cod_viaje, id_asiento, id_cliente } = req.body;

  console.log(req.body);

  try {
    if (!precio || !cod_viaje || !id_asiento || !id_cliente) {
      return res.status(400).json({ error: "Faltan campos" });
    }

    const fecha = new Date().toISOString(); // Obtén la fecha en formato ISO

    console.log(fecha);

    for (let i = 0; i < id_asiento.length; i++) {
      const result = await pool.query(
        `INSERT INTO ${tabla} (fecha, precio, cod_viaje, id_cliente, id_asiento, estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [fecha, precio, cod_viaje, id_cliente, id_asiento[i], true]
      );

      console.log(result.rows[0].id);

      await pool.query(
        `INSERT INTO ${boleto} (fecha, precio, cod_viaje, id_cliente, id_asiento, estado, id_reserva) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          fecha,
          precio,
          cod_viaje,
          id_cliente,
          id_asiento[i],
          "RESERVADO",
          result.rows[0].id,
        ]
      );
    }

    res.json({ message: "Reserva creada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear reserva" });
  }
};

const getReservasByCliente = async (req, res) => {
  const { id_cliente } = req.params;

  try {
    const result = await pool.query(
      `SELECT
    bol.id,
    bol.fecha,
    bol.precio,
    bol.id_asiento,
    bol.id_cliente,
    bol.cod_viaje,
    bol.id_reserva,
    bol.estado,
    via.fecha AS fecha_viaje,
    via.placa_flota,
    via.hora_salida,
    via.hora_llegada,
    per.nombre AS nombre_cliente,
    asie.numero AS numero_asiento
    FROM ${boleto} bol
    JOIN public.viaje via ON bol.cod_viaje = via.cod
    JOIN public.persona per ON bol.id_cliente = per.id
    JOIN public.asiento asie ON bol.id_asiento = asie.id
    WHERE bol.id_cliente = $1 AND bol.id_reserva IS NOT NULL AND bol.estado = 'RESERVADO'
    ORDER BY bol.fecha DESC;
        `,
      [id_cliente]
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const createNotaUpdateBoleto = async (req, res) => {
  const { id_boleto, id_metodo_pago, precio_total } = req.body;

  console.log(req.body);

  try {
    if (!id_boleto || !id_metodo_pago || !precio_total) {
      return res.status(400).json({ error: "Faltan campos" });
    }

    const fecha = new Date().toISOString(); // Obtén la fecha en formato ISO

    const resultBoleto = await pool.query(
      `SELECT
        bol.id,
        bol.fecha,
        bol.precio,
        bol.id_asiento,
        bol.id_cliente,
        bol.cod_viaje,
        bol.id_reserva,
        bol.estado,
        via.fecha AS fecha_viaje,
        via.placa_flota,
        via.hora_salida,
        via.hora_llegada,
        per.nombre AS nombre_cliente,
        asie.numero AS numero_asiento
        FROM ${boleto} bol
        JOIN public.viaje via ON bol.cod_viaje = via.cod
        JOIN public.persona per ON bol.id_cliente = per.id
        JOIN public.asiento asie ON bol.id_asiento = asie.id
        WHERE bol.id = $1
        ORDER BY bol.fecha DESC;
            `,
      [id_boleto]
    );

    const notaVentaData = await pool.query(
      `INSERT INTO ${notaVenta} (fecha, precio_total, id_cliente, id_metodo_pago) VALUES ($1, $2, $3, $4) RETURNING *`,
      [fecha, precio_total, resultBoleto.rows[0].id_cliente, id_metodo_pago]
    );

    console.log("notaVentaData", notaVentaData.rows);

    await pool.query(
      `UPDATE ${boleto} SET estado = 'COMPRADO', id_nota_venta = $1 WHERE id = $2`,
      [notaVentaData.rows[0].id, id_boleto]
    );

    res.status(201).json({ nota_venta: notaVentaData.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear nota de venta" });
  }
};

module.exports = {
  getReservas,
  createReserva,
  getReservasByCliente,
  createNotaUpdateBoleto,
};
