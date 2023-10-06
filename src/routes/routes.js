//importamos express
const express = require('express');
//creamos un metodo router
const router = express.Router();
//importamos funciones de mysql.conector.js
const {conectarBBDD, conectar, obtenerSeries, agregarSerie, borrarSerie, terminarConexion,
        actualizarSerie, anularSerie, consultaEstadoSerie, consultaLogin, registrarUser} = require ('../mysql.conector.js');



router.get('/', (req,res) => {
    //res.send('viva yo');
    res.render('login');
});

router.post('/login', (req,res) => {
    const user = {
        usuario: req.body.usuario,
        password: req.body.password
    };

    conectarBBDD();
    conectar();

    consultaLogin(user.usuario,user.password,res);
});

router.get('/registrarse', (req,res) => {
    res.render('registro');
});

router.post('/registrar', (req,res) => {

    conectarBBDD();
    conectar();

    const newUser = {
        usuario: req.body.usuario,
        password: req.body.password
    };
    

    registrarUser(newUser.usuario,newUser.password,res);

});


router.get('/home', (req,res) => {
    obtenerSeries(res);
});


router.get('/nuevo', (req,res) => {
    res.render('nuevo');
});

router.post('/agregar', (req,res) => {

    const serie = {
        id_serie: null,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        fecha: req.body.fecha,
        estrellas: parseInt(req.body.estrellas),
        genero: req.body.genero,
        precio: parseFloat(req.body.precio),
        atp: (req.body.atp=='on'? 1 : 0),
        estado: 'AC'
    };
    //console.log(serie);

    agregarSerie(serie,res);
});

router.get('/borrar/:id', (req,res) => {
    let id = req.params.id;

    //console.log(id);
    borrarSerie(id,res);
});


router.post('/update/:id/:estado', (req,res) => {
    let id = req.params.id;
    let estado = req.params.estado;

    const nuevaSerie = {
        id_serie: id,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        fecha: req.body.fecha,
        estrellas: parseInt(req.body.estrellas),
        genero: req.body.genero,
        precio: parseFloat(req.body.precio),
        atp: (req.body.atp=='on'? 1 : 0),
        estado: estado
    };

    actualizarSerie(id,nuevaSerie,res);
});

router.get('/anular/:id', (req,res) => {
    let id = req.params.id;

    anularSerie(id,res);
});

router.get('/consultaEstado/:id', (req,res) => {
    let id = req.params.id;

    consultaEstadoSerie(id,res);
});

router.get('/salir', (req,res) => {
    terminarConexion();
    res.redirect('/');
});

module.exports = router;