import { Button, Toolbar, Box, AppBar, Container, TextField, CircularProgress, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { URL_BACKEND } from "../../../constants/routes";
import { DataGrid } from '@mui/x-data-grid';

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
    setLoading(true);
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
    const token = localStorage.getItem("accessToken");
    try {
      await fetch(`${URL_BACKEND}/choferes/${ci_chofer}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
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

  const columns = [
    { field: 'ci_chofer', headerName: 'CI Chofer', width: 150 },
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'licencia', headerName: 'Licencia', width: 150 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 250,
      renderCell: (params) => (
        <>
          <Button
            variant='contained'
            color='primary'
            onClick={() => navigate(`/choferes/${params.row.ci_chofer}/edit`)}
            sx={{ mr: 1 }}
          >
            Editar
          </Button>
          <Button
            variant='contained'
            color='warning'
            onClick={() => handleDelete(params.row.ci_chofer)}
          >
            Eliminar
          </Button>
        </>
      ),
    },
  ];

  return (
    <ThemeProvider theme={theme}>
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
          <DataGrid
            rows={filteredChoferes}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            disableSelectionOnClick
            getRowId={(row) => row.ci_chofer}
          />
        </Container>
      )}
    </ThemeProvider>
  );
}
