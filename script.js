 // Array asociativo de invitados (número de teléfono: nombre)
 /*const invitados = {
    "1234567890": "Ana Pérez",
    "0987654321": "Juan Gómez",
    "5555555555": "María López",
    "4444444444": "Carlos Rodríguez",
    "3333333333": "Sofía Martínez"
    // Agrega más invitados según necesites
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
        downloadInvitation(nombreInvitado, phone);
        downloadForm.reset();
    } else {
        errorMessage.style.display = 'block';
    }
});

// Función para descargar el PDF existente
function downloadInvitation(nombre, telefono) {
    const pdfUrl = './invitacion_boda_y_w.pdf'; // Ajusta esta ruta según la ubicación de tu PDF
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `Invitacion_Boda_${nombre.replace(" ", "_")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
});*/
// Array asociativo de invitados (número de teléfono: nombre)
const invitados = {
    "1234567890": "Ana Pérez",
    "0987654321": "Juan Gómez",
    "5555555555": "María López",
    "4444444444": "Carlos Rodríguez",
    "3333333333": "Sofía Martínez"
};

// Referencias al DOM
const downloadForm = document.getElementById('download-invite-form');
const errorMessage = document.getElementById('error-message');

// Navegación por puntos (sin cambios)
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
    const pdfUrl = './invitacion_boda_y_w.pdf'; // Asegúrate que esta ruta sea correcta
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

// Animación al hacer scroll (sin cambios)
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

// Animación de hojas flotantes (sin cambios)
const plants = document.querySelectorAll('.plant-decoration');
plants.forEach((plant, index) => {
    plant.style.animation = `leafFloat ${3 + index}s ease-in-out infinite alternate`;
});