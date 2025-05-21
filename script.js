// const invitados = {
//     // Iglesia (13 personas)
//     "+18296786377": "Elvira y José Aquino",
//     "+18298634708": "Junior y Deyanira",
//     "+18094790612": "Yasmeiry y Juan Carlos",
//     "+18492050067": "Brandy",
//     "+18492227408": "Mariel",
//     "+18299336890": "Roy Anderson",
//     "+18294875210": "La Chapel",
//     "+18094284122": "Manuel",
//     "+18295375463": "Josabeth y Robin",
//
//     // Amigos (13 personas)
//     "+18094196517": "Yanna",
//     "+18496547674": "Wanda",
//     "+18496214436": "Ineraliza",
//     "+18293322448": "Yireth y Ramon",
//     "+18295254546": "Carlos y Cristina",
//     "+13472232193": "Patricia",
//     "+18092597465": "Jhon",
//     "+18495041318": "Nidio",
//     "+18297126544": "Marcos",
//     "+18492081610": "Noviecito",
//     "+18299887457": "Ashley",
//
//     // Familia Abad (5 personas)
//     "+18093586644": "Orfelina y Víctor",
//     "+18299388107": "Rosario",
//     "+18098909695": "Delmira",
//     "+18299069193": "Ariana",
//
//     // Familia (17 personas)
//     "+18497509333": "Carlos y Yudy",
//     "+18295621146": "Carlos Junior y Maricris",
//     "+18298689207": "Carlos Enríquez",
//     "+18296994769": "Melaiony",
//     "+18456752107": "Isaac y Felicia",
//     "+18498816923": "Alexander y Elizabeth",
//     "+18292620682": "Leidy y Tomas",
//     "+18498178401": "Lirrus",
//     "+13479329940": "Nelson y Sainy",
//     "+16469860892": "Leimy y Emily",
//
//     // Familia de Abuelos (13 personas)
//     "+18097620242": "Nidia y Anyi",
//     "+18293745836": "Ramona",
//     "+18498633490": "Joséfina",
//     "+18096674065": "Evangélito",
//     "+18097783873": "Dubo",
//     "+18092678873": "Serafin", // Nota: Mismo número que Joséfina, podría ser un error
//     "+18093863434": "Juan",
//     "+18096651197": "Joeli",
//     "+18092147954": "Eli",
//     "+18295491750": "Nery",
//     "+34624586408": "Sara",
//     "+18298159086": "Noemí",
//
//     // Familia Emiliano (2 personas)
//     "+18092171976": "Yessenia y Edwar",
//     "+18098280095": "Yessy"
// };
//
// // Referencias al DOM
// const downloadForm = document.getElementById('download-invite-form');
// const errorMessage = document.getElementById('error-message');
//
// // Navegación por puntos
// const dots = document.querySelectorAll('.dot');
// const sections = document.querySelectorAll('section');
//
// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             const index = Array.from(sections).indexOf(entry.target);
//             updateActiveDot(index);
//         }
//     });
// }, { threshold: 0.5 });
//
// sections.forEach(section => observer.observe(section));
//
// function updateActiveDot(index) {
//     dots.forEach(dot => {
//         dot.classList.remove('active');
//         if (parseInt(dot.dataset.section) === index) dot.classList.add('active');
//     });
// }
//
// dots.forEach(dot => {
//     dot.addEventListener('click', () => {
//         const index = dot.dataset.section;
//         sections[index].scrollIntoView({ behavior: 'smooth' });
//     });
// });
//
// // Manejo del formulario para descargar invitación
// downloadForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//
//     const countryCode = document.getElementById('country-code').value;
//     const country = document.getElementById('country-code').selectedOptions[0].dataset.country;
//     let phone = document.getElementById('phone').value;
//
//     // Limpiar el número: eliminar espacios, guiones y otros caracteres no numéricos
//     phone = phone.replace(/[^0-9]/g, '');
//
//     // Validar según el país
//     let isValid = false;
//     let errorText = '';
//     if (!countryCode) {
//         errorText = 'Por favor, selecciona un país.';
//     } else if (countryCode === '+34') {
//         // España: 9 dígitos
//         isValid = phone.length === 9;
//         errorText = 'Por favor, ingresa un número válido de 9 dígitos para España (ej. 612345678).';
//     } else if (countryCode === '+1' && country === 'US') {
//         // EE.UU.: 10 dígitos
//         isValid = phone.length === 10;
//         errorText = 'Por favor, ingresa un número válido de 10 dígitos para EE.UU. (ej. 1234567890).';
//     } else if (countryCode === '+1' && country === 'DO') {
//         // RD: 10 dígitos con código de área 809, 829, 849
//         const rdAreaCodes = ['809', '829', '849'];
//         isValid = phone.length === 10 && rdAreaCodes.includes(phone.slice(0, 3));
//         errorText = 'Por favor, ingresa un número válido de RD con código de área 809, 829 o 849 (ej. 8091234567).';
//     }
//
//     if (!isValid) {
//         errorMessage.textContent = errorText;
//         errorMessage.style.display = 'block';
//         return;
//     }
//
//     // Normalizar el número con el código de país
//     const normalizedPhone = `${countryCode}${phone}`;
//
//     // Buscar el invitado
//     const nombreInvitado = invitados[normalizedPhone];
//
//     if (nombreInvitado) {
//         errorMessage.style.display = 'none';
//         downloadInvitation(nombreInvitado);
//         downloadForm.reset();
//
//         // Disparar confeti
//         confetti({
//             particleCount: 100,
//             spread: 70,
//             origin: { y: 0.6 },
//             colors: ['#606948', '#6F4E37', '#B5A691', '#6B8A7A'], // Colores de tu paleta
//             shapes: ['circle', 'square', 'star'],
//             scalar: 1.2
//         });
//     } else {
//         errorMessage.textContent = 'Número no encontrado. Por favor, verifica e intenta de nuevo.';
//         errorMessage.style.display = 'block';
//     }
// });
//
// // Actualizar el mensaje de ayuda según el país seleccionado
// document.getElementById('country-code').addEventListener('change', function () {
//     const countryCode = this.value;
//     const country = this.selectedOptions[0].dataset.country;
//     const phoneHelp = document.getElementById('phone-help');
//     const phoneInput = document.getElementById('phone');
//     if (countryCode === '+34') {
//         phoneHelp.textContent = 'Ingresa 9 dígitos (ej. 612345678).';
//         phoneInput.placeholder = 'Ej. 612345678';
//     } else if (countryCode === '+1' && country === 'US') {
//         phoneHelp.textContent = 'Ingresa 10 dígitos (ej. 1234567890).';
//         phoneInput.placeholder = 'Ej. 1234567890';
//     } else if (countryCode === '+1' && country === 'DO') {
//         phoneHelp.textContent = 'Ingresa 10 dígitos con código de área 809, 829 o 849 (ej. 8091234567).';
//         phoneInput.placeholder = 'Ej. 8091234567';
//     } else {
//         phoneHelp.textContent = 'Selecciona un país para ver el formato correcto.';
//         phoneInput.placeholder = 'Ingresa tu número';
//     }
// });
//
// // Función para descargar el PDF existente y mostrar mensaje de agradecimiento
// function downloadInvitation(nombre) {
//     const pdfUrl = './invitacion_boda_y_w.pdf';
//     const fileName = `Invitacion_Boda_${nombre.replace(" ", "_")}.pdf`;
//
//     // Crear el mensaje de agradecimiento
//     const thankYouMessage = document.createElement('div');
//     thankYouMessage.className = 'thank-you-message';
//     thankYouMessage.innerHTML = `
//         <p>¡Gracias, ${nombre}! Tu invitación está lista</p>
//     `;
//     document.body.appendChild(thankYouMessage);
//
//     // Descargar el PDF
//     fetch(pdfUrl)
//         .then(response => response.blob())
//         .then(blob => {
//             const url = window.URL.createObjectURL(blob);
//             const link = document.createElement('a');
//             link.href = url;
//             link.download = fileName;
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//             window.URL.revokeObjectURL(url);
//
//             // Eliminar el mensaje después de 3 segundos
//             setTimeout(() => {
//                 thankYouMessage.style.opacity = '0';
//                 setTimeout(() => {
//                     document.body.removeChild(thankYouMessage);
//                 }, 500);
//             }, 3000);
//         })
//         .catch(error => {
//             console.error('Error al descargar el PDF:', error);
//             errorMessage.textContent = 'Error al descargar la invitación. Por favor, intenta de nuevo.';
//             errorMessage.style.display = 'block';
//             document.body.removeChild(thankYouMessage);
//         });
// }
//
// // Resto del código sin cambios (animaciones, countdown, paleta de colores, mensajes de novios, etc.)
// // Animación al hacer scroll
// const fadeElements = document.querySelectorAll('.fade-in');
// const fadeObserver = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.style.opacity = 1;
//             entry.target.style.transform = 'translateY(0)';
//         }
//     });
// }, { threshold: 0.1 });
//
// fadeElements.forEach(el => {
//     el.style.opacity = 0;
//     el.style.transform = 'translateY(20px)';
//     el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
//     fadeObserver.observe(el);
// });
//
// // Animación de hojas flotantes
// const plants = document.querySelectorAll('.plant-decoration');
// plants.forEach((plant, index) => {
//     plant.style.animation = `leafFloat ${3 + index}s ease-in-out infinite alternate`;
// });
//
// // Countdown timer
// function updateCountdown() {
//     const weddingDate = new Date('July 12, 2025 16:00:00').getTime();
//     const now = new Date().getTime();
//     const distance = weddingDate - now;
//
//     const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((distance % (1000 * 60)) / 1000);
//
//     document.getElementById('days').textContent = days;
//     document.getElementById('hours').textContent = hours;
//     document.getElementById('minutes').textContent = minutes;
//     document.getElementById('seconds').textContent = seconds;
//
//     if (distance < 0) {
//         document.querySelector('.countdown h3').textContent = '¡Ya nos casamos!';
//         document.getElementById('days').textContent = '0';
//         document.getElementById('hours').textContent = '0';
//         document.getElementById('minutes').textContent = '0';
//         document.getElementById('seconds').textContent = '0';
//     }
// }
//
// setInterval(updateCountdown, 1000);
// updateCountdown();
//
// // Color Palette Tabs y Background Change
// const tabButtons = document.querySelectorAll('.tab-btn');
// const colorPanels = document.querySelectorAll('.color-panel');
// const colorSection = document.querySelector('.color-palette');
// const colorSwatches = document.querySelectorAll('.color-swatch');
//
// // Función para calcular el brillo del color y ajustar el texto
// function adjustTextColor(bgColor) {
//     const rgb = bgColor.match(/\d+/g).map(Number);
//     const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
//     const textElements = colorSection.querySelectorAll('h2, p, .icon');
//
//     textElements.forEach(el => {
//         el.style.color = brightness > 128 ? '#333' : '#fff';
//     });
// }
//
// tabButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         tabButtons.forEach(btn => btn.classList.remove('active'));
//         colorPanels.forEach(panel => panel.classList.remove('active'));
//
//         button.classList.add('active');
//         const tabId = button.getAttribute('data-tab');
//         document.getElementById(tabId).classList.add('active');
//     });
// });
//
// colorSwatches.forEach(swatch => {
//     swatch.addEventListener('click', () => {
//         const selectedColor = swatch.style.backgroundColor;
//         colorSection.style.background = selectedColor;
//         adjustTextColor(selectedColor);
//     });
// });
//
// // Mensaje novios
// const brideImage = document.querySelector('.image-wrapper.bride');
// const groomImage = document.querySelector('.image-wrapper.groom');
// const messageBoth = document.getElementById('message-both');
// const messageBride = document.getElementById('message-bride');
// const messageGroom = document.getElementById('message-groom');
//
// brideImage.addEventListener('click', () => {
//     if (brideImage.classList.contains('active')) {
//         brideImage.classList.remove('active');
//         messageBride.classList.remove('active');
//         messageBoth.classList.add('active');
//     } else {
//         brideImage.classList.add('active');
//         groomImage.classList.remove('active');
//         messageBoth.classList.remove('active');
//         messageGroom.classList.remove('active');
//         messageBride.classList.add('active');
//     }
// });
//
// groomImage.addEventListener('click', () => {
//     if (groomImage.classList.contains('active')) {
//         groomImage.classList.remove('active');
//         messageGroom.classList.remove('active');
//         messageBoth.classList.add('active');
//     } else {
//         groomImage.classList.add('active');
//         brideImage.classList.remove('active');
//         messageBoth.classList.remove('active');
//         messageBride.classList.remove('active');
//         messageGroom.classList.add('active');
//     }
// });


// Lista de invitados
const invitados = {
    // Iglesia (13 personas)
    "+18296786377": "Elvira y José Aquino",
    "+18298634708": "Junior y Deyanira",
    "+18094790612": "Yasmeiry y Juan Carlos",
    "+18492050067": "Brandy",
    "+18492227408": "Mariel",
    "+18299336890": "Roy Anderson",
    "+18294875210": "La Chapel",
    "+18094284122": "Manuel",
    "+18295375463": "Josabeth y Robin",
    // Amigos (13 personas)
    "+18094196517": "Yanna",
    "+18496547674": "Wanda",
    "+18496214436": "Ineraliza",
    "+18293322448": "Yireth y Ramon",
    "+18295254546": "Carlos y Cristina",
    "+13472232193": "Patricia",
    "+18092597465": "Jhon",
    "+18495041318": "Nidio",
    "+18297126544": "Marcos",
    "+18492081610": "Noviecito",
    "+18299887457": "Ashley",
    // Familia Abad (5 personas)
    "+18093586644": "Orfelina y Víctor",
    "+18299388107": "Rosario",
    "+18098909695": "Delmira",
    "+18299069193": "Ariana",
    // Familia (17 personas)
    "+18497509333": "Carlos y Yudy",
    "+18295621146": "Carlos Junior y Maricris",
    "+18298689207": "Carlos Enríquez",
    "+18296994769": "Melaiony",
    "+18456752107": "Isaac y Felicia",
    "+18498816923": "Alexander y Elizabeth",
    "+18292620682": "Leidy y Tomas",
    "+18498178401": "Lirrus",
    "+13479329940": "Nelson y Sainy",
    "+16469860892": "Leimy y Emily",
    // Familia de Abuelos (13 personas)
    "+18097620242": "Nidia y Anyi",
    "+18293745836": "Ramona",
    "+18498633490": "Joséfina",
    "+18096674065": "Evangélito",
    "+18097783873": "Dubo",
    "+18092678873": "Serafin", // Nota: Mismo número que Joséfina, podría ser un error
    "+18093863434": "Juan",
    "+18096651197": "Joeli",
    "+18092147954": "Eli",
    "+18295491750": "Nery",
    "+34624586408": "Sara",
    "+18298159086": "Noemí",
    // Familia Emiliano (2 personas)
    "+18092171976": "Yessenia y Edwar",
    "+18098280095": "Yessy"
};

// Referencias al DOM
const downloadForm = document.getElementById('download-invite-form');
const phoneInput = document.getElementById('phone');
const errorMessage = document.getElementById('error-message');

// Máscara de entrada para el formato (XXX) XXX-XXXX
phoneInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Elimina todo lo que no sea dígito
    let formattedValue = '';

    if (value.length > 0) {
        formattedValue = '(' + value.substring(0, 3);
    }
    if (value.length >= 3) {
        formattedValue += ') ';
    }
    if (value.length >= 4) {
        formattedValue += value.substring(3, 6);
    }
    if (value.length >= 7) {
        formattedValue += '-' + value.substring(6, 10);
    }

    e.target.value = formattedValue; // Actualiza el valor del input
});

// Manejo del formulario para descargar invitación
downloadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let phone = phoneInput.value.replace(/\D/g, ''); // Elimina paréntesis, espacio y guion
    const phoneRegex = /^\d{10}$/; // Valida que sean exactamente 10 dígitos

    if (!phoneRegex.test(phone)) {
        errorMessage.textContent = 'Por favor, ingresa un número válido de 10 dígitos en el formato (123) 456-7890.';
        errorMessage.style.display = 'block';
        return;
    }

    // Normalizar el número con el código de país +1
    const normalizedPhone = `+1${phone}`;

    // Buscar el invitado
    const nombreInvitado = invitados[normalizedPhone];

    if (nombreInvitado) {
        errorMessage.style.display = 'none';
        downloadInvitation(nombreInvitado);
        downloadForm.reset();

        // Disparar confeti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#606948', '#6F4E37', '#B5A691', '#6B8A7A'], // Colores de tu paleta
            shapes: ['circle', 'square', 'star'],
            scalar: 1.2
        });
    } else {
        errorMessage.textContent = 'Número no encontrado. Por favor, verifica e intenta de nuevo.';
        errorMessage.style.display = 'block';
    }
});

// Función para descargar el PDF existente y mostrar mensaje de agradecimiento
function downloadInvitation(nombre) {
    const pdfUrl = './invitacion_boda_y_w.pdf';
    const fileName = `Invitacion_Boda_${nombre.replace(" ", "_")}.pdf`;

    // Crear el mensaje de agradecimiento
    const thankYouMessage = document.createElement('div');
    thankYouMessage.className = 'thank-you-message';
    thankYouMessage.innerHTML = `
        <p>¡Gracias, ${nombre}! Tu invitación está lista</p>
    `;
    document.body.appendChild(thankYouMessage);

    // Descargar el PDF
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

            // Eliminar el mensaje después de 3 segundos
            setTimeout(() => {
                thankYouMessage.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(thankYouMessage);
                }, 500);
            }, 3000);
        })
        .catch(error => {
            console.error('Error al descargar el PDF:', error);
            errorMessage.textContent = 'Error al descargar la invitación. Por favor, intenta de nuevo.';
            errorMessage.style.display = 'block';
            if (thankYouMessage.parentNode) {
                document.body.removeChild(thankYouMessage);
            }
        });
}

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
    const rgb = bgColor.match(/\d+/g).map(Number);
    const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
    const textElements = colorSection.querySelectorAll('h2, p, .icon');

    textElements.forEach(el => {
        el.style.color = brightness > 128 ? '#333' : '#fff';
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
        adjustTextColor(selectedColor);
    });
});

// Mensaje novios
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