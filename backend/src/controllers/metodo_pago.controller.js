const pool = require("../db");

const tabla = "metodo_pago";

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
        console.error(error);
        res.status(500).json({ error: 'Error al crear método de pago' });
    }
}

const deleteMetodoPago = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            `DELETE FROM ${tabla} WHERE id = $1 RETURNING *`,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Método de pago no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar método de pago' });
    }
}

const updateMetodoPago = async (req, res) => {
    const { id } = req.params;
    const { tipo } = req.body;

    try {
        if (!tipo) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        const existingMetodoPago = await pool.query(
            `SELECT * FROM ${tabla} WHERE id = $1`,
            [id]
        );

        if (existingMetodoPago.rowCount === 0) {
            return res.status(404).json({ error: 'Método de pago no encontrado' });
        }

        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const updateResult = await client.query(
                `UPDATE ${tabla} SET tipo = $1 WHERE id = $2 RETURNING *`,
                [tipo, id]
            );

            await client.query('COMMIT');
            res.json(updateResult.rows[0]);
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar método de pago' });
    }
}

module.exports = {
    getMetodosPago,
    getMetodoPago,
    createMetodoPago,
    deleteMetodoPago,
    updateMetodoPago
};