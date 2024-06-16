import { Button, Toolbar, Box, AppBar, Container, TextField, Alert, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_BACKEND } from "../../../constants/routes";
import { DataGrid } from '@mui/x-data-grid';

export default function RolList() {
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadRoles = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${URL_BACKEND}/roles`);
            const data = await response.json();
            setRoles(data.map(rol => ({
                ...rol,
                fecha: new Date(rol.fecha).toLocaleDateString()
            })));
        } catch (error) {
            setError('Error loading roles');
            setLoading(false);
            console.error('Error loading roles:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`${URL_BACKEND}/roles/${id}`, {
                method: "DELETE",
            });
            setRoles(roles.filter((rol) => rol.id !== id));
        } catch (error) {
            console.error('Error deleting rol:', error);
            setError('Error deleting rol');
        }
    };

    useEffect(() => {
        loadRoles();
    }, []);

    const filteredRoles = roles.filter((rol) =>
        rol.id.toString().includes(searchTerm) ||
        rol.nombre.toLowerCase().includes(searchTerm.toLowerCase())
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
                                    placeholder="Search..."
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    value={searchTerm}
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: '5px',
                                        width: '300px',
                                        marginRight: '10px'
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => navigate('/roles/new')}
                                >
                                    Add Rol
                                </Button>
                            </Toolbar>
                        </Container>
                    </AppBar>
                    {error && <Alert severity="error">{error}</Alert>}
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <DataGrid
                            rows={filteredRoles}
                            columns={[
                                { field: 'id', headerName: 'ID', width: 70 },
                                { field: 'nombre', headerName: 'Nombre', width: 350 },
                                {
                                    field: 'acciones',
                                    headerName: 'Acciones',
                                    width: 300,
                                    renderCell: (params) => (
                                        <>
                                            {/* Edit Button */}
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => navigate(`/roles/edit/${params.row.id}`)}
                                                style={{ marginRight: '10px' }}
                                            >
                                                Edit
                                            </Button>
                                            {/* Delete Button */}
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleDelete(params.row.id)}
                                            >
                                                Delete
                                            </Button>
                                        </>
                                    )
                                }
                            ]}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            disableSelectionOnClick
                        />
                    )}
                </Container>
            </Box>
        </>
    );
}