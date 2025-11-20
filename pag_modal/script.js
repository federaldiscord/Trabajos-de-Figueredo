const abrirModal = document.getElementById("abrirModal");
const cerrarModal = document.getElementById("cerrarModal");
const modal = document.getElementById("miModal");
const overlay = document.getElementById("overlay");

abrirModal.addEventListener("click", () => {
    modal.style.display = "flex";   // Mostrar modal
    overlay.style.display = "block"; // Activar blur
});

cerrarModal.addEventListener("click", () => {
    modal.style.display = "none";
    overlay.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === overlay) {
        modal.style.display = "none";
        overlay.style.display = "none";
    }
});
