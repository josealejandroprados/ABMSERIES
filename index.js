//importar express
const express = require('express');
//importar path
const path = require('path');

//importar Routes
const Routes = require('./src/routes/routes.js');

//crear app
const app = express();

//setting express
app.set('port', process.env.PORT || 3000);
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'vistas'));

//configuracion archivos estaticos
app.use(express.static('./src'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
//Routes
app.use('/', Routes);

//iniciar servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor iniciado en el puerto ${app.get('port')}`);
});

