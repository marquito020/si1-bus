import {
  Button, Card, CardContent, CircularProgress, Grid, TextField, Typography, Box, MenuItem, Select, InputLabel, FormControl
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URL_BACKEND } from "../../../constants/routes";

export default function FlotaForm() {
  const navigate = useNavigate();
  const { placa } = useParams();
  const [flota, setFlota] = useState({
    placa: "",
    marca: "",
    modelo: "",
    capacidad: "",
    cod_tipo_flota: "",
    cod_estado_flota: ""
  });

  const [loading, setLoading] = useState(false);
  const [loadingFlota, setLoadingFlota] = useState(false);
  const [error, setError] = useState(null);
  const [tipoFlota, setTipoFlota] = useState([]);
  const [estadoFlota, setEstadoFlota] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlota({
      ...flota,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (placa) {
        await fetch(`${URL_BACKEND}/flotas/${placa}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(flota),
        });
      } else {
        await fetch(`${URL_BACKEND}/flotas`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(flota),
        });
      }
      navigate("/flotas");
    } catch (error) {
      console.error("Error saving flota:", error);
      setError("Error saving flota");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (placa) {
      setLoadingFlota(true);
      const loadFlota = async () => {
        try {
          const response = await fetch(`${URL_BACKEND}/flotas/${placa}`);
          const data = await response.json();
          setFlota(data);
          setLoadingFlota(false);
        } catch (error) {
          console.error("Error loading flota:", error);
          setLoadingFlota(false);
          setError("Error loading flota");
        }
      };
      loadFlota();
    }

    const loadTipoFlota = async () => {
      const response = await fetch(`${URL_BACKEND}/tipo_flotas`);
      const data = await response.json();
      setTipoFlota(data);
    };

    const loadEstadoFlota = async () => {
      const response = await fetch(`${URL_BACKEND}/estado_flotas`);
      const data = await response.json();
      setEstadoFlota(data);
    };

    loadTipoFlota();
    loadEstadoFlota();
  }, [placa]);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {placa ? "Editar Flota" : "Nueva Flota"}
            </Typography>
            {loadingFlota ? <CircularProgress /> : (
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Placa"
                  name="placa"
                  value={flota.placa}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Marca"
                  name="marca"
                  value={flota.marca}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Modelo"
                  name="modelo"
                  value={flota.modelo}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Capacidad"
                  name="capacidad"
                  value={flota.capacidad}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                <FormControl variant="outlined" fullWidth margin="normal">
                  <InputLabel>Tipo de Flota</InputLabel>
                  <Select
                    name="cod_tipo_flota"
                    value={flota.cod_tipo_flota}
                    onChange={handleChange}
                    label="Tipo de Flota"
                  >
                    {tipoFlota.map((tipo) => (
                      <MenuItem key={tipo.cod} value={tipo.cod}>
                        {tipo.descripcion}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl variant="outlined" fullWidth margin="normal">
                  <InputLabel>Estado de Flota</InputLabel>
                  <Select
                    name="cod_estado_flota"
                    value={flota.cod_estado_flota}
                    onChange={handleChange}
                    label="Estado de Flota"
                  >
                    {estadoFlota.map((estado) => (
                      <MenuItem key={estado.cod} value={estado.cod}>
                        {estado.descripcion}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : (
                      placa ? "Actualizar" : "Guardar"
                    )}
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate("/flotas")}
                  >
                    Volver
                  </Button>
                </Box>
              </form>
            )}
            {error && <Typography color="error">{error}</Typography>}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
