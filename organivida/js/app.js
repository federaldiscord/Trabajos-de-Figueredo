document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // SISTEMA DE USUARIOS
    // =========================================
    const STORAGE_KEYS = {
        USERS: "users",
        CURRENT: "currentUser",
    };

    const getUsers = () =>
        JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");

    const saveUsers = users =>
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    const getCurrentUser = () =>
        localStorage.getItem(STORAGE_KEYS.CURRENT);

    const setCurrentUser = email =>
        localStorage.setItem(STORAGE_KEYS.CURRENT, email);

    const logout = () => {
        localStorage.removeItem(STORAGE_KEYS.CURRENT);
        location.href = "login.html";
    };

    const isLogged = () => Boolean(getCurrentUser());

    const getUserTasksKey = () => `tasks_${getCurrentUser()}`;

    const getTasks = () =>
        JSON.parse(localStorage.getItem(getUserTasksKey()) || "[]");

    const saveTasks = tasks =>
        localStorage.setItem(getUserTasksKey(), JSON.stringify(tasks));

    // =========================================
    // PROTEGER PÁGINAS
    // =========================================
    const protectedPages = ["agenda.html", "historial.html", "cuenta.html"];
    const currentPage = location.pathname.split("/").pop() || "index.html";

    if (protectedPages.includes(currentPage) && !isLogged()) {
        location.href = "login.html";
        return;
    }

    // =========================================
    // LOGIN
    // =========================================
    const loginForm = document.querySelector("#loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", e => {
            e.preventDefault();

            const email = loginEmail.value.trim();
            const pass = loginPass.value.trim();

            const users = getUsers();
            const found = users.find(u => u.email === email && u.password === pass);

            if (!found) return alert("Correo o contraseña incorrectos.");

            setCurrentUser(email);
            location.href = "agenda.html";
        });
    }

    // =========================================
    // REGISTRO
    // =========================================
    const registerForm = document.querySelector("#registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", e => {
            e.preventDefault();

            const name = regName.value.trim();
            const email = regEmail.value.trim();
            const pass1 = regPass1.value.trim();
            const pass2 = regPass2.value.trim();

            if (!name || !email || !pass1 || !pass2)
                return alert("Completa todos los campos.");

            if (pass1 !== pass2)
                return alert("Las contraseñas no coinciden.");

            if (pass1.length < 4)
                return alert("La contraseña debe ser mayor a 4 caracteres.");

            const users = getUsers();

            if (users.some(u => u.email === email))
                return alert("Este correo ya está registrado.");

            users.push({ name, email, password: pass1 });
            saveUsers(users);

            setCurrentUser(email);
            location.href = "agenda.html";
        });
    }

    // =========================================
    // MOSTRAR NOMBRE EN LA CUENTA
    // =========================================
    const username = document.getElementById("username");

    if (username && isLogged()) {
        const users = getUsers();
        const me = users.find(u => u.email === getCurrentUser());
        if (me) username.textContent = me.name;
    }

    // =========================================
    // CAMBIAR CONTRASEÑA
    // =========================================
    const changePassBtn = document.getElementById("changePassBtn");

    if (changePassBtn) {
        changePassBtn.onclick = () => {
            const oldP = oldPass.value.trim();
            const newP = newPass.value.trim();

            const users = getUsers();
            const me = users.find(u => u.email === getCurrentUser());

            if (me.password !== oldP)
                return alert("La contraseña actual es incorrecta.");

            me.password = newP;
            saveUsers(users);

            alert("Contraseña actualizada.");
        };
    }

    // =========================================
    // TAREAS
    // =========================================
    let tasks = isLogged() ? getTasks() : [];

    const taskList = document.getElementById("taskList");
    const progressBar = document.getElementById("progressBar");
    const historyList = document.getElementById("historyList");

    const renderTaskProgress = () => {
        if (!progressBar) return;
        const done = tasks.filter(t => t.done).length;
        const percent = tasks.length ? (done / tasks.length) * 100 : 0;
        progressBar.style.width = percent + "%";
    };

    const renderTasks = () => {
        if (!taskList) return;

        taskList.innerHTML = tasks
            .map(
                (t, i) => `
                <tr>
                    <td><input type="checkbox" data-id="${i}" ${t.done ? "checked" : ""}></td>
                    <td>${t.name}</td>
                    <td>${t.date}</td>
                    <td>${t.done ? "✔ Completa" : "Pendiente"}</td>
                    <td><button data-del="${i}">🗑️</button></td>
                </tr>`
            )
            .join("");

        renderTaskProgress();
    };

    const renderHistory = () => {
        if (!historyList) return;

        if (tasks.length === 0) {
            historyList.innerHTML = `<li style="opacity:.7;">No hay tareas en el historial todavía.</li>`;
            return;
        }

        historyList.innerHTML = tasks
            .map(t => `<li>${t.name} — ${t.done ? "✔" : "✖"}</li>`)
            .join("");
    };

    renderTasks();
    renderHistory();

    if (taskList) {
        taskList.onclick = e => {
            const id = e.target.dataset.id;
            const del = e.target.dataset.del;

            if (id !== undefined) {
                tasks[id].done = !tasks[id].done;
                saveTasks(tasks);
                renderTasks();
                renderHistory();
            }

            if (del !== undefined) {
                tasks.splice(del, 1);
                saveTasks(tasks);
                renderTasks();
                renderHistory();
            }
        };
    }

    // =========================================
    // MODAL DE CREAR TAREA
    // =========================================
    const taskModal = document.getElementById("taskModal");
    const btnAdd = document.getElementById("btnAddTask");
    const btnSave = document.getElementById("saveTask");
    const closeTaskModalBtn = document.getElementById("closeTaskModal");

    if (btnAdd) btnAdd.onclick = () => taskModal.classList.remove("hidden");

    if (btnSave) {
        btnSave.onclick = () => {
            const name = taskName.value.trim();
            const date = taskDate.value;

            if (!name || !date)
                return alert("Completa los campos.");

            tasks.push({ name, date, done: false });
            saveTasks(tasks);

            taskModal.classList.add("hidden");
            renderTasks();
        };
    }

    if (closeTaskModalBtn)
        closeTaskModalBtn.onclick = () => taskModal.classList.add("hidden");

    if (taskModal) {
        taskModal.onclick = e => {
            if (e.target === taskModal)
                taskModal.classList.add("hidden");
        };
    }

    // =========================================
    // MODAL DE INICIO (INDEX)
    // =========================================
    const startModal = document.getElementById("startModal");
    const closeStartBtn = document.getElementById("closeStart");

    const isIndex = currentPage === "index.html";

    if (isIndex && startModal) {
        if (!isLogged()) {
            startModal.classList.remove("hidden");
            document.body.style.overflow = "hidden";
        } else {
            startModal.classList.add("hidden");
        }
    }

    if (closeStartBtn) {
        closeStartBtn.onclick = () => {
            startModal.classList.add("hidden");
            document.body.style.overflow = "auto";
        };
    }

    if (startModal) {
        startModal.onclick = e => {
            if (e.target === startModal) {
                startModal.classList.add("hidden");
                document.body.style.overflow = "auto";
            }
        };
    }

    // =========================================
    // CARRUSEL AUTOMÁTICO
    // =========================================
    const track = document.getElementById("carouselTrack");
    const slides = document.querySelectorAll(".carousel-img");
    let idx = 0;

    if (track && slides.length > 0) {
        setInterval(() => {
            idx++;
            if (idx >= slides.length) idx = 0;
            track.style.transform = `translateX(-${idx * 100}%)`;
        }, 4000);
    }

    // =========================================
    // LOGOUT
    // =========================================
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) logoutBtn.onclick = logout;

});
