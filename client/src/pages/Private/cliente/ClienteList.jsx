import { CardContent, Card, Typography, Button, Toolbar, AppBar, Container, TextField, Grid, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutes, URL_BACKEND } from "../../../constants/routes";
import { DataGrid } from '@mui/x-data-grid';


export default function ClienteList() {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadClientes = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${URL_BACKEND}/clientes`);
            const data = await response.json();
            console.log(data);
            setClientes(data.map(cliente => ({
                ...cliente,
                fecha_nacimiento: new Date(cliente.fecha_nacimiento).toLocaleDateString()
            })));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError('Error loading clientes');
            console.error('Error loading clientes:', error);
        }
    };

    /* const handleDelete = async (cod) => {
        try {
            await fetch(`${URL_BACKEND}/clientes/${cod}`, {
                method: "DELETE",
            });
            setClientes(clientes.filter((cliente) => cliente.cod !== cod));
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (cod) => {
        navigate("/clientes/edit/" + cod);
    }; */

    useEffect(() => {
        loadClientes();
    }, []);

    const filteredClientes = clientes.filter((cliente) =>
        cliente.id.toString().includes(searchTerm) ||
        cliente.nombre.includes(searchTerm) ||
        cliente.apellido.includes(searchTerm) ||
        cliente.ci.includes(searchTerm) ||
        cliente.telefono.includes(searchTerm) ||
        cliente.fecha_nacimiento.includes(searchTerm)
    );

    const columns = [
        { field: 'nombre', headerName: 'Nombre', width: 150 },
        { field: 'apellido', headerName: 'Apellido', width: 150 },
        { field: 'ci', headerName: 'CI', width: 150 },
        { field: 'telefono', headerName: 'Teléfono', width: 150 },
        { field: 'fecha_nacimiento', headerName: 'Fecha de Nacimiento', width: 200 },
        /* {
            field: 'action',
            headerName: 'Acción',
            width: 290,
            renderCell: (params) => (
                <strong>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Eliminar
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(params.row.id)}
                        style={{ marginLeft: 10 }}
                    >
                        Editar
                    </Button>
                </strong>
            ),
        }, */
    ];

    return (
        <>
           {/*  <Box sx={{ flexFlow: 1 }}>
                <Container> */}
                    <AppBar position="static" color="primary">
                        <Container>
                            <Toolbar>
                                <TextField
                                    variant="outlined"
                                    placeholder="Buscar por Código, Nombre, Apellido, CI, Teléfono, Fecha de Nacimiento"
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
                                    onClick={() => navigate(PrivateRoutes.CLIENTES_CREATE)}
                                    sx={{
                                        textDecoration: 'none',
                                    }}
                                >
                                    Crear Cliente
                                </Button>
                            </Toolbar>
                        </Container>
                    </AppBar>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        Listado de Clientes
                                    </Typography>
                                    {error ? (
                                        <Container sx={{ mt: 2 }}>
                                            <Alert severity="error">{error}</Alert>
                                        </Container>
                                    ) : (
                                        <DataGrid
                                            rows={filteredClientes}
                                            columns={columns}
                                            loading={loading}
                                            pageSize={5}
                                            rowsPerPageOptions={[5]}
                                            checkboxSelection
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                {/* </Container>
            </Box> */}
        </>
    );

}