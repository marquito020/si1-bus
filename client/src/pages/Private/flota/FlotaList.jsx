import { Button, Toolbar, Box, AppBar, Container, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_BACKEND } from "../../../constants/routes";
import { DataGrid } from '@mui/x-data-grid';

export default function FlotaList() {
  const navigate = useNavigate();
  const [flotas, setFlotas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadFlotas = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${URL_BACKEND}/flotas`, {
        method: 'GET',
        credentials: 'include', // Incluye cookies en la solicitud
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setFlotas(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
      {/* <Container sx={{ padding: '2rem 0' }}> */}
      <Box sx={{ height: 400, width: '100%', marginTop: 2 }}>
        <DataGrid
          rows={filteredFlotas}
          loading={isLoading}
          columns={[
            { field: 'placa', headerName: 'Placa', width: 150 },
            { field: 'marca', headerName: 'Marca', width: 150 },
            { field: 'modelo', headerName: 'Modelo', width: 150 },
            { field: 'capacidad', headerName: 'Capacidad', width: 150 },
            { field: 'tipo', headerName: 'Tipo', width: 150 },
            { field: 'estado', headerName: 'Estado', width: 150 },
            {
              field: 'actions',
              headerName: 'Acciones',
              width: 320,
              renderCell: (params) => (
                <strong>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => navigate(`/flotas/edit/${params.row.placa}`)}
                    sx={{ mr: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant='contained'
                    color='warning'
                    onClick={() => handleDelete(params.row.placa)}
                    sx={{ mr: 1 }}
                  >
                    Eliminar
                  </Button>
                  {/* Asientos */}
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => navigate(`/flotas/asientos/${params.row.placa}`)}
                  >
                    Asientos
                  </Button>
                </strong>
              ),
            },
          ]}
          getRowId={(row) => row.placa}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Box>
      {/* </Container> */}
    </>
  );
}
