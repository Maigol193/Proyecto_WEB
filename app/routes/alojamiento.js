const express = require('express');
const router = express.Router();
const { default: mongoose } = require('mongoose');

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
        type: String,
        required: true
    }
});

let Alojamiento = mongoose.model('alojamientos',alojamientoSchema);

router.get('/get_all',(req,res)=>{
    Alojamiento.find().then(function (docs) {
        res.send(docs);
        console.log(docs);
    }).catch((err) => console.log(err));
}); //GET para todos

router.get('/get_filter') //GET por filtros

router.post('/create',(req,res) => {
    const newAlojamiento = req.body;
    const aloj = Alojamiento(newAlojamiento);
    aloj.save().then((doc) => console.log("Alojamiento creado: ") + doc);
    let xhr = new XMLHttpRequest();
    xhr.open('PUT','http://localhost:3000/usuarios/add_alojamiento');
    xhr.setRequestHeader('Content-Type', 'application/json');
    let datos = 0;
    xhr.send([JSON.stringify(datos)]);
    xhr.onload = function (){
        if (xhr.status != 200){
            console.log(xhr.status + ": " + xhr.statusText);
        }
        else{
            console.log("Funciono el add_alojamiento:");
        }
    }
}); //POST alojamientos

router.put('/edit_alojamiento') //PUT de alojamiento

router.delete('/delete_alojamiento') //DELETE de alojamiento

module.exports = router;