import {
    Button, Card, CardContent, CircularProgress, Grid, Typography, Box, TextField,
    MenuItem
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URL_BACKEND } from "../../../constants/routes";

export default function BoletoForm() {
    const navigate = useNavigate();
    const { cod } = useParams();
    const [boleto, setBoleto] = useState({
        precio: "",
        cod_viaje: "",
        id_cliente: "",
        id_asiento: [],
        id_metodo_pago: "",
    });

    const [loading, setLoading] = useState(false);
    const [loadingBoleto, setLoadingBoleto] = useState(false);
    const [loadingAsientos, setLoadingAsientos] = useState(false);
    const [error, setError] = useState(null);
    const [viaje, setViaje] = useState([]);
    const [cliente, setCliente] = useState([]);
    const [asientos, setAsiento] = useState([]);
    const [metodoPago, setMetodoPago] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [asientosOcupados, setAsientosOcupados] = useState([]);

    const handleChange = (e) => {
        setBoleto({
            ...boleto,
            [e.target.name]: e.target.value,
        });
    }

    const handleSelectChange = async (e) => {
        setLoadingAsientos(true);
        console.log(e.target.value);
        setBoleto({
            ...boleto,
            cod_viaje: e.target.value,
            precio: viaje.find((v) => v.cod === e.target.value).precio,
        });
        await fetch(`${URL_BACKEND}/asientos/viaje/${e.target.value}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAsiento(data);
            });

        await fetch(`${URL_BACKEND}/asientos/viaje/${e.target.value}/boleto`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAsientosOcupados(data);
            });
        setLoadingAsientos(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("accessToken");
        try {
            setLoading(true);
            console.log({ ...boleto, id_asiento: selectedSeats });
            const response = await fetch(`${URL_BACKEND}/boletos`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ ...boleto, id_asiento: selectedSeats }),
            });
            const data = await response.json();
            console.log(data);
            if (response.status === 201) {
                const notaVenta = data.nota_venta;
                navigate("/notas-venta/" + notaVenta.id);
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error("Error saving boleto:", error);
            setError("Error saving boleto");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (cod) {
            setLoadingBoleto(true);
            const loadBoleto = async () => {
                try {
                    const response = await fetch(`${URL_BACKEND}/boletos/${cod}`);
                    const data = await response.json();
                    setBoleto(data);
                } catch (error) {
                    console.error("Error loading boleto:", error);
                    setError("Error loading boleto");
                } finally {
                    setLoadingBoleto(false);
                }
            }
            loadBoleto();
        }
    }, [cod]);

    useEffect(() => {
        fetch(`${URL_BACKEND}/viajes`)
            .then(res => res.json())
            .then(data => setViaje(data));
    }, []);

    useEffect(() => {
        fetch(`${URL_BACKEND}/clientes`)
            .then(res => res.json())
            .then(data => setCliente(data));
    }, []);

    useEffect(() => {
        fetch(`${URL_BACKEND}/metodos-pago`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setMetodoPago(data);
            });
    }, []);

    const toggleSeatSelection = (numero) => {
        setSelectedSeats(prevSelectedSeats =>
            prevSelectedSeats.includes(numero)
                ? prevSelectedSeats.filter(seat => seat !== numero)
                : [...prevSelectedSeats, numero]
        );
    };

    return (
        <Grid container justifyContent="center">
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-inherit' }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => navigate("/boletos")}
                            >
                                Volver
                            </Button>
                        </Box>
                        {cod ? "Editar" : "Nuevo"} Boleto
                    </Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    {loadingBoleto || loading ? (
                        <CircularProgress />
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Precio"
                                name="precio"
                                type="number"
                                value={boleto.precio}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                                disabled
                            />
                            <TextField
                                label="Viaje"
                                name="cod_viaje"
                                select
                                value={boleto.cod_viaje}
                                onChange={handleSelectChange}
                                fullWidth
                                margin="normal"
                                required
                            >
                                {viaje.map((v) => (
                                    // <MenuItem key={v.cod} value={v.cod}>
                                    //     {v.cod + " - " + "Fecha: " + v.fecha.substring(0, 10) + " - " + "Hora Salida: " + v.hora_salida + " - " + "Hora Llegada: " + v.hora_llegada + " - " + "Lugar Origen: " + v.lugar_origen + " - " + "Lugar Destino: " + v.lugar_destino}
                                    // </MenuItem>
                                    v.status === true ? (
                                        <MenuItem key={v.cod} value={v.cod}>
                                            {v.cod + " - " + "Fecha: " + v.fecha.substring(0, 10) + " - " + "Hora Salida: " + v.hora_salida + " - " + "Hora Llegada: " + v.hora_llegada + " - " + "Lugar Origen: " + v.lugar_origen + " - " + "Lugar Destino: " + v.lugar_destino}
                                        </MenuItem>
                                    ) : null
                                ))}
                            </TextField>
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
                            <TextField
                                label="Cliente"
                                name="id_cliente"
                                select
                                value={boleto.id_cliente}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                            >
                                {cliente.map((c) => (
                                    <MenuItem key={c.id} value={c.id}>
                                        {c.nombre}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {loadingAsientos ? <CircularProgress /> : (
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
                                                /* onClick={() => toggleSeatSelection(asiento.id)} */
                                                onClick={() => asientosOcupados.find((a) => a.id === asiento.id) ? null :
                                                    toggleSeatSelection(asiento.id)}
                                                sx={{
                                                    border: "1px solid gray",
                                                    borderRadius: "4px",
                                                    padding: "16px",
                                                    textAlign: "center",
                                                    marginBottom: "32px",
                                                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                                                    backgroundColor: selectedSeats.includes(asiento.id) ? "lightblue" : "white",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                <Typography variant="h6">Asiento {asiento.numero}</Typography>
                                                <Typography variant="body1">{
                                                    asientosOcupados.find((a) => a.id === asiento.id)
                                                        ? "Ocupado"
                                                        : "Disponible"
                                                }</Typography>
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
                                                        onClick={() => asientosOcupados.find((a) => a.id === asiento.id) ? null :
                                                            toggleSeatSelection(asiento.id)}
                                                        sx={{
                                                            border: "1px solid gray",
                                                            borderRadius: "4px",
                                                            padding: "16px",
                                                            textAlign: "center",
                                                            marginBottom: "16px",
                                                            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                                                            backgroundColor: selectedSeats.includes(asiento.id) ? "lightblue" : "white",
                                                            cursor: "pointer"
                                                        }}
                                                    >
                                                        <Typography variant="h6">Asiento {asiento.numero}</Typography>
                                                        <Typography variant="body1">{asientosOcupados.find((a) => a.id === asiento.id) ? "Ocupado" : "Disponible"}</Typography>
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
                            <Box mt={2}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={loading}
                                >
                                    Guardar
                                </Button>
                            </Box>
                        </form>
                    )}
                </CardContent>
            </Card>
        </Grid>
    );
}
