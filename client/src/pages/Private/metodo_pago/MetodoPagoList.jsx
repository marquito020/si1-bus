import { Button, Toolbar, Box, AppBar, Container, TextField, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_BACKEND } from "../../../constants/routes";
import { DataGrid } from '@mui/x-data-grid';

export default function MetodoPagoList() {
    const navigate = useNavigate();
    const [metodosPago, setMetodosPago] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadMetodosPago = async () => {
        try {
            const response = await fetch(`${URL_BACKEND}/metodos-pago`);
            const data = await response.json();
            setMetodosPago(data);
        } catch (error) {
            setError('Error loading metodos de pago');
            console.error('Error loading metodos de pago:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`${URL_BACKEND}/metodos-pago/${id}`, {
                method: "DELETE",
            });
            setMetodosPago(metodosPago.filter((metodoPago) => metodoPago.id !== id));
        } catch (error) {
            console.error('Error deleting metodo de pago:', error);
            setError('Error deleting metodo de pago');
        }
    };

    useEffect(() => {
        loadMetodosPago();
    }, []);

    const filteredMetodosPago = metodosPago.filter((metodoPago) =>
        metodoPago.id.toString().includes(searchTerm)
    );

    return (
        <>
            <Box sx={{ flexFlow: 1 }}>
                <Container sx={{ mt: 2 }}>
                    <AppBar position="static" color="primary">
                        <Container>
                            <Toolbar>
                                <TextField
                                    variant="outlined"
                                    placeholder="Buscar por ID"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    value={searchTerm}
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: 1,
                                        mr: 2,
                                        width: { xs: '100%', sm: 'auto' }
                                    }}
                                    />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => navigate('/metodos-pago/new')}
                                >
                                    Crear Metodo de Pago
                                </Button>
                            </Toolbar>
                        </Container>
                    </AppBar>
                    {error && (
                        <Container sx={{ mt: 2 }}>
                            <Alert severity="error">{error}</Alert>
                        </Container>
                    )}
                    <DataGrid
                        rows={filteredMetodosPago}
                        columns={[
                            { field: 'id', headerName: 'ID', width: 90 },
                            { field: 'tipo', headerName: 'Tipo', width: 150 },

                            {
                                field: 'actions',
                                headerName: 'Acciones',
                                width: 250,
                                renderCell: (params) => (
                                    <strong>
                                        {/* Editar */}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => navigate(`/metodos-pago/edit/${params.row.id}`)}
                                            style={{ marginRight: 8 }}
                                        >
                                            Editar
                                        </Button>
                                        {/* Eliminar */}
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleDelete(params.row.id)}
                                        >
                                            Eliminar
                                        </Button>
                                    </strong>
                                ),
                            },
                        ]}
                        getRowId={(row) => row.id}
                        loading={loading}
                        pageSize={5}
                    />
                </Container>
            </Box>
        </>
    );
}
