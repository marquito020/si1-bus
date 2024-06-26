import { AppBar, Toolbar, Typography, Button, Container, Box, Paper, Grid, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

import fondo from '../assets/fondo.jpg';
import seguridad from '../assets/seguridad.jpg';
import comodidad from '../assets/comodidad.jpg';
import precio from '../assets/precio.jpg';
import rutas from '../assets/rutas.jpg';
import experiencia from '../assets/experiencia.jpg';
import compromiso from '../assets/compromiso.jpg';

const LandingPage = () => {
    return (
        <>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Trans Gutierrez
                    </Typography>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/register">Register</Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                    {/* Hero unit */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 4, textAlign: 'center', backgroundImage: `url(${fondo})`, backgroundSize: 'cover', color: 'white' }}>
                            <Typography variant="h4" component="h1" gutterBottom>
                                Bienvenido a Trans Gutierrez
                            </Typography>
                            <Typography variant="h6" component="p" gutterBottom>
                                Viaja con comodidad y seguridad por todo el país. Descubre nuestros servicios de transporte interprovincial.
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Feature sections */}
                    {[{
                        image: seguridad,
                        title: 'Seguridad',
                        description: 'Nuestros autobuses están equipados con lo último en tecnología de seguridad.'
                    }, {
                        image: comodidad,
                        title: 'Comodidad',
                        description: 'Asientos reclinables, Wi-Fi y más para una experiencia de viaje inigualable.'
                    }, {
                        image: precio,
                        title: 'Precio',
                        description: 'Los mejores precios del mercado, con descuentos y promociones constantes.'
                    }].map((feature, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={feature.image}
                                    alt={`${feature.title} en Trans Gutierrez`}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Más Información</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}

                    {/* Additional information section */}
                    <Grid item xs={12}>
                        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
                            Por qué elegir Trans Gutierrez
                        </Typography>
                        <Grid container spacing={2}>
                            {[{
                                image: rutas,
                                title: 'Rutas Extensivas',
                                description: 'Cobertura nacional con múltiples horarios y destinos.'
                            }, {
                                image: experiencia,
                                title: 'Experiencia Única',
                                description: 'Nuestro servicio al cliente es reconocido por su excelencia y atención personalizada.'
                            }, {
                                image: compromiso,
                                title: 'Compromiso Ambiental',
                                description: 'Vehículos eco-amigables que contribuyen a un ambiente más limpio.'
                            }].map((info, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Box textAlign="center">
                                        <Box
                                            component="img"
                                            sx={{
                                                width: '100%',
                                                height: 'auto',
                                                mb: 2
                                            }}
                                            alt={info.title}
                                            src={info.image}
                                        />
                                        <Typography variant="h6" component="h3" gutterBottom sx={{ color: 'text.primary' }}>
                                            {info.title}
                                        </Typography>
                                        <Typography sx={{ color: 'text.secondary' }}>
                                            {info.description}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default LandingPage;