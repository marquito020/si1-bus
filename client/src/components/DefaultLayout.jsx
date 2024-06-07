import { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { PanelMenu } from "primereact/panelmenu";
import { Link } from "react-router-dom";
import { AppBar, Container, Toolbar, Typography, Button as MuiButton, Box, Avatar } from "@mui/material";
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../redux/states/user.state";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import UserIcon from '@mui/icons-material/Person';
import FunctionIcon from '@mui/icons-material/Functions';
import RoleIcon from '@mui/icons-material/Group';
import FlotaIcon from '@mui/icons-material/AirportShuttle';
import DriverIcon from '@mui/icons-material/DriveEta';
import TravelIcon from '@mui/icons-material/FlightTakeoff';
import PlaceIcon from '@mui/icons-material/Place';
import SupplierIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import NoteIcon from '@mui/icons-material/Note';
import InvoiceIcon from '@mui/icons-material/Receipt';

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
    window.location.href = "/login";
  };

  const items = [
    {
      label: "Gestion de Usuario",
      icon: <UserIcon />,
      items: [
        { label: <Link to="/users">Usuario</Link>, icon: <UserIcon /> },
        { label: <Link to="/funcionalidades">Funcionalidad</Link>, icon: <FunctionIcon /> },
        { label: <Link to="/roles">Rol</Link>, icon: <RoleIcon /> },
        { label: <Link to="/flotas">Flota</Link>, icon: <FlotaIcon /> },
        { label: <Link to="/choferes">Chofer</Link>, icon: <DriverIcon /> },
      ],
    },
    {
      label: "Gestion de Viaje",
      icon: <TravelIcon />,
      items: [
        { label: <Link to="/viajes">Viaje</Link>, icon: <TravelIcon /> },
        { label: <Link to="/lugares">Lugar</Link>, icon: <PlaceIcon /> },
        { label: <Link to="/proveedores">Proveedor</Link>, icon: <SupplierIcon /> },
        { label: <Link to="/inventarios">Inventario</Link>, icon: <InventoryIcon /> },
        { label: <Link to="/nota-de-entrada">Nota de Entrada</Link>, icon: <NoteIcon /> },
        { label: <Link to="/facturas">Facturas</Link>, icon: <InvoiceIcon /> },
      ],
    },
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
          backgroundColor: 'primary.main',
          color: 'white',
        }}>
          <Avatar
            alt="User Avatar"
            src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
            sx={{ width: 80, height: 80, marginBottom: 2 }}
          />
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            {user.username}
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
