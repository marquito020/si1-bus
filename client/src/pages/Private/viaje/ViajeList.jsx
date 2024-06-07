import { CardContent, Card, Typography, Button, Toolbar, Box, AppBar, Container, TextField, CircularProgress, Alert, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_BACKEND } from "../../../constants/routes";

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
      await fetch(`${URL_BACKEND}/viajes/${cod}`, {
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
        <AppBar position="static" color="primary">
          <Container>
            <Toolbar>
              <TextField
                variant="outlined"
                placeholder="Buscar por Código"
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
                onClick={() => navigate("/viajes/new")}
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
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Container sx={{ mt: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Container>
      ) : (
        <Container sx={{ padding: '2rem 0' }}>
          <Grid container spacing={3}>
            {filteredViajes.map((viaje) => (
              <Grid item xs={12} sm={6} md={4} key={viaje.cod}>
                <Card sx={{ backgroundColor: '#1e272e', color: 'white' }}>
                  <CardContent>
                    <Typography variant="h6">Código: {viaje.cod}</Typography>
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
                    <Box display="flex" justifyContent="flex-end" mt={2}>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={() => navigate(`/viajes/${viaje.cod}/edit`)}
                        sx={{ mr: 1 }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant='contained'
                        color='warning'
                        onClick={() => handleDelete(viaje.cod)}
                      >
                        Eliminar
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </>
  );
}
