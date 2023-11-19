const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;
const router = require('./app/controllers/router');

app.use(express.json());

app.use(cors());

app.use(router);

app.listen(port, () =>{
    console.log("Aplicacion de ejemplo corriendo en puerto "+ port)
});