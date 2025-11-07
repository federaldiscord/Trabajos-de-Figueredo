    function changeTheme() {
    document.body.classList.toggle("dark");
    }

    function greetUser() {
    const nameInput = document.getElementById("nameInput");
    const name = nameInput.value.trim();
    if (name) {
        alert(`¡Hola ${name}! 😊 Espero que tengas un día perfecto.`);
        nameInput.value = "";
    } else {
        alert("Por favor, escribe tu nombre antes de saludar.");
    }
    }

    function changeImage() {
    const img = document.querySelector(".imagen img");
    const images = [
        "imagenes/dia1.jpg",
        "imagenes/dia2.jpg",
        "imagenes/dia3.jpg",
        "imagenes/dia4.jpg"
    ];

    const randomImg = images[Math.floor(Math.random() * images.length)];
    img.src = randomImg;
    img.style.display = "block";
    }

    let likeCount = 0;
    function likePage() {
    likeCount++;
    const text = document.getElementById("likeCount");
    text.textContent = `A ${likeCount} persona${likeCount !== 1 ? 's' : ''} le${likeCount !== 1 ? 's' : ''} gusta esta página. ❤️`;
    }
