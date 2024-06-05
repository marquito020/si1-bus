const express = require("express");
const pool = require('pg');
const morgan=  require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const choferRoute = require('./routes/chofer.routes')
const flotaRoute = require('./routes/flota.routes')
const lugarRoute = require('./routes/lugar.routes')
const viajeRoute = require('./routes/viaje.routes')
const usuarioRoute = require('./routes/usuario.routes')
const loginRoute = require('./routes/login.routes')
const app=express()

// app.use(cors({
//     origin:"https://wilsongym-b7e6c.web.app",
//     credentials:true
// }));
app.use(cors());
app.use(express.json( ));
app.use(morgan("dev"));
app.use(cookieParser());
app.use('/api',choferRoute)
app.use('/api',flotaRoute)
app.use('/api',lugarRoute)
app.use('/api',viajeRoute)

app.use('/api',loginRoute)

module.exports=app;
