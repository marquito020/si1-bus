const { Pool } = require("pg");
const { db } = require("./config");

const {
  tableSeeder,
  bitacoraSeeder,
  funcionalidadSeeder,
  permisoRolSeeder,
  personSeeder,
  rolSeeder,
  usuarioSeeder,
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
} = require("./seeders/database");

//postgres://bus_si1_user:QQRPNWgyC7NNfJRIvuK29Cqu4hS1JlWz@dpg-cpg3jkdds78s73b5qid0-a.oregon-postgres.render.com/bus_si1
const pool = new Pool({
  user: db.user,
  password: db.password,
  host: db.host,
  port: db.port,
  database: db.database,
  ssl: {
    rejectUnauthorized: false,
  },
  // Asegúrate de configurar la zona horaria para cada cliente conectado
/*   connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
  max: 20 */
});

const seeders = [
  /* tableSeeder, */
  /* personSeeder, */
  /* rolSeeder, */
  /* funcionalidadSeeder, */
  /* permisoRolSeeder, */
  /* usuarioSeeder, */
  /* dropTables, */
  /* tableChofer, */
  /* tableDepartamento, */
  /* tableProvincia, */
  /* departamentoSeeder, */
  /* provinciaSeeder, */
  /* tableLugar, */
  /* tableTipoFlota, */
  /* tableEstadoFlota, */
  /* tableFlota, */
  /* tipoFlotaSeeder, */
  /* estadoFlotaSeeder, */
  /* flotaSeeder, */
  /* tableViaje, */
  /* dropTablesNew, */
  /* lugarSeeder, */
  /* choferSeeder, */
  /* viajeSeeder, */
  /* dropTablesViaje */
  /* tableCliente, */
  /* solvedPersonID */
  /* tableAsiento */
  /* deleteFlota */
  /* deleteViaje */
  /* dropAsiento, */
  /* tableMetodoPago, */
  /* metodoPagoSeeder, */
  /* dropMetodoPago, */
  /* tableBoleto */
  /* dropBoleto */
  /* tableNotaVenta */
  /* tableBitacora, */
  /* addEmailPasswordCliente, */
  /* addIPBitacora, */
  /* tableReserva */
  /* addEstadoCodReserva, */
  /* addClienteBitacora */
];
pool.on('connect', client => {
  client.query('SET TIME ZONE "America/La_Paz"')
    .then(response => console.log("Zona horaria configurada para la sesión"))
    .catch(e => console.error("Error configurando la zona horaria en la sesión", e));
});

pool.connect((err, client, done) => {
  if (err) {
    console.log(err);
  } else {
    client.query(seeders.join(" "), (err, res) => {
      done();
      if (err) {
        console.log(err);
      } else {
        console.log("Tables created");
      }
    });
  }
});


module.exports = pool;
