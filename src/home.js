

var tabla = document.getElementById('tabla'),
    elementosTabla = tabla.rows,
    btnNuevo = document.getElementById('btnNuevo'),
    btnModificar = document.getElementById('btnModificar'),
    btnEliminar = document.getElementById('btnEliminar'),
    btnAnular = document.getElementById('btnAnular');
    btnSalir = document.getElementById('btnSalir'),
    ID='';


var n = tabla.rows.length;

function getI(id,k){
    //console.log(id);
    this.ID=id;
    console.log(this.ID);

    for(var i=0; i<n; i++){
        if(i==k+1){
            elementosTabla[i].setAttribute("class","table-active table-primary");
        }
        else{
            elementosTabla[i].setAttribute("class","");
        }
    }
    //console.log(elementosTabla[k+1]);
};

btnNuevo.addEventListener('click', () => {
    //alert("nueva serie");
    window.location.href='/nuevo';
});


btnModificar.addEventListener('click', () => {
    if(this.ID==''){
        alert('¡Seleccione la serie a modificar!');
    }
    else{
        //alert('Modificar Serie');
        window.location.href=`/consultaEstado/${ID}`;
    }
});



btnEliminar.addEventListener('click', () => {
    if(this.ID==''){
        alert('¡Seleccione la serie a eliminar!');
    }
    else{
        //Ingresamos un mensaje de confirmacion de eliminar
        var mensaje = confirm("¿Esta seguro que desea eliminar la serie?");
        //Detectamos si el usuario acepto eliminar la serie
        if (mensaje) {
            //alert("¡Ok eliminaremos la serie");
            window.location.href=`/borrar/${ID}`;
        }
    }
    //console.log('borrar');
});





btnAnular.addEventListener('click', () => {
    if(this.ID==''){
        alert('¡Seleccione la serie a anular!');
    }
    else{
        //Ingresamos un mensaje a mostrar
        var mensaje = confirm("¿Esta seguro que desea anular la serie?");
        //Detectamos si el usuario acepto anular la serie
        if (mensaje) {
            //alert("¡Ok anularemos la serie");
            window.location.href=`/anular/${ID}`;
        }
    }
    
    
});




btnSalir.addEventListener('click', () => {
    alert('Hasta la Proxima, que tengas un excelente dia =)');
    window.location.href=`/salir`;
});