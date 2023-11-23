const loginButtonUser = document.getElementById('loginUser');

loginButtonUser.addEventListener('click', function () {
    console.log("Intentando loggear");
    let email = getEmailUser();
    let password = getPasswordUser();
    let query = "email=" + email + "&password=" + password;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/sinAdmin/user?' + query);
    xhr.send();

    xhr.onload = function () {
        if(email == "" || password == "")
            console.log("error");
        else{
            if (xhr.status == 200) {
                console.log("Usuario encontrado. Iniciando sesión");
                sessionStorage.setItem('userData', JSON.parse(xhr.responseText));
                window.location.href = "home_loggeado.html";
            } else {
                console.log("error");
            }
        }
    };
});

function getEmailUser() {
    const email = document.getElementById('emailUser').value;
    return email;
}

function getPasswordUser() {
    const password = document.getElementById('passwordUser').value;
    return password;
}

const loginButtonHost = document.getElementById('loginHost');

loginButtonHost.addEventListener('click', function () {
    console.log("Intentando loggear");
    let email = getEmailHost();
    let password = getPasswordHost();
    let query = "email=" + email + "&password=" + password;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/sinAdmin/user?' + query);
    xhr.send();

    xhr.onload = function () {
        if(email == "" || password == "")
            console.log("error");
        else{
            if (xhr.status == 200) {
                console.log("Usuario encontrado. Iniciando sesión");
                sessionStorage.setItem('userData', JSON.parse(xhr.responseText));
                window.location.href = "home_host.html";
            } else {
                console.log("error");
            }
        }
    };
});

function getEmailHost() {
    const email = document.getElementById('emailHost').value;
    return email;
}

function getPasswordHost() {
    const password = document.getElementById('passwordHost').value;
    return password;
}