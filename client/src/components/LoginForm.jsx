import { Box, Button, CardContent, TextField, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/states/user.state";
import { URL_BACKEND } from "../constants/routes";

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [messageError, setMessageError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const elements = e.currentTarget.elements;
        const userName = elements.userName.value;
        const password = elements.password.value;

        setLoading(true);
        setMessageError("");

        try {
            const response = await fetch(`${URL_BACKEND}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: userName, password: password }),
            });
            const data = await response.json();
            setLoading(false);

            if (data.accessToken) {
                dispatch(createUser(data));
                navigate("/choferes");
            } else if (data.error) {
                setMessageError(data.error);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setLoading(false);
            setMessageError("Usuario o contraseña incorrectos.");
        }
    }

    return (
        <Box>
            <CardContent>
                {messageError && (
                    <Typography
                        color="error"
                        align="center"
                        gutterBottom
                    >
                        {messageError}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <Box mb={4}>
                        <Typography variant="subtitle1" gutterBottom>
                            Nombre de Usuario
                        </Typography>
                        <TextField
                            fullWidth
                            type="text"
                            placeholder="Nombre de Usuario"
                            name="userName"
                            variant="outlined"
                        />
                    </Box>

                    <Box mb={4}>
                        <Typography variant="subtitle1" gutterBottom>
                            Contraseña
                        </Typography>
                        <TextField
                            fullWidth
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            variant="outlined"
                        />
                    </Box>

                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        mb={2}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Iniciar Sesión"}
                        </Button>
                    </Box>

                    <Box mt={4} textAlign="center">
                        <Typography>
                            No tienes una cuenta?{" "}
                            <Typography component="span" color="primary" style={{ cursor: 'pointer' }}>
                                Regístrate
                            </Typography>
                        </Typography>
                    </Box>
                </form>
            </CardContent>
        </Box>
    );
}

export default LoginForm;
