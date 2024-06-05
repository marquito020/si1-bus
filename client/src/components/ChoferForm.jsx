import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppBar, Box, Container, Toolbar, Button as MuiButton } from "@mui/material";

export default function ChoferForm() {
  const [chofer, setChofer] = useState({
    ci_chofer: "",
    licencia: "",
    nombre: "",
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChofer({
      ...chofer,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editing) {
        await fetch(`http://localhost:3700/api/choferes/${params.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(chofer),
        });
      } else {
        await fetch("http://localhost:3700/api/choferes", {
          method: "POST",
          body: JSON.stringify(chofer),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      setLoading(false);
      navigate("/choferes");
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  const loadChofer = async (id) => {
    const res = await fetch(`http://localhost:3700/api/choferes/${id}`);
    const data = await res.json();
    setChofer({ ci_chofer: data.ci_chofer, licencia: data.licencia, nombre: data.nombre });
    setEditing(true);
  };

  useEffect(() => {
    if (params.id) {
      loadChofer(params.id);
    }
  }, [params.id]);

  return (
    <>
      <Grid container direction='column' alignItems='center' justifyContent='center'>
        <Grid item xs={3}>
          <Card sx={{ mt: 10 }} style={{
            background: '#1e272e',
            padding: '1rem'
          }}>
            <Typography variant="5" textAlign='center' color='white'>
              {editing ? "Editar Chofer" : "Crear Chofer"}
            </Typography>
            <CardContent>
              <form onSubmit={handleSubmit}>

                <TextField
                  variant="filled"
                  label='CI del Chofer'
                  sx={{
                    display: 'block',
                    margin: '.5rem 0'
                  }}
                  name="ci_chofer"
                  onChange={handleChange}
                  value={chofer.ci_chofer}
                  inputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "white" } }}
                />
                <TextField
                  variant="filled"
                  label='Licencia'
                  sx={{
                    display: 'block',
                    margin: '.5rem 0'
                  }}
                  name="licencia"
                  onChange={handleChange}
                  value={chofer.licencia}
                  inputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "white" } }}
                />
                <TextField
                  variant="filled"
                  label='Nombre'
                  sx={{
                    display: 'block',
                    margin: '.5rem 0'
                  }}
                  name="nombre"
                  onChange={handleChange}
                  value={chofer.nombre}
                  inputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "white" } }}
                />

                <Button variant="contained" color="primary" type="submit"
                  disabled={!chofer.ci_chofer || !chofer.licencia || !chofer.nombre}
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
    </>
  );
}
