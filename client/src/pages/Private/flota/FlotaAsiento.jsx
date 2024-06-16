import {
    Button, Card, CardContent, CircularProgress, Grid, Typography, Box, TextField
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URL_BACKEND } from "../../../constants/routes";

export default function FlotaAsiento() {
    const navigate = useNavigate();
    const { placa } = useParams();
    const [asientos, setAsientos] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [selectedSeatDetails, setSelectedSeatDetails] = useState({ numero: '', estado: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAsientos = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${URL_BACKEND}/asientos/${placa}`);
                const data = await response.json();
                console.log(data);
                setAsientos(data);
            } catch (error) {
                console.error("Error loading asientos:", error);
                setError("Error loading asientos");
            } finally {
                setLoading(false);
            }
        };

        if (placa) {
            loadAsientos();
        }
    }, [placa]);

    const toggleSeatSelection = (asiento) => {
        if (selectedSeat === asiento.numero) {
            setSelectedSeat(null);
            setSelectedSeatDetails({ numero: '', estado: '' });
        } else {
            setSelectedSeat(asiento.numero);
            setSelectedSeatDetails({ numero: asiento.numero, estado: asiento.estado });
        }
    };

    const handleChange = (e) => {
        setSelectedSeatDetails({
            ...selectedSeatDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${URL_BACKEND}/asientos/${placa}/${selectedSeatDetails.numero}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ estado: selectedSeatDetails.estado }),
            });
            const updatedAsiento = await response.json();
            setAsientos(asientos.map(asiento => asiento.numero === updatedAsiento.numero ? updatedAsiento : asiento));
            setSelectedSeat(null);
            setSelectedSeatDetails({ numero: '', estado: '' });
        } catch (error) {
            console.error("Error updating asiento:", error);
            setError("Error updating asiento");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid container justifyContent="center">
            <Card>
                <CardContent>
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-inherit' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => navigate("/flotas")}
                        >
                            Volver
                        </Button>
                    </Box>
                    <Typography variant="h4" gutterBottom>
                        Asientos de la Flota {placa}
                    </Typography>
                    {loading ? (
                        <CircularProgress />
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : (
                        <Grid container spacing={2}>
                            {/* Window on the left side */}
                            <Grid item xs={1}>
                                <Typography variant="subtitle1" align="center">
                                    Ventanilla
                                </Typography>
                            </Grid>

                            {/* First Column */}
                            <Grid item xs={3}>
                                {asientos.filter((_, index) => index % 3 === 0).map((asiento, index) => (
                                    <Box
                                        key={index}
                                        onClick={() => toggleSeatSelection(asiento)}
                                        sx={{
                                            border: "1px solid gray",
                                            borderRadius: "4px",
                                            padding: "16px",
                                            textAlign: "center",
                                            marginBottom: "32px",
                                            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                                            backgroundColor: selectedSeat === asiento.numero ? "lightblue" : "white",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <Typography variant="h6">Asiento {asiento.numero}</Typography>
                                        <Typography variant="body1">{asiento.estado}</Typography>
                                    </Box>
                                ))}
                            </Grid>

                            {/* Aisle */}
                            <Grid item xs={1} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <Box sx={{ height: "100%", textAlign: "center", padding: "16px" }}>
                                    <Typography variant="h6">Pasillo</Typography>
                                </Box>
                            </Grid>

                            {/* Second and Third Columns */}
                            <Grid item xs={6}>
                                <Grid container spacing={2}>
                                    {asientos.filter((_, index) => index % 3 !== 0).map((asiento, index) => (
                                        <Grid item xs={6} key={index}>
                                            <Box
                                                onClick={() => toggleSeatSelection(asiento)}
                                                sx={{
                                                    border: "1px solid gray",
                                                    borderRadius: "4px",
                                                    padding: "16px",
                                                    textAlign: "center",
                                                    marginBottom: "16px",
                                                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                                                    backgroundColor: selectedSeat === asiento.numero ? "lightblue" : "white",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                <Typography variant="h6">Asiento {asiento.numero}</Typography>
                                                <Typography variant="body1">{asiento.estado}</Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>

                            {/* Window on the right side */}
                            <Grid item xs={1}>
                                <Typography variant="subtitle1" align="center">
                                    Ventanilla
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                    {selectedSeat && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h5" gutterBottom>
                                Editar Asiento {selectedSeat}
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Estado"
                                    name="estado"
                                    value={selectedSeatDetails.estado}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} /> : "Guardar"}
                                </Button>
                            </form>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Grid>
    );
}
