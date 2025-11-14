// ========================================================
// UTILIDADES
// ========================================================

function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("email").value = "";
    document.getElementById("edad").value = "";

    document.querySelectorAll(".error-msg").forEach(e => e.textContent = "");
}

// Estado para mostrar/ocultar
let usuariosVisibles = false;

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

    const usuarios = obtenerUsuarios();
    usuarios.push({
        nombre: nombre.value.trim(),
        email: email.value.trim(),
        edad: edad.value.trim()
    });

    guardarUsuarios(usuarios);

    limpiarFormulario();
    if (usuariosVisibles) renderUsuarios();
});

// ========================================================
// MOSTRAR / OCULTAR USUARIOS
// ========================================================

document.getElementById("ver").addEventListener("click", () => {
    usuariosVisibles = !usuariosVisibles;

    const cont = document.getElementById("resultado");

    if (usuariosVisibles) {
        renderUsuarios();
        document.getElementById("ver").textContent = "Ocultar Usuarios";
    } else {
        cont.innerHTML = "";
        document.getElementById("ver").textContent = "Mostrar Usuarios";
    }
});

// ========================================================
// LIMPIAR FORMULARIO
// ========================================================

document.getElementById("limpiar").addEventListener("click", limpiarFormulario);

// ========================================================
// BORRAR TODOS
// ========================================================

document.getElementById("borrar").addEventListener("click", () => {
    localStorage.removeItem("usuarios");
    if (usuariosVisibles) renderUsuarios();
});

// ========================================================
// RENDER DE USUARIOS
// ========================================================

function renderUsuarios() {
    const usuarios = obtenerUsuarios();
    const cont = document.getElementById("resultado");

    if (usuarios.length === 0) {
        cont.innerHTML = "";
        return;
    }

    let html = `<ul class="user-list">`;

    usuarios.forEach((u, index) => {
        const inicial = u.nombre.charAt(0).toUpperCase();

        html += `
            <li class="user-card">
                <div class="user-avatar">${inicial}</div>

                <div class="user-info">
                    <div class="user-name">${u.nombre}</div>
                    <div class="user-email">${u.email} — ${u.edad} años</div>
                </div>

                <button class="delete-icon" onclick="eliminarUsuario(${index})">
                    <svg viewBox="0 0 24 24">
                        <path d="M3 6h18M9 6v12m6-12v12M4 6l1 14c0 .55.45 1 1 1h12c.55 0 1-.45 1-1l1-14H4zM10 2h4l1 2H9l1-2z"/>
                    </svg>
                </button>
            </li>
        `;
    });

    html += "</ul>";

    cont.innerHTML = html;
}

// ========================================================
// BORRAR INDIVIDUAL
// ========================================================

function eliminarUsuario(i) {
    const usuarios = obtenerUsuarios();
    usuarios.splice(i, 1);
    guardarUsuarios(usuarios);
    renderUsuarios();
}
