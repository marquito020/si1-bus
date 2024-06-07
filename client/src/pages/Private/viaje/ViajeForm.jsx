// import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// export default function ViajeForm() {
//   const [viaje, setViaje] = useState({
//     fecha: "",
//     hora_Salida: "",
//     hora_Llegada: "",
//     precio: "",
//     placa_Flota: "",
//     cod_Provincia_Destino: "",
//     cod_Departamento_Destino: "",
//     cod_Provincia_Origen: "",
//     cod_Departamento_Origen: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const [editing, setEditing] = useState(false);
//   const [provincias, setProvincias] = useState([]);
//   const [departamentos, setDepartamentos] = useState([]);
//   const [flotas, setFlotas] = useState([]);

//   const navigate = useNavigate();
//   const params = useParams();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setViaje({
//       ...viaje,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     console.log("Datos enviados:", viaje); // Añadir esto para ver los datos que se están enviando

//     try {
//       if (editing) {
//         await fetch(`http://localhost:3700/api/viajes/${params.cod}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(viaje),
//         });
//       } else {
//         await fetch("http://localhost:3700/api/viajes", {
//           method: "POST",
//           body: JSON.stringify(viaje),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//       }

//       setLoading(false);
//       navigate("/viajes");
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setLoading(false);
//     }
//   };

//   const loadViaje = async (cod) => {
//     const res = await fetch(`http://localhost:3700/api/viajes/${cod}`);
//     const data = await res.json();
//     setViaje({
//       fecha: data.fecha,
//       hora_Salida: data.hora_Salida,
//       hora_Llegada: data.hora_Llegada,
//       precio: data.precio,
//       placa_Flota: data.placa_Flota,
//       cod_Provincia_Destino: data.cod_Provincia_Destino,
//       cod_Departamento_Destino: data.cod_Departamento_Destino,
//       cod_Provincia_Origen: data.cod_Provincia_Origen,
//       cod_Departamento_Origen: data.cod_Departamento_Origen
//     });
//     setEditing(true);
//   };

//   const loadProvincias = async () => {
//     const res = await fetch('http://localhost:3700/api/provincias');
//     const data = await res.json();
//     setProvincias(data);
//   };

//   const loadDepartamentos = async () => {
//     const res = await fetch('http://localhost:3700/api/departamentos');
//     const data = await res.json();
//     setDepartamentos(data);
//   };

//   const loadFlotas = async () => {
//     const res = await fetch('http://localhost:3700/api/flotas');
//     const data = await res.json();
//     setFlotas(data);
//   };

//   useEffect(() => {
//     if (params.cod) {
//       loadViaje(params.cod);
//     }
//     loadProvincias();
//     loadDepartamentos();
//     loadFlotas();
//   }, [params.cod]);

//   const isFormValid = () => {
//     return viaje.fecha && viaje.hora_Salida && viaje.hora_Llegada && viaje.precio && viaje.placa_Flota &&
//            viaje.cod_Departamento_Origen && viaje.cod_Provincia_Origen &&
//            viaje.cod_Departamento_Destino && viaje.cod_Provincia_Destino;
//   };

//   return (
//     <Grid container direction="column" alignItems="center" justifyContent="center">
//       <Grid item xs={10}>
//         <Card sx={{ mt: 10 }} style={{ background: '#1e272e', padding: '1rem' }}>
//           <Typography variant="h5" textAlign="center" color="white">
//             {editing ? "Editar Viaje" : "Crear Viaje"}
//           </Typography>
//           <CardContent>
//             <form onSubmit={handleSubmit}>
//               <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between' }}>
//                 <TextField
//                   variant="filled"
//                   label="Fecha"
//                   name="fecha"
//                   type="date"
//                   onChange={handleChange}
//                   value={viaje.fecha}
//                   InputLabelProps={{ shrink: true, style: { color: "white" } }}
//                   inputProps={{ style: { color: "white" } }}
//                   fullWidth
//                   sx={{ flex: '1 1 45%' }}
//                 />
//                 <TextField
//                   variant="filled"
//                   label="Hora de Salida"
//                   name="hora_Salida"
//                   type="time"
//                   onChange={handleChange}
//                   value={viaje.hora_Salida}
//                   InputLabelProps={{ shrink: true, style: { color: "white" } }}
//                   inputProps={{ style: { color: "white" } }}
//                   fullWidth
//                   sx={{ flex: '1 1 45%' }}
//                 />
//                 <TextField
//                   variant="filled"
//                   label="Hora de Llegada"
//                   name="hora_Llegada"
//                   type="time"
//                   onChange={handleChange}
//                   value={viaje.hora_Llegada}
//                   InputLabelProps={{ shrink: true, style: { color: "white" } }}
//                   inputProps={{ style: { color: "white" } }}
//                   fullWidth
//                   sx={{ flex: '1 1 45%' }}
//                 />
//                 <TextField
//                   variant="filled"
//                   label="Precio"
//                   name="precio"
//                   onChange={handleChange}
//                   value={viaje.precio}
//                   inputProps={{ style: { color: "white" } }}
//                   InputLabelProps={{ style: { color: "white" } }}
//                   fullWidth
//                   sx={{ flex: '1 1 45%' }}
//                 />
//                 <FormControl variant="filled" fullWidth sx={{ flex: '1 1 45%' }}>
//                   <InputLabel style={{ color: "white" }}>Placa de Flota</InputLabel>
//                   <Select
//                     name="placa_Flota"
//                     value={viaje.placa_Flota}
//                     onChange={handleChange}
//                     inputProps={{ style: { color: "white" } }}
//                     sx={{ color: "white" }}
//                   >
//                     {flotas.map((flota) => (
//                       <MenuItem key={flota.placa} value={flota.placa} style={{ color: "black" }}>
//                         {flota.placa}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <FormControl variant="filled" fullWidth sx={{ flex: '1 1 45%' }}>
//                   <InputLabel style={{ color: "white" }}>Departamento de Origen</InputLabel>
//                   <Select
//                     name="cod_Departamento_Origen"
//                     value={viaje.cod_Departamento_Origen}
//                     onChange={handleChange}
//                     inputProps={{ style: { color: "white" } }}
//                     sx={{ color: "white" }}
//                   >
//                     {departamentos.map((departamento) => (
//                       <MenuItem key={departamento.cod} value={departamento.cod} style={{ color: "black" }}>
//                         {departamento.nombre}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <FormControl variant="filled" fullWidth sx={{ flex: '1 1 45%' }}>
//                   <InputLabel style={{ color: "white" }}>Provincia de Origen</InputLabel>
//                   <Select
//                     name="cod_Provincia_Origen"
//                     value={viaje.cod_Provincia_Origen}
//                     onChange={handleChange}
//                     inputProps={{ style: { color: "white" } }}
//                     sx={{ color: "white" }}
//                   >
//                     {provincias.map((provincia) => (
//                       <MenuItem key={provincia.cod} value={provincia.cod} style={{ color: "black" }}>
//                         {provincia.nombre}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <FormControl variant="filled" fullWidth sx={{ flex: '1 1 45%' }}>
//                   <InputLabel style={{ color: "white" }}>Departamento de Destino</InputLabel>
//                   <Select
//                     name="cod_Departamento_Destino"
//                     value={viaje.cod_Departamento_Destino}
//                     onChange={handleChange}
//                     inputProps={{ style: { color: "white" } }}
//                     sx={{ color: "white" }}
//                   >
//                     {departamentos.map((departamento) => (
//                       <MenuItem key={departamento.cod} value={departamento.cod} style={{ color: "black" }}>
//                         {departamento.nombre}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <FormControl variant="filled" fullWidth sx={{ flex: '1 1 45%' }}>
//                   <InputLabel style={{ color: "white" }}>Provincia de Destino</InputLabel>
//                   <Select
//                     name="cod_Provincia_Destino"
//                     value={viaje.cod_Provincia_Destino}
//                     onChange={handleChange}
//                     inputProps={{ style: { color: "white" } }}
//                     sx={{ color: "white" }}
//                   >
//                     {provincias.map((provincia) => (
//                       <MenuItem key={provincia.cod} value={provincia.cod} style={{ color: "black" }}>
//                         {provincia.nombre}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Box>
//               <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
//                 <Button 
//                   variant="contained" 
//                   color="primary" 
//                   type="submit"
//                   disabled={!isFormValid()}
//                 >
//                   {loading ? (
//                     <CircularProgress color="inherit" size={24} />
//                   ) : (
//                     editing ? "Actualizar" : "Crear"
//                   )}
//                 </Button>
//               </Box>
//             </form>
//           </CardContent>
//         </Card>
//       </Grid>
//     </Grid>
//   );
// }


import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URL_BACKEND } from "../../../constants/routes";

export default function ViajeForm() {
  const [viaje, setViaje] = useState({
    fecha: "",
    hora_Salida: "",
    hora_Llegada: "",
    precio: "",
    placa_Flota: "",
    cod_Provincia_Destino: "",
    cod_Departamento_Destino: "",
    cod_Provincia_Origen: "",
    cod_Departamento_Origen: ""
  });
  const [loading, setLoading] = useState(false);
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

    console.log("Datos enviados:", viaje);

    try {
      if (editing) {
        /* await fetch(`http://localhost:3700/api/viajes/${params.cod}`, { */
        await fetch(`${URL_BACKEND}/viajes/${params.cod}`, { // Cambiar por esta línea
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(viaje),
        });
      } else {
        console.log("Datos enviados:", viaje);
        await fetch(`${URL_BACKEND}/viajes`, { // Cambiar por esta línea
          method: "POST",
          body: JSON.stringify(viaje),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error en la petición");
        }).then((data) => {
          console.log(data);
        }).catch((error) => {
          console.error("Error en la petición:", error);
        });
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
    setViaje({
      fecha: data.fecha,
      hora_Salida: data.hora_Salida,
      hora_Llegada: data.hora_Llegada,
      precio: data.precio,
      placa_Flota: data.placa_Flota,
      cod_Provincia_Destino: data.cod_Provincia_Destino,
      cod_Departamento_Destino: data.cod_Departamento_Destino,
      cod_Provincia_Origen: data.cod_Provincia_Origen,
      cod_Departamento_Origen: data.cod_Departamento_Origen
    });
    setEditing(true);
  };

  const loadProvincias = async () => {
    const res = await fetch(`${URL_BACKEND}/provincias`);
    const data = await res.json();
    console.log(data);
    setProvincias(data);
  };

  const loadDepartamentos = async () => {
    const res = await fetch(`${URL_BACKEND}/departamentos`);
    const data = await res.json();
    setDepartamentos(data);
  };

  const loadFlotas = async () => {
    const res = await fetch(`${URL_BACKEND}/flotas`);
    const data = await res.json();
    setFlotas(data);
  };

  useEffect(() => {
    if (params.cod) {
      loadViaje(params.cod);
    }
    loadProvincias();
    loadDepartamentos();
    loadFlotas();
  }, [params.cod]);

  const isFormValid = () => {
    return viaje.fecha && viaje.hora_Salida && viaje.hora_Llegada && viaje.precio && viaje.placa_Flota &&
           viaje.cod_Departamento_Origen && viaje.cod_Provincia_Origen &&
           viaje.cod_Departamento_Destino && viaje.cod_Provincia_Destino;
  };

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
      <Grid item xs={10}>
        <Card sx={{ mt: 10 }} style={{ background: '#1e272e', padding: '1rem' }}>
          <Typography variant="h5" textAlign="center" color="white">
            {editing ? "Editar Viaje" : "Crear Viaje"}
          </Typography>
          <CardContent>
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
                  name="hora_Salida"
                  type="time"
                  onChange={handleChange}
                  value={viaje.hora_Salida}
                  InputLabelProps={{ shrink: true, style: { color: "white" } }}
                  inputProps={{ style: { color: "white" } }}
                  fullWidth
                  sx={{ flex: '1 1 45%' }}
                />
                <TextField
                  variant="filled"
                  label="Hora de Llegada"
                  name="hora_Llegada"
                  type="time"
                  onChange={handleChange}
                  value={viaje.hora_Llegada}
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
                    name="placa_Flota"
                    value={viaje.placa_Flota}
                    onChange={handleChange}
                    inputProps={{ style: { color: "white" } }}
                    sx={{ color: "white" }}
                  >
                    {flotas.map((flota) => (
                      <MenuItem key={flota.placa} value={flota.placa} style={{ color: "black" }}>
                        {flota.placa} - {flota.marca} {flota.modelo}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl variant="filled" fullWidth sx={{ flex: '1 1 45%' }}>
                  <InputLabel style={{ color: "white" }}>Departamento de Origen</InputLabel>
                  <Select
                    name="cod_Departamento_Origen"
                    value={viaje.cod_Departamento_Origen}
                    onChange={handleChange}
                    inputProps={{ style: { color: "white" } }}
                    sx={{ color: "white" }}
                  >
                    {departamentos.map((departamento) => (
                      <MenuItem key={departamento.cod} value={departamento.cod} style={{ color: "black" }}>
                        {departamento.nombre} - {departamento.cod}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl variant="filled" fullWidth sx={{ flex: '1 1 45%' }}>
                  <InputLabel style={{ color: "white" }}>Provincia de Origen</InputLabel>
                  <Select
                    name="cod_Provincia_Origen"
                    value={viaje.cod_Provincia_Origen}
                    onChange={handleChange}
                    inputProps={{ style: { color: "white" } }}
                    sx={{ color: "white" }}
                  >
                    {provincias.map((provincia) => (
                      <MenuItem key={provincia.cod} value={provincia.cod} style={{ color: "black" }}>
                        {provincia.nombre} - {provincia.cod}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl variant="filled" fullWidth sx={{ flex: '1 1 45%' }}>
                  <InputLabel style={{ color: "white" }}>Departamento de Destino</InputLabel>
                  <Select
                    name="cod_Departamento_Destino"
                    value={viaje.cod_Departamento_Destino}
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
                    name="cod_Provincia_Destino"
                    value={viaje.cod_Provincia_Destino}
                    onChange={handleChange}
                    inputProps={{ style: { color: "white" } }}
                    sx={{ color: "white" }}
                  >
                    {provincias.map((provincia) => (
                      <MenuItem key={provincia.cod} value={provincia.cod} style={{ color: "black" }}>
                        {provincia.nombre}
                      </MenuItem>
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
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
