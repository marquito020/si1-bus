import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Trans Gutierrez
                </Typography>
                {currentPath === '/register' ? (
                    <Button color="inherit" component={Link} to="/login">
                        Login
                    </Button>
                ) : (
                    <Button color="inherit" component={Link} to="/register">
                        Register
                    </Button>
                )}
                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
