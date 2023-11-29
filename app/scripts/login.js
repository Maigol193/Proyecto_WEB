sessionStorage.clear();

const loginButtonUser = document.getElementById('loginUser');

const formLogin = document.getElementById('formLogin');

formLogin.addEventListener('submit', function () {
    event.preventDefault();
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
                sessionStorage.setItem('userData', xhr.responseText);
                window.location.href = "home_loggeado.html";
                console.log(xhr.responseText);
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

const formHost = document.getElementById('formHost');

formHost.addEventListener('submit', function () {
    event.preventDefault();
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
                const user =  JSON.parse(xhr.responseText);
                console.log(user);
                console.log(user.isHost);
                if(user.isHost){
                    console.log("Usuario encontrado. Iniciando sesión");
                    sessionStorage.setItem('userData', xhr.responseText);
                    window.location.href = "home_host.html";
                }
                else{
                    function mostrarAlerta() {
                        alert("No eres host!!!");
                    }
                    mostrarAlerta();
                    window.location.reload();
                }
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

const createButton = document.getElementById('createBtn');

const formCreate = document.getElementById('formCreate');

formCreate.addEventListener('submit', function () {
    event.preventDefault();
    let name = getNameCreate();
    let email = getEmailCreate();
    let password = getPasswordCreate();
    let isHost = getType();
    console.log(isHost);
    const newUser = 
        {
            name: name,
            email: email,
            password: password,
            isHost: isHost
        };
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/sinAdmin/create');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(newUser));
    xhr.onload = function () {
        console.log("Usuario creado. Iniciando sesión");
        sessionStorage.setItem('userData', xhr.responseText);
        window.location.href = "home_loggeado.html";
    };
});

function getNameCreate() {
    const name = document.getElementById('name').value;
    return name;
}

function getEmailCreate() {
    const email = document.getElementById('email').value;
    return email;
}

function getPasswordCreate() {
    const password = document.getElementById('password').value;
    return password;
}

function getType() {
    const type = document.getElementById('countries').value;
    if(type == "user"){
        return false;
    }
    else{
        return true;
    }
}