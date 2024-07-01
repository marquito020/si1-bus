import { useState, useEffect } from 'react';
import {
    Button, Card, CardContent, CircularProgress, Grid, Typography, Box, Alert
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { URL_BACKEND } from "../../../constants/routes";
import { PDFDocument, rgb } from 'pdf-lib';

export default function NotaVentaView() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [notaVenta, setNotaVenta] = useState({
        id: "",
        fecha: "",
        precio_total: "",
        nombre_cliente: "",
        apellido_cliente: "",
        ci_cliente: "",
        metodo_pago: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadNotaVenta = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${URL_BACKEND}/notas-venta/${id}`);
                const data = await response.json();
                setNotaVenta(data["fecha"] ? {
                    ...data,
                    fecha: new Date(data["fecha"]).toLocaleDateString()
                } : {});
            } catch (error) {
                console.error("Error loading nota de venta:", error);
                setError("Error loading nota de venta");
            } finally {
                setLoading(false);
            }
        };

        loadNotaVenta();
    }, [id]);

    const generatePdf = async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);
        const { height } = page.getSize();

        page.drawText(`ID: ${notaVenta.id}`, { x: 50, y: height - 50, size: 15, color: rgb(0, 0, 0) });
        page.drawText(`Fecha: ${notaVenta.fecha}`, { x: 50, y: height - 80, size: 15, color: rgb(0, 0, 0) });
        page.drawText(`Precio Total: ${notaVenta.precio_total}`, { x: 50, y: height - 110, size: 15, color: rgb(0, 0, 0) });
        page.drawText(`Nombre Cliente: ${notaVenta.nombre_cliente}`, { x: 50, y: height - 140, size: 15, color: rgb(0, 0, 0) });
        page.drawText(`Apellido Cliente: ${notaVenta.apellido_cliente}`, { x: 50, y: height - 170, size: 15, color: rgb(0, 0, 0) });
        page.drawText(`CI Cliente: ${notaVenta.ci_cliente}`, { x: 50, y: height - 200, size: 15, color: rgb(0, 0, 0) });
        page.drawText(`Metodo de Pago: ${notaVenta.metodo_pago}`, { x: 50, y: height - 230, size: 15, color: rgb(0, 0, 0) });

        const pdfBytes = await pdfDoc.save();

        // Crear un enlace de descarga
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `nota-venta${notaVenta.id}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Nota de Venta
                        </Typography>
                        <Typography color="textSecondary">
                            ID: {notaVenta.id}
                        </Typography>
                        <Typography color="textSecondary">
                            Fecha: {notaVenta.fecha}
                        </Typography>
                        <Typography color="textSecondary">
                            Precio Total: {notaVenta.precio_total}
                        </Typography>
                        <Typography color="textSecondary">
                            Nombre Cliente: {notaVenta.nombre_cliente}
                        </Typography>
                        <Typography color="textSecondary">
                            Apellido Cliente: {notaVenta.apellido_cliente}
                        </Typography>
                        <Typography color="textSecondary">
                            CI Cliente: {notaVenta.ci_cliente}
                        </Typography>
                        <Typography color="textSecondary">
                            Metodo de Pago: {notaVenta.metodo_pago}
                        </Typography>
                        <Box mt={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={generatePdf}
                                style={{ marginRight: 16 }}
                            >
                                Generar PDF
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => navigate('/nota-venta-cliente')}
                            >
                                Volver
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
