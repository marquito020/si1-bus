import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography, Box, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PrivateRoutes } from "../../../constants/routes";
import { URL_BACKEND } from "../../../constants/routes";

export default function LugarForm() {
  const [lugar, setLugar] = useState({
    cod_departamento: "",
    cod_provincia: "",
    cod: "",
    direccion: ""
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [departamento, setDepartamento] = useState([]);
  const [provincia, setProvincia] = useState([]);

  useEffect(() => {
    fetch(`${URL_BACKEND}/departamentos`)
      .then(res => res.json())
      .then(data => setDepartamento(data));

    fetch(`${URL_BACKEND}/provincias`)
      .then(res => res.json())
      .then(data => setProvincia(data));
  }, []);

  const navigate = useNavigate();
  const params = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLugar({
      ...lugar,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editing) {
        await fetch(`${URL_BACKEND}/lugares/${params.cod_departamento}/${params.cod_provincia}/${params.cod}`, {
          credentials: "include",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lugar),
        });
      } else {
        await fetch(`${URL_BACKEND}/lugares`, {
          credentials: "include",
          method: "POST",
          body: JSON.stringify(lugar),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      setLoading(false);
      navigate(PrivateRoutes.LUGARES);
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  const loadLugar = async (cod_Departamento, cod_Provincia, cod) => {
    setLoading(true);
    const res = await fetch(`${URL_BACKEND}/lugares/${cod_Departamento}/${cod_Provincia}/${cod}`);
    const data = await res.json();
    console.log(data);
    setLugar({
      cod_departamento: data.cod_departamento,
      cod_provincia: data.cod_provincia,
      cod: data.cod,
      direccion: data.direccion
    });
    setLoading(false);
    setEditing(true);
  };

  useEffect(() => {
    if (params.cod_departamento && params.cod_provincia && params.cod) {
      loadLugar(params.cod_departamento, params.cod_provincia, params.cod);
    }
  }, [params.cod_departamento, params.cod_provincia, params.cod]);

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
      <Grid item xs={10}>
        <Card sx={{ mt: 10 }} style={{ background: '#1e272e', padding: '1rem' }}>
          <Typography variant="h5" textAlign="center" color="white">
            {editing ? "Editar Lugar" : "Crear Lugar"}
          </Typography>
          <CardContent>
            {loading ? (
              <CircularProgress />
            ) : (
              <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between' }}>
                  <TextField
                    select
                    variant="filled"
                    label="Departamento"
                    name="cod_departamento"
                    onChange={handleChange}
                    value={lugar.cod_departamento}
                    inputProps={{ style: { color: "white" } }}
                    SelectProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                    fullWidth
                    sx={{ flex: '1 1 45%' }}
                  >
                    {departamento.map((dept) => (
                      <MenuItem key={dept.cod} value={dept.cod}>
                        {dept.nombre}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    variant="filled"
                    label="Código de Provincia"
                    name="cod_provincia"
                    onChange={handleChange}
                    value={lugar.cod_provincia}
                    inputProps={{ style: { color: "white" } }}
                    SelectProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                    fullWidth
                    sx={{ flex: '1 1 45%' }}
                  >
                    {provincia.map((prov) => (
                      lugar.cod_departamento === prov.cod_departamento && (
                        <MenuItem key={prov.cod} value={prov.cod}>
                          {prov.nombre}
                        </MenuItem>
                      )
                    ))}
                  </TextField>
                  <TextField
                    variant="filled"
                    label="Código"
                    name="cod"
                    onChange={handleChange}
                    value={lugar.cod}
                    inputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                    fullWidth
                    sx={{ flex: '1 1 45%' }}
                  />
                  <TextField
                    variant="filled"
                    label="Dirección"
                    name="direccion"
                    onChange={handleChange}
                    value={lugar.direccion}
                    inputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                    fullWidth
                    sx={{ flex: '1 1 45%' }}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Button variant="contained" color="primary" type="submit"
                    disabled={!lugar.cod_departamento || !lugar.cod_provincia || !lugar.cod || !lugar.direccion}
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
  );
}
