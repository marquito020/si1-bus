import { Button, Toolbar, Box, AppBar, Container, TextField, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_BACKEND } from "../../../constants/routes";
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from "react-redux";

export default function CompraCliente() {
    const navigate = useNavigate();
    const [boletas, setBoletas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const user = useSelector((state) => state.user);

    const loadBoletas = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${URL_BACKEND}/boletos/cliente/${user.id || user.user.id}`);
            const data = await response.json();
            console.log(data);
            setBoletas(data.map(boleto => ({
                ...boleto,
                fecha: new Date(boleto.fecha).toLocaleDateString()
            })));
        } catch (error) {
            setError('Error loading boletas');
            setLoading(false);
            console.error('Error loading boletas:', error);
        } finally {
            setLoading(false);
        }
    };

    /* const handleDelete = async (id) => {
        try {
            await fetch(`${URL_BACKEND}/boletos/${id}`, {
                method: "DELETE",
            });
            setBoletas(boletas.filter((boleto) => boleto.id !== id));
        } catch (error) {
            console.error('Error deleting boleto:', error);
            setError('Error deleting boleto');
        }
    }; */

    useEffect(() => {
        loadBoletas();
    }, []);

    const filteredBoletas = boletas.filter((boleto) =>
        boleto.id.toString().includes(searchTerm) ||
        boleto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        boleto.fecha.includes(searchTerm) ||
        boleto.hora_salida.includes(searchTerm) ||
        boleto.hora_llegada.includes(searchTerm) ||
        boleto.placa_flota.includes(searchTerm) ||
        boleto.numero.includes(searchTerm) ||
        boleto.precio.toString().includes(searchTerm)
    );

    return (
        <>
            <Box sx={{ flexFlow: 1 }}>
                <AppBar position="static" color="primary" sx={
                    {
                        borderRadius: 1,
                    }
                }>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate('/boleto-cliente')}
                    >
                        Comprar boleto
                    </Button>
                    <Container>
                        <Toolbar>
                            <TextField
                                variant="outlined"
                                placeholder="Buscar boleta..."
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
                {/* <Container sx={{ mt: 2 }}> */}
                <DataGrid
                    rows={filteredBoletas}
                    columns={[
                        { field: 'id', headerName: 'Código', width: 150 },
                        { field: 'fecha', headerName: 'Fecha', width: 150 },
                        { field: 'precio', headerName: 'Precio', width: 150 },
                        { field: 'nombre', headerName: 'Cliente', width: 150 },
                        { field: 'hora_salida', headerName: 'Hora Salida', width: 150 },
                        { field: 'hora_llegada', headerName: 'Hora Llegada', width: 150 },
                        { field: 'placa_flota', headerName: 'Placa Flota', width: 150 },
                        { field: 'numero', headerName: 'Número Asiento', width: 150 },
                        {
                            field: 'acciones',
                            headerName: 'Acciones',
                            width: 250,
                            renderCell: (params) => (
                                <>
                                    {/* Ver */}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => navigate(`/boleto-cliente/${params.row.id}`)}
                                        style={{ marginRight: 8 }}
                                    >
                                        Ver
                                    </Button>
                                    {/* <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDelete(params.row.id)}
                                    >
                                        Eliminar
                                    </Button> */}
                                </>
                            ),
                        },
                    ]}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    loading={loading}
                />
                {/* </Container> */}
            </Box>
        </>
    );
}