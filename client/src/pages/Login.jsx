import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import post from '../assets/post.png';
import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from "@mui/material";

function Login() {
    return (
        <>
            <div style={
                {
                    backgroundImage: `url("https://images.unsplash.com/photo-1557683316-973673baf926")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                    width: "100%",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    zIndex: "-1",
                }
            }>
                <div style={
                    {
                        //Center
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                        width: "100%",
                    }
                }>
                    <div >
                        <div >
                            <Link className="mb-5.5 inline-block" to="/">
                                <h1 className="text-4xl font-bold text-black dark:text-white">
                                    Trans Gutiérrez
                                </h1>
                            </Link>

                            <p className="2xl:px-20">
                                ¡Bienvenido! Inicia sesión para acceder al panel de control.
                            </p>

                            <img style={
                                {
                                    width: "50%",
                                    height: "auto",

                                }
                            } src={post} alt="post" />

                        </div>
                    </div>

                    <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                            {/* <span className="mb-1.5 block font-medium">Start for free</span> */}
                            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                                Ingrear al sistema
                            </h2>
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
