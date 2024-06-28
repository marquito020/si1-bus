import { Button, Toolbar, Box, AppBar, Container, TextField, Alert, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_BACKEND } from "../../../constants/routes";
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from "react-redux";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function ReservaCliente() {
    const navigate = useNavigate();
    const [reservas, setReservas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const user = useSelector((state) => state.user);

    const loadReservas = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${URL_BACKEND}/reservas/cliente/${user.id || user.user.id}`);
            const data = await response.json();
            console.log(data);
            setReservas(data.map(reserva => ({
                ...reserva,
                fecha: new Date(reserva.fecha).toLocaleDateString()
            })));
        } catch (error) {
            setError('Error loading reservas');
            setLoading(false);
            console.error('Error loading reservas:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReservas();
    }, []);

    const filteredReservas = reservas.filter((reserva) =>
        reserva.id.toString().includes(searchTerm) ||
        reserva.nombre_cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reserva.fecha.includes(searchTerm) ||
        reserva.hora_salida.includes(searchTerm) ||
        reserva.hora_llegada.includes(searchTerm) ||
        reserva.placa_flota.includes(searchTerm) ||
        reserva.numero_asiento.includes(searchTerm) ||
        reserva.precio.toString().includes(searchTerm)
    );

    return (
        <>
            <Box sx={{ flexFlow: 1 }}>
                <AppBar position="static" color="primary" sx={{ borderRadius: 1 }}>
                    <Container>
                        <Toolbar>
                            <TextField
                                variant="outlined"
                                placeholder="Buscar reserva..."
                                onChange={(e) => setSearchTerm(e.target.value)}
                                value={searchTerm}
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: 1,
                                    mr: 2,
                                    width: '100%',
                                }}
                            />
                        </Toolbar>
                    </Container>
                </AppBar>
                {error && (
                    <Container sx={{ mt: 2 }}>
                        <Alert severity="error">{error}</Alert>
                    </Container>
                )}
                <DataGrid
                    rows={filteredReservas}
                    columns={[
                        { field: 'id', headerName: 'Código', width: 150 },
                        { field: 'fecha', headerName: 'Fecha', width: 150 },
                        { field: 'precio', headerName: 'Precio', width: 150 },
                        { field: 'nombre_cliente', headerName: 'Cliente', width: 150 },
                        { field: 'hora_salida', headerName: 'Hora Salida', width: 150 },
                        { field: 'hora_llegada', headerName: 'Hora Llegada', width: 150 },
                        { field: 'placa_flota', headerName: 'Placa Flota', width: 150 },
                        { field: 'numero_asiento', headerName: 'Número Asiento', width: 150 },
                        {
                            field: 'acciones',
                            headerName: 'Acciones',
                            width: 250,
                            renderCell: (params) => (
                                <>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => navigate(`/reservas/${params.row.id}`)}
                                        style={{ marginRight: 8 }}
                                    >
                                        Ver
                                    </Button>
                                </>
                            ),
                        },
                    ]}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    loading={loading}
                />
            </Box>
            <Fab 
                color="secondary" 
                aria-label="add" 
                onClick={() => navigate('/reservas/new')}
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                <AddShoppingCartIcon />
            </Fab>
        </>
    );
}
