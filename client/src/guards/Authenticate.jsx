import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

/* import { RootState } from "../redux/store"; */
import { PublicRoutes } from "../constants/routes";

function Authenticate() {
    const user = useSelector((state) => state.user);
    console.log(user);

    if (user.accessToken === "" || user.user === "") {
        return <Navigate to={PublicRoutes.LOGIN} replace={true} />;
    }

    return <Outlet />;
}

export default Authenticate;
