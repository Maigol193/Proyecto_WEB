const express = require('express');
const router = express.Router();
const { default: mongoose } = require('mongoose');
const Usuario = require('./usuario');

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

router.post('/create', async (req, res) => {
    try {
        let newAlojamiento = req.body;
        let id_host = req.body.host;
        const aloj = new Alojamiento(newAlojamiento);

        let aloj_id = "";
        const alojDoc = await aloj.save();
        aloj_id = alojDoc._id.toString();

        
        Usuario.findByIdAndUpdate(id_host, { $push: { alojamientos: aloj_id } }, { new: true })
            .then((doc) => {
                res.status(200).send('Alojamiento guardado correctamente y Usuario actualizado: ' + alojDoc);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error al actualizar el Usuario');
            });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al guardar el alojamiento');
    }
});


router.put('/edit_alojamiento') //PUT de alojamiento

router.delete('/delete_alojamiento') //DELETE de alojamiento

module.exports = router;