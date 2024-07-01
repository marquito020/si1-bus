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
      label: 'Compras',
      icon: 'pi pi-fw pi-shopping-cart',
      command: () => { window.location.href = '/compras'; }
    },
    {
      label: 'Reservas',
      icon: 'pi pi-fw pi-calendar',
      command: () => { window.location.href = '/reservas'; }
    },
    {
      label: 'Nota de Venta',
      icon: 'pi pi-fw pi-file',
      command: () => { window.location.href = '/nota-venta-cliente'; }
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
            {user?.user?.email || user?.email}
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
