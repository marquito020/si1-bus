import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "../../constants/routes";
import DefaultLayout from "../../components/DefaultLayout";

const Lugares = lazy(() => import('./lugar/LugarList'));
const LugarForm = lazy(() => import('./lugar/LugarForm'));

const Flotas = lazy(() => import('./flota/FlotaList'));
const FlotaForm = lazy(() => import('./flota/FlotaForm'));

const Choferes = lazy(() => import('./chofer/ChoferList'));
const ChoferForm = lazy(() => import('./chofer/ChoferForm'));

const Viajes = lazy(() => import('./viaje/ViajeList'));
const ViajeForm = lazy(() => import('./viaje/ViajeForm'));

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
            </Route>
        </Routes>
    )
}

export default Private;
