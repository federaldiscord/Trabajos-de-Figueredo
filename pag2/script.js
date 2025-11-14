document.addEventListener("DOMContentLoaded", () => {

const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const edad = document.getElementById("edad");

const guardarBtn = document.getElementById("guardar");
const verBtn = document.getElementById("ver");
const limpiarBtn = document.getElementById("limpiar");
const borrarBtn = document.getElementById("borrar");

const resultado = document.getElementById("resultado");

guardarBtn.addEventListener("click", () => {
    const user = {
    nombre: nombre.value.trim(),
    email: email.value.trim(),
    edad: edad.value.trim()
    };

    if (!user.nombre || !user.email || !user.edad) {
    resultado.textContent = "Por favor completa todos los campos.";
    return;
    }

    localStorage.setItem("usuario", JSON.stringify(user));
    resultado.textContent = "Usuario guardado correctamente.";
});

verBtn.addEventListener("click", () => {
    const stored = localStorage.getItem("usuario");

    if (!stored) {
    resultado.textContent = "No hay usuarios guardados";
    return;
    }

const u = JSON.parse(stored);
    resultado.innerHTML = `
    <b>Usuario guardado:</b><br>
    Nombre: ${u.nombre}<br>
    Email: ${u.email}<br>
    Edad: ${u.edad}
    `;
});

limpiarBtn.addEventListener("click", () => {
    nombre.value = "";
    email.value = "";
    edad.value = "";
    resultado.textContent = "Formulario limpio.";
});

  // Borrar datos
borrarBtn.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    resultado.textContent = "Datos eliminados.";
});

});
