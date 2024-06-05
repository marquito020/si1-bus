import { CardContent, Card, Typography, Button, Toolbar, Box, AppBar, Container, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LugarList() {
  const navigate = useNavigate();
  const [lugares, setLugares] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const loadLugares = async () => {
    try {
      const response = await fetch('http://localhost:3700/api/lugares');
      const data = await response.json();
      setLugares(data);
    } catch (error) {
      console.error('Error loading lugares:', error);
    }
  };

  const handleDelete = async (cod_Departamento, cod_Provincia, cod) => {
    try {
      await fetch(`http://localhost:3700/api/lugares/${cod_Departamento}/${cod_Provincia}/${cod}`, {
        method: "DELETE",
      });
      setLugares(lugares.filter((lugar) => lugar.cod !== cod || lugar.cod_Departamento !== cod_Departamento || lugar.cod_Provincia !== cod_Provincia));
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
                onClick={() => navigate("/lugar/new")}
              >
                Agregar Lugar
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      {filteredLugares.map((lugar) => (
        <Card style={{ marginBottom: ".7rem", backgroundColor: '#1e272e' }}
          key={`${lugar.cod_Departamento}-${lugar.cod_Provincia}-${lugar.cod}`}>
          <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ color: 'white' }}>
              <Typography>Departamento: {lugar.cod_Departamento}</Typography>
              <Typography>Nombre Departamento: {lugar.nombre_Departamento}</Typography>
              <Typography>Provincia: {lugar.cod_Provincia}</Typography>
              <Typography>Nombre Provincia: {lugar.nombre_Provincia}</Typography>
              <Typography>Código: {lugar.cod}</Typography>
              <Typography>Dirección: {lugar.direccion}</Typography>
            </div>
            <div>
              <Button
                variant='contained'
                color='inherit'
                onClick={() => navigate(`/lugares/${lugar.cod_Departamento}/${lugar.cod_Provincia}/${lugar.cod}/edit`)}
              >
                Editar
              </Button>
              <Button
                variant='contained'
                color='warning'
                onClick={() => handleDelete(lugar.cod_Departamento, lugar.cod_Provincia, lugar.cod)}
                style={{ marginLeft: ".5rem" }}
              >
                Eliminar
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
