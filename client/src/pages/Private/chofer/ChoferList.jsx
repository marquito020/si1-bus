import { CardContent, Card, Typography, Button, Toolbar, Box, AppBar, Container, TextField, CircularProgress, Alert, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { URL_BACKEND } from "../../../constants/routes";

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

export default function ChoferList() {
  const navigate = useNavigate();
  const [choferes, setChoferes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadChoferes = async () => {
    try {
      const response = await fetch(`${URL_BACKEND}/choferes`);
      const data = await response.json();
      setChoferes(data);
    } catch (error) {
      setError('Error loading choferes');
      console.error('Error loading choferes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (ci_chofer) => {
    try {
      await fetch(`${URL_BACKEND}/choferes/${ci_chofer}`, {
        method: "DELETE",
      });
      setChoferes(choferes.filter((chofer) => chofer.ci_chofer !== ci_chofer));
    } catch (error) {
      console.error('Error deleting chofer:', error);
      setError('Error deleting chofer');
    }
  };

  useEffect(() => {
    loadChoferes();
  }, []);

  const filteredChoferes = choferes.filter((chofer) =>
    chofer.ci_chofer.toString().includes(searchTerm)
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexFlow: 1 }}>
        <AppBar position="static" color="primary">
          <Container>
            <Toolbar>
              <TextField
                variant="outlined"
                placeholder="Buscar por CI"
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
                onClick={() => navigate("/choferes/new")}
                sx={{ textDecoration: 'none', color: "#ffffff", ml: { xs: 0, sm: 1 }, mt: { xs: 2, sm: 0 } }}
                fullWidth={true}
              >
                Agregar Chofer
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
            {filteredChoferes.map((chofer) => (
              <Grid item xs={12} sm={6} md={4} key={chofer.ci_chofer}>
                <Card sx={{ backgroundColor: '#1e272e', color: 'white' }}>
                  <CardContent>
                    <Typography variant="h6">{chofer.nombre}</Typography>
                    <Typography>CI: {chofer.ci_chofer}</Typography>
                    <Typography>Licencia: {chofer.licencia}</Typography>
                    <Box display="flex" justifyContent="flex-end" mt={2}>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={() => navigate(`/choferes/${chofer.ci_chofer}/edit`)}
                        sx={{ mr: 1 }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant='contained'
                        color='warning'
                        onClick={() => handleDelete(chofer.ci_chofer)}
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
    </ThemeProvider>
  );
}
