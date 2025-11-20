// Referencias
const abrirModal = document.getElementById("abrirModal");
const cerrarModal = document.getElementById("cerrarModal");
const modal = document.getElementById("miModal");
const overlay = document.getElementById("overlay");

// Abrir modal
abrirModal.addEventListener("click", () => {
    modal.style.display = "flex";
    overlay.style.display = "block";
});

// Cerrar modal (X)
cerrarModal.addEventListener("click", () => {
    modal.style.display = "none";
    overlay.style.display = "none";
});

// Cerrar clic fuera
overlay.addEventListener("click", () => {
    modal.style.display = "none";
    overlay.style.display = "none";
});
