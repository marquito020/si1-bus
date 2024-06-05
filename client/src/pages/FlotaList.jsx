import { CardContent, Card, Typography, Button, Toolbar, Box, AppBar, Container, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FlotaList() {
  const navigate = useNavigate();
  const [flotas, setFlotas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const loadFlotas = async () => {
    try {
      const response = await fetch('http://localhost:3700/api/flotas');
      const data = await response.json();
      setFlotas(data);
    } catch (error) {
      console.error('Error loading flotas:', error);
    }
  };

  const handleDelete = async (placa) => {
    try {
      await fetch(`http://localhost:3700/api/flotas/${placa}`, {
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
        <AppBar position="static" color="transparent">
          <Container>
            <Toolbar>
              <TextField
                variant="outlined"
                placeholder="Buscar por Placa"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                style={{ marginRight: '1rem' }}
              />
              <Button
                variant="contained"
                style={{ textDecoration: 'none', color: "#ffffff", marginLeft: '0.5rem' }}
                color="primary"
                onClick={() => navigate("/flotas/new")}
              >
                Agregar Flota
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      {filteredFlotas.map((flota) => (
        <Card style={{ marginBottom: ".7rem", backgroundColor: '#1e272e' }}
          key={flota.placa}>
          <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ color: 'white' }}>
              <Typography>Placa: {flota.placa}</Typography>
              <Typography>Marca: {flota.marca}</Typography>
              <Typography>Modelo: {flota.modelo}</Typography>
              <Typography>Capacidad: {flota.capacidad}</Typography>
              <Typography>Tipo: {flota.tipo}</Typography>
              <Typography>Estado: {flota.estado}</Typography>
            </div>
            <div>
              <Button
                variant='contained'
                color='inherit'
                onClick={() => navigate(`/flotas/${flota.placa}/edit`)}
              >
                Editar
              </Button>
              <Button
                variant='contained'
                color='warning'
                onClick={() => handleDelete(flota.placa)}
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
