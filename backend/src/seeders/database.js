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

const dropTables = `
DROP TABLE IF EXISTS Bitacora;
DROP TABLE IF EXISTS Usuario;
DROP TABLE IF EXISTS Permiso_Rol;
DROP TABLE IF EXISTS Funcionalidad;
DROP TABLE IF EXISTS Rol;
DROP TABLE IF EXISTS Persona;
`;

const tableChofer = `CREATE TABLE chofer (
    ci_chofer INTEGER PRIMARY KEY,
    licencia VARCHAR,
    nombre VARCHAR(50)
);
`;

const tableDepartamento = `CREATE TABLE departamento (
    cod VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(20)
);
`;

const tableProvincia = `CREATE TABLE provincia (
    cod VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(40),
    cod_departamento VARCHAR(10),
    FOREIGN KEY (cod_departamento) REFERENCES departamento (cod)
);
`;

const departamentoSeeder = `
INSERT INTO departamento (cod, nombre) VALUES
('DEP001', 'Santa Cruz'),
('DEP002', 'Beni'),
('DEP003', 'Pando'),
('DEP004', 'Chuquisaca'),
('DEP005', 'Tarija'),
('DEP006', 'Cochabamba'),
('DEP007', 'Departamento7'),
('DEP008', 'Departamento8'),
('DEP009', 'Departamento9');
`;

const provinciaSeeder = `
INSERT INTO provincia (cod, nombre, cod_departamento) VALUES
('PRV001', 'ANDRES IBAÑEZ', 'DEP001'),
('PRV002', 'SANTA MONICA', 'DEP001'),
('PRV003', 'COBIJA', 'DEP003'),
('PRV004', 'HERNANDO SILES', 'DEP004'),
('PRV005', 'CERCADO', 'DEP005'),
('PRV006', 'CHAPARE', 'DEP006'),
('PRV007', 'AROMA', 'DEP007'),
('PRV008', 'EDUARDO AVAROA', 'DEP008'),
('PRV009', 'UYUNI', 'DEP009'),
('PRV010', 'MANUEL MARIA CABALLERO', 'DEP001');
`;

const tableLugar = `CREATE TABLE lugar (
    cod VARCHAR(10) NOT NULL,
    cod_provincia VARCHAR(10) NOT NULL,
    cod_departamento VARCHAR(10) NOT NULL,
    direccion VARCHAR(255),
    PRIMARY KEY (cod_departamento, cod_provincia, cod),
    UNIQUE (cod_departamento, cod_provincia, cod) -- Añadir la restricción única aquí
);
`;

const tableTipoFlota = `CREATE TABLE tipo_flota (
    cod VARCHAR(8) PRIMARY KEY,
    descripcion VARCHAR(30)
);
`;

const tableEstadoFlota = `CREATE TABLE estado_flota (
    cod VARCHAR(8) PRIMARY KEY,
    descripcion VARCHAR(13)
);
`;

const tableFlota = `CREATE TABLE flota (
    placa VARCHAR(7) PRIMARY KEY,
    marca VARCHAR(20),
    modelo VARCHAR(20),
    capacidad INTEGER,
    cod_tipo_flota VARCHAR(8) REFERENCES tipo_flota(cod),
    cod_estado_flota VARCHAR(8) REFERENCES estado_flota(cod)
);
`;

const tipoFlotaSeeder = `
INSERT INTO tipo_flota (cod, descripcion) VALUES
('TIPF001', 'NORMAL'),
('TIPF002', 'CONFORT'),
('TIPF003', 'CAMA');
`;

const estadoFlotaSeeder = `
INSERT INTO estado_flota (cod, descripcion) VALUES
('ESTF001', 'ACTIVO'),
('ESTF002', 'INACTIVO'),
('ESTF003', 'MANTENIMIENTO');
`;

const flotaSeeder = `
INSERT INTO flota (placa, marca, modelo, capacidad, cod_tipo_flota, cod_estado_flota) VALUES
('1111DRR', 'VOLVO', 'BASIC', 40, 'TIPF001', 'ESTF001'),
('2222DRR', 'VOLVO', 'BASIC', 40, 'TIPF001', 'ESTF001'),
('3333DRR', 'NISSAN', 'FRONTIER', 60, 'TIPF002', 'ESTF001'),
('4444DRR', 'NISSAN', 'FRONTIER', 60, 'TIPF002', 'ESTF001'),
('5555DRR', 'NISSAN', 'FRONTIER', 60, 'TIPF002', 'ESTF001'),
('6666DRR', 'NISSAN', 'FRONTIER', 60, 'TIPF002', 'ESTF001'),
('7777DRR', 'TOYOTA', 'LEITON', 40, 'TIPF003', 'ESTF001'),
('8888DRR', 'TOYOTA', 'LEITON', 40, 'TIPF003', 'ESTF001'),
('9999DRR', 'TOYOTA', 'LEITON', 40, 'TIPF003', 'ESTF001'),
('1111ADR', 'VOLVO', 'BASIC', 40, 'TIPF001', 'ESTF001'),
('2222ADR', 'VOLVO', 'BASIC', 40, 'TIPF001', 'ESTF001'),
('3333ADR', 'NISSAN', 'FRONTIER', 60, 'TIPF002', 'ESTF001'),
('4444ADR', 'NISSAN', 'FRONTIER', 60, 'TIPF002', 'ESTF001'),
('6666ADR', 'NISSAN', 'FRONTIER', 60, 'TIPF002', 'ESTF001');
`;

const tableViaje = `CREATE TABLE viaje (
    cod VARCHAR(8) PRIMARY KEY,
    fecha DATE NOT NULL,
    hora_Salida TIME NOT NULL,
    hora_Llegada TIME,
    precio FLOAT NOT NULL,
    status BOOLEAN DEFAULT TRUE,
    placa_Flota VARCHAR(7) NOT NULL,
    cod_Lugar_Destino VARCHAR(10) NOT NULL,
    cod_Provincia_Destino VARCHAR(10) NOT NULL,
    cod_Departamento_Destino VARCHAR(10) NOT NULL,
    cod_Lugar_Origen VARCHAR(10) NOT NULL,
    cod_Provincia_Origen VARCHAR(10) NOT NULL,
    cod_Departamento_Origen VARCHAR(10) NOT NULL,
    FOREIGN KEY (cod_Departamento_Destino, cod_Provincia_Destino, cod_Lugar_Destino) 
        REFERENCES lugar(cod_departamento, cod_provincia, cod),
    FOREIGN KEY (cod_Departamento_Origen, cod_Provincia_Origen, cod_Lugar_Origen) 
        REFERENCES lugar(cod_departamento, cod_provincia, cod),
    FOREIGN KEY (placa_Flota) 
        REFERENCES flota(placa)
);
`;

const lugarSeeder = `
INSERT INTO lugar (cod_departamento, cod_provincia, cod, direccion) VALUES
('DEP001', 'PRV001', 'LGR001', '4° ANILLO DOBLE VIA'),
('DEP001', 'PRV001', 'LGR002', 'CARRETERA COMARAPA'),
('DEP003', 'PRV003', 'LGR004', 'AV. 9 DE FEBRERO'),
('DEP006', 'PRV006', 'LGR005', 'AV. OQUENDO Y 9 DE ABRIL'),
('DEP001', 'PRV002', 'LGR006', 'AV. PANAMERICANA Y CALLE 6'),
('DEP008', 'PRV008', 'LGR007', 'AV. CIRCUNVALACIÓN ENTRE GREGORIO REYNOLDS Y CAMPO JORDAN'),
('DEP004', 'PRV004', 'LGR008', 'AV. OSTRIA GUTIERREZ'),
('DEP005', 'PRV005', 'LGR009', 'GRAL. GÜEMES'),
('DEP009', 'PRV009', 'LGR003', 'CALLE FICTICIA 123'),
('DEP009', 'PRV009', 'LGR010', 'CALLE IMAGINARIA 456');
`;

const choferSeeder = `
INSERT INTO chofer (ci_chofer, licencia, nombre) VALUES
(2141647, 'C', 'Juan Perez'),
(6547894, 'C', 'Luis Martinez'),
(9854125, 'C', 'Ana Fernandez'),
(4874410, 'C', 'Maria Rodriguez');
`;

const dropTablesNew = `
DROP TABLE IF EXISTS Viaje;
DROP TABLE IF EXISTS Flota;
DROP TABLE IF EXISTS Estado_Flota;
DROP TABLE IF EXISTS Tipo_Flota;
DROP TABLE IF EXISTS Chofer;
DROP TABLE IF EXISTS Provincia;
DROP TABLE IF EXISTS Departamento;
DROP TABLE IF EXISTS Lugar;
DROP TABLE IF EXISTS Tipo_Flota;
`;

const viajeSeeder = `
INSERT INTO viaje (
    cod,
    fecha,
    hora_salida,
    precio,
    placa_flota,
    cod_lugar_destino,
    cod_provincia_destino,
    cod_departamento_destino,
    cod_lugar_origen,
    cod_provincia_origen,
    cod_departamento_origen
) VALUES
('VIA001', '2020-03-25', '10:30:00', 180.00, '1111DRR', 'LGR001', 'PRV001', 'DEP001', 'LGR002', 'PRV001', 'DEP001'),
('VIA002', '2020-09-06', '07:00:00', 190.00, '2222DRR', 'LGR002', 'PRV001', 'DEP001', 'LGR004', 'PRV003', 'DEP003'),
('VIA003', '2021-10-03', '12:15:00', 250.00, '3333DRR', 'LGR004', 'PRV003', 'DEP003', 'LGR005', 'PRV006', 'DEP006'),
('VIA004', '2022-06-17', '14:30:00', 100.00, '4444DRR', 'LGR008', 'PRV004', 'DEP004', 'LGR007', 'PRV008', 'DEP008'),
('VIA005', '2022-02-15', '11:30:00', 250.00, '5555DRR', 'LGR009', 'PRV005', 'DEP005', 'LGR001', 'PRV001', 'DEP001'),
('VIA006', '2022-05-10', '09:45:00', 200.00, '6666DRR', 'LGR007', 'PRV008', 'DEP008', 'LGR010', 'PRV009', 'DEP009'),
('VIA007', '2023-01-20', '16:30:00', 180.00, '7777DRR', 'LGR006', 'PRV002', 'DEP001', 'LGR001', 'PRV001', 'DEP001');
`;

const dropTablesViaje = `
DROP TABLE IF EXISTS Viaje;
`;

const tableCliente = `CREATE TABLE Cliente(
    Id_Persona INT NOT NULL PRIMARY KEY,
    FOREIGN KEY (Id_Persona) REFERENCES Persona(Id) ON UPDATE CASCADE ON DELETE CASCADE
);
`;

const solvedPersonID = `
SELECT MAX(id) FROM persona;
SELECT setval(pg_get_serial_sequence('persona', 'id'), (SELECT MAX(id) FROM persona));
`;

const tableAsiento = `CREATE TABLE Asiento(
    id SERIAL PRIMARY KEY,
    numero INTEGER NOT NULL,
    estado VARCHAR(20) NOT NULL,
    placa_flota VARCHAR(7) NOT NULL,
    FOREIGN KEY (placa_flota) REFERENCES flota(placa) ON UPDATE CASCADE ON DELETE CASCADE
);
`;

const deleteFlota = `
DELETE FROM flota;
`;

const deleteViaje = `
DELETE FROM viaje;
`;

const dropAsiento = `
DROP TABLE IF EXISTS Asiento;
`;

const tableMetodoPago = `CREATE TABLE Metodo_Pago(
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(20)
);
`;

const metodoPagoSeeder = `
INSERT INTO Metodo_Pago (id, tipo) VALUES
('1', 'Efectivo'),
('2', 'Tarjeta de Crédito'),
('3', 'Tarjeta de Débito');
`;

const dropMetodoPago = `
DROP TABLE IF EXISTS Metodo_Pago;
`;

const tableNotaVenta = `CREATE TABLE Nota_Venta(
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    precio_total FLOAT NOT NULL,
    id_cliente INT NOT NULL,
    id_metodo_pago INT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_persona) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_metodo_pago) REFERENCES metodo_pago(id) ON UPDATE CASCADE ON DELETE CASCADE
);
`;

const tableBoleto = `CREATE TABLE Boleto(
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    precio FLOAT NOT NULL,
    cod_viaje VARCHAR(8) NOT NULL,
    id_cliente INT NOT NULL,
    id_asiento INT NOT NULL,
    id_nota_venta INT NOT NULL,
    FOREIGN KEY (cod_viaje) REFERENCES viaje(cod) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_persona) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_asiento) REFERENCES asiento(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_nota_venta) REFERENCES nota_venta(id) ON UPDATE CASCADE ON DELETE CASCADE
);
`;

const dropBoleto = `
DROP TABLE IF EXISTS Boleto;
`;

const tableBitacora = `
CREATE TABLE Bitacora(
    ID SERIAL PRIMARY KEY,
    Fecha_Hora TIMESTAMP NOT NULL,
    Accion VARCHAR(100),
    Id_Usuario INT NOT NULL,
    FOREIGN KEY (Id_Usuario) REFERENCES Usuario(Id_Persona) ON UPDATE CASCADE ON DELETE CASCADE
);
`;

const addEmailPasswordCliente = `
ALTER TABLE Cliente
ADD password VARCHAR(255);
`;

const addIPBitacora = `
ALTER TABLE Bitacora
ADD IP VARCHAR(30);
`;

const tableReserva = `CREATE TABLE Reserva(
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    precio FLOAT NOT NULL,
    cod_viaje VARCHAR(8) NOT NULL,
    id_cliente INT NOT NULL,
    id_asiento INT NOT NULL,
    FOREIGN KEY (cod_viaje) REFERENCES viaje(cod) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_persona) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_asiento) REFERENCES asiento(id) ON UPDATE CASCADE ON DELETE CASCADE
);
`;

const addEstadoCodReserva = `
ALTER TABLE Boleto
ADD COLUMN estado VARCHAR(20) DEFAULT 'COMPRADO',
ADD COLUMN id_reserva INT,
ADD FOREIGN KEY (id_reserva) REFERENCES reserva(id) ON UPDATE CASCADE ON DELETE CASCADE;
`;

const addClienteBitacora = `
ALTER TABLE Bitacora
ADD COLUMN id_persona INT;

ALTER TABLE Bitacora
ADD CONSTRAINT fk_bitacora_persona
FOREIGN KEY (id_persona) REFERENCES Cliente(id_persona) ON UPDATE CASCADE ON DELETE CASCADE;
`;

module.exports = {
  tableSeeder,
  personSeeder,
  rolSeeder,
  funcionalidadSeeder,
  permisoRolSeeder,
  usuarioSeeder,
  bitacoraSeeder,
  dropTables,
  tableChofer,
  tableDepartamento,
  tableProvincia,
  departamentoSeeder,
  provinciaSeeder,
  tableLugar,
  tableTipoFlota,
  tableEstadoFlota,
  tableFlota,
  tipoFlotaSeeder,
  estadoFlotaSeeder,
  flotaSeeder,
  tableViaje,
  dropTablesNew,
  lugarSeeder,
  choferSeeder,
  viajeSeeder,
  dropTablesViaje,
  tableCliente,
  solvedPersonID,
  tableAsiento,
  deleteFlota,
  deleteViaje,
  dropAsiento,
  tableMetodoPago,
  metodoPagoSeeder,
  dropMetodoPago,
  tableBoleto,
  dropBoleto,
  tableNotaVenta,
  tableBitacora,
  addEmailPasswordCliente,
  addIPBitacora,
  tableReserva,
  addEstadoCodReserva,
  addClienteBitacora,
};
