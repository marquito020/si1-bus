import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URL_BACKEND } from "../../../constants/routes";

export default function RolForm() {
    const [rol, setRol] = useState({
        id: "",
        nombre: "",
    });

    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();
    const params = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRol({
            ...rol,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editing) {
                await fetch(`${URL_BACKEND}/roles/${params.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(rol),
                });
                setEditing(false);
                navigate("/roles");
            } else {
                try {
                    await fetch(`${URL_BACKEND}/roles`, {
                        method: "POST",
                        body: JSON.stringify(rol),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                } catch (error) {
                    console.error("Error submitting form:", error);
                } finally {
                    setLoading(false);
                    navigate("/roles");
                }
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setLoading(false);
        }
    };

    const loadRol = async (id) => {
        const res = await fetch(`${URL_BACKEND}/roles/${id}`);
        const data = await res.json();
        setRol({ id: data.id, nombre: data.nombre });
    };

    useEffect(() => {
        if (params.id) {
            loadRol(params.id);
            setEditing(true);
        }
    }, [params.id]);

    return (
        <Card>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    {editing ? "Edit Rol" : "New Rol"}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="nombre"
                                label="Nombre"
                                variant="outlined"
                                value={rol.nombre}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : "Save"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
}