const pool = require("../db");

const tabla = "public.metodo_pago";

const getMetodosPago = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM ${tabla} ORDER BY id ASC`);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener métodos de pago" });
    }
    }

const getMetodoPago = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(`SELECT * FROM ${tabla} WHERE id = $1`, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Método de pago no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener método de pago" });
    }
};

const createMetodoPago = async (req, res) => {
    const { tipo } = req.body;

    try {
        if (!tipo) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const result = await client.query(
                `INSERT INTO ${tabla} (tipo) VALUES ($1) RETURNING *`,
                [tipo]
            );

            await client.query('COMMIT');
            res.status(201).json(result.rows[0]);
        } catch (e) {
            await client.query('ROLLBACK');
            res.status(500).json({ error: 'Error al crear método de pago' });
        } finally {
            client.release();
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al crear método de pago' });
    }

}

module.exports = {
    getMetodosPago,
    getMetodoPago,
    createMetodoPago
};