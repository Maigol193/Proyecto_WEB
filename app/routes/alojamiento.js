const express = require('express');
const router = express.Router();
const { default: mongoose } = require('mongoose');
const Usuario = require('./userSchema');

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

router.get('/get_all',(req,res)=>{
    Alojamiento.find().then(function (docs) {
        res.send(docs);
        console.log(docs);
    }).catch((err) => console.log(err));
}); //GET para todos

router.get('/get_filter') //GET por filtros

router.post('/create',(req,res) => {
    let newAlojamiento = req.body;
    let id_host = req.body.host;
    let alojamientos_actuales = req.body.alojamientos_actuales;
    const aloj = Alojamiento(newAlojamiento);
    aloj.save().then(doc => {
        object_to_update = {},
        flag_updated = false;
        alojamientos_actuales.push(doc._id.toString());
        object_to_update.alojamientos = alojamientos_actuales;
        flag_updated = true;
        if(flag_updated){
            Usuario.findByIdAndUpdate(id_host, object_to_update, {new: true}).then((doc2) => {
                res.send(doc2);
            }).catch((err2) => console.log(err2));
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Error al guardar el alojamiento');
    });
}); //POST alojamientos

router.put('/edit_alojamiento') //PUT de alojamiento

router.delete('/delete_alojamiento') //DELETE de alojamiento

module.exports = router;