// Array asociativo de invitados (número de teléfono: nombre)
const invitados = {
    "1234567890": "Ana Pérez",
    "0987654321": "Juan Gómez",
    "5555555555": "María López",
    "4444444444": "Carlos Rodríguez",
    "3333333333": "Sofía Martínez",
};

// Referencias al DOM
const downloadForm = document.getElementById('download-invite-form');
const errorMessage = document.getElementById('error-message');

// Navegación por puntos
const dots = document.querySelectorAll('.dot');
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = Array.from(sections).indexOf(entry.target);
            updateActiveDot(index);
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));

function updateActiveDot(index) {
    dots.forEach(dot => {
        dot.classList.remove('active');
        if (parseInt(dot.dataset.section) === index) dot.classList.add('active');
    });
}

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const index = dot.dataset.section;
        sections[index].scrollIntoView({ behavior: 'smooth' });
    });
});

// Manejo del formulario para descargar invitación
downloadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const phone = document.getElementById('phone').value;
    const nombreInvitado = invitados[phone];
    
    if (nombreInvitado) {
        errorMessage.style.display = 'none';
        downloadInvitation(nombreInvitado);
        downloadForm.reset();
    } else {
        errorMessage.style.display = 'block';
    }
});

// Función para descargar el PDF existente
function downloadInvitation(nombre) {
    const pdfUrl = './invitacion_boda_y_w.pdf';
    const fileName = `Invitacion_Boda_${nombre.replace(" ", "_")}.pdf`;
    
    fetch(pdfUrl)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error al descargar el PDF:', error);
            errorMessage.textContent = 'Error al descargar la invitación';
            errorMessage.style.display = 'block';
        });
}

// Animación al hacer scroll
const fadeElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// Animación de hojas flotantes
const plants = document.querySelectorAll('.plant-decoration');
plants.forEach((plant, index) => {
    plant.style.animation = `leafFloat ${3 + index}s ease-in-out infinite alternate`;
});

// Countdown timer
function updateCountdown() {
    const weddingDate = new Date('July 12, 2025 16:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    if (distance < 0) {
        document.querySelector('.countdown h3').textContent = '¡Ya nos casamos!';
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Color Palette Tabs y Background Change
const tabButtons = document.querySelectorAll('.tab-btn');
const colorPanels = document.querySelectorAll('.color-panel');
const colorSection = document.querySelector('.color-palette');
const colorSwatches = document.querySelectorAll('.color-swatch');

// Función para calcular el brillo del color y ajustar el texto
function adjustTextColor(bgColor) {
    // Convertir el color RGB a valores numéricos
    const rgb = bgColor.match(/\d+/g).map(Number);
    const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000; // Fórmula de luminancia
    const textElements = colorSection.querySelectorAll('h2, p, .icon');
    
    textElements.forEach(el => {
        el.style.color = brightness > 128 ? '#333' : '#fff'; // Negro si el fondo es claro, blanco si es oscuro
    });
}

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        colorPanels.forEach(panel => panel.classList.remove('active'));

        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
        const selectedColor = swatch.style.backgroundColor;
        colorSection.style.background = selectedColor;
        adjustTextColor(selectedColor); // Ajustar el color del texto
    });
});


//Mensaje novios
const brideImage = document.querySelector('.image-wrapper.bride');
const groomImage = document.querySelector('.image-wrapper.groom');
const messageBoth = document.getElementById('message-both');
const messageBride = document.getElementById('message-bride');
const messageGroom = document.getElementById('message-groom');

brideImage.addEventListener('click', () => {
    if (brideImage.classList.contains('active')) {
        brideImage.classList.remove('active');
        messageBride.classList.remove('active');
        messageBoth.classList.add('active');
    } else {
        brideImage.classList.add('active');
        groomImage.classList.remove('active');
        messageBoth.classList.remove('active');
        messageGroom.classList.remove('active');
        messageBride.classList.add('active');
    }
});

groomImage.addEventListener('click', () => {
    if (groomImage.classList.contains('active')) {
        groomImage.classList.remove('active');
        messageGroom.classList.remove('active');
        messageBoth.classList.add('active');
    } else {
        groomImage.classList.add('active');
        brideImage.classList.remove('active');
        messageBoth.classList.remove('active');
        messageBride.classList.remove('active');
        messageGroom.classList.add('active');
    }
});