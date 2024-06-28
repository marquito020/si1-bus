import { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { PanelMenu } from "primereact/panelmenu";
import { Link, Outlet } from "react-router-dom";
import { AppBar, Container, Toolbar, Typography, Button as MuiButton, Box, Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../redux/states/user.state";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import UserIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import FunctionIcon from '@mui/icons-material/Functions';
import RoleIcon from '@mui/icons-material/Group';
import FlotaIcon from '@mui/icons-material/AirportShuttle';
import DriverIcon from '@mui/icons-material/DriveEta';
import TravelIcon from '@mui/icons-material/FlightTakeoff';
import PlaceIcon from '@mui/icons-material/Place';
import TicketIcon from '@mui/icons-material/ConfirmationNumber';
import NoteIcon from '@mui/icons-material/Note';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f4f6f8',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const DefaultLayout = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.user);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem(user);
    dispatch(resetUser());
    window.location.href = "/admin/login";
  };

  const items = [
    {
      label: "Gestión de Usuarios",
      icon: <UserIcon />,
      items: [
        {
          label: <Link to="/empleados" style={{ textDecoration: 'none', color: 'inherit' }}>Empleados</Link>,
          icon: <UserIcon />
        },
        {
          label: <Link to="/clientes" style={{ textDecoration: 'none', color: 'inherit' }}>Clientes</Link>,
          icon: <UserIcon />
        },
        {
          label: <Link to="/roles" style={{ textDecoration: 'none', color: 'inherit' }}>Roles</Link>,
          icon: <RoleIcon />
        },
        {
          label: <Link to="/funcionalidades" style={{ textDecoration: 'none', color: 'inherit' }}>Funcionalidades</Link>,
          icon: <FunctionIcon />
        },
      ],
    },
    {
      label: "Gestión de Flota",
      icon: <FlotaIcon />,
      items: [
        {
          label: <Link to="/flotas" style={{ textDecoration: 'none', color: 'inherit' }}>Flotas</Link>,
          icon: <FlotaIcon />
        },
        {
          label: <Link to="/choferes" style={{ textDecoration: 'none', color: 'inherit' }}>Choferes</Link>,
          icon: <DriverIcon />
        },
      ],
    },
    {
      label: "Gestión de Viajes",
      icon: <TravelIcon />,
      items: [
        {
          label: <Link to="/viajes" style={{ textDecoration: 'none', color: 'inherit' }}>Viajes</Link>,
          icon: <TravelIcon />
        },
        {
          label: <Link to="/lugares" style={{ textDecoration: 'none', color: 'inherit' }}>Lugares</Link>,
          icon: <PlaceIcon />
        },
      ],
    },
    {
      label: "Gestión de Ventas",
      icon: <TicketIcon />,
      items: [
        {
          label: <Link to="/boletos" style={{ textDecoration: 'none', color: 'inherit' }}>Boletos</Link>,
          icon: <TicketIcon />
        },
        {
          label: <Link to="/notas-venta" style={{ textDecoration: 'none', color: 'inherit' }}>Notas de Venta</Link>,
          icon: <NoteIcon />
        },
        {
          label: <Link to="/metodos-pago" style={{ textDecoration: 'none', color: 'inherit' }}>Métodos de Pago</Link>,
          icon: <PaymentIcon />
        },
      ],
    },
    {
      label: "Bitácora",
      icon: <NoteIcon />,
      items: [
        {
          label: <Link to="/bitacoras" style={{ textDecoration: 'none', color: 'inherit' }}>Bitácora</Link>,
          icon: <NoteIcon />
        },
      ],
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Container>
            <Toolbar>
              <MuiButton
                onClick={() => setVisible(true)}
                sx={{ marginRight: '1rem', color: 'white' }}
              >
                <MenuIcon fontSize="large" />
              </MuiButton>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Trans Gutiérrez
              </Typography>
              <MuiButton
                onClick={logout}
                sx={{ textDecoration: 'none', color: 'white' }}
              >
                <LogoutIcon />
                Cerrar Sesión
              </MuiButton>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <Sidebar visible={visible} onHide={() => setVisible(false)} sx={{ width: { xs: '100%', sm: '20rem' } }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: theme.palette.primary.main,
          color: 'white',
        }}>
          <Avatar
            alt="User Avatar"
            src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
            sx={{ width: 80, height: 80, marginBottom: 2 }}
          />
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            {user?.user?.username || user?.username}
          </Typography>
        </Box>
        <PanelMenu model={items} />
      </Sidebar>
      <Box component="main" sx={{ padding: 2 }}>
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}

export default DefaultLayout;
