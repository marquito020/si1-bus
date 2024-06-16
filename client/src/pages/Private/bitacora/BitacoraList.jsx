import { Toolbar, AppBar, Container, TextField, CircularProgress, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { URL_BACKEND } from "../../../constants/routes";
import { DataGrid } from '@mui/x-data-grid';

export default function BitacoraList() {
    const [bitacoras, setBitacoras] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const theme = createTheme({
        palette: {
            primary: {
                main: '#007bff',
            },
            secondary: {
                main: '#f50057',
            },
            warning: {
                main: '#ff9800',
            },
            background: {
                default: '#f4f6f8',
            },
        },
        typography: {
            fontFamily: 'Roboto, sans-serif',
        },
    });

    const loadBitacoras = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${URL_BACKEND}/bitacora`);
            const data = await response.json();
            console.log(data);
            setBitacoras(data.map(bitacora => ({
                ...bitacora,
                fecha: new Date(bitacora.fecha_hora).toLocaleDateString(),
                hora: new Date(bitacora.fecha_hora).toLocaleTimeString()
            })));
        } catch (error) {
            setError('Error loading bitacoras');
            console.error('Error loading bitacoras:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBitacoras();
    }, []);

    const filteredBitacoras = bitacoras.filter((bitacora) =>
        bitacora.id.toString().includes(searchTerm) ||
        bitacora.fecha.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bitacora.hora.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bitacora.nombre_usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bitacora.apellido_usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bitacora.ci_usuario.toString().includes(searchTerm) ||
        bitacora.accion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <TextField
                        variant="outlined"
                        placeholder="Search..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        sx={{
                            backgroundColor: 'white',
                            width: '100%',
                            borderRadius: '5px',
                        }}
                    />
                </Toolbar>
                <Container>
                </Container>
            </AppBar>
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            <ThemeProvider theme={theme}>
                <DataGrid
                    rows={filteredBitacoras}
                    columns={[
                        { field: 'id', headerName: 'ID', width: 90 },
                        { field: 'fecha', headerName: 'Fecha', width: 150 },
                        { field: 'hora', headerName: 'Hora', width: 150 },
                        { field: 'nombre_usuario', headerName: 'Nombre', width: 150 },
                        { field: 'apellido_usuario', headerName: 'Apellido', width: 150 },
                        { field: 'ci_usuario', headerName: 'CI', width: 150 },
                        { field: 'accion', headerName: 'Acción', width: 550 },
                    ]}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    disableSelectionOnClick
                />
            </ThemeProvider>
        </>
    );
}
