// /script.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");
  const inputs = form.querySelectorAll("input[required]");
  const successMsg = document.querySelector(".success-msg");
  const button = document.getElementById("button");
  const progressBar = document.getElementById("progress-bar");

  const validators = {
    nombre: v => /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(v) || "Solo letras.",
    apellido: v => /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(v) || "Solo letras.",
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Correo inválido.",
    password: v => v.length >= 6 || "Mínimo 6 caracteres.",
    "confirm-password": v => v === form.password.value || "No coincide.",
    dob: v => {
      const fecha = new Date(v);
      if (isNaN(fecha)) return "Fecha inválida.";
      const hoy = new Date();
      let edad = hoy.getFullYear() - fecha.getFullYear();
      const m = hoy.getMonth() - fecha.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < fecha.getDate())) edad--;
      return edad >= 18 || "Debes ser mayor de 18 años.";
    }
  };

  const validateField = (input) => {
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
    if (progressBar) progressBar.style.width = `${progress}%`;
  };

  inputs.forEach(i => {
    i.addEventListener("input", () => {
      validateField(i);
      updateProgress();
      if (button) button.disabled = !Array.from(inputs).every(f => validateField(f));
    });
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const valid = Array.from(inputs).every(validateField);
    if (valid) {
      if (successMsg) {
        successMsg.textContent = `✅ ¡Registro exitoso! Bienvenid@ ${form.nombre.value} ${form.apellido.value}`;
      }
      form.reset();
      if (button) button.disabled = true;
      updateProgress();
    }
  });

  updateProgress();
});
