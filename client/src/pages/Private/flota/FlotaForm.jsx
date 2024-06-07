import { Button, Card, CardContent, CircularProgress, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URL_BACKEND } from "../../../constants/routes";

export default function FlotaForm() {
  const [flota, setFlota] = useState({
    placa: "",
    marca: "",
    modelo: "",
    capacidad: "",
    cod_tipo_flota: "",
    cod_estado_flota: "",
    tipo: "",
    estado: ""
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const [tipoFlota, setTipoFlota] = useState([]);
  const [estadoFlota, setEstadoFlota] = useState([]);

  useEffect(() => {
    fetch(`${URL_BACKEND}/tipo_flotas`)
      .then(res => res.json())
      .then(data => setTipoFlota(data));

    console.log(tipoFlota);

    fetch(`${URL_BACKEND}/estado_flotas`)
      .then(res => res.json())
      .then(data => setEstadoFlota(data));

    console.log(estadoFlota);
  }, []);

  const navigate = useNavigate();
  const params = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlota({
      ...flota,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editing) {
        await fetch(`${URL_BACKEND}/flotas/${params.placa}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(flota),
        });
      } else {
        console.log(flota);
        await fetch(`${URL_BACKEND}/flotas`, {
          method: "POST",
          body: JSON.stringify(flota),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      setLoading(false);
      navigate("/flotas");
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  const loadFlota = async (placa) => {
    const res = await fetch(`${URL_BACKEND}/flotas/${placa}`);
    const data = await res.json();
    setFlota({
      placa: data.placa,
      marca: data.marca,
      modelo: data.modelo,
      capacidad: data.capacidad,
      cod_tipo_flota: data.cod_tipo_flota,
      cod_estado_flota: data.cod_estado_flota,
      tipo: data.tipo,
      estado: data.estado
    });
    setEditing(true);
  };

  useEffect(() => {
    if (params.placa) {
      loadFlota(params.placa);
    }
  }, [params.placa]);

  return (
    <Grid container direction='column' alignItems='center' justifyContent='center'>
      <Grid item xs={3}>
        <Card sx={{ mt: 10 }} style={{ background: '#1e272e', padding: '1rem' }}>
          <Typography variant="5" textAlign='center' color='white'>
            {editing ? "Editar Flota" : "Crear Flota"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label='Placa'
                sx={{ display: 'block', margin: '.5rem 0' }}
                name="placa"
                onChange={handleChange}
                value={flota.placa}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="filled"
                label='Marca'
                sx={{ display: 'block', margin: '.5rem 0' }}
                name="marca"
                onChange={handleChange}
                value={flota.marca}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="filled"
                label='Modelo'
                sx={{ display: 'block', margin: '.5rem 0' }}
                name="modelo"
                onChange={handleChange}
                value={flota.modelo}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="filled"
                label='Capacidad'
                sx={{ display: 'block', margin: '.5rem 0' }}
                name="capacidad"
                onChange={handleChange}
                value={flota.capacidad}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                select
                variant="filled"
                label='Tipo'
                sx={{ display: 'block', margin: '.5rem 0' }}
                name="cod_tipo_flota"
                onChange={handleChange}
                value={flota.cod_tipo_flota}
                inputProps={{ style: { color: "white" } }}
                SelectProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              >
                {tipoFlota.map((tipo) => (
                  <MenuItem key={tipo.cod} value={tipo.cod}>
                    {tipo.descripcion}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                variant="filled"
                label='Estado'
                sx={{ display: 'block', margin: '.5rem 0' }}
                name="cod_estado_flota"
                onChange={handleChange}
                value={flota.cod_estado_flota}
                inputProps={{ style: { color: "white" } }}
                SelectProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              >
                {estadoFlota.map((estado) => (
                  <MenuItem key={estado.cod} value={estado.cod}>
                    {estado.descripcion}
                  </MenuItem>
                ))}
              </TextField>
              <Button variant="contained" color="primary" type="submit"
                disabled={!flota.placa || !flota.marca || !flota.modelo || !flota.capacidad || !flota.cod_tipo_flota || !flota.cod_estado_flota}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  editing ? "Actualizar" : "Crear"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
