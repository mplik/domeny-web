function changeImage() {
    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');
    if (image1.style.display === 'none') {
        image1.style.display = 'block';
        image2.style.display = 'none';
    } else {
        image1.style.display = 'none';
        image2.style.display = 'block';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('nav-toggle').addEventListener('click', function() {
        const menu = document.getElementById('nav-menu');
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
    });
});

function toggleCard() {
    const content = document.querySelector('.card-content');
    if (content.style.display === 'block') {
        content.style.display = 'none';
    } else {
        content.style.display = 'block';
    }
}

// Funkcja do wyświetlania/ukrywania zdjęcia
function toggleImage() {
    const container = document.getElementById("cert-container");
    if (container.style.display === "none" || container.style.display === "") {
        container.style.display = "flex"; // Wyświetl kontener z certyfikatem
    } else {
        container.style.display = "none"; // Ukryj kontener
    }
}

// Dodaje przyciski do obsługi wyświetlania i zamykania zdjęcia
document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("cert-button"); // Przycisk do wyświetlania certyfikatu
    const closeButton = document.getElementById("close-button"); // Przycisk do zamykania certyfikatu
    
    if (button) {
        button.addEventListener("click", toggleImage);
    }
    
    if (closeButton) {
        closeButton.addEventListener("click", toggleImage); // Zamykanie certyfikatu
    }

    // Dodatkowa funkcjonalność dla menu nawigacyjnego
    document.getElementById('nav-toggle').addEventListener('click', function() {
        const menu = document.getElementById('nav-menu');
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
    });
});
