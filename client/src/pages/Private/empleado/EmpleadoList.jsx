import { Button, Toolbar, AppBar, Container, TextField, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_BACKEND } from "../../../constants/routes";
import { DataGrid } from '@mui/x-data-grid';

export default function EmpleadoList() {
    const navigate = useNavigate();
    const [empleados, setEmpleados] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadEmpleados = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${URL_BACKEND}/usuarios`);
            const data = await response.json();
            console.log(data);
            setEmpleados(data);
        } catch (error) {
            setError('Error loading empleados');
            console.error('Error loading empleados:', error);
        } finally {
            setLoading(false);
        }
    };

    /* const handleDelete = async (id) => {
        try {
            await fetch(`${URL_BACKEND}/empleados/${id}`, {
                method: "DELETE",
            });
            setEmpleados(empleados.filter((empleado) => empleado.id_persona !== id));
        } catch (error) {
            console.error('Error deleting empleado:', error);
            setError('Error deleting empleado');
        }
    }; */

    useEffect(() => {
        loadEmpleados();
    }, []);

    const filteredEmpleados = empleados.filter((empleado) =>
        empleado.id_persona.toString().includes(searchTerm)
    );

    return (
        <>
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
                            onClick={() => navigate('/empleados/new')}
                        >
                            Nuevo Empleado
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
            {error && <Alert severity="error">{error}</Alert>}
            <DataGrid
                rows={filteredEmpleados}
                loading={loading}
                getRowId={(row) => row.id_persona}
                columns={[
                    { field: 'id_persona', headerName: 'ID Persona', width: 150 },
                    { field: 'username', headerName: 'Usuario', width: 150 },
                    { field: 'rol', headerName: 'Rol', width: 350 },
                    { field: 'nombre', headerName: 'Nombre', width: 150 },
                    { field: 'apellido', headerName: 'Apellido', width: 150 },
                    { field: 'fecha_nacimiento', headerName: 'Fecha de Nacimiento', width: 150 },
                    { field: 'telefono', headerName: 'Teléfono', width: 150 },
                    /* {
                        field: 'actions',
                        headerName: 'Acciones',
                        width: 150,
                        renderCell: (params) => (
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleDelete(params.row.id_persona)}
                            >
                                Eliminar
                            </Button>
                        )
                    } */
                ]}
            />
        </>
    );
}
