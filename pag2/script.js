document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form");
    const inputs = form.querySelectorAll("input[required]");
    const registerBtn = document.getElementById("register-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const successMsg = document.querySelector(".success-msg");
    const progressBar = document.getElementById("progress-bar");

    const validators = {
        nombre: v => /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(v) || "Solo letras.",
        apellido: v => /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(v) || "Solo letras.",
        email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Correo inválido.",
        password: v => v.length >= 6 || "Mínimo 6 caracteres."
    };

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

    const updateProgress = () => {
        const filled = Array.from(inputs).filter(i => i.value.trim() !== "").length;
        const progress = (filled / inputs.length) * 100;
        progressBar.style.width = `${progress}%`;
    };

    const loadUser = () => {
        const saved = JSON.parse(localStorage.getItem("user"));
        if (saved) {
        form.style.display = "none";
        successMsg.textContent = `👋 Bienvenid@ ${saved.nombre} ${saved.apellido} (${saved.email})`;
        logoutBtn.style.display = "block";
        }
    };

    inputs.forEach(i => {
        i.addEventListener("input", () => {
        validateField(i);
        updateProgress();
        registerBtn.disabled = !Array.from(inputs).every(f => validateField(f));
        });
    });

    form.addEventListener("submit", e => {
        e.preventDefault();
        const valid = Array.from(inputs).every(validateField);
        if (!valid) return;

        const userData = {};
        inputs.forEach(i => userData[i.name] = i.value.trim());
        localStorage.setItem("user", JSON.stringify(userData));

        successMsg.textContent = `✅ ¡Registro guardado! Bienvenid@ ${userData.nombre}`;
        form.reset();
        registerBtn.disabled = true;
        updateProgress();

        setTimeout(() => location.reload(), 1000);
    });

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("user");
        location.reload();
    });

    loadUser();
    updateProgress();
    });
