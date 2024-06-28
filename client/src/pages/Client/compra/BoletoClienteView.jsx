import { useState, useEffect } from 'react';
import {
    Button, Card, CardContent, CircularProgress, Grid, Typography, Box, Alert, TextField
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { URL_BACKEND } from "../../../constants/routes";
import { PDFDocument, rgb } from 'pdf-lib';

export default function BoletoClienteView() {
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
        hora_llegada: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    const generatePdf = async () => {
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
                        <form>
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
                        </form>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => navigate('/compras')}
                            >
                                Volver
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={generatePdf}
                            >
                                Descargar PDF
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
