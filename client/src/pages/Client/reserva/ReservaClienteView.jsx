import { useState, useEffect } from 'react';
import {
    Button, Card, CardContent, CircularProgress, Grid, Typography, Box, Alert, TextField,
    MenuItem
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { URL_BACKEND } from "../../../constants/routes";
import {
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
/* import { PDFDocument, rgb } from 'pdf-lib'; */

export default function ReservaClienteView() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [boleto, setBoleto] = useState({
        id: "",
        fecha: "",
        precio: "",
        nombre: "",
        numero: "",
        placa_flota: "",
        hora_salida: "",
        hora_llegada: "",
        id_metodo_pago: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [metodoPago, setMetodoPago] = useState([]);

    useEffect(() => {
        const loadBoleto = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${URL_BACKEND}/boletos/${id}`);
                const data = await response.json();
                setBoleto(data["fecha"] ? {
                    ...data,
                    fecha: new Date(data["fecha"]).toLocaleDateString()
                } : {});
            } catch (error) {
                console.error("Error loading boleto:", error);
                setError("Error loading boleto");
            } finally {
                setLoading(false);
            }
        };

        loadBoleto();
    }, [id]);

    useEffect(() => {
        fetch(`${URL_BACKEND}/metodos-pago`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setMetodoPago(data);
            });
    }, []);

    const handleChange = (e) => {
        setBoleto({
            ...boleto,
            [e.target.name]: e.target.value,
        });
    }

    /* const generatePdf = async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);
        const { height } = page.getSize();

        page.drawText(`ID: ${boleto.id}`, { x: 50, y: height - 50, size: 15, color: rgb(0, 0, 0) });
        page.drawText(`Fecha: ${boleto.fecha}`, { x: 50, y: height - 80, size: 15, color: rgb(0, 0, 0) });
        page.drawText(`Precio: ${boleto.precio}`, { x: 50, y: height - 110, size: 15, color: rgb(0, 0, 0) });
        page.drawText(`Nombre: ${boleto.nombre}`, { x: 50, y: height - 140, size: 15, color: rgb(0, 0, 0) });
        page.drawText(`Número de Asiento: ${boleto.numero}`, { x: 50, y: height - 170, size: 15, color: rgb(0, 0, 0) });
        page.drawText(`Placa Flota: ${boleto.placa_flota}`, { x: 50, y: height - 200, size: 15, color: rgb(0, 0, 0) });
        page.drawText(`Hora Salida: ${boleto.hora_salida}`, { x: 50, y: height - 230, size: 15, color: rgb(0, 0, 0) });
        page.drawText(`Hora Llegada: ${boleto.hora_llegada}`, { x: 50, y: height - 260, size: 15, color: rgb(0, 0, 0) });

        const pdfBytes = await pdfDoc.save();

        // Crear un enlace de descarga
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `boleto${boleto.id}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }; */

    const stripe = useStripe();
    const elements = useElements();
    const handlePayment = async (e) => {
        e.preventDefault();
        setError(null);

        if (boleto.id_metodo_pago === 2 || boleto.id_metodo_pago === 3) {
            if (!stripe || !elements) {
                return;
            }

            const { error: submitError } = await elements.submit();
            if (submitError) {
                setError(submitError.message);
                setLoading(false);
                return;
            }

            // Fetch client secret
            const clientSecretResponse = await fetch(`${URL_BACKEND}/create-payment-intent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: boleto.precio * 100, // precio en centavos
                    currency: "usd",
                }),
            });

            const { clientSecret } = await clientSecretResponse.json();

            const token = localStorage.getItem("accessToken");

            try {
                const response = await fetch(`${URL_BACKEND}/reservas/nota-venta`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        id_boleto: boleto.id,
                        id_metodo_pago: boleto.id_metodo_pago,
                        precio_total: boleto.precio
                    }),
                });
                const data = await response.json();
                console.log(data);
                if (response.status == 201 || response.status == 200) {
                    const notaVenta = data.nota_venta;
                    /* navigate("/nota-venta-cliente/" + notaVenta.id); */
                    // Confirm payment
                    const { error: confirmError } = await stripe.confirmPayment({
                        elements,
                        clientSecret,
                        confirmParams: {
                            return_url: `${window.location.origin}/nota-venta-cliente/${notaVenta.id}`,
                        },
                    });

                    if (confirmError) {
                        setError(confirmError.message);
                        setLoading(false);
                        return;
                    }
                } else {
                    setError(data.message);
                }
            } catch (error) {
                console.error('Error en el pago:', error);
                setError('Hubo un error al intentar realizar el pago. Por favor, intenta de nuevo.');
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(true);
            const token = localStorage.getItem("accessToken");
            try {

                const response = await fetch(`${URL_BACKEND}/reservas/nota-venta`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        id_boleto: boleto.id,
                        id_metodo_pago: boleto.id_metodo_pago,
                        precio_total: boleto.precio
                    }),
                });
                const data = await response.json();
                console.log(data);
                if (response.status == 201 || response.status == 200) {
                    const notaVenta = data.nota_venta;
                    navigate(`/nota-venta-cliente/${notaVenta.id}`);
                } else {
                    setError('Hubo un error al intentar realizar el pago. Por favor, intenta de nuevo.');
                }
            } catch (error) {
                console.error('Error en el pago:', error);
                setError('Hubo un error al intentar realizar el pago. Por favor, intenta de nuevo.');
            } finally {
                setLoading(false);
            }
        }
    };


    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            Boleto
                        </Typography>
                        {loading && <CircularProgress />}
                        {error && <Alert severity="error">{error}</Alert>}
                        <form onSubmit={handlePayment}
                        >
                            <TextField
                                label="ID"
                                name="id"
                                value={boleto.id}
                                fullWidth
                                disabled
                                margin="normal"
                            />
                            <TextField
                                label="Fecha"
                                name="fecha"
                                value={boleto.fecha}
                                fullWidth
                                disabled
                                margin="normal"
                            />
                            <TextField
                                label="Precio"
                                name="precio"
                                value={boleto.precio}
                                fullWidth
                                disabled
                                margin="normal"
                            />
                            <TextField
                                label="Nombre"
                                name="nombre"
                                value={boleto.nombre}
                                fullWidth
                                disabled
                                margin="normal"
                            />
                            <TextField
                                label="Número de Asiento"
                                name="numero"
                                value={boleto.numero}
                                fullWidth
                                disabled
                                margin="normal"
                            />
                            <TextField
                                label="Placa Flota"
                                name="placa_flota"
                                value={boleto.placa_flota}
                                fullWidth
                                disabled
                                margin="normal"
                            />
                            <TextField
                                label="Hora Salida"
                                name="hora_salida"
                                value={boleto.hora_salida}
                                fullWidth
                                disabled
                                margin="normal"
                            />
                            <TextField
                                label="Hora Llegada"
                                name="hora_llegada"
                                value={boleto.hora_llegada}
                                fullWidth
                                disabled
                                margin="normal"
                            />

                            <TextField
                                label="Método de Pago"
                                name="id_metodo_pago"
                                select
                                value={boleto.id_metodo_pago}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                            >
                                {metodoPago.map((mp) => (
                                    <MenuItem key={mp.id} value={mp.id}>
                                        {mp.tipo}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {(boleto.id_metodo_pago === 2 || boleto.id_metodo_pago === 3) && (
                                <Box sx={{ mt: 2 }}>
                                    <PaymentElement />
                                </Box>
                            )}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                            >
                                Pagar
                            </Button>
                        </form>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => navigate('/compras')}
                            >
                                Volver
                            </Button>
                            {/* <Button
                                variant="contained"
                                color="primary"
                                onClick={generatePdf}
                            >
                                Descargar PDF
                            </Button> */}
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
