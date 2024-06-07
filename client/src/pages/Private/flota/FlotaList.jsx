import { CardContent, Card, Typography, Button, Toolbar, Box, AppBar, Container, TextField, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_BACKEND } from "../../../constants/routes";

export default function FlotaList() {
  const navigate = useNavigate();
  const [flotas, setFlotas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const loadFlotas = async () => {
    try {
      const response = await fetch(`${URL_BACKEND}/flotas`);
      const data = await response.json();
      setFlotas(data);
    } catch (error) {
      console.error('Error loading flotas:', error);
    }
  };

  const handleDelete = async (placa) => {
    try {
      await fetch(`${URL_BACKEND}/flotas/${placa}`, {
        method: "DELETE",
      });
      setFlotas(flotas.filter((flota) => flota.placa !== placa));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFlotas();
  }, []);

  const filteredFlotas = flotas.filter((flota) =>
    flota.placa.toString().includes(searchTerm)
  );

  return (
    <>
      <Box sx={{ flexFlow: 1 }}>
        <AppBar position="static" color="primary">
          <Container>
            <Toolbar>
              <TextField
                variant="outlined"
                placeholder="Buscar por Placa"
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
                onClick={() => navigate("/flotas/new")}
                sx={{
                  textDecoration: 'none',
                  color: "#ffffff",
                  ml: { xs: 0, sm: 1 },
                  mt: { xs: 2, sm: 0 }
                }}
                fullWidth={true}
              >
                Agregar Flota
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <Container sx={{ padding: '2rem 0' }}>
        <Grid container spacing={3}>
          {filteredFlotas.map((flota) => (
            <Grid item xs={12} sm={6} md={4} key={flota.placa}>
              <Card sx={{ backgroundColor: '#1e272e', color: 'white' }}>
                <CardContent>
                  <Typography variant="h6">Placa: {flota.placa}</Typography>
                  <Typography>Marca: {flota.marca}</Typography>
                  <Typography>Modelo: {flota.modelo}</Typography>
                  <Typography>Capacidad: {flota.capacidad}</Typography>
                  <Typography>Tipo: {flota.tipo}</Typography>
                  <Typography>Estado: {flota.estado}</Typography>
                  <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => navigate(`/flotas/${flota.placa}/edit`)}
                      sx={{ mr: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant='contained'
                      color='warning'
                      onClick={() => handleDelete(flota.placa)}
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
    </>
  );
}
