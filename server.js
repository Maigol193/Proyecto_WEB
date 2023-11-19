const express = require('express');
const cors = require('cors')
const router = require('./app/controllers/router');

const port = 3000;
const app = express();

app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.use(express.json());
app.use(router);

app.listen(port, () =>{
    console.log("EarthBnb corriendo en puerto "+ port)
});