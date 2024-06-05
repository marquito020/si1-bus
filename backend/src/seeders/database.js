const tableSeeder = `CREATE TABLE Persona(
    Id SERIAL PRIMARY KEY,
    Nombre VARCHAR(35) NOT NULL,
    Apellido VARCHAR(35) NOT NULL,
    CI INT,
    Telefono VARCHAR(20),
    Fecha_Nacimiento DATE
);

CREATE TABLE Rol(
    ID SERIAL PRIMARY KEY,
    Nombre VARCHAR(30) NOT NULL,
    Activo BOOLEAN NOT NULL
);

CREATE TABLE Funcionalidad(
    ID SERIAL PRIMARY KEY,
    Nombre VARCHAR(30) NOT NULL,
    Descripcion VARCHAR(100) NOT NULL,
    Activo BOOLEAN NOT NULL
);

CREATE TABLE Permiso_Rol(
    Id_Funcionalidad INT NOT NULL,
    ID_Rol INT NOT NULL,
    PRIMARY KEY (Id_Funcionalidad, ID_Rol),
    FOREIGN KEY (Id_Funcionalidad) REFERENCES Funcionalidad(ID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (ID_Rol) REFERENCES Rol(ID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Usuario(
    Id_Persona INT NOT NULL PRIMARY KEY,
    Username VARCHAR(30) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Id_Rol INT NOT NULL,
    Direccion VARCHAR(50),
    Activo BOOLEAN NOT NULL,
    FOREIGN KEY (Id_Persona) REFERENCES Persona(Id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Id_Rol) REFERENCES Rol(Id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Bitacora(
    ID SERIAL PRIMARY KEY,
    Fecha_Hora TIMESTAMP NOT NULL,
    Id_Usuario INT NOT NULL,
    FOREIGN KEY (Id_Usuario) REFERENCES Usuario(Id_Persona) ON UPDATE CASCADE ON DELETE CASCADE
);
`;

const personSeeder = `
INSERT INTO Persona (Id, Nombre, Apellido, CI, Telefono, Fecha_Nacimiento) VALUES
            (1, 'Wilson', 'Arebalo Baldiviezo', 4550234, '69445098', '1984-11-19'),
            (2, 'Pepe', 'Cabrera', 9894199, '70022327', '1998-02-07'),
            (3, 'Santiago', 'Cardona Lara', 7055031, '77050092', '1988-03-15'),
            (4, 'Sofia Raquel', 'Soliz Cruz', 6987439, '60000597', '1992-12-03'),
            (5, 'Jose Elias', 'Cardenas Angulo', 3897192, '78191662', '1989-06-17'),
            (6, 'Carlos Andres', 'Plata Saucedo', 7654321, '78581746', '1997-06-29'),
            (7, 'Brayan', 'Flores Castro', 8765432, '77838140', '1992-08-30'),
            (8, 'Miguel Angel', 'Rojas Irusta', 2345678, '79803692', '1975-12-31'),
            (9, 'Hans Alejandro', 'Menacho Sosa', 6754321, '78154606', '1991-10-14'),
            (10, 'Luz Clara', 'Panoso Villazon', 4321987, '75686215', '1996-02-11');
`;

const rolSeeder = `
INSERT INTO Rol (ID, Nombre, Activo) VALUES
            (1, 'ADMINISTRADOR GENERAL', true),
            (2, 'ADMINISTRADOR', true),
            (3, 'ATENCION AL CLIENTE_VENDEDOR', true);
`;

const funcionalidadSeeder = `
INSERT INTO Funcionalidad (ID, Nombre, Descripcion, Activo) VALUES
            (1, 'PEDIDO.VER', 'PERMITE VER TODO LOS PEDIDOS Y SUS ESTADOS', true),
            (2, 'PEDIDO.CREAR', 'PERMITE CREAR NUEVOS PEDIDOS', true),
            (3, 'PEDIDO.MODIFICAR', 'PERMITE MODIFICAR LOS PEDIDOS CREADOS', true),
            (4, 'PEDIDO.ELIMINAR', 'PERMITE ELIMINAR UN PEDIDO', true),
            (5, 'VESTIMENTA.VER', 'PERMITE VER LAS VESTIMENTAS DISPONIBLES', true),
            (6, 'VESTIMENTA.CREAR', 'PERMITE AÑADIR UNA NUEVA VESTIMENTA', true),
            (7, 'VESTIMENTA.MODIFICAR', 'PERMITE MODIFICAR LOS DATOS DE UNA VESTIMENTA', true),
            (8, 'VESTIMENTA.ELIMINAR', 'PERMITE ELIMINAR UNA VESTIMENTA', true);
`;

const permisoRolSeeder = `
INSERT INTO Permiso_Rol (Id_Funcionalidad, Id_Rol) VALUES
            (1, 1),
            (2, 2),
            (3, 3);
`;

const usuarioSeeder = `
INSERT INTO Usuario (Id_Persona, Username, Password, Id_Rol, Direccion, Activo) VALUES
            (1, 'Pedrito19', 'pedroVaca123', 1, 'Av. Banzer #2556', true),
            (2, 'Raquelita69', 'Rq456', 2, 'Av. Guapay #789', true),
            (3, 'Miguelito01', 'Gueto89', 3, 'Calle Junín #876', false);
`;

const bitacoraSeeder = `
INSERT INTO Bitacora (ID, Fecha_Hora, Id_Usuario) VALUES
            (1, '2022-09-12 00:00:00', 1),
            (2, '2023-02-03 00:00:00', 2);
`;

module.exports = {
  tableSeeder,
  personSeeder,
  rolSeeder,
  funcionalidadSeeder,
  permisoRolSeeder,
  usuarioSeeder,
  bitacoraSeeder,
};
