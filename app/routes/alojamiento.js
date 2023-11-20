const express = require('express');
const router = express.Router();
const { default: mongoose } = require('mongoose');

//Esquemas
const alojamientoSchema = mongoose.Schema({
    host: {
        type: Number,
        unique: true,
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
        type: Number,
        unique: true,
        required: true
    }
});

let Alojamiento = mongoose.model('alojamientos',alojamientoSchema);

router.get('/') //GET para todos

router.get('/') //GET por filtros

router.post('/') //POST alojamientos

router.put('/') //PUT de alojamiento

router.delete('/') //DELETE de alojamiento

module.exports = router;