import {
    Button, Card, CardContent, CircularProgress, Grid, TextField, Typography} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URL_BACKEND } from "../../../constants/routes";

export default function EmpleadoForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [cliente, setCliente] = useState({
        nombre: "",
        apellido: "",
        ci: "",
        telefono: "",
        fecha_nacimiento: "",
        id_rol: "",
        direccion: "",
        username: "",
    });

    const [loading, setLoading] = useState(false);
    const [loadingCliente, setLoadingCliente] = useState(false);
    const [error, setError] = useState(null);
    const [roles, setRoles] = useState([]);

    const handleChange = (e) => {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        const token = localStorage.getItem("accessToken");
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch(`${URL_BACKEND}/usuarios`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(cliente),
            });
            const data = await response.json();
            console.log(data);
            if (data.error) {
                setError(data.error);
                return;
            }
            navigate("/empleados");
        } catch (error) {
            console.error("Error saving empleado:", error);
            setError("Error saving empleado");
        } finally {
            setLoading(false);
        }
    };

    const loadRoles = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${URL_BACKEND}/roles`);
            const data = await response.json();
            console.log(data);
            setRoles(data);
            setLoading(false);
        } catch (error) {
            console.error("Error loading roles:", error);
            setLoading(false);
            setError("Error loading roles");
        }
    }

    useEffect(() => {
        loadRoles();
    }, []);

    useEffect(() => {
        if (id) {
            setLoadingCliente(true);
            const loadCliente = async () => {
                try {
                    const response = await fetch(`${URL_BACKEND}/usuarios/${id}`);
                    const data = await response.json();
                    setCliente(data);
                } catch (error) {
                    console.error("Error loading empleado:", error);
                    setError("Error loading empleado");
                } finally {
                    setLoadingCliente(false);
                }
            };
            loadCliente();
        }
    }, [id]);


    return (
        <Card>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    {id ? "Editar Empleado" : "Nuevo Empleado"}
                </Typography>
                {loadingCliente ? <CircularProgress /> : (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Nombre"
                                    name="nombre"
                                    value={cliente.nombre}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Apellido"
                                    name="apellido"
                                    value={cliente.apellido}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="CI"
                                    name="ci"
                                    value={cliente.ci}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Teléfono"
                                    name="telefono"
                                    value={cliente.telefono}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Dirección"
                                    name="direccion"
                                    value={cliente.direccion}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Username"
                                    name="username"
                                    value={cliente.username}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1" gutterBottom>
                                    Rol:
                                </Typography>
                                <TextField
                                    name="id_rol"
                                    value={cliente.id_rol}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    select
                                    SelectProps={{ native: true }}

                                >
                                    {roles.map((rol) => (
                                        <option key={rol.id} value={rol.id}>
                                            {rol.nombre}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1" gutterBottom>
                                    Fecha de Nacimiento:
                                </Typography>
                                <TextField
                                    name="fecha_nacimiento"
                                    value={cliente.fecha_nacimiento}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    type="date"
                                />
                            </Grid>
                            {/* Password */}
                            <TextField
                                label="Contraseña"
                                name="password"
                                value={cliente.password}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                                type="password"
                                sx={{ mt: 4,ml: 2 }}
                            />

                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={loading}
                                    sx={{ mr: 2 }}
                                >
                                    {loading ? <CircularProgress size={24} /> : "Guardar"}
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => navigate("/empleados")}
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