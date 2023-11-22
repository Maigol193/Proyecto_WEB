
const loginButton = document.getElementById('loginUser');

loginButton.addEventListener('click', function () {
    console.log("Intentando loggear");
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/sinAdmin/user', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    const jsonBody = {
        email: getEmail(),
        password: getPassword()
    };
    console.log(JSON.stringify(jsonBody));
    xhr.send(JSON.stringify(jsonBody));
    

    xhr.onload = function () {
        console.log(xhr.responseText);
        if (xhr.status == 200) {
            console.log("Usuario encontrado. Iniciando sesión");
            window.location.href="home_loggeado.html";
            window.location.reload();
        }
        else{
            console.log("error");
        }
    };
});

function getEmail() {
    const email = document.getElementById('emailUser').value;
    return email;
}

function getPassword() {
    const password = document.getElementById('passwordUser').value;
    return password;
}
