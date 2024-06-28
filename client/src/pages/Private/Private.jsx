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

const Boletos = lazy(() => import('./pasaje/BoletoList'));
const BoletoForm = lazy(() => import('./pasaje/BoletoForm'));
const BoletoView = lazy(() => import('./pasaje/BoletoView'));

const Roles = lazy(() => import('./rol/RolList'));
const RolForm = lazy(() => import('./rol/RolForm'));

const MetodoPagos = lazy(() => import('./metodo_pago/MetodoPagoList'));
const MetodoPagoForm = lazy(() => import('./metodo_pago/MetodoPagoForm'));

const Empleados = lazy(() => import('./empleado/EmpleadoList'));
const EmpleadoForm = lazy(() => import('./empleado/EmpleadoForm'));

const NotaVentas = lazy(() => import('./nota_venta/NotaVentaList'));
const NotaVentaView = lazy(() => import('./nota_venta/NotaVentaView'));

const BitacoraList = lazy(() => import('./bitacora/BitacoraList'));


import DefaultLayoutClient from "../../components/DefaultLayoutClient";

const CompraCliente = lazy(() => import('../Client/compra/CompraCliente'));

const BoletoClienteForm = lazy(() => import('../Client/compra/BoletoClienteForm'));
const BoletoClienteView = lazy(() => import('../Client/compra/BoletoClienteView'));

const NotaVentaClienteView = lazy(() => import('../Client/compra/NotaVentaClienteView'));

const Reservas = lazy(() => import('../Client/reserva/ReservaCliente'));
const ReservaForm = lazy(() => import('../Client/reserva/ReservaClienteForm'));
const ReservaView = lazy(() => import('../Client/reserva/ReservaClienteView'));

function Private() {
    return (
        <Routes>
            <Route element={<DefaultLayout />}>

                {/* Lugares */}
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


                {/* Flotas */}
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


                {/* Choferes */}
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


                {/* Viajes */}
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


                {/* Clientes */}
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


                {/* Boletos */}
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


                {/* Roles */}
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


                {/* Metodo de pago */}
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

                {/* Empleados */}
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

                {/* Nota Ventas */}
                <Route path={PrivateRoutes.NOTAS_VENTA} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <NotaVentas />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.NOTAS_VENTA_VIEW} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <NotaVentaView />
                    </Suspense>
                } />

                {/* Bitacora */}
                <Route path={PrivateRoutes.BITACORAS} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <BitacoraList />
                    </Suspense>
                } />
            </Route>
            <Route element={<DefaultLayoutClient />}>
                <Route path={PrivateRoutes.COMPRAS} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <CompraCliente />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.BOLETOS_CLIENTE} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <BoletoClienteForm />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.BOLETOS_CLIENTE_VIEW} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <BoletoClienteView />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.NOTAS_VENTA_CLIENTE} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <NotaVentaClienteView />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.RESERVAS} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <Reservas />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.RESERVAS_CREATE} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <ReservaForm />
                    </Suspense>
                } />
                <Route path={PrivateRoutes.RESERVAS_VIEW} element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <ReservaView />
                    </Suspense>
                } />
            </Route>
        </Routes>
    )
}

export default Private;
