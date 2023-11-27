/*
const user = JSON.parse(sessionStorage.getItem("userData"));
var ID_cliente = user[0]._id;*/
const id_us = "655ab5bd76d6c8f8ab3ff606";

function printTodo(){

var Titulo_html = document.getElementById("Titulo");
var Ubicacion_html = document.getElementById('Ubicacion');
var Banos_html = document.getElementById('Banos');
var Habitaciones_html = document.getElementById('Habitaciones');
var Huespedes_html = document.getElementById('Huespedes');
var Camas_html = document.getElementById('Camas');
var Price_html = document.getElementById('Price');
var Img1_html = document.getElementById('Img1');
var Img2_html = document.getElementById('Img2');
var Img3_html = document.getElementById('Img3');
var Img4_html = document.getElementById('Img4');
var Img5_html = document.getElementById('Img5');
var TituloValue = Titulo_html.value;
var UbicacionValue = Ubicacion_html.value;
var BanosValue = Banos_html.value;
var HabitacionesValue = Habitaciones_html.value;
var HuespedesValue = Huespedes_html.value;
var CamasValue = Camas_html.value;
var PriceValue = Price_html.value;
var Img1Value = Img1_html.value;
var Img2Value = Img2_html.value;
var Img3Value = Img3_html.value;
var Img4Value = Img4_html.value;
var Img5Value = Img5_html.value;

    // Obtener todas las checkbox dentro del ul con id "Category_checkbox"
    var checkboxes = document.querySelectorAll('.pl');
    
    // Filtrar las checkbox seleccionadas
    var checkboxSeleccionadas = Array.from(checkboxes).filter(function(checkbox) {
        return checkbox.checked;
    });

    // Obtener las IDs de las checkbox seleccionadas
    var idsSeleccionados = checkboxSeleccionadas.map(function(checkbox) {
        return checkbox.id;
    });

    // Mostrar las IDs en la consola (puedes adaptar esto según tus necesidades)
console.log('IDs de checkbox seleccionadas:', idsSeleccionados);



console.log(TituloValue,UbicacionValue,BanosValue);
console.log(HabitacionesValue,HuespedesValue,CamasValue);
console.log(PriceValue,Img1Value,Img2Value,Img3Value,Img4Value,Img5Value);

}



