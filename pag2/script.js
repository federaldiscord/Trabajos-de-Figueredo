    document.addEventListener("DOMContentLoaded", () => {

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const edad = document.getElementById("edad");

    const guardarBtn = document.getElementById("guardar");
    const verBtn = document.getElementById("ver");
    const limpiarBtn = document.getElementById("limpiar");
    const borrarBtn = document.getElementById("borrar");

    const resultado = document.getElementById("resultado");

    // ---------------- VALIDACIONES ----------------

    const validarNombre = (v) => {
        if (!v.trim()) return "El nombre es obligatorio.";
        if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{2,}$/.test(v)) return "Solo letras, mínimo 2.";
        return true;
    };

    const validarEmail = (v) => {
        if (!v.trim()) return "El email es obligatorio.";
        if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(v)) return "Correo inválido.";
        return true;
    };

    const validarEdad = (v) => {
        if (!v.trim()) return "La edad es obligatoria.";
        if (isNaN(v)) return "Debe ser un número.";
        if (v < 1 || v > 120) return "Edad inválida.";
        return true;
    };

    const mostrarError = (input, mensaje) => {
        input.nextElementSibling.textContent = mensaje;
    };

    const limpiarErrores = () => {
        document.querySelectorAll(".error-msg").forEach(e => e.textContent = "");
    };

    // ---------------- BOTÓN GUARDAR ----------------
    guardarBtn.addEventListener("click", () => {

        limpiarErrores();
        let valido = true;

        const vNombre = validarNombre(nombre.value);
        const vEmail = validarEmail(email.value);
        const vEdad = validarEdad(edad.value);

        if (vNombre !== true) { mostrarError(nombre, vNombre); valido = false; }
        if (vEmail !== true) { mostrarError(email, vEmail); valido = false; }
        if (vEdad !== true) { mostrarError(edad, vEdad); valido = false; }

        if (!valido) {
        resultado.textContent = "Corrige los errores antes de guardar.";
        return;
        }

        const user = {
        nombre: nombre.value.trim(),
        email: email.value.trim(),
        edad: edad.value.trim()
        };

        localStorage.setItem("usuario", JSON.stringify(user));
        resultado.textContent = "✔ Usuario guardado correctamente.";
    });

    // ---------------- BOTÓN VER DATOS ----------------
    verBtn.addEventListener("click", () => {
        const stored = localStorage.getItem("usuario");

        if (!stored) {
        resultado.textContent = "No hay usuarios guardados.";
        return;
        }

        const u = JSON.parse(stored);
        resultado.innerHTML = `
        <b>Datos guardados:</b><br>
        Nombre: ${u.nombre}<br>
        Email: ${u.email}<br>
        Edad: ${u.edad}
        `;
    });

    // ---------------- BOTÓN LIMPIAR FORMULARIO ----------------
    limpiarBtn.addEventListener("click", () => {
        nombre.value = "";
        email.value = "";
        edad.value = "";

        limpiarErrores();
        resultado.textContent = "Formulario limpio.";
    });

    // ---------------- BOTÓN BORRAR ----------------
    borrarBtn.addEventListener("click", () => {
        localStorage.removeItem("usuario");
        resultado.textContent = "Datos eliminados.";
        limpiarErrores();
    });

    });
