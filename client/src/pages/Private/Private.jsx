import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "../../constants/routes";
import DefaultLayout from "../../components/DefaultLayout";

const Lugares = lazy(() => import('./lugar/LugarList'));
const LugarForm = lazy(() => import('./lugar/LugarForm'));

const Flotas = lazy(() => import('./flota/FlotaList'));
const FlotaForm = lazy(() => import('./flota/FlotaForm'));
const FlotaAsiento = lazy(() => import('./flota/FlotaAsiento'));

const Choferes = lazy(() => import('./chofer/ChoferList'));
const ChoferForm = lazy(() => import('./chofer/ChoferForm'));

const Viajes = lazy(() => import('./viaje/ViajeList'));
const ViajeForm = lazy(() => import('./viaje/ViajeForm'));

const Clientes = lazy(() => import('./cliente/ClienteList'));
const ClienteForm = lazy(() => import('./cliente/ClienteForm'));

const Boletos = lazy(() => import('./boleto/BoletoList'));
const BoletoForm = lazy(() => import('./boleto/BoletoForm'));
const BoletoView = lazy(() => import('./boleto/BoletoView'));

const Roles = lazy(() => import('./rol/RolList'));
const RolForm = lazy(() => import('./rol/RolForm'));

const MetodoPagos = lazy(() => import('./metodo_pago/MetodoPagoList'));
const MetodoPagoForm = lazy(() => import('./metodo_pago/MetodoPagoForm'));

const Empleados = lazy(() => import('./empleado/EmpleadoList'));
const EmpleadoForm = lazy(() => import('./empleado/EmpleadoForm'));

function Private() {
    return (
        <Routes>
            <Route element={<DefaultLayout />}>
                <Route path={PrivateRoutes.LUGARES} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <Lugares />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.LUGARES_CREATE} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <LugarForm />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.LUGARES_EDIT} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <LugarForm />
                    </Suspense>
                } />

                <Route path={PrivateRoutes.FLOTAS} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <Flotas />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.FLOTAS_CREATE} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <FlotaForm />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.FLOTAS_EDIT} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <FlotaForm />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.FLOTAS_ASIENTOS} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <FlotaAsiento />
                    </Suspense>
                } />

                <Route path={PrivateRoutes.CHOFERES} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <Choferes />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.CHOFERES_CREATE} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <ChoferForm />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.CHOFERES_EDIT} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <ChoferForm />
                    </Suspense>
                } />

                <Route path={PrivateRoutes.VIAJES} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <Viajes />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.VIAJES_CREATE} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <ViajeForm />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.VIAJES_EDIT} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <ViajeForm />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.CLIENTES} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <Clientes />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.CLIENTES_CREATE} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <ClienteForm />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.CLIENTES_EDIT} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <ClienteForm />
                    </Suspense>
                } />


                <Route path={PrivateRoutes.BOLETOS} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <Boletos />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.BOLETOS_CREATE} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <BoletoForm />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.BOLETOS_EDIT} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <BoletoForm />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.BOLETOS_VIEW} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <BoletoView />
                    </Suspense>
                } />


                <Route path={PrivateRoutes.ROLES} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <Roles />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.ROLES_CREATE} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <RolForm />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.ROLES_EDIT} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <RolForm />
                    </Suspense>
                } />


                <Route path={PrivateRoutes.METODOS_PAGO} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <MetodoPagos />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.METODOS_PAGO_CREATE} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <MetodoPagoForm />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.METODOS_PAGO_EDIT} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <MetodoPagoForm />
                    </Suspense>
                } />


                <Route path={PrivateRoutes.EMPLEADOS} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <Empleados />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.EMPLEADOS_CREATE} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <EmpleadoForm />
                    </Suspense>
                } />
            </Route>
        </Routes>
    )
}

export default Private;
