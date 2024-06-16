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
];

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
