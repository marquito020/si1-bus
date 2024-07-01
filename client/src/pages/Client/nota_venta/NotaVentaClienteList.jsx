import { Button, Toolbar, Box, AppBar, Container, TextField, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_BACKEND } from "../../../constants/routes";
import { DataGrid } from '@mui/x-data-grid';
/* import { useSelector } from 'react-redux'; */

export default function NotaVentaClienteList() {
    const navigate = useNavigate();
    const [notaVentas, setNotaVentas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    /* const user = useSelector((state) => state.user); */

    const loadNotaVentas = async () => {
        setLoading(true);
        try {
            const userData = JSON.parse(localStorage.getItem('user'));
            const response = await fetch(`${URL_BACKEND}/notas-venta-cliente/${userData.id}`);
            const data = await response.json();
            console.log(data);
            setNotaVentas(data.map(notaVenta => ({
                ...notaVenta,
                fecha: new Date(notaVenta.fecha).toLocaleDateString()
            })));
        } catch (error) {
            setError('Error loading notas de venta');
            setLoading(false);
            console.error('Error loading notas de venta:', error);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'fecha', headerName: 'Fecha', width: 150 },
        { field: 'precio_total', headerName: 'Precio Total', width: 150 },
        { field: 'nombre_cliente', headerName: 'Cliente', width: 150 },
        { field: 'apellido_cliente', headerName: 'Apellido Cliente', width: 150 },
        { field: 'ci_cliente', headerName: 'CI Cliente', width: 150 },
        { field: 'metodo_pago', headerName: 'Metodo de Pago', width: 150 },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <strong>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 16 }}
                        onClick={() => navigate(`/notas-venta/${params.row.id}`)}
                    >
                        Detalles
                    </Button>
                </strong>
            ),
        }
    ];

    useEffect(() => {
        loadNotaVentas();
    }, []);

    const filteredNotaVentas = notaVentas.filter((notaVenta) =>
        notaVenta.id.toString().includes(searchTerm) ||
        notaVenta.fecha.includes(searchTerm) ||
        notaVenta.precio_total.toString().includes(searchTerm) ||
        notaVenta.nombre_cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notaVenta.apellido_cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notaVenta.ci_cliente.toString().includes(searchTerm) ||
        notaVenta.metodo_pago.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Box sx={{ flexFlow: 1 }}>
                <Container>
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
                                        borderRadius: '5px',
                                        width: '100%',
                                        marginRight: '10px',
                                    }}
                                />
                            </Toolbar>
                        </Container>
                    </AppBar>
                    {/* <Box sx={{ height: 400, width: '100%' }}> */}
                        <DataGrid
                            rows={filteredNotaVentas}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            loading={loading}
                            disableSelectionOnClick
                            onRowClick={(row) => navigate(`/notas-venta/${row.row.id}`)}
                        />
                    {/* </Box> */}
                    {error && (
                        <Container sx={{ mt: 2 }}>
                            <Alert severity="error">{error}</Alert>
                        </Container>
                    )}
                </Container>
            </Box>
        </>
    );

}
