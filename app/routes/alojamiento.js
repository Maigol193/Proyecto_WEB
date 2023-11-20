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
        aloj_id = doc._id.toString();
        alojamientos_actuales.push(aloj_id);
        if(true){
            Usuario.findByIdAndUpdate(id_host, alojamientos_actuales, {new: true}).then((updated) => {
                res.status(200).send(updated);
            }).catch((err) => {
                console.error(err);
                res.status(500).send('Error al actualizar el Usuario');
            });
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