sessionStorage.clear()

let alojamientosJSON;
let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/alojamientos/get_all');
xhr.send();

xhr.onload = function(){
    if(xhr.status == 200){
        alojamientosJSON = JSON.parse(xhr.responseText);
        let index = 1;
        alojamientosToDisplay(alojamientosJSON, index) //currentResults()
    }
};

function alojamientosToDisplay(array, index){
    const productsPerPage = 8;
    const limitIndex = index * productsPerPage;
    const alojamientos = array.slice(0,limitIndex);
    let html = "<div class='row inline-flex'>";
    
}