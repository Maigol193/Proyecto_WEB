const express = require('express');
const router = express.Router();
const { default: mongoose } = require('mongoose');
let mongoConnection = "mongodb+srv://admin:admin@myapp.51n0kvh.mongodb.net/MyAppDB";
let db = mongoose.connection;

app.use(express.json());

db.on('connecting',()=>{
    console.log('Conectando...');
    console.log(mongoose.connection.readyState);
});
db.on('connected',()=>{
    console.log('¡Conectado exitosamente!');
    console.log(mongoose.connection.readyState);
});

app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

module.exports = router;