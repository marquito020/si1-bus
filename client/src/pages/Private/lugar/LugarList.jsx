import { CardContent, Card, Typography, Button, Toolbar, Box, AppBar, Container, TextField, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutes, URL_BACKEND } from "../../../constants/routes";

export default function LugarList() {
  const navigate = useNavigate();
  const [lugares, setLugares] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const loadLugares = async () => {
    try {
      const response = await fetch(`${URL_BACKEND}/lugares`);
      const data = await response.json();
      console.log(data);
      setLugares(data);
    } catch (error) {
      console.error('Error loading lugares:', error);
    }
  };

  const handleDelete = async (cod_Departamento, cod_Provincia, cod) => {
    try {
      await fetch(`${URL_BACKEND}/lugares/${cod_Departamento}/${cod_Provincia}/${cod}`, {
        method: "DELETE",
      });
      setLugares(lugares.filter((lugar) => lugar.cod !== cod));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadLugares();
  }, []);

  const filteredLugares = lugares.filter((lugar) =>
    lugar.cod.toString().includes(searchTerm) || 
    lugar.cod_Departamento.toString().includes(searchTerm) || 
    lugar.cod_Provincia.toString().includes(searchTerm)
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
                onClick={() => navigate(PrivateRoutes.LUGARES_CREATE)}
                sx={{
                  textDecoration: 'none',
                  color: "#ffffff",
                  ml: { xs: 0, sm: 1 },
                  mt: { xs: 2, sm: 0 }
                }}
                fullWidth={true}
              >
                Agregar Lugar
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <Container sx={{ padding: '2rem 0' }}>
        <Grid container spacing={3}>
          {filteredLugares.map((lugar) => (
            <Grid item xs={12} sm={6} md={4} key={`${lugar.cod_departamento}-${lugar.cod_provincia}-${lugar.cod}`}>
              <Card sx={{ backgroundColor: '#1e272e', color: 'white' }}>
                <CardContent>
                  <Typography variant="h6">Departamento: {lugar.cod_departamento}</Typography>
                  <Typography>Nombre Departamento: {lugar.nombre_departamento}</Typography>
                  <Typography>Provincia: {lugar.cod_provincia}</Typography>
                  <Typography>Nombre Provincia: {lugar.nombre_provincia}</Typography>
                  <Typography>Código: {lugar.cod}</Typography>
                  <Typography>Dirección: {lugar.direccion}</Typography>
                  <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => navigate(`/lugares/${lugar.cod_departamento}/${lugar.cod_provincia}/${lugar.cod}/edit`)}
                      sx={{ mr: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant='contained'
                      color='warning'
                      onClick={() => handleDelete(lugar.cod_departamento, lugar.cod_provincia, lugar.cod)}
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
