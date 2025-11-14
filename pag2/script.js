    document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const inputs = form.querySelectorAll("input[required]");
    const progressBar = document.getElementById("progress-bar");
    const registerBtn = document.getElementById("register-btn");
    const successMsg = document.querySelector(".success-msg");

    const pwdStrengthBars = document
        .querySelector("#password-strength")
        .querySelectorAll("span");

    // ---------- VALIDADORES AVANZADOS ----------
    const validators = {
        nombre: v =>
        /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{2,}$/.test(v) || "Mínimo 2 letras.",

        apellido: v =>
        /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{2,}$/.test(v) || "Mínimo 2 letras.",

        email: v =>
        /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(v) || "Correo inválido.",

        password: v => {
        if (v.length < 8) return "Mínimo 8 caracteres.";
        if (!/[A-Z]/.test(v)) return "Agrega una mayúscula.";
        if (!/[a-z]/.test(v)) return "Agrega una minúscula.";
        if (!/[0-9]/.test(v)) return "Agrega un número.";
        if (!/[!@#$%^&*()_+\-=]/.test(v)) return "Agrega un símbolo.";
        return true;
        },

        "confirm-password": v =>
        v === form.password.value || "Las contraseñas no coinciden.",

        dob: v => {
        const fecha = new Date(v);
        const hoy = new Date();
        let edad = hoy.getFullYear() - fecha.getFullYear();
        const m = hoy.getMonth() - fecha.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < fecha.getDate())) edad--;
        return edad >= 18 || "Debes ser mayor de 18 años.";
        }
    };

    // ---------- GUARDADO AUTOMÁTICO ----------
    inputs.forEach(input => {
        const saved = localStorage.getItem(input.id);
        if (saved) input.value = saved;

        input.addEventListener("input", () => {
        localStorage.setItem(input.id, input.value);
        });
    });

    // ---------- VALIDACIONES EN TIEMPO REAL ----------
    const validateField = input => {
        const errorEl = input.nextElementSibling;
        const result = validators[input.id]?.(input.value.trim());

        if (result !== true) {
        errorEl.textContent = result;
        input.classList.add("invalid");
        return false;
        }

        errorEl.textContent = "";
        input.classList.remove("invalid");
        return true;
    };

    // ---------- FUERZA DE CONTRASEÑA ----------
    const updatePasswordStrength = () => {
        const pwd = form.password.value;

        let score = 0;
        if (pwd.length >= 8) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[a-z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[!@#$%^&*]/.test(pwd)) score++;

        pwdStrengthBars.forEach((bar, i) => {
        bar.style.background = i < score ? "#4CAF50" : "#ddd";
        });
    };

    // ---------- PROGRESO ----------
    const updateProgress = () => {
        const filled = Array.from(inputs).filter(i => i.value.trim() !== "").length;
        const pct = (filled / inputs.length) * 100;
        progressBar.style.width = pct + "%";

        // Colores dinámicos
        progressBar.style.background =
        pct < 30 ? "red" : pct < 70 ? "orange" : "green";
    };

    // ---------- EVENTOS ----------
    inputs.forEach(input => {
        input.addEventListener("input", () => {
        validateField(input);
        updateProgress();
        updatePasswordStrength();

        registerBtn.disabled = !Array.from(inputs).every(f =>
            validateField(f)
        );
        });
    });

    // ---------- SUBMIT ----------
    form.addEventListener("submit", e => {
        e.preventDefault();

        const valid = Array.from(inputs).every(validateField);
        if (!valid) return;

        successMsg.textContent =
        "✅ ¡Registro exitoso! Bienvenido/a " +
        form.nombre.value +
        " " +
        form.apellido.value;

        localStorage.clear();
        form.reset();

        registerBtn.disabled = true;
        updateProgress();
        updatePasswordStrength();
    });

    updateProgress();
    });
