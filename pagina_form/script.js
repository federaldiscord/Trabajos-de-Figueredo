document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("button");
    button.addEventListener("click", validarFormulario);
    });

    function validarFormulario() {
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmarPassword = document.getElementById("confirm-password").value;
    const dob = document.getElementById("dob").value;

    if (!nombre || !apellido || !email || !password || !confirmarPassword || !dob) {
        alert("⚠️ Por favor, complete todos los campos obligatorios.");
        return false;
    }

    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
    if (!regexNombre.test(nombre) || !regexNombre.test(apellido)) {
        alert("❌ El nombre y el apellido solo pueden contener letras.");
        return false;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        alert("❌ Ingrese un correo electrónico válido.");
        return false;
    }

    if (password.length < 6) {
        alert("❌ La contraseña debe tener al menos 6 caracteres.");
        return false;
    }

    if (password !== confirmarPassword) {
        alert("❌ Las contraseñas no coinciden.");
        return false;
    }

    const fechaNacimiento = new Date(dob);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    const dia = hoy.getDate() - fechaNacimiento.getDate();

    let edadFinal = edad;
    if (mes < 0 || (mes === 0 && dia < 0)) edadFinal--;

    if (edadFinal < 18) {
        alert("⚠️ Debes tener al menos 18 años para registrarte.");
        return false;
    }

    alert(`¡Registro exitoso! Bienvenid@ ${nombre} ${apellido}.`);
    document.querySelector(".form").reset();
    return true;
}
document.querySelector(".form").addEventListener("submit", (e) => {
    e.preventDefault();
    validarFormulario();
});

