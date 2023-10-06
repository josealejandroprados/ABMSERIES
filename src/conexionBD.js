const host = document.forms[0].elements[0];
const puerto = document.forms[0].elements[1];
const BBDD = document.forms[0].elements[2];
const usuario = document.forms[0].elements[3];
const password = document.forms[0].elements[4];
const boton = document.getElementById('btn');

boton.addEventListener('click', () => {
    window.location.href=`conexionBD/${host.value}/${puerto.value}/${BBDD.value}/${usuario.value}/${password.value}`;
});