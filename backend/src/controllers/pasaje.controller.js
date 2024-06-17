const pool = require("../db");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config");

const tabla = "public.boleto";
const tablaViaje = "public.viaje";

// Obtener todos los boletos
const getBoletos = async (req, res) => {
  try {
    const result = await pool.query(`
    SELECT 
      bol.id,
      bol.fecha,
      bol.precio,
      bol.id_asiento,
      bol.id_cliente,
      bol.cod_viaje,
      via.fecha,
      via.placa_flota,
      via.hora_salida,
      via.hora_llegada,
      per.nombre,
      asie.numero
    FROM ${tabla} bol
    JOIN ${tablaViaje} via ON bol.cod_viaje = via.cod
    JOIN public.persona per ON bol.id_cliente = per.id
    JOIN public.asiento asie ON bol.id_asiento = asie.id
    ORDER BY bol.fecha DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener boletos" });
  }
};

// Obtener un boleto por su código
const getBoleto = async (req, res) => {
  const { cod_boleto } = req.params;

  try {
    const result = await pool.query(
      `SELECT
        bol.id,
        bol.fecha,
        bol.precio,
        bol.id_asiento,
        bol.id_cliente,
        bol.cod_viaje,
        via.fecha,
        via.placa_flota,
        via.hora_salida,
        via.hora_llegada,
        per.nombre,
        asie.numero
      FROM ${tabla} bol
      JOIN ${tablaViaje} via ON bol.cod_viaje = via.cod
      JOIN public.persona per ON bol.id_cliente = per.id
      JOIN public.asiento asie ON bol.id_asiento = asie.id
      WHERE bol.id = $1`,
      [cod_boleto]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Boleto no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.json(error);
  }
};

// Crear un nuevo boleto
const createBoleto = async (req, res) => {
  const { precio, cod_viaje, id_cliente, id_asiento, id_metodo_pago } =
    req.body;

  console.log(req.body);

  try {
    if (
      !precio ||
      !cod_viaje ||
      !id_cliente ||
      !id_asiento ||
      !id_metodo_pago
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." });
    }

    if (id_asiento.length === 0) {
      return res.status(400).json({ error: "Debe seleccionar asientos." });
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const totalPrecio = precio * id_asiento.length;

      const notaVenta = await client.query(
        `INSERT INTO public.nota_venta (fecha, precio_total, id_cliente, id_metodo_pago)
            VALUES ($1, $2, $3, $4) RETURNING *`,
        [new Date(), totalPrecio, id_cliente, 1]
      );

      for (let i = 0; i < id_asiento.length; i++) {
        await client.query(
          `INSERT INTO ${tabla} (fecha, precio, cod_viaje, id_cliente, id_asiento, id_nota_venta)
              VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
          [
            new Date(),
            precio,
            cod_viaje,
            id_cliente,
            id_asiento[i],
            notaVenta.rows[0].id,
          ]
        );
      }

      /* Bitacora */
      const fechaActual = new Date();
      const fechaFormateada = fechaActual.toISOString();
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      const accion = `Creación de boleto y nota de venta`;

      const user = jwt.verify(token, TOKEN_SECRET);

      console.log("user", user);

      await pool.query(
        `INSERT INTO public.bitacora (fecha_hora, accion, id_usuario) VALUES ($1, $2, $3)`,
        [fechaFormateada, accion, user.id]
      );

      await client.query("COMMIT");
      res.status(201).json({ nota_venta: notaVenta.rows[0] });
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear boleto" });
  }
};

module.exports = {
  getBoletos,
  getBoleto,
  createBoleto,
};
