const express = require('express');
const cors = require('cors')
const router = require('./app/controllers/router');
const { default: mongoose } = require('mongoose');

const port = 3000;
const app = express();

app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.use(express.json());

//Conexión a Mongo
let mongoConnection = "mongodb+srv://admin:admin@myapp.51n0kvh.mongodb.net/MyAppDB";
let db = mongoose.connection;
db.on('connecting',()=>{
    console.log('Conectando...');
    console.log(mongoose.connection.readyState);
});
db.on('connected',()=>{
    console.log('¡Conectado exitosamente!');
    console.log(mongoose.connection.readyState);
});
mongoose.connect(mongoConnection, {useNewUrlParser: true});

app.use(router);

app.listen(port, () =>{
    console.log("EarthBnb corriendo en puerto "+ port)
});