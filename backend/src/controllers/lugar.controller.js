const pool = require("../db");

// Obtener todos los lugares con el nombre del departamento y la provincia
const getLugares = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        lugar.cod_Departamento, 
        departamento.nombre AS nombre_Departamento, 
        lugar.cod_Provincia, 
        provincia.nombre AS nombre_Provincia, 
        lugar.cod, 
        lugar.direccion
      FROM 
        lugar
      JOIN 
        provincia ON lugar.cod_Departamento = provincia.cod_Departamento AND lugar.cod_Provincia = provincia.cod
      JOIN 
        departamento ON provincia.cod_Departamento = departamento.cod
      ORDER BY 
        lugar.cod_Departamento, lugar.cod_Provincia, lugar.cod ASC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los lugares." });
  }
};

// Obtener un lugar por su código, incluyendo el nombre del departamento y la provincia
const getLugar = async (req, res) => {
  const { cod_Departamento, cod_Provincia, cod } = req.params;

  try {
    const result = await pool.query(`
      SELECT 
        lugar.cod_Departamento, 
        departamento.nombre AS nombre_Departamento, 
        lugar.cod_Provincia, 
        provincia.nombre AS nombre_Provincia, 
        lugar.cod, 
        lugar.direccion
      FROM 
        lugar
      JOIN 
        provincia ON lugar.cod_Departamento = provincia.cod_Departamento AND lugar.cod_Provincia = provincia.cod
      JOIN 
        departamento ON provincia.cod_Departamento = departamento.cod
      WHERE 
        lugar.cod_Departamento = $1 AND lugar.cod_Provincia = $2 AND lugar.cod = $3
    `, [cod_Departamento, cod_Provincia, cod]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Lugar no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el lugar." });
  }
};

// Crear un nuevo lugar
const createLugar = async (req, res) => {
  const { cod_Departamento, cod_Provincia, cod, direccion } = req.body;

  try {
    if (!cod_Departamento || !cod_Provincia || !cod || !direccion) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const existingLugar = await pool.query('SELECT * FROM lugar WHERE cod_Departamento = $1 AND cod_Provincia = $2 AND cod = $3', [cod_Departamento, cod_Provincia, cod]);

    if (existingLugar.rowCount > 0) {
      return res.status(400).json({ error: 'El lugar ya existe.' });
    }

    const insertResult = await pool.query(
      "INSERT INTO lugar (cod_Departamento, cod_Provincia, cod, direccion) VALUES ($1, $2, $3, $4) RETURNING *",
      [cod_Departamento, cod_Provincia, cod, direccion]
    );

    res.json(insertResult.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error en la creación del lugar." });
  }
};

// Actualizar un lugar
const updateLugar = async (req, res) => {
  const { cod_Departamento, cod_Provincia, cod } = req.params;
  const { direccion } = req.body;

  try {
    if (!direccion) {
      return res.status(400).json({ error: "El campo 'direccion' es obligatorio." });
    }

    const updateResult = await pool.query(
      "UPDATE lugar SET direccion = $1 WHERE cod_Departamento = $2 AND cod_Provincia = $3 AND cod = $4 RETURNING *",
      [direccion, cod_Departamento, cod_Provincia, cod]
    );

    if (updateResult.rowCount === 0) {
      return res.status(404).json({ error: "Lugar no encontrado." });
    }

    res.json(updateResult.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error en la actualización del lugar." });
  }
};

// Eliminar un lugar
const deleteLugar = async (req, res) => {
  const { cod_Departamento, cod_Provincia, cod } = req.params;

  try {
    const existingLugar = await pool.query('SELECT * FROM lugar WHERE cod_Departamento = $1 AND cod_Provincia = $2 AND cod = $3', [cod_Departamento, cod_Provincia, cod]);

    if (existingLugar.rowCount > 0) {
      await pool.query('DELETE FROM lugar WHERE cod_Departamento = $1 AND cod_Provincia = $2 AND cod = $3', [cod_Departamento, cod_Provincia, cod]);
      res.json({ success: "Lugar eliminado correctamente" });
    } else {
      res.status(404).json({ error: "Lugar no encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error en la eliminación del lugar." });
  }
};

// Obtener el código del lugar de origen dado el departamento y la provincia
const getCodigoLugarOrigen = async (req, res) => {
  const { cod_Departamento, cod_Provincia } = req.query;

  try {
    const result = await pool.query(`
      SELECT cod
      FROM lugar
      WHERE cod_Departamento = $1 AND cod_Provincia = $2
      LIMIT 1
    `, [cod_Departamento, cod_Provincia]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Lugar de origen no encontrado' });
    }
    res.json({ codigo: result.rows[0].cod });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el código del lugar de origen." });
  }
};

// Obtener el código del lugar de destino dado el departamento y la provincia
const getCodigoLugarDestino = async (req, res) => {
  const { cod_Departamento, cod_Provincia } = req.query;

  try {
    const result = await pool.query(`
      SELECT cod
      FROM lugar
      WHERE cod_Departamento = $1 AND cod_Provincia = $2
      LIMIT 1
    `, [cod_Departamento, cod_Provincia]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Lugar de destino no encontrado' });
    }
    res.json({ codigo: result.rows[0].cod });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el código del lugar de destino." });
  }
};

module.exports = {
  getLugares,
  getLugar,
  createLugar,
  updateLugar,
  deleteLugar,
  getCodigoLugarOrigen,
  getCodigoLugarDestino
};