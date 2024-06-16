import { Button, Toolbar, Box, AppBar, Container, TextField, Alert, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_BACKEND } from "../../../constants/routes";
import { DataGrid } from '@mui/x-data-grid';

export default function LugarList() {
  const navigate = useNavigate();
  const [lugares, setLugares] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadLugares = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL_BACKEND}/lugares`);
      const data = await response.json();
      setLugares(data);
    } catch (error) {
      setError('Error loading lugares');
      console.error('Error loading lugares:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (cod_departamento, cod_provincia, cod) => {
    try {
      await fetch(`${URL_BACKEND}/lugares/${cod_departamento}/${cod_provincia}/${cod}`, {
        method: "DELETE",
      });
      setLugares(lugares.filter((lugar) => !(lugar.cod_departamento === cod_departamento && lugar.cod_provincia === cod_provincia && lugar.cod === cod)));
    } catch (error) {
      console.error('Error deleting lugar:', error);
      setError('Error deleting lugar');
    }
  };

  useEffect(() => {
    loadLugares();
  }, []);

  const filteredLugares = lugares.filter((lugar) =>
    lugar.cod.toString().includes(searchTerm) || 
    lugar.cod_departamento.toString().includes(searchTerm) || 
    lugar.cod_provincia.toString().includes(searchTerm)
  );

  const columns = [
    { field: 'cod_departamento', headerName: 'Cod Departamento', width: 150 },
    { field: 'nombre_departamento', headerName: 'Nombre Departamento', width: 200 },
    { field: 'cod_provincia', headerName: 'Cod Provincia', width: 150 },
    { field: 'nombre_provincia', headerName: 'Nombre Provincia', width: 200 },
    { field: 'cod', headerName: 'Código', width: 100 },
    { field: 'direccion', headerName: 'Dirección', width: 300 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 250,
      renderCell: (params) => (
        <>
          <Button
            variant='contained'
            color='primary'
            onClick={() => navigate(`/lugares/${params.row.cod_departamento}/${params.row.cod_provincia}/${params.row.cod}/edit`)}
            sx={{ mr: 1 }}
          >
            Editar
          </Button>
          <Button
            variant='contained'
            color='warning'
            onClick={() => handleDelete(params.row.cod_departamento, params.row.cod_provincia, params.row.cod)}
          >
            Eliminar
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Box sx={{ flexFlow: 1 }}>
        <Container>
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
                    borderRadius: '5px',
                    width: '300px',
                    marginRight: '10px'
                  }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate('/lugares/new')}
                >
                  Agregar Lugar
                </Button>
              </Toolbar>
            </Container>
          </AppBar>
        </Container>
      </Box>
      <Container sx={{ padding: '2rem 0' }}>
        {error && <Alert severity="error">{error}</Alert>}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={filteredLugares}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            disableSelectionOnClick
            getRowId={(row) => `${row.cod_departamento}-${row.cod_provincia}-${row.cod}`}
          />
        )}
      </Container>
    </>
  );
}
