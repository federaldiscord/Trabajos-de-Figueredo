//validaciones del formulario

function validarFormulario() {
    var nombre = document.getElementById("nombre").value;
    var nombre = document.getElementById("apellido").value;
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var mensaje = document.getElementById("password").value;
    var nombre = document.getElementById("confirm-password").value;
    var nombre = document.getElementById("dob").value;

    if (nombre === "" || apellido === "" || email === "" || password === "" || confirmarPassword === "" || dob === "") {
        alert("Por favor, complete todos los campos del formulario.");
        return false;
    }

    return true;;
}