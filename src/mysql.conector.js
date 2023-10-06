//importar mysql
const mysql = require('mysql2');
//importar date-fns
const { format } = require('date-fns');
//importamos parametros de conexion a la BBDD
const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT} = require('./config.js');

var conexion='';

const conectarBBDD = () => {
    //crear instancia de conexion
    conexion = mysql.createConnection(
        {
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME,
            port: DB_PORT
        }
    );
}

const conectar = (res) => {
    conexion.connect(err => {
        if(err){
            //console.error(err);
            res.render('mensaje',{mensaje: 7, usuario: ''});
        }
        else{
            //console.log("conexion exitosa a la base de datos");
        }
    });
}

const consultaLogin = (usuario,password,res) => {
    const sql = `SELECT * FROM login WHERE usuario='${usuario}' AND password='${password}'`;

    conexion.query(sql, (err,resultado) => {
        
        if(err){
            //console.error(err);
            res.render('mensaje',{mensaje: 7, usuario: ''});
        }
        else if(resultado.length==0){
            //si el resultado es vacio => error
            res.render('mensaje',{mensaje: 8, usuario: ''});
        }
        else if(resultado.length==1){
            //si obtenemos un resultado => renderizar vista
            //console.log('login exitoso');
            const u = Object.values(resultado[0].usuario).join('');
            res.render('mensaje',{mensaje: 1, usuario: u});
        }
    });
}

const registrarUser = (usuario, password,res) => {
    //console.log(usuario,password);
    const sql = `INSERT INTO login (id_usuario, usuario, password) VALUES (${null},"${usuario}","${password}")`;
    conexion.query(sql, (err) => {
        if(err){
            //throw err
            res.render('mensaje',{mensaje: 7, usuario: ''});
        }
        //console.log("registro exitoso");

        conexion.end();//terminar conexion

        res.render('mensaje',{mensaje: 6, usuario: usuario});
    });
}


let obtenerSeries = (res) => {
    const sql = 'SELECT * FROM abmseries';
    conexion.query(sql,(err,result) => {
        if(err){
            //throw err
            res.render('mensaje',{mensaje: 7, usuario: ''});
        }

        var fecha='';
        var fechaFormateada='';

        for(var k=0; k<result.length; k++){
            fecha = result[k].fecha;
            fechaFormateada = format(fecha, 'yyyy-MM-dd');

            result[k].fecha = fechaFormateada;
        }
        
        res.render('home',{data: result});
    });
}

const agregarSerie = (serie,res) => {

    const sql = `INSERT INTO abmseries SET ?`;
    
    conexion.query(sql, serie, (err) => {
        if(err){
            //throw err;
            res.render('mensaje',{mensaje: 7, usuario: ''});
        }

        //console.log("insercion correcta");

        res.render('mensaje',{mensaje: 2, usuario: ''});
    });
}

const borrarSerie = (id,res) => {
    const sql = `DELETE FROM abmseries WHERE id_serie=${id}`;
    conexion.query(sql, (err) => {
        if(err){
            //throw err;
            res.render('mensaje',{mensaje: 7, usuario: ''});
        }

        //console.log("serie eliminada correctamente");

        res.render('mensaje',{mensaje: 5, usuario: ''});
    });
}

const actualizarSerie = (id,nuevaSerie,res) => {
    const sql = `UPDATE abmseries SET ? WHERE id_serie=?`;

    conexion.query(sql, [nuevaSerie,id], (error) => {
        if(error){
            //throw error;
            res.render('mensaje',{mensaje: 7, usuario: ''});
        }

        //console.log('Serie modificada con Exito!');

        res.render('mensaje',{mensaje: 3, usuario: ''});
    })
}

const anularSerie = (id,res) => {
    const sql = `UPDATE abmseries SET estado='AN' WHERE id_serie='${id}'`;

    conexion.query(sql, (error) => {
        if(error){
            //throw error;
            res.render('mensaje',{mensaje: 7, usuario: ''});
        }

        //console.log('La serie fue anulada con exito');

        res.render('mensaje',{mensaje: 4, usuario: ''});
    });
}

const consultaEstadoSerie = (id,res) => {
    const sql = `SELECT estado FROM abmseries WHERE id_serie='${id}'`;

    conexion.query(sql, (error, estado) => {

        if(error){
            //throw error;
            res.render('mensaje',{mensaje: 7, usuario: ''});
        }

        if( Object.values(estado[0])=='AC' ){
            //Serie Activa (AC) => obtenemos el usuario a modificar y renderizo vista a 'modificar'

            const sqlModificar = `SELECT * FROM abmseries WHERE id_serie=${id}`;
            conexion.query(sqlModificar, (err, resultado) => {
                if(err){
                    //throw err
                    res.render('mensaje',{mensaje: 7, usuario: ''});
                }
                
                //atp
                const a = Object.values(resultado[0].atp);
                resultado[0].atp = a[0];
        
                //fecha
                const fecha = resultado[0].fecha;
                const fechaFormateada = format(fecha, 'yyyy-MM-dd');
                resultado[0].fecha = fechaFormateada;
        
                res.render('modificar',{data: resultado});
            });

        }
        else{
            //estado='AN (anulada) => no se puede modificar una serie anulada
            //console.log('No se puede modificar una serie anulada');
            res.render('mensaje',{mensaje: 9, usuario: ''});
        }
    });
}

const terminarConexion = () => {
    conexion.end();
}


module.exports = {
    conectarBBDD,
    conectar,
    obtenerSeries,
    agregarSerie,
    terminarConexion,
    borrarSerie,
    actualizarSerie,
    anularSerie,
    consultaEstadoSerie,
    consultaLogin,
    registrarUser
};