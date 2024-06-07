export const PublicRoutes = {
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/",
  LANDINGS: "/landing",
  NOT_FOUND: "/404",
  CREAR: "/new",
  EDITAR: "/edit",
};

export const PrivateRoutes = {
  PRIVATE: "/",

  CHOFERES: "/choferes",
  CHOFERES_CREATE: "/choferes" + PublicRoutes.CREAR,
  CHOFERES_EDIT: "/choferes" + "/:id" + PublicRoutes.EDITAR,

  FLOTAS: "/flotas",
  FLOTAS_CREATE: "/flotas" + PublicRoutes.CREAR,
  FLOTAS_EDIT: "/flotas " + "/:placa" + PublicRoutes.EDITAR,

  VIAJES: "/viajes",
  VIAJES_CREATE: "/viajes" + PublicRoutes.CREAR,
  VIAJES_EDIT: "/viajes" + "/:id" + PublicRoutes.EDITAR,

  LUGARES: "/lugares",
  LUGARES_CREATE: "/lugares" + PublicRoutes.CREAR,
  LUGARES_EDIT:
    "/lugares" +
    "/:cod_departamento" +
    "/:cod_provincia" +
    "/:cod" +
    PublicRoutes.EDITAR,

  HOME: "/home",
};

//url backend
export const URL_BACKEND = "http://localhost:4000/api"
