const input = document.getElementById("tareaInput");
const btnAgregar = document.getElementById("agregarBtn");
const lista = document.getElementById("listaTareas");

btnAgregar.addEventListener("click", agregarTarea);
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") agregarTarea();
});

function agregarTarea() {
    const texto = input.value.trim();
    if (texto === "") return;

    const li = document.createElement("li");
    li.textContent = texto;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "X";
    btnEliminar.addEventListener("click", () => li.remove());

    li.addEventListener("click", (e) => {
        if (e.target.tagName !== "BUTTON") li.classList.toggle("completed");
    });

    li.appendChild(btnEliminar);
    lista.appendChild(li);
    input.value = "";

    li.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        li.remove();
    });
}