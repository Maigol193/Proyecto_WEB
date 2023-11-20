const express = require('express');
const router = express.Router();
const { default: mongoose } = require('mongoose');

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
        type: Number,
        unique: true,
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
    totalPrice: {
        type: Number,
        required: true
    }
});

let Reservacion = mongoose.model('reservaciones',reservacionSchema);

//poner status 200 o 500

//GET reservacion por ID
router.get('/reservation', (req,res) => {
    let id = req.body.id;
    
    Reservacion.find({
        id: id,
    }).then(function (docs) {
        res.send(docs);
        console.log(docs);
    }).catch((err) => console.log(err));
});

 //POST de reservacion
router.post('/reserve', (req,res) => {
    const newReservation = req.body;
    const reservation = Reservacion(newReservation);
    reservation.save().then((doc) => console.log("Reservación creada: ") + doc);
});

 //DELETE de reservacion por ID
router.delete('/delete', (req,res) => {
    let id = req.body.id;

    Reservacion.findByIdAndDelete(id).then(doc => {
        console.log("Reservacion eliminada de la faz de la tierra");
        console.log(doc);
        res.send(doc);
    }).catch((err) => console.log(err));
});

module.exports = router;