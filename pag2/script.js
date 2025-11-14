// ========================================================
// UTILIDADES
// ========================================================

// Obtiene lista de usuarios desde localStorage
function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

// Guarda lista completa de usuarios
function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Limpia el formulario y errores
function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("email").value = "";
    document.getElementById("edad").value = "";

    // limpiar errores
    const errores = document.querySelectorAll(".error-msg");
    errores.forEach(e => e.textContent = "");
}

// ========================================================
// VALIDACIONES
// ========================================================
function validarInputs() {
    let valido = true;

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const edad = document.getElementById("edad");

    const errorNombre = nombre.nextElementSibling;
    const errorEmail = email.nextElementSibling;
    const errorEdad = edad.nextElementSibling;

    // reset mensajes previos
    errorNombre.textContent = "";
    errorEmail.textContent = "";
    errorEdad.textContent = "";

    if (nombre.value.trim() === "") {
        errorNombre.textContent = "El nombre es obligatorio";
        valido = false;
    }

    if (email.value.trim() === "" || !email.value.includes("@")) {
        errorEmail.textContent = "Email inválido";
        valido = false;
    }

    if (edad.value.trim() === "" || edad.value <= 0) {
        errorEdad.textContent = "Edad inválida";
        valido = false;
    }

    return valido;
}

// ========================================================
// GUARDAR USUARIO
// ========================================================
document.getElementById("guardar").addEventListener("click", () => {
    if (!validarInputs()) return;

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const edad = document.getElementById("edad").value.trim();

    const usuarios = obtenerUsuarios();

    usuarios.push({ nombre, email, edad });
    guardarUsuarios(usuarios);

    limpiarFormulario();
    renderUsuarios();
});

// ========================================================
// BOTÓN VER DATOS
// ========================================================
document.getElementById("ver").addEventListener("click", renderUsuarios);

// ========================================================
// BOTÓN LIMPIAR FORMULARIO
// ========================================================
document.getElementById("limpiar").addEventListener("click", limpiarFormulario);

// ========================================================
// BORRAR TODOS LOS DATOS
// ========================================================
document.getElementById("borrar").addEventListener("click", () => {
    localStorage.removeItem("usuarios");
    renderUsuarios();
});

// ========================================================
// RENDERIZAR LISTA DE USUARIOS CON BOTÓN INDIVIDUAL
// ========================================================
function renderUsuarios() {
    const usuarios = obtenerUsuarios();
    const cont = document.getElementById("resultado");

    if (usuarios.length === 0) {
        cont.innerHTML = "No hay usuarios guardados";
        return;
    }

    let html = "<ul style='list-style:none; padding:0;'>";

    usuarios.forEach((u, index) => {
        html += `
            <li style="
                margin-bottom: 12px;
                background: white;
                padding: 10px;
                border-radius: 6px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.08);
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <div>
                    <strong>${u.nombre}</strong> <br>
                    ${u.email} — ${u.edad} años
                </div>

                <button 
                    style="
                        background:#e74c3c;
                        border:none;
                        padding:6px 10px;
                        color:white;
                        border-radius:5px;
                        cursor:pointer;
                    "
                    onclick="eliminarUsuario(${index})"
                >
                    Eliminar
                </button>
            </li>
        `;
    });

    html += "</ul>";
    cont.innerHTML = html;
}

// ========================================================
// ELIMINAR USUARIO INDIVIDUAL
// ========================================================
function eliminarUsuario(indice) {
    const usuarios = obtenerUsuarios();
    usuarios.splice(indice, 1);
    guardarUsuarios(usuarios);
    renderUsuarios();
}
