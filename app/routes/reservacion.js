const express = require('express');
const router = express.Router();
const { default: mongoose } = require('mongoose');

//Esquemas
const reservacionSchema = mongoose.Schema({
    fechaEntrada: {
        type: Date,
        required: true
    },
    fechaSalida: {
        type: Date,
        required: true
    },
    alojamiento: {
        type: Number,
        unique: true,
        required: true
    },
    host: {
        type: Number,
        unique: true,
        required: true
    },
    cliente: {
        type: Number,
        unique: true,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

let Reservacion = mongoose.model('reservaciones',reservacionSchema);

router.get('/') //GET para reservaciones

router.post('/') //POST de reservacion

router.delete('/') //DELETE de reservacion

module.exports = router;