import {
  Button, Toolbar, Box, AppBar, Container, TextField, Alert
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_BACKEND } from "../../../constants/routes";
import { DataGrid } from '@mui/x-data-grid';

export default function ViajeList() {
  const navigate = useNavigate();
  const [viajes, setViajes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadViajes = async () => {
    try {
      const response = await fetch(`${URL_BACKEND}/viajes`);
      const data = await response.json();
      setViajes(data.map(viaje => ({
        ...viaje,
        status: viaje.status ? 'Activo' : 'Cancelado',
        fecha: new Date(viaje.fecha).toLocaleDateString()
      })));
    } catch (error) {
      setError('Error loading viajes');
      console.error('Error loading viajes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (cod) => {
    try {
      await fetch(`${URL_BACKEND}/viajes/${cod}`, {
        method: "DELETE",
      });
      setViajes(viajes.filter((viaje) => viaje.cod !== cod));
    } catch (error) {
      console.error('Error deleting viaje:', error);
      setError('Error deleting viaje');
    }
  };

  const cancelViaje = async (cod) => {
    try {
      await fetch(`${URL_BACKEND}/viajes/cancel/${cod}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: false })
      });
      setViajes(viajes.map((viaje) => viaje.cod === cod ? { ...viaje, status: 'Cancelado' } : viaje));
    } catch (error) {
      console.error('Error canceling viaje:', error);
      setError('Error canceling viaje');
    }
  }

  useEffect(() => {
    loadViajes();
  }, []);

  const filteredViajes = viajes.filter((viaje) =>
    viaje.cod.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) ||
    viaje.fecha.toString().includes(searchTerm) ||
    viaje.precio.toString().includes(searchTerm) ||
    viaje.placa_flota.toString().includes(searchTerm) ||
    viaje.lugar_origen.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    viaje.provincia_origen.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    viaje.departamento_origen.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    viaje.lugar_destino.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    viaje.provincia_destino.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    viaje.departamento_destino.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    viaje.hora_salida.toString().includes(searchTerm) ||
    viaje.hora_llegada?.toString().includes(searchTerm) ||
    viaje.status.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { field: 'cod', headerName: 'Código', width: 150 },
    { field: 'status', headerName: 'Estado', width: 150 },
    { field: 'fecha', headerName: 'Fecha', width: 150 },
    { field: 'hora_salida', headerName: 'Hora de Salida', width: 200 },
    { field: 'hora_llegada', headerName: 'Hora de Llegada', width: 200 },
    { field: 'precio', headerName: 'Precio', width: 150 },
    { field: 'placa_flota', headerName: 'Placa de Flota', width: 200 },
    { field: 'lugar_origen', headerName: 'Lugar de Origen', width: 200 },
    { field: 'provincia_origen', headerName: 'Provincia de Origen', width: 200 },
    { field: 'departamento_origen', headerName: 'Departamento de Origen', width: 200 },
    { field: 'lugar_destino', headerName: 'Lugar de Destino', width: 200 },
    { field: 'provincia_destino', headerName: 'Provincia de Destino', width: 200 },
    { field: 'departamento_destino', headerName: 'Departamento de Destino', width: 200 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 280,
      renderCell: (params) => (
        <>
          <Button
            variant='contained'
            color='primary'
            onClick={() => navigate(`/viajes/edit/${params.row.cod}`)}
            sx={{ mr: 1 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
              <path d="M12.146 0.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zm-10.896 10.897L1 14.293 3.707 13 11 5.707 9.293 4 2 11.293z" />
            </svg>
          </Button>
          <Button
            variant='contained'
            color='warning'
            onClick={() => handleDelete(params.row.cod)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5v7a.5.5 0 0 0 1 0v-7a.5.5 0 0 0-1 0zm3 0v7a.5.5 0 0 0 1 0v-7a.5.5 0 0 0-1 0zm3 0v7a.5.5 0 0 0 1 0v-7a.5.5 0 0 0-1 0zM4.118 1.572a.5.5 0 0 0-.473.33L3 3H1.5a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13l-.645-1.098a.5.5 0 0 0-.473-.33H10.5V1a1.5 1.5 0 0 0-3 0v.572H4.118zm2.5-.572h3V1a.5.5 0 0 0-1 0v.5h-1V1a.5.5 0 0 0-1 0v.5z"/>
              <path d="M2.5 4.5V14a1.5 1.5 0 0 0 1.5 1.5h8a1.5 1.5 0 0 0 1.5-1.5V4.5h-11zM4 5v8.5a.5.5 0 0 1-.5.5H2.5a.5.5 0 0 1-.5-.5V5h1zm9 0h1v8.5a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5V5z"/>
            </svg>
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={() => cancelViaje(params.row.cod)}
            sx={{ ml: 1 }}
          >
            {
              (params.row.status === 'Activo') ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0-1A6 6 0 1 0 8 2a6 6 0 0 0 0 12zm2.354-8.354a.5.5 0 0 0-.708 0L8 8.293 6.354 6.646a.5.5 0 1 0-.708.708L7.293 9l-1.647 1.646a.5.5 0 0 0 .708.708L8 9.707l1.646 1.647a.5.5 0 0 0 .708-.708L8.707 9l1.647-1.646a.5.5 0 0 0 0-.708z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm3.354 5.646a.5.5 0 0 0-.708 0L7 10.293 5.354 8.646a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l4-4a.5.5 0 0 0 0-.708z"/>
                </svg>
              )
            }
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Box sx={{ flexFlow: 1 }}>
        <TextField
          variant="outlined"
          placeholder="Buscar por Código, Fecha, Precio, Placa de Flota, Lugar de Origen, Provincia de Origen, Departamento de Origen, Lugar de Destino, Provincia de Destino, Departamento de Destino, Hora de Salida, Hora de Llegada"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          style={{ backgroundColor: 'white', borderRadius: 10, marginRight: 8, width: '100%', border: 'none' }}
          sx={{
            backgroundColor: 'white',
            borderRadius: 10,
            mr: 2,
            mt: 2,
            width: { xs: '100%', sm: 'auto' }
          }}
        />
        <AppBar position="static" color="primary">
          <Container>
            <Toolbar>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/viajes/new")}
                style={{ textDecoration: 'none', color: "#ffffff", marginLeft: 8, marginTop: 8 }}
                sx={{
                  textDecoration: 'none',
                  color: "#ffffff",
                  ml: { xs: 0, sm: 1 },
                  mt: { xs: 2, sm: 0 }
                }}
                fullWidth={true}
              >
                Agregar Viaje
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      {error ? (
        <Container sx={{ mt: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Container>
      ) : (
        <Box sx={{ height: 400, width: '100%', marginTop: 2 }}>
          <DataGrid
            rows={filteredViajes}
            loading={loading}
            columns={columns}
            getRowId={(row) => row.cod}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
          />
        </Box>
      )}
    </>
  );
}
