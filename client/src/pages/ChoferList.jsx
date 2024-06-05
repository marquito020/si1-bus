import { CardContent, Card, Typography, Button, Toolbar, Box, AppBar, Container, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function ChoferList() {
  const navigate = useNavigate();
  const [choferes, setChoferes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const loadChoferes = async () => {
    try {
      const response = await fetch('http://localhost:3700/api/choferes');
      const data = await response.json();
      setChoferes(data);
    } catch (error) {
      console.error('Error loading choferes:', error);
    }
  };

  const handleDelete = async (ci_chofer) => {
    try {
      await fetch(`http://localhost:3700/api/choferes/${ci_chofer}`, {
        method: "DELETE",
      });
      setChoferes(choferes.filter((chofer) => chofer.ci_chofer !== ci_chofer));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadChoferes();
  }, []);

  const filteredChoferes = choferes.filter((chofer) =>
    chofer.ci_chofer.toString().includes(searchTerm)
  );

  return (
    <>
      <Box sx={{ flexFlow: 1 }}>
        <AppBar position="static" color="transparent">
          <Container>
            <Toolbar>
              <TextField
                variant="outlined"
                placeholder="Buscar por CI"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                style={{ marginRight: '1rem' }}
              />
              <Button
                variant="contained"
                style={{ textDecoration: 'none', color: "#ffffff", marginLeft: '0.5rem' }}
                color="primary"
                onClick={() => navigate("/choferes/new")}
              >
                Agregar Chofer
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      {filteredChoferes.map((chofer) => (
        <Card
          style={{
            marginBottom: ".7rem",
            backgroundColor: '#1e272e',
          }}
          key={chofer.ci_chofer}
        >
          <CardContent
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ color: 'white' }}>
              <Typography>{chofer.nombre}</Typography>
              <Typography>CI: {chofer.ci_chofer}</Typography>
              <Typography>Licencia: {chofer.licencia}</Typography>
            </div>
            <div>
              <Button
                variant='contained'
                color='inherit'
                onClick={() => navigate(`/choferes/${chofer.ci_chofer}/edit`)}
              >
                Editar
              </Button>
              <Button
                variant='contained'
                color='warning'
                onClick={() => handleDelete(chofer.ci_chofer)}
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
