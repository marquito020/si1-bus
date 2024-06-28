import { useState } from 'react';
import {
    Container, Box, TextField, Button, Typography, Paper, Avatar, CircularProgress, Alert, Grid
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { URL_BACKEND } from '../constants/routes';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { createUser } from '../redux/states/user.state';
import { useDispatch } from 'react-redux';

const RegisterCliente = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        ci: '',
        telefono: '',
        fecha_nacimiento: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [messageSuccess, setMessageSuccess] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessageError('');
        setMessageSuccess('');

        try {
            const response = await fetch(`${URL_BACKEND}/clientes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setLoading(false);

            console.log('Data:', data);

            if (data.accessToken) {
                setMessageSuccess('Cliente registrado exitosamente');
                dispatch(createUser(data));
                navigate('/compras');
            } else if (data.error) {
                setMessageError(data.error);
            }
        } catch (error) {
            console.error('Error en registro:', error);
            setMessageError('Hubo un error al intentar registrar el cliente. Por favor, intenta de nuevo.');
            setLoading(false);
        }
    };

    return (
        <>
        <Navbar />
        <Container component="main" maxWidth="sm">
            <Paper elevation={6} sx={{ padding: 4, mt: 8 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <PersonAddIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registrar Cliente
                    </Typography>
                    {messageError && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{messageError}</Alert>}
                    {messageSuccess && <Alert severity="success" sx={{ width: '100%', mt: 2 }}>{messageSuccess}</Alert>}
                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="nombre"
                                    required
                                    fullWidth
                                    id="nombre"
                                    label="Nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="apellido"
                                    required
                                    fullWidth
                                    id="apellido"
                                    label="Apellido"
                                    value={formData.apellido}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="ci"
                                    fullWidth
                                    id="ci"
                                    label="Cédula de Identidad"
                                    value={formData.ci}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="telefono"
                                    fullWidth
                                    id="telefono"
                                    label="Teléfono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="fecha_nacimiento"
                                    fullWidth
                                    id="fecha_nacimiento"
                                    label="Fecha de Nacimiento"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={formData.fecha_nacimiento}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="email"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Correo Electrónico"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="password"
                                    required
                                    fullWidth
                                    id="password"
                                    label="Contraseña"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Registrar'}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
        </>
    );
};

export default RegisterCliente;
