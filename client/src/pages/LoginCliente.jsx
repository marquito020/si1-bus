import { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Paper, Avatar, CircularProgress, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { URL_BACKEND } from '../constants/routes';
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/states/user.state';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import post from '../assets/post.png';

const LoginCliente = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [messageError, setMessageError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        setMessageError(''); // Resetear mensaje de error al intentar iniciar sesión

        try {
            const response = await fetch(`${URL_BACKEND}/loginCliente`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            setLoading(false);

            if (data.accessToken) {
                /* console.log('Data:', data); */
                dispatch(createUser(data));
                navigate('/compras');
            } else if (data.error) {
                setMessageError(data.error);
            }
        } catch (error) {
            console.error('Error en login:', error);
            setMessageError('Hubo un error al intentar iniciar sesión. Por favor, intenta de nuevo.');
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <Container component="main" maxWidth="xs">
                <Paper elevation={6} sx={{ padding: 4, mt: 8 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <img src={post} alt="Logo" style={{ width: '150px', marginBottom: '16px' }} />
                        <Typography component="h1" variant="h5">
                            Iniciar Sesión
                        </Typography>
                        {messageError && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{messageError}</Alert>}
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Correo Electrónico"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleLogin}
                                disabled={loading} // Deshabilitar botón mientras se está cargando
                            >
                                {loading ? <CircularProgress size={24} /> : 'Iniciar Sesión'}
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </>
    );
};

export default LoginCliente;
