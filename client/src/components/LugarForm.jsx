import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function LugarForm() {
  const [lugar, setLugar] = useState({
    cod_Departamento: "",
    cod_Provincia: "",
    cod: "",
    direccion: ""
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

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
        await fetch(`http://localhost:3700/api/lugares/${params.cod_Departamento}/${params.cod_Provincia}/${params.cod}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lugar),
        });
      } else {
        await fetch("http://localhost:3700/api/lugares", {
          method: "POST",
          body: JSON.stringify(lugar),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      setLoading(false);
      navigate("/lugares");
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  const loadLugar = async (cod_Departamento, cod_Provincia, cod) => {
    const res = await fetch(`http://localhost:3700/api/lugares/${cod_Departamento}/${cod_Provincia}/${cod}`);
    const data = await res.json();
    setLugar({
      cod_Departamento: data.cod_Departamento,
      cod_Provincia: data.cod_Provincia,
      cod: data.cod,
      direccion: data.direccion
    });
    setEditing(true);
  };

  useEffect(() => {
    if (params.cod_Departamento && params.cod_Provincia && params.cod) {
      loadLugar(params.cod_Departamento, params.cod_Provincia, params.cod);
    }
  }, [params.cod_Departamento, params.cod_Provincia, params.cod]);

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
      <Grid item xs={10}>
        <Card sx={{ mt: 10 }} style={{ background: '#1e272e', padding: '1rem' }}>
          <Typography variant="h5" textAlign="center" color="white">
            {editing ? "Editar Lugar" : "Crear Lugar"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between' }}>
                <TextField
                  variant="filled"
                  label="Código de Departamento"
                  name="cod_Departamento"
                  onChange={handleChange}
                  value={lugar.cod_Departamento}
                  inputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "white" } }}
                  fullWidth
                  sx={{ flex: '1 1 45%' }}
                />
                <TextField
                  variant="filled"
                  label="Código de Provincia"
                  name="cod_Provincia"
                  onChange={handleChange}
                  value={lugar.cod_Provincia}
                  inputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "white" } }}
                  fullWidth
                  sx={{ flex: '1 1 45%' }}
                />
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
                  disabled={!lugar.cod_Departamento || !lugar.cod_Provincia || !lugar.cod || !lugar.direccion}
                >
                  {loading ? (
                    <CircularProgress color="inherit" size={24} />
                  ) : (
                    editing ? "Actualizar" : "Crear"
                  )}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
