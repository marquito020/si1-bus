
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import TaskForm from "./components/TaskForm";
// import TasksList from "./components/TasksList";
// import Navbar from "./components/Navbar";
// import 'primereact/resources/themes/saga-blue/theme.css';
// /* Importa los componentes principales de PrimeReact */
// import 'primereact/resources/primereact.min.css';
// /* Importa los iconos de PrimeIcons */
// import 'primeicons/primeicons.css';
// /* Importa PrimeFlex para utilidades CSS (opcional pero recomendado) */
// import 'primeflex/primeflex.css';
// import ChoferForm from './components/ChoferForm';
// import ChoferList from './pages/ChoferList';
// import FlotaForm from './components/FlotaForm';
// import FlotaList from './pages/FlotaList'
// import {Container} from "@mui/material"
// import viajelist from './components/ViajeForm'
// import { PrimeReactProvider } from "primereact/api";
// import ViajeForm from "./components/ViajeForm";
// import ViajeList from './pages/ViajeList'

// import LugarForm from "./components/LugarForm";
// import LugarList from "./pages/LugarList";
// //import {ChoferDemo} from './pages/TableChoferPage';

// function App() {
//   return (
//     <BrowserRouter>
//     <Container>
//       <main className="container mx-auto px-20">
//            <Navbar style={{ width: '50%', margin: 'auto' }} />
//         <Routes>
//           {/* <Route index path="/tasks/list" element={<TasksList />} />
//           <Route path="/tasks/new" element={<TaskForm />} />
//           <Route path="/tasks/:id/edit" element={<TaskForm />} /> */}











//           <Route path="/choferes" element={<ChoferList />} />
//          < Route path="/choferes/new" element={<ChoferForm />} />
//           <Route path="/choferes/:id/edit" element={<ChoferForm />} />
//           <Route path="/choferes/list" element={<ChoferList />} />


//         <Route path="/flotas" element={<FlotaList />} />
//         <Route path="/flotas/new" element={<FlotaForm />} />
//         <Route path="/flotas/:placa/edit" element={<FlotaForm />} />

//         <Route path="/viajes" element={<ViajeList/>} />
//         <Route path="/viajes/list" element={<ViajeList/>} />
//         <Route path="/viajes/new" element={<ViajeForm/>} />



//         <Route path="/lugar" element={<LugarList/>} />
//         <Route path="/lugar/List" element={<LugarList/>} />
//         {/* <Route path="/viajes/Form" element={<LugarForm/>} /> */}
//         <Route path="/lugar/new" element={<LugarForm/>} />


//         </Routes>
//       </main>
//       </Container>
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
/* import { Container } from "@mui/material"; */
import { Provider } from "react-redux";

import LoginAdmin from './pages/LoginAdmin'
import LandingPage from "./pages/Landing";
import { store } from "./redux/store";
import Authenticate from "./guards/Authenticate";
import { PrivateRoutes } from "./constants/routes";
import Private from "./pages/Private/Private";
import LoginCliente from "./pages/LoginCliente";
/* import Navbar from "./components/DefaultLayout"; */

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<LandingPage />} />
          <Route index path="/login" element={<LoginCliente />} />
          <Route index path="/admin/login" element={<LoginAdmin />} />
          <Route element={<Authenticate />}>
            <Route
              path={`${PrivateRoutes.PRIVATE}/*`}
              element={<Private />}
            />
          </Route>
          {/* <Route element={<Authenticate />}>
            <Route
              path={`${PrivateRoutes.PRIVATE}/*`}
              element={<PrivateCliente />}
            />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
