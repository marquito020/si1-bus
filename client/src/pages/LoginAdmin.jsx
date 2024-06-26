import { Box, Paper, Typography, Grid } from "@mui/material";
import LoginForm from '../components/LoginForm';
import post from '../assets/post.png';

function LoginAdmin() {
    return (
        <Box
            sx={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1557683316-973673baf926")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: -1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p : "5%",
                '&::before': {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    zIndex: -1,
                }
            }}
        >
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12} md={6}>
                    <Box textAlign={{ xs: "center", md: "left" }} color="white">
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            Trans Gutiérrez
                        </Typography>

                        <Typography variant="body1" sx={{ px: { md: 5 } }} gutterBottom>
                            ¡Bienvenido! Inicia sesión para acceder al panel de control.
                        </Typography>
                        <Box
                            component="img"
                            src={post}
                            alt="post"
                            sx={{
                                width: { xs: "80%", md: "50%" },
                                height: "auto",
                                mt: 4,
                                mx: { xs: "auto", md: 0 },
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: { xs: 3, md: 5 }, mx: { xs: 2, md: 0 } }}>
                        <Typography variant="h5" fontWeight="bold" mb={3}>
                            Ingresar al sistema
                        </Typography>
                        <LoginForm />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default LoginAdmin;
