import { useState, useEffect } from "react";
import {
    Button, Card, CardContent, CircularProgress, Grid, Typography, Box, TextField, MenuItem
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { URL_BACKEND } from "../../constants/routes";
import { useSelector } from "react-redux";
import {
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

export default function BoletoClienteForm() {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { cod } = useParams();
    const user = useSelector((state) => state.user.id);
    const [boleto, setBoleto] = useState({
        precio: "",
        cod_viaje: "",
        id_cliente: user,
        id_asiento: [],
        id_metodo_pago: "",
    });

    const [loading, setLoading] = useState(false);
    const [loadingBoleto, setLoadingBoleto] = useState(false);
    const [loadingAsientos, setLoadingAsientos] = useState(false);
    const [error, setError] = useState(null);
    const [viaje, setViaje] = useState([]);
    const [asientos, setAsiento] = useState([]);
    const [metodoPago, setMetodoPago] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [asientosOcupados, setAsientosOcupados] = useState([]);
    /* const [errorMessage, setErrorMessage] = useState(''); */

    const handleChange = (e) => {
        setBoleto({
            ...boleto,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelectChange = async (e) => {
        setLoadingAsientos(true);
        setBoleto({
            ...boleto,
            cod_viaje: e.target.value,
            precio: viaje.find((v) => v.cod === e.target.value).precio,
        });
        await fetch(`${URL_BACKEND}/asientos/viaje/${e.target.value}`)
            .then(res => res.json())
            .then(data => setAsiento(data));

        await fetch(`${URL_BACKEND}/asientos/viaje/${e.target.value}/boleto`)
            .then(res => res.json())
            .then(data => setAsientosOcupados(data));
        setLoadingAsientos(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (boleto.id_metodo_pago === 2 || boleto.id_metodo_pago === 3) {
            if (!stripe || !elements) {
                setError("Stripe.js has not loaded yet.");
                return;
            }

            // Call elements.submit() first
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
                const response = await fetch(`${URL_BACKEND}/boletos/cliente`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({ ...boleto, id_asiento: selectedSeats, clientSecret }),
                });
                const data = await response.json();
                if (response.status === 201) {
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
                setError("Error saving boleto");
            } finally {
                setLoading(false);
            }

            setLoading(true);
            /* await saveBoleto(clientSecret); */
        } else {
            /* await saveBoleto(); */
            setLoading(true);
            const token = localStorage.getItem("accessToken");
            try {
                const response = await fetch(`${URL_BACKEND}/boletos/cliente`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({ ...boleto, id_asiento: selectedSeats }),
                });
                const data = await response.json();
                if (response.status === 201) {
                    const notaVenta = data.nota_venta;
                    navigate("/nota-venta-cliente/" + notaVenta.id);
                } else {
                    setError(data.message);
                }

            } catch (error) {
                setError("Error saving boleto");
            } finally {
                setLoading(false);
            }
        }
    };

    /* const saveBoleto = async (paymentIntentId) => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await fetch(`${URL_BACKEND}/boletos/cliente`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ ...boleto, id_asiento: selectedSeats, paymentIntentId }),
            });
            const data = await response.json();
            if (response.status === 201) {
                const notaVenta = data.nota_venta;
                navigate("/nota-venta-cliente/" + notaVenta.id);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("Error saving boleto");
        } finally {
            setLoading(false);
        }
    }; */

    useEffect(() => {
        if (cod) {
            setLoadingBoleto(true);
            const loadBoleto = async () => {
                try {
                    const response = await fetch(`${URL_BACKEND}/boletos/${cod}`);
                    const data = await response.json();
                    setBoleto(data);
                } catch (error) {
                    setError("Error loading boleto");
                } finally {
                    setLoadingBoleto(false);
                }
            };
            loadBoleto();
        }
    }, [cod]);

    useEffect(() => {
        fetch(`${URL_BACKEND}/viajes`)
            .then(res => res.json())
            .then(data => setViaje(data));
    }, []);

    useEffect(() => {
        fetch(`${URL_BACKEND}/metodos-pago`)
            .then(res => res.json())
            .then(data => setMetodoPago(data));
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
                                onClick={() => navigate("/home-cliente")}
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
                                    <MenuItem key={v.cod} value={v.cod}>
                                        {v.cod + " - " + "Fecha: " + v.fecha.substring(0, 10) + " - " + "Hora Salida: " + v.hora_salida + " - " + "Hora Llegada: " + v.hora_llegada + " - " + "Lugar Origen: " + v.lugar_origen + " - " + "Lugar Destino: " + v.lugar_destino}
                                    </MenuItem>
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
                            {(boleto.id_metodo_pago === 2 || boleto.id_metodo_pago === 3) && (
                                <Box sx={{ mt: 2 }}>
                                    <PaymentElement />
                                </Box>
                            )}
                            {loadingAsientos ? <CircularProgress /> : (
                                <Grid container spacing={2}>
                                    <Grid item xs={1}>
                                        <Typography variant="subtitle1" align="center">
                                            Ventanilla
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        {asientos.filter((_, index) => index % 3 === 0).map((asiento, index) => (
                                            <Box
                                                key={index}
                                                onClick={() => asientosOcupados.find((a) => a.id === asiento.id) ? null : toggleSeatSelection(asiento.id)}
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
                                                <Typography variant="body1">{asientosOcupados.find((a) => a.id === asiento.id) ? "Ocupado" : "Disponible"}</Typography>
                                            </Box>
                                        ))}
                                    </Grid>
                                    <Grid item xs={1} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                        <Box sx={{ height: "100%", textAlign: "center", padding: "16px" }}>
                                            <Typography variant="h6">Pasillo</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid container spacing={2}>
                                            {asientos.filter((_, index) => index % 3 !== 0).map((asiento, index) => (
                                                <Grid item xs={6} key={index}>
                                                    <Box
                                                        onClick={() => asientosOcupados.find((a) => a.id === asiento.id) ? null : toggleSeatSelection(asiento.id)}
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
