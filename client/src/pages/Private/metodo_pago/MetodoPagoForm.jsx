import {
    Button, Card, CardContent, CircularProgress, Grid, TextField, Typography} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URL_BACKEND } from "../../../constants/routes";

export default function MetodoPagoForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [metodoPago, setMetodoPago] = useState({
        id: "",
        tipo: "",
    });

    const [loading, setLoading] = useState(false);
    const [loadingMetodoPago, setLoadingMetodoPago] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMetodoPago({
            ...metodoPago,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (id) {
                await fetch(`${URL_BACKEND}/metodos-pago/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(metodoPago),
                });
            } else {
                await fetch(`${URL_BACKEND}/metodos-pago`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(metodoPago),
                });
            }
            navigate("/metodos-pago");
        } catch (error) {
            console.error("Error saving metodo de pago:", error);
            setError("Error saving metodo de pago");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            setLoadingMetodoPago(true);
            fetch(`${URL_BACKEND}/metodos-pago/${id}`)
                .then(response => response.json())
                .then(data => {
                    setMetodoPago(data);
                })
                .catch(error => {
                    console.error('Error loading metodo de pago:', error);
                    setError('Error loading metodo de pago');
                })
                .finally(() => {
                    setLoadingMetodoPago(false);
                });
        }
    }, [id]);

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {id ? 'Editar' : 'Nuevo'} Método de Pago
                </Typography>
                {loadingMetodoPago ? <CircularProgress /> :
                    (
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                <TextField
                                    name="tipo"
                                    label="Tipo"
                                    value={metodoPago.tipo}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                />
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={loading}
                                        sx={{ mr: 2 }}
                                    >
                                        {loading ? <CircularProgress size={24} /> : 'Guardar'}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => navigate("/metodos-pago")}
                                        disabled={loading}
                                    >
                                        Cancelar
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                {error && <Typography color="error">{error}</Typography>}
            </CardContent>
        </Card>
    );
}