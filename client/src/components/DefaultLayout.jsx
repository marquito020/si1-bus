import { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { PanelMenu } from "primereact/panelmenu";
import { Outlet } from "react-router-dom";
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
          label: 'Empleados',
          icon: <UserIcon />,
          command: () => { window.location.href = '/empleados'; }
        },
        {
          label: 'Clientes',
          icon: <UserIcon />,
          command: () => { window.location.href = '/clientes'; }
        },
        {
          label: 'Roles',
          icon: <RoleIcon />,
          command: () => { window.location.href = '/roles'; }
        },
        {
          label: 'Funcionalidades',
          icon: <FunctionIcon />,
          command: () => { window.location.href = '/funcionalidades'; }
        },
      ],
    },
    {
      label: "Gestión de Flota",
      icon: <FlotaIcon />,
      items: [
        {
          label: 'Flotas',
          icon: <FlotaIcon />,
          command: () => { window.location.href = '/flotas'; }
        },
        {
          label: 'Choferes',
          icon: <DriverIcon />,
          command: () => { window.location.href = '/choferes'; }
        },
      ],
    },
    {
      label: "Gestión de Viajes",
      icon: <TravelIcon />,
      items: [
        {
          label: 'Viajes',
          icon: <TravelIcon />,
          command: () => { window.location.href = '/viajes'; }
        },
        {
          label: 'Lugares',
          icon: <PlaceIcon />,
          command: () => { window.location.href = '/lugares'; }
        },
      ],
    },
    {
      label: "Gestión de Ventas",
      icon: <TicketIcon />,
      items: [
        {
          label: 'Boletos',
          icon: <TicketIcon />,
          command: () => { window.location.href = '/boletos'; }
        },
        {
          label: 'Notas de Venta',
          icon: <NoteIcon />,
          command: () => { window.location.href = '/notas-venta'; }
        },
        {
          label: 'Métodos de Pago',
          icon: <PaymentIcon />,
          command: () => { window.location.href = '/metodos-pago'; }
        },
      ],
    },
    {
      label: "Bitácora",
      icon: <NoteIcon />,
      items: [
        {
          label: 'Bitácora',
          icon: <NoteIcon />,
          command: () => { window.location.href = '/bitacoras'; }
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
