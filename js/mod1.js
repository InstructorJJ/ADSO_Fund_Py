let currentSection = 'introduccion';
let progress = 0;
let quizAnswers = [];

function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    document.getElementById(sectionId).classList.add('active');
    
    // Actualizar navegación
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    currentSection = sectionId;
    updateProgress();
}

function updateProgress() {
    const sections = ['introduccion', 'instalacion', 'primer-programa', 'conceptos', 'practica', 'evaluacion'];
    const currentIndex = sections.indexOf(currentSection);
    progress = Math.round(((currentIndex + 1) / sections.length) * 100);
    
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = `Progreso: ${progress}% completado`;
}

function runHolaMundo() {
    const output = document.getElementById('output1');
    output.style.display = 'block';
    output.innerHTML = `
        <div style="color: #4fd1c7;">¡Hola Mundo!</div>
        <div style="color: #4fd1c7;">Estoy aprendiendo a programar</div>
    `;
    
    // Animación de escritura
    setTimeout(() => {
        output.style.animation = 'fadeIn 0.5s ease';
    }, 100);
}

function updateGreeting() {
    const nombre = document.getElementById('nombreInput').value || 'Tu Nombre';
    const codigo = document.getElementById('codigoPersonalizado');
    codigo.innerHTML = `nombre = "${nombre}"<br>print(f"¡Hola {nombre}!")<br>print(f"Bienvenido/a al mundo de Python, {nombre}!")`;
    
    if (nombre !== 'Tu Nombre' && nombre.trim() !== '') {
        document.getElementById('successMessage1').style.display = 'block';
    }
}

function runPersonalizado() {
    const nombre = document.getElementById('nombreInput').value || 'Tu Nombre';
    const output = document.getElementById('output2');
    output.style.display = 'block';
    output.innerHTML = `
        <div style="color: #4fd1c7;">¡Hola ${nombre}!</div>
        <div style="color: #4fd1c7;">Bienvenido/a al mundo de Python, ${nombre}!</div>
    `;
}

function runEjercicio1() {
    const nombre = document.getElementById('ejercicio1_nombre').value || 'Estudiante';
    const edad = document.getElementById('ejercicio1_edad').value || '20';
    const ciudad = document.getElementById('ejercicio1_ciudad').value || 'Tu Ciudad';
    
    const output = document.getElementById('outputEjercicio1');
    const success = document.getElementById('successEjercicio1');
    
    output.style.display = 'block';
    output.innerHTML = `
        <div style="color: #4fd1c7;">=== Mi Presentación ===</div>
        <div style="color: #4fd1c7;">Hola, soy ${nombre}</div>
        <div style="color: #4fd1c7;">Tengo ${edad} años</div>
        <div style="color: #4fd1c7;">Vivo en ${ciudad}</div>
        <div style="color: #4fd1c7;">Estoy aprendiendo Python para ser desarrollador de software</div>
    `;
    
    if (nombre !== '' && edad !== '' && ciudad !== '') {
        success.style.display = 'block';
        success.textContent = '¡Excelente! Has completado tu primera presentación personalizada 🎉';
    }
}

function runEjercicio2() {
    const num1 = parseFloat(document.getElementById('num1').value) || 0;
    const num2 = parseFloat(document.getElementById('num2').value) || 0;
    const resultado = num1 + num2;
    
    const output = document.getElementById('outputEjercicio2');
    const success = document.getElementById('successEjercicio2');
    
    output.style.display = 'block';
    output.innerHTML = `
        <div style="color: #4fd1c7;">La suma de ${num1} + ${num2} = ${resultado}</div>
    `;
    
    if (num1 !== 0 || num2 !== 0) {
        success.style.display = 'block';
        success.textContent = '¡Perfecto! Has creado tu primera calculadora 🧮';
    }
}

function selectAnswer(element, isCorrect) {
    // Remover selecciones previas en esta pregunta
    const siblings = element.parentElement.querySelectorAll('.quiz-option');
    siblings.forEach(option => {
        option.classList.remove('correct', 'incorrect');
    });
    
    // Marcar la respuesta
    if (isCorrect) {
        element.classList.add('correct');
        quizAnswers[getCurrentQuestionIndex(element)] = true;
    } else {
        element.classList.add('incorrect');
        quizAnswers[getCurrentQuestionIndex(element)] = false;
        
        // Mostrar la respuesta correcta
        siblings.forEach(option => {
            if (option.onclick.toString().includes('true')) {
                setTimeout(() => {
                    option.classList.add('correct');
                }, 1000);
            }
        });
    }
    
    checkQuizCompletion();
}

function getCurrentQuestionIndex(element) {
    const quizContainers = document.querySelectorAll('.quiz-container');
    let index = 0;
    quizContainers.forEach((container, i) => {
        if (container.contains(element)) {
            index = i;
        }
    });
    return index;
}

function checkQuizCompletion() {
    if (quizAnswers.length >= 3 && quizAnswers.every(answer => answer !== undefined)) {
        const correctAnswers = quizAnswers.filter(answer => answer === true).length;
        const score = Math.round((correctAnswers / 3) * 100);
        
        setTimeout(() => {
            document.getElementById('quizResult').style.display = 'block';
            document.getElementById('quizScore').textContent = `Has respondido correctamente ${correctAnswers} de 3 preguntas (${score}%)`;
            document.getElementById('finalBtn').style.display = 'inline-block';
            
            if (score >= 70) {
                document.getElementById('quizScore').textContent += ' - ¡Aprobado! 🎉';
            } else {
                document.getElementById('quizScore').textContent += ' - Te recomendamos revisar el contenido y volver a intentarlo.';
            }
        }, 1500);
    }
}

function completarModulo() {
    alert('🎉 ¡Felicitaciones! Has completado exitosamente el Módulo 1: Configuración y Primeros Pasos.\n\n🚀 Estás listo para el Módulo 2: Variables y Tipos de Datos\n\nConceptos que dominas ahora:\n✅ Instalación de Python\n✅ Primer programa\n✅ Función print()\n✅ Comentarios\n✅ Conceptos básicos de programación');
    
    // Actualizar progreso al 100%
    progress = 100;
    updateProgress();
    
    // Efecto de confeti (simulado)
    document.body.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #dda0dd)';
    document.body.style.animation = 'gradient 3s ease infinite';
    
    setTimeout(() => {
        document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        document.body.style.animation = 'none';
        window.location.href = 'mod_2.html';
    }, 3000);
}