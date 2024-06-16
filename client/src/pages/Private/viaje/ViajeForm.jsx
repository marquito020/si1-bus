import {
  Button, Card, CardContent, CircularProgress, Grid, TextField, Typography, Box, MenuItem, Select, InputLabel, FormControl
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URL_BACKEND } from "../../../constants/routes";

export default function ViajeForm() {
  const [viaje, setViaje] = useState({
    fecha: "",
    hora_salida: "",
    hora_llegada: "",
    precio: "",
    placa_flota: "",
    cod_provincia_destino: "",
    cod_departamento_destino: "",
    cod_provincia_origen: "",
    cod_departamento_origen: ""
  });
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [editing, setEditing] = useState(false);
  const [provincias, setProvincias] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [flotas, setFlotas] = useState([]);

  const navigate = useNavigate();
  const params = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setViaje({
      ...viaje,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editing) {
        await fetch(`${URL_BACKEND}/viajes/${params.cod}`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(viaje),
        });
      } else {
        try {
          await fetch(`${URL_BACKEND}/viajes`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(viaje),
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error) {
          console.error("Error submitting form:", error);
          setLoading(false);
        }
      }

      setLoading(false);
      navigate("/viajes");
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  const loadViaje = async (cod) => {
    const res = await fetch(`${URL_BACKEND}/viajes/${cod}`);
    const data = await res.json();
    console.log(data);
    setViaje({
      fecha: data.fecha.slice(0, 10),
      hora_salida: data.hora_salida,
      hora_llegada: data.hora_llegada || "",
      precio: data.precio,
      placa_flota: data.placa_flota,
      cod_provincia_destino: data.cod_provincia_destino,
      cod_departamento_destino: data.cod_departamento_destino,
      cod_provincia_origen: data.cod_provincia_origen,
      cod_departamento_origen: data.cod_departamento_origen
    });
    setLoadingData(false);
    setEditing(true);
  };

  const loadProvincias = async () => {
    const res = await fetch(`${URL_BACKEND}/provincias`);
    const data = await res.json();
    setProvincias(data);
  };

  const loadDepartamentos = async () => {
    const res = await fetch(`${URL_BACKEND}/departamentos`);
    const data = await res.json();
    console.log(data);
    setDepartamentos(data);
  };

  const loadFlotas = async () => {
    const res = await fetch(`${URL_BACKEND}/flotas`);
    const data = await res.json();
    setFlotas(data);
  };

  useEffect(() => {
    if (params.cod) {
      setLoadingData(true);
      loadViaje(params.cod);
    }
    loadProvincias();
    loadDepartamentos();
    loadFlotas();
  }, [params.cod]);

  const isFormValid = () => {
    return viaje.fecha && viaje.hora_salida && viaje.hora_llegada && viaje.precio && viaje.placa_flota &&
      viaje.cod_departamento_origen && viaje.cod_provincia_origen &&
      viaje.cod_departamento_destino && viaje.cod_provincia_destino;
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/viajes")}
        sx={{ mt: 2 }}
      >
        Volver
      </Button>
      <Grid container direction="column" alignItems="center" justifyContent="center">
        <Grid item xs={10}>
          <Card sx={{ mt: 10 }} style={{ background: '#1e272e', padding: '1rem' }}>
            <Typography variant="h5" textAlign="center" color="white">
              {editing ? "Editar Viaje" : "Crear Viaje"}
            </Typography>
            <CardContent>
              {loadingData ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between' }}>
                    <TextField
                      variant="filled"
                      label="Fecha"
                      name="fecha"
                      type="date"
                      onChange={handleChange}
                      value={viaje.fecha}
                      InputLabelProps={{ shrink: true, style: { color: "white" } }}
                      inputProps={{ style: { color: "white" } }}
                      fullWidth
                      sx={{ flex: '1 1 45%' }}
                    />
                    <TextField
                      variant="filled"
                      label="Hora de Salida"
                      name="hora_salida"
                      type="time"
                      onChange={handleChange}
                      value={viaje.hora_salida}
                      InputLabelProps={{ shrink: true, style: { color: "white" } }}
                      inputProps={{ style: { color: "white" } }}
                      fullWidth
                      sx={{ flex: '1 1 45%' }}
                    />
                    <TextField
                      variant="filled"
                      label="Hora de Llegada"
                      name="hora_llegada"
                      type="time"
                      onChange={handleChange}
                      value={viaje.hora_llegada}
                      InputLabelProps={{ shrink: true, style: { color: "white" } }}
                      inputProps={{ style: { color: "white" } }}
                      fullWidth
                      sx={{ flex: '1 1 45%' }}
                    />
                    <TextField
                      variant="filled"
                      label="Precio"
                      name="precio"
                      onChange={handleChange}
                      value={viaje.precio}
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                      fullWidth
                      sx={{ flex: '1 1 45%' }}
                    />
                    <FormControl variant="filled" fullWidth sx={{ flex: '1 1 45%' }}>
                      <InputLabel style={{ color: "white" }}>Placa de Flota</InputLabel>
                      <Select
                        name="placa_flota"
                        value={viaje.placa_flota || ""}
                        onChange={handleChange}
                        inputProps={{ style: { color: "white" } }}
                        sx={{ color: "white" }}
                      >
                        {flotas.map((flota) => (
                          <MenuItem key={flota.placa} value={flota.placa} style={{ color: "black" }}>
                            {flota.placa}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl variant="filled" fullWidth sx={{ flex: '1 1 45%' }}>
                      <InputLabel style={{ color: "white" }}>Departamento de Origen</InputLabel>
                      <Select
                        name="cod_departamento_origen"
                        value={viaje.cod_departamento_origen || ""}
                        onChange={handleChange}
                        inputProps={{ style: { color: "white" } }}
                        sx={{ color: "white" }}
                      >
                        {departamentos.map((departamento) => (
                          <MenuItem key={departamento.cod} value={departamento.cod} style={{ color: "black" }}>
                            {departamento.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl variant="filled" fullWidth sx={{ flex: '1 1 45%' }}>
                      <InputLabel style={{ color: "white" }}>Provincia de Origen</InputLabel>
                      <Select
                        name="cod_provincia_origen"
                        value={viaje.cod_provincia_origen || ""}
                        onChange={handleChange}
                        inputProps={{ style: { color: "white" } }}
                        sx={{ color: "white" }}
                        disabled = {viaje.cod_departamento_origen === ""}
                      >
                        {provincias.map((provincia) => (
                          viaje.cod_departamento_origen === provincia.cod_departamento && (
                            <MenuItem key={provincia.cod} value={provincia.cod} style={{ color: "black" }}>
                              {provincia.nombre}
                            </MenuItem>
                          )
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl variant="filled" fullWidth sx={{ flex: '1 1 45%' }}>
                      <InputLabel style={{ color: "white" }}>Departamento de Destino</InputLabel>
                      <Select
                        name="cod_departamento_destino"
                        value={viaje.cod_departamento_destino || ""}
                        onChange={handleChange}
                        inputProps={{ style: { color: "white" } }}
                        sx={{ color: "white" }}
                      >
                        {departamentos.map((departamento) => (
                          <MenuItem key={departamento.cod} value={departamento.cod} style={{ color: "black" }}>
                            {departamento.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl variant="filled" fullWidth sx={{ flex: '1 1 45%' }}>
                      <InputLabel style={{ color: "white" }}>Provincia de Destino</InputLabel>
                      <Select
                        name="cod_provincia_destino"
                        value={viaje.cod_provincia_destino || ""}
                        onChange={handleChange}
                        inputProps={{ style: { color: "white" } }}
                        sx={{ color: "white" }}
                        disabled = {viaje.cod_departamento_destino === ""}
                      >
                        {provincias.map((provincia) => (
                          viaje.cod_departamento_destino === provincia.cod_departamento && (
                            <MenuItem key={provincia.cod} value={provincia.cod} style={{ color: "black" }}>
                              {provincia.nombre}
                            </MenuItem>
                          )
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={!isFormValid()}
                    >
                      {loading ? (
                        <CircularProgress color="inherit" size={24} />
                      ) : (
                        editing ? "Actualizar" : "Crear"
                      )}
                    </Button>
                  </Box>
                </form>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    </>
  );
}
