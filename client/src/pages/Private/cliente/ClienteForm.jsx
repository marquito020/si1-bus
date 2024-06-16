import {
    Button, Card, CardContent, CircularProgress, Grid, TextField, Typography, Box
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URL_BACKEND } from "../../../constants/routes";

export default function ClienteForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [cliente, setCliente] = useState({
        nombre: "",
        apellido: "",
        ci: "",
        telefono: "",
        fecha_nacimiento: "",
    });

    const [loading, setLoading] = useState(false);
    const [loadingCliente, setLoadingCliente] = useState(true);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch(`${URL_BACKEND}/clientes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cliente),
            });
            const data = await response.json();
            console.log(data);
            navigate("/clientes");
        } catch (error) {
            console.error("Error saving cliente:", error);
            setError("Error saving cliente");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            setLoadingCliente(true);
            const loadCliente = async () => {
                try {
                    const response = await fetch(`${URL_BACKEND}/clientes/${id}`);
                    const data = await response.json();
                    setCliente(data["fecha_nacimiento"] ? {
                        ...data,
                        fecha_nacimiento: new Date(data["fecha_nacimiento"]).toISOString().split("T")[0],
                    } : data);
                    setLoadingCliente(false);
                } catch (error) {
                    console.error("Error loading cliente:", error);
                    setLoadingCliente(false);
                    setError("Error loading cliente");
                }
            };
            loadCliente();
        }
    }, [id]);

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            {id ? "Editar Cliente" : "Nuevo Cliente"}
                        </Typography>
                        {loadingCliente ? <CircularProgress /> : (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Nombre"
                                    name="nombre"
                                    value={cliente.nombre}
                                    onChange={handleChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    label="Apellido"
                                    name="apellido"
                                    value={cliente.apellido}
                                    onChange={handleChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    label="CI"
                                    name="ci"
                                    value={cliente.ci}
                                    onChange={handleChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    label="Teléfono"
                                    name="telefono"
                                    value={cliente.telefono}
                                    onChange={handleChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                                <div style={{ marginTop: 16 }}>
                                    <div>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Fecha de Nacimiento:
                                        </Typography>
                                    </div>
                                    <TextField
                                        type="date"
                                        name="fecha_nacimiento"
                                        value={cliente.fecha_nacimiento}
                                        onChange={handleChange}
                                        variant="outlined"
                                        margin="normal"
                                        style={{ width: "100%", marginTop: 0 }}
                                        fullWidth
                                    />
                                </div>
                                <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                                    {/* Guardar */}
                                    <Box sx={{ mt: 2 }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            disabled={loading}
                                        >
                                            {loading ? <CircularProgress size={24} /> : (
                                                id ? "Actualizar" : "Guardar"
                                            )}
                                        </Button>
                                    </Box>
                                    {/* Volver */}
                                    <Box sx={{ mt: 2 }}>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => navigate("/clientes")}
                                        >
                                            Volver
                                        </Button>
                                    </Box>
                                </Box>
                            </form>
                        )}
                        {error && <Typography color="error">{error}</Typography>}
                    </CardContent>
                </Card>

            </Grid>
        </Grid>
    );
}
