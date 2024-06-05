import { CardContent, Card, Typography, Button, Toolbar, Box, AppBar, Container, TextField, CircularProgress, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ViajeList() {
  const navigate = useNavigate();
  const [viajes, setViajes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadViajes = async () => {
    try {
      const response = await fetch('http://localhost:3700/api/viajes');
      const data = await response.json();
      setViajes(data);
    } catch (error) {
      setError('Error loading viajes');
      console.error('Error loading viajes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (cod) => {
    try {
      await fetch(`http://localhost:3700/api/viajes/${cod}`, {
        method: "DELETE",
      });
      setViajes(viajes.filter((viaje) => viaje.cod !== cod));
    } catch (error) {
      console.error('Error deleting viaje:', error);
      setError('Error deleting viaje');
    }
  };

  useEffect(() => {
    loadViajes();
  }, []);

  const filteredViajes = viajes.filter((viaje) =>
    viaje.cod.toString().includes(searchTerm)
  );

  return (
    <>
      <Box sx={{ flexFlow: 1 }}>
        <AppBar position="static" color="transparent">
          <Container>
            <Toolbar>
              <TextField
                variant="outlined"
                placeholder="Buscar por Código"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                style={{ marginRight: '1rem' }}
              />
              <Button
                variant="contained"
                style={{ textDecoration: 'none', color: "#ffffff", marginLeft: '0.5rem' }}
                color="primary"
                onClick={() => navigate("/viajes/new")}
              >
                Agregar Viaje
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        filteredViajes.map((viaje) => (
          <Card style={{ marginBottom: ".7rem", backgroundColor: '#1e272e' }} key={viaje.cod}>
            <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ color: 'white' }}>
                <Typography>Código: {viaje.cod}</Typography>
                <Typography>Fecha: {viaje.fecha}</Typography>
                <Typography>Hora de Salida: {viaje.hora_salida}</Typography>
                <Typography>Hora de Llegada: {viaje.hora_llegada}</Typography>
                <Typography>Precio: {viaje.precio}</Typography>
                <Typography>Placa de Flota: {viaje.placa_flota}</Typography>
                <Typography>Lugar de Origen: {viaje.lugar_origen}</Typography>
                <Typography>Provincia de Origen: {viaje.provincia_origen}</Typography>
                <Typography>Departamento de Origen: {viaje.departamento_origen}</Typography>
                <Typography>Lugar de Destino: {viaje.lugar_destino}</Typography>
                <Typography>Provincia de Destino: {viaje.provincia_destino}</Typography>
                <Typography>Departamento de Destino: {viaje.departamento_destino}</Typography>
              </div>
              <div>
                <Button
                  variant='contained'
                  color='inherit'
                  onClick={() => navigate(`/viajes/${viaje.cod}/edit`)}
                >
                  Editar
                </Button>
                <Button
                  variant='contained'
                  color='warning'
                  onClick={() => handleDelete(viaje.cod)}
                  style={{ marginLeft: ".5rem" }}
                >
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </>
  );
}
