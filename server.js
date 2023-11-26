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

//Esquemas
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cellphone: {
        type: String
    },
    residencia: {
        type: String
    },
    alojamientos: {
        type: Array,
        default: []
    },
    isHost: {
        type: Boolean,
        default: false
    },
    description: {
        type: String
    },
    reservations: {
        type: Array,
        default: []
    }
});

let Usuario = mongoose.model('usuarios',userSchema);

//Esquemas
const alojamientoSchema = mongoose.Schema({
    host: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    banos: {
        type: Number,
        min: 1,
        required: true
    },
    beds: {
        type: Number,
        min: 1,
        required: true
    },
    huespedes: {
        type: Number,
        min: 1,
        required: true
    },
    rooms: {
        type: Number,
        min: 1,
        required: true
    },
    categories: {
        type: Array,
        default: [],
        required: true
    },
    images: {
        type: Array,
        default: [],
        required: true
    },
    price: {
        type: Number,
        min: 1,
        required: true
    },
    estado: {
        type: String,
        enum: ['Jalisco', 'Nuevo León', 'Baja California Sur'],
        required: true
    },
    reservaciones: {
        type: String
    }
});

let Alojamiento = mongoose.model('alojamientos',alojamientoSchema);

//Esquemas
const reservacionSchema = mongoose.Schema({
    status: {
        type: Boolean, //true activo, false terminado o cancelado
        required: true
    },
    fechaEntrada: {
        type: Date,
        required: true
    },
    fechaSalida: {
        type: Date,
        required: true
    },
    alojamiento: {
        type: String,
        required: true
    },
    host: {
        type: String,
        required: true
    },
    cliente: {
        type: String,
        required: true
    },
    huespedes: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

let Reservacion = mongoose.model('reservaciones',reservacionSchema);

app.use(router);

app.listen(port, () =>{
    console.log("EarthBnb corriendo en puerto "+ port)
});

exports.Usuario = Usuario;
exports.Alojamiento = Alojamiento;
exports.Reservacion = Reservacion;