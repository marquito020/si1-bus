const pool = require("../db");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config");

// Obtener todas las provincias
const getProvincias = async (req, res) => {
  try {
    const result = await pool.query("SELECT cod, nombre FROM provincia");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener provincias:", error);
    res.status(500).json({ error: "Error al obtener provincias." });
  }
};

// Obtener todos los departamentos
const getDepartamentos = async (req, res) => {
  try {
    const result = await pool.query("SELECT cod, nombre FROM departamento");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener departamentos:", error);
    res.status(500).json({ error: "Error al obtener departamentos." });
  }
};

// Obtener todos los viajes con detalles de origen y destino
const getViajes = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        viaje.cod, viaje.fecha, viaje.hora_salida, viaje.hora_llegada, viaje.precio, 
        viaje.placa_flota, viaje.status,
        lugar_origen.direccion AS lugar_Origen, provincia_origen.nombre AS provincia_Origen, departamento_origen.nombre AS departamento_Origen,
        lugar_destino.direccion AS lugar_Destino, provincia_destino.nombre AS provincia_Destino, departamento_destino.nombre AS departamento_Destino
      FROM 
        viaje
      JOIN 
        lugar AS lugar_origen ON (viaje.cod_departamento_origen = lugar_origen.cod_Departamento AND viaje.cod_provincia_origen = lugar_origen.cod_Provincia AND viaje.cod_lugar_origen = lugar_origen.cod)
      JOIN 
        provincia AS provincia_origen ON (viaje.cod_departamento_origen = provincia_origen.cod_Departamento AND viaje.cod_provincia_origen = provincia_origen.cod)
      JOIN 
        departamento AS departamento_origen ON viaje.cod_departamento_origen = departamento_origen.cod
      JOIN 
        lugar AS lugar_destino ON (viaje.cod_departamento_destino = lugar_destino.cod_Departamento AND viaje.cod_provincia_destino = lugar_destino.cod_Provincia AND viaje.cod_lugar_destino = lugar_destino.cod)
      JOIN 
        provincia AS provincia_destino ON (viaje.cod_departamento_destino = provincia_destino.cod_Departamento AND viaje.cod_provincia_destino = provincia_destino.cod)
      JOIN 
        departamento AS departamento_destino ON viaje.cod_departamento_destino = departamento_destino.cod
      ORDER BY 
        viaje.fecha, viaje.hora_salida
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener los viajes:", error);
    res.status(500).json({ error: "Error al obtener los viajes." });
  }
};

// Obtener un viaje por su código
const getViaje = async (req, res) => {
  const { cod } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT
        viaje.cod, viaje.fecha, viaje.hora_salida, viaje.hora_llegada, viaje.precio,
        viaje.placa_flota, viaje.cod_lugar_destino, viaje.cod_provincia_destino, viaje.cod_departamento_destino,
        viaje.cod_lugar_origen, viaje.cod_provincia_origen, viaje.cod_departamento_origen
      FROM
        viaje
      WHERE
        viaje.cod = $1
    `,
      [cod]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Viaje no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener el viaje:", error);
    res.status(500).json({ error: "Error al obtener el viaje." });
  }
};

const cancelViaje = async (req, res) => {
  const { cod } = req.params;

  try {
    const result = await pool.query(
      `
      UPDATE viaje
      SET status = 'false'
      WHERE cod = $1
      RETURNING *
    `,
      [cod]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Viaje no encontrado" });
    }

    /* Bitacora */
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString();
    const { token } = req.cookies;
    const accion = `Cancelación de viaje ${cod}`;

    const user = jwt.verify(token, TOKEN_SECRET);

    console.log("user", user);

    await pool.query(
      `INSERT INTO public.bitacora (fecha_hora, accion, id_usuario) VALUES ($1, $2, $3)`,
      [fechaFormateada, accion, user.id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al cancelar el viaje:", error);
    res.status(500).json({ error: "Error al cancelar el viaje." });
  }
};

// Crear un nuevo viaje
const createViaje = async (req, res) => {
  const {
    fecha,
    hora_salida,
    hora_llegada,
    precio,
    placa_flota,
    cod_provincia_destino,
    cod_departamento_destino,
    cod_provincia_origen,
    cod_departamento_origen,
  } = req.body;

  console.log("Datos recibidos en el backend:", req.body); // Añadir esto para ver los datos recibidos

  try {
    if (
      !fecha ||
      !hora_salida ||
      !precio ||
      !placa_flota ||
      !cod_provincia_destino ||
      !cod_departamento_destino ||
      !cod_provincia_origen ||
      !cod_departamento_origen
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." });
    }

    const cod_lugar_origen = await obtenerCodigoLugar(
      cod_departamento_origen,
      cod_provincia_origen
    );
    const cod_lugar_destino = await obtenerCodigoLugar(
      cod_departamento_destino,
      cod_provincia_destino
    );

    if (!cod_lugar_origen || !cod_lugar_destino) {
      return res
        .status(400)
        .json({ error: "No se pudo obtener los códigos de lugar." });
    }

    console.log("Codigos obtenidos: ", { cod_lugar_origen, cod_lugar_destino });

    const cod = uuidv4().substr(0, 8); // Generar un código único para el viaje

    console.log("Código generado:", cod);

    const insertResult = await pool.query(
      "INSERT INTO viaje (cod, fecha, hora_salida, hora_llegada, precio, placa_flota, cod_lugar_destino, cod_provincia_destino, cod_departamento_destino, cod_lugar_origen, cod_provincia_origen, cod_departamento_origen) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
      [
        cod,
        fecha,
        hora_salida,
        hora_llegada,
        precio,
        placa_flota,
        cod_lugar_destino,
        cod_provincia_destino,
        cod_departamento_destino,
        cod_lugar_origen,
        cod_provincia_origen,
        cod_departamento_origen,
      ]
    );

    /* Bitacora */
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString();
    const { token } = req.cookies;
    const accion = `Creación de viaje ${cod}`;

    const user = jwt.verify(token, TOKEN_SECRET);

    console.log("user", user);

    await pool.query(
      `INSERT INTO public.bitacora (fecha_hora, accion, id_usuario) VALUES ($1, $2, $3)`,
      [fechaFormateada, accion, user.id]
    );

    res.json(insertResult.rows[0]);
  } catch (error) {
    console.error("Error en la creación del viaje:", error);
    res.status(500).json({ error: "Error en la creación del viaje." });
  }
};

// Función para obtener el código de lugar
const obtenerCodigoLugar = async (cod_Departamento, cod_Provincia) => {
  try {
    console.log("Obteniendo código de lugar para:", {
      cod_Departamento,
      cod_Provincia,
    });
    const result = await pool.query(
      "SELECT cod FROM lugar WHERE cod_Departamento = $1 AND cod_Provincia = $2 LIMIT 1",
      [cod_Departamento, cod_Provincia]
    );
    if (result.rows.length > 0) {
      return result.rows[0].cod;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el código de lugar:", error);
    return null;
  }
};

// Actualizar un viaje
const updateViaje = async (req, res) => {
  const { cod } = req.params;
  const {
    fecha,
    hora_salida,
    hora_llegada,
    precio,
    placa_flota,
    cod_provincia_destino,
    cod_departamento_destino,
    cod_provincia_origen,
    cod_departamento_origen,
  } = req.body;

  console.log("Datos recibidos en el backend:", req.body); // Añadir esto para ver los datos recibidos

  try {
    if (
      !fecha ||
      !hora_salida ||
      !precio ||
      !placa_flota ||
      !cod_provincia_destino ||
      !cod_departamento_destino ||
      !cod_provincia_origen ||
      !cod_departamento_origen
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." });
    }

    const cod_lugar_origen = await obtenerCodigoLugar(
      cod_departamento_origen,
      cod_provincia_origen
    );
    const cod_lugar_destino = await obtenerCodigoLugar(
      cod_departamento_destino,
      cod_provincia_destino
    );

    const updateResult = await pool.query(
      "UPDATE viaje SET fecha = $1, hora_salida = $2, hora_llegada = $3, precio = $4, placa_flota = $5, cod_lugar_destino = $6, cod_provincia_destino = $7, cod_departamento_destino = $8, cod_lugar_origen = $9, cod_provincia_origen = $10, cod_departamento_origen = $11 WHERE cod = $12 RETURNING *",
      [
        fecha,
        hora_salida,
        hora_llegada,
        precio,
        placa_flota,
        cod_lugar_destino,
        cod_provincia_destino,
        cod_departamento_destino,
        cod_lugar_origen,
        cod_provincia_origen,
        cod_departamento_origen,
        cod,
      ]
    );

    if (updateResult.rowCount === 0) {
      return res.status(404).json({ error: "Viaje no encontrado." });
    }

    /* Bitacora */
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString();
    const { token } = req.cookies;
    const accion = `Actualizar viaje ${cod}`;

    const user = jwt.verify(token, TOKEN_SECRET);

    console.log("user", user);

    await pool.query(
      `INSERT INTO public.bitacora (fecha_hora, accion, id_usuario) VALUES ($1, $2, $3)`,
      [fechaFormateada, accion, user.id]
    );

    res.json(updateResult.rows[0]);
  } catch (error) {
    console.error("Error en la actualización del viaje:", error);
    res.status(500).json({ error: "Error en la actualización del viaje." });
  }
};

// Eliminar un viaje
const deleteViaje = async (req, res) => {
  const { cod } = req.params;

  try {
    const existingViaje = await pool.query(
      "SELECT * FROM viaje WHERE cod = $1",
      [cod]
    );

    if (existingViaje.rowCount > 0) {
      await pool.query("DELETE FROM viaje WHERE cod = $1", [cod]);
      res.json({ success: "Viaje eliminado correctamente" });
    } else {
      res.status(404).json({ error: "Viaje no encontrado." });
    }
  } catch (error) {
    console.error("Error en la eliminación del viaje:", error);
    res.status(500).json({ error: "Error en la eliminación del viaje." });
  }
};

module.exports = {
  getViajes,
  getViaje,
  createViaje,
  updateViaje,
  deleteViaje,
  getProvincias,
  getDepartamentos,
  cancelViaje,
};
