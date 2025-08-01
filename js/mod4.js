// Variables globales para el estado del módulo
let currentSection = 'introduccion';
let quizAnswers = {};
let gameState = {
    numeroSecreto: 0,
    intentos: 0,
    juegoActivo: false
};
let menuPedido = [];
let menuItems = {
    1: { nombre: "Hamburguesa", precio: 15000 },
    2: { nombre: "Pizza", precio: 18000 },
    3: { nombre: "Ensalada", precio: 12000 },
    4: { nombre: "Bebida", precio: 5000 },
    5: { nombre: "Postre", precio: 8000 }
};

// Función para mostrar secciones
function showSection(sectionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Mostrar la sección seleccionada
    document.getElementById(sectionId).classList.add('active');

    // Actualizar navegación
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    // Actualizar progreso
    const sectionOrder = ['introduccion', 'if-elif-else', 'bucle-for', 'bucle-while', 'ejercicios', 'evaluacion', 'resumen'];
    const currentIndex = sectionOrder.indexOf(sectionId);
    const progress = ((currentIndex + 1) / sectionOrder.length) * 100;
    
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progreso-texto').textContent = `Progreso: ${Math.round(progress)}%`;
    
    currentSection = sectionId;
}

// Función para copiar código
function copyCode(button) {
    const codeBlock = button.closest('.code-example');
    const code = codeBlock.textContent
        .replace(button.textContent, '')
        .replace(/\s+/g, ' ')
        .trim();
    
    navigator.clipboard.writeText(code).then(() => {
        const originalText = button.textContent;
        button.textContent = '¡Copiado!';
        button.style.background = '#48bb78';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#4299e1';
        }, 2000);
    });
}

// Ejercicio: Sistema de autenticación
function verificarLogin() {
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;
    const result = document.getElementById('loginResult');

    if (!usuario || !password) {
        result.textContent = '❌ Por favor, completa todos los campos.';
        return;
    }

    const usuariosValidos = {
        "admin": "123456",
        "usuario1": "password1",
        "estudiante": "estudio123",
        "profesor": "enseñar2024"
    };

    if (usuario in usuariosValidos) {
        if (usuariosValidos[usuario] === password) {
            result.textContent = `✅ ¡Bienvenido ${usuario}! Login exitoso.
Acceso concedido al sistema.
Sesión iniciada correctamente.`;
        } else {
            result.textContent = `❌ Contraseña incorrecta para el usuario "${usuario}".
Verifica tu contraseña e intenta nuevamente.`;
        }
    } else {
        result.textContent = `❌ Usuario "${usuario}" no encontrado.
Usuarios válidos: admin, usuario1, estudiante, profesor`;
    }
}

function limpiarLogin() {
    document.getElementById('usuario').value = '';
    document.getElementById('password').value = '';
    document.getElementById('loginResult').textContent = 'Aquí aparecerá el resultado de la autenticación...';
}

// Ejercicio: Generador de tablas de multiplicar
function generarTabla() {
    const numero = parseInt(document.getElementById('numeroTabla').value);
    const rango = parseInt(document.getElementById('rangoTabla').value);
    const result = document.getElementById('tablaResult');

    if (!numero || !rango || numero < 1 || rango < 1) {
        result.textContent = '❌ Por favor, ingresa números válidos mayores a 0.';
        return;
    }

    let tabla = `📊 Tabla de multiplicar del ${numero}\n`;
    tabla += '='.repeat(30) + '\n\n';

    for (let i = 1; i <= rango; i++) {
        const resultado = numero * i;
        tabla += `${numero} × ${i} = ${resultado}\n`;
    }

    result.textContent = tabla;
}

function limpiarTabla() {
    document.getElementById('numeroTabla').value = '5';
    document.getElementById('rangoTabla').value = '10';
    document.getElementById('tablaResult').textContent = 'La tabla de multiplicar aparecerá aquí...';
}

// Ejercicio: Juego de adivinanza
function iniciarJuego() {
    const min = parseInt(document.getElementById('numeroMin').value);
    const max = parseInt(document.getElementById('numeroMax').value);
    const result = document.getElementById('juegoResult');

    if (min >= max) {
        result.textContent = '❌ El número máximo debe ser mayor que el mínimo.';
        return;
    }

    gameState.numeroSecreto = Math.floor(Math.random() * (max - min + 1)) + min;
    gameState.intentos = 0;
    gameState.juegoActivo = true;

    document.getElementById('juegoContainer').style.display = 'block';
    result.textContent = `🎲 ¡Juego iniciado!
Estoy pensando en un número entre ${min} y ${max}.
¡Intenta adivinarlo!
Tienes máximo 7 intentos.`;
}

function verificarIntento() {
    if (!gameState.juegoActivo) {
        document.getElementById('juegoResult').textContent = '❌ Primero debes iniciar un juego.';
        return;
    }

    const intento = parseInt(document.getElementById('intentoUsuario').value);
    const result = document.getElementById('juegoResult');

    if (isNaN(intento)) {
        result.textContent = '❌ Por favor, ingresa un número válido.';
        return;
    }

    gameState.intentos++;

    if (intento === gameState.numeroSecreto) {
        result.textContent = `🎉 ¡FELICITACIONES! 
Adivinaste el número ${gameState.numeroSecreto} en ${gameState.intentos} ${gameState.intentos === 1 ? 'intento' : 'intentos'}.
¡Excelente trabajo!`;
        gameState.juegoActivo = false;
        document.getElementById('juegoContainer').style.display = 'none';
    } else if (gameState.intentos >= 7) {
        result.textContent = `😞 Se acabaron los intentos.
El número era: ${gameState.numeroSecreto}
¡Inténtalo de nuevo!`;
        gameState.juegoActivo = false;
        document.getElementById('juegoContainer').style.display = 'none';
    } else {
        let pista = intento < gameState.numeroSecreto ? 
            `📈 El número es MAYOR que ${intento}` : 
            `📉 El número es MENOR que ${intento}`;
        
        const restantes = 7 - gameState.intentos;
        result.textContent = `${pista}
Intento ${gameState.intentos} de 7
Te quedan ${restantes} ${restantes === 1 ? 'intento' : 'intentos'}`;
    }

    document.getElementById('intentoUsuario').value = '';
}

function reiniciarJuego() {
    gameState.juegoActivo = false;
    document.getElementById('juegoContainer').style.display = 'none';
    document.getElementById('juegoResult').textContent = 'Configura el rango y presiona "Iniciar Juego"...';
    document.getElementById('intentoUsuario').value = '';
}

// Ejercicio: Calculadora de promedio
function generarInputsNotas() {
    const cantidad = parseInt(document.getElementById('cantidadNotas').value);
    const container = document.getElementById('notasInputs');

    if (cantidad < 1 || cantidad > 10) {
        alert('La cantidad debe estar entre 1 y 10');
        return;
    }

    let html = '';
    for (let i = 1; i <= cantidad; i++) {
        html += `
            <div class="input-group">
                <label for="nota${i}">Nota ${i} (0-100):</label>
                <input type="number" id="nota${i}" min="0" max="100" step="0.1">
            </div>
        `;
    }
    container.innerHTML = html;
}

function calcularPromedio() {
    const cantidad = parseInt(document.getElementById('cantidadNotas').value);
    const result = document.getElementById('promedioResult');
    let notas = [];
    let suma = 0;

    for (let i = 1; i <= cantidad; i++) {
        const nota = parseFloat(document.getElementById(`nota${i}`).value);
        if (isNaN(nota) || nota < 0 || nota > 100) {
            result.textContent = `❌ Error en la nota ${i}. Debe ser un número entre 0 y 100.`;
            return;
        }
        notas.push(nota);
        suma += nota;
    }

    const promedio = suma / cantidad;
    let calificacion = '';

    if (promedio >= 90) calificacion = 'Excelente 🌟';
    else if (promedio >= 80) calificacion = 'Bueno 👍';
    else if (promedio >= 70) calificacion = 'Aceptable ✓';
    else if (promedio >= 60) calificacion = 'Suficiente ⚠️';
    else calificacion = 'Insuficiente ❌';

    result.textContent = `📊 Resultados del Cálculo:
Notas ingresadas: [${notas.join(', ')}]
Suma total: ${suma.toFixed(2)}
Cantidad de notas: ${cantidad}
Promedio: ${promedio.toFixed(2)}
Calificación: ${calificacion}`;
}

// Ejercicio: Contador de pares e impares
function contarParesImpares() {
    const inicio = parseInt(document.getElementById('rangoInicio').value);
    const fin = parseInt(document.getElementById('rangoFin').value);
    const result = document.getElementById('paresImparesResult');

    if (inicio >= fin) {
        result.textContent = '❌ El número final debe ser mayor que el inicial.';
        return;
    }

    let pares = [];
    let impares = [];

    for (let i = inicio; i <= fin; i++) {
        if (i % 2 === 0) {
            pares.push(i);
        } else {
            impares.push(i);
        }
    }

    result.textContent = `📊 Análisis del rango ${inicio} al ${fin}:

🔢 Números PARES (${pares.length}): 
${pares.join(', ')}

🔢 Números IMPARES (${impares.length}): 
${impares.join(', ')}

📈 Estadísticas:
- Total de números: ${fin - inicio + 1}
- Porcentaje pares: ${((pares.length / (fin - inicio + 1)) * 100).toFixed(1)}%
- Porcentaje impares: ${((impares.length / (fin - inicio + 1)) * 100).toFixed(1)}%`;
}

// Ejercicio: Sistema de menú
function procesarMenu() {
    const opcion = document.getElementById('menuOpcion').value;
    const result = document.getElementById('menuResult');

    switch (opcion) {
        case '1':
            mostrarMenu(result);
            break;
        case '2':
            hacerPedido(result);
            break;
        case '3':
            verTotal(result);
            break;
        case '4':
            finalizarPedido(result);
            break;
        default:
            result.textContent = '❌ Opción no válida';
    }
}

function mostrarMenu(result) {
    let menu = `🍽️ MENÚ DEL RESTAURANTE\n`;
    menu += '='.repeat(30) + '\n';
    
    for (let id in menuItems) {
        menu += `${id}. ${menuItems[id].nombre} - ${menuItems[id].precio.toLocaleString()}\n`;
    }
    
    result.textContent = menu;
}

function hacerPedido(result) {
    const itemId = prompt('Ingresa el número del item que deseas (1-5):');
    const cantidad = parseInt(prompt('¿Cuántos deseas?'));

    if (menuItems[itemId] && cantidad > 0) {
        const item = {
            ...menuItems[itemId],
            cantidad: cantidad,
            subtotal: menuItems[itemId].precio * cantidad
        };
        
        menuPedido.push(item);
        
        result.textContent = `✅ Agregado al pedido:
${cantidad}x ${item.nombre}
Subtotal: ${item.subtotal.toLocaleString()}

Items en el pedido: ${menuPedido.length}`;
    } else {
        result.textContent = '❌ Item o cantidad no válidos';
    }
}

function verTotal(result) {
    if (menuPedido.length === 0) {
        result.textContent = '🛒 Tu pedido está vacío.\nUsa la opción "Hacer Pedido" para agregar items.';
        return;
    }

    let ticket = `🧾 TU PEDIDO ACTUAL\n`;
    ticket += '='.repeat(30) + '\n';
    
    let total = 0;
    
    menuPedido.forEach((item, index) => {
        ticket += `${index + 1}. ${item.cantidad}x ${item.nombre}\n`;
        ticket += `   ${item.precio.toLocaleString()} c/u = ${item.subtotal.toLocaleString()}\n\n`;
        total += item.subtotal;
    });
    
    ticket += '='.repeat(30) + '\n';
    ticket += `TOTAL: ${total.toLocaleString()}`;
    
    result.textContent = ticket;
}

function finalizarPedido(result) {
    if (menuPedido.length === 0) {
        result.textContent = '❌ No hay items en el pedido para finalizar.';
        return;
    }

    const total = menuPedido.reduce((sum, item) => sum + item.subtotal, 0);
    
    result.textContent = `✅ ¡PEDIDO FINALIZADO!

Total a pagar: ${total.toLocaleString()}
Tiempo estimado: 15-20 minutos
¡Gracias por tu pedido!

El pedido ha sido enviado a cocina.`;
    
    menuPedido = [];
}

function reiniciarMenu() {
    menuPedido = [];
    document.getElementById('menuResult').textContent = 'Selecciona una opción del menú...';
}

// Sistema de evaluación (Quiz)
function setupQuizListeners() {
    const quizOptions = document.querySelectorAll('.quiz-options li');
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            const questionNum = this.parentElement.dataset.question;
            const selectedAnswer = this.dataset.answer;
            
            // Remover selección previa
            this.parentElement.querySelectorAll('li').forEach(li => {
                li.classList.remove('selected');
            });
            
            // Marcar como seleccionado
            this.classList.add('selected');
            
            // Guardar respuesta
            quizAnswers[questionNum] = {
                selected: selectedAnswer,
                correct: this.dataset.correct === 'true'
            };
        });
    });
}

function evaluarQuiz() {
    const totalQuestions = 5;
    let correctAnswers = 0;
    
    // Evaluar cada pregunta
    for (let i = 1; i <= totalQuestions; i++) {
        const questionContainer = document.querySelector(`[data-question="${i}"]`);
        const options = questionContainer.querySelectorAll('li');
        const feedback = document.getElementById(`feedback${i}`);
        
        if (quizAnswers[i]) {
            options.forEach(option => {
                if (option.dataset.correct === 'true') {
                    option.classList.add('correct');
                } else if (option.classList.contains('selected') && option.dataset.correct !== 'true') {
                    option.classList.add('incorrect');
                }
            });
            
            if (quizAnswers[i].correct) {
                correctAnswers++;
                feedback.innerHTML = '✅ ¡Correcto! Excelente comprensión del concepto.';
                feedback.className = 'feedback correct';
            } else {
                feedback.innerHTML = '❌ Incorrecto. Revisa el material y vuelve a intentarlo.';
                feedback.className = 'feedback incorrect';
            }
            
            feedback.style.display = 'block';
        }
    }
    
    // Mostrar resultado final
    const percentage = (correctAnswers / totalQuestions) * 100;
    const resultDiv = document.getElementById('quizResult');
    
    let resultMessage = `📊 RESULTADOS DEL QUIZ\n\n`;
    resultMessage += `Respuestas correctas: ${correctAnswers}/${totalQuestions}\n`;
    resultMessage += `Porcentaje: ${percentage}%\n\n`;
    
    if (percentage >= 80) {
        resultMessage += '🎉 ¡EXCELENTE! Has dominado las estructuras de control.\n';
        resultMessage += 'Estás listo para el siguiente módulo.';
    } else if (percentage >= 60) {
        resultMessage += '👍 BUENO. Tienes una comprensión sólida.\n';
        resultMessage += 'Revisa los temas donde tuviste errores.';
    } else {
        resultMessage += '📚 NECESITAS REPASAR. No te desanimes.\n';
        resultMessage += 'Revisa el material y practica más ejercicios.';
    }
    
    resultDiv.textContent = resultMessage;
    resultDiv.style.display = 'block';
}

function reiniciarQuiz() {
    quizAnswers = {};
    
    // Limpiar todas las opciones
    document.querySelectorAll('.quiz-options li').forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });
    
    // Ocultar feedback
    document.querySelectorAll('.feedback').forEach(feedback => {
        feedback.style.display = 'none';
    });
    
    // Ocultar resultado
    document.getElementById('quizResult').style.display = 'none';
}

// Generador de proyectos
function generarProyecto() {
    const tipo = document.getElementById('proyectoTipo').value;
    const result = document.getElementById('proyectoResult');
    
    const proyectos = {
        calculadora: `
🧮 CALCULADORA AVANZADA

Características a implementar:
• Operaciones básicas (+, -, *, /)
• Operaciones avanzadas (potencia, raíz)
• Historial de operaciones
• Validación de entrada
• Menú interactivo con while

Estructura sugerida:
1. Menú principal (while)
2. Funciones para cada operación
3. Validación de números (if/else)
4. Historial con listas (for)

¡Usa todas las estructuras de control aprendidas!`,

        inventario: `
📦 SISTEMA DE INVENTARIO

Características a implementar:
• Agregar productos
• Buscar productos
• Actualizar stock
• Generar reportes
• Control de stock mínimo

Estructura sugerida:
1. Menú con while
2. Lista de productos
3. Validaciones con if/elif/else
4. Búsquedas con for
5. Alertas de stock bajo

¡Perfecto para practicar bucles y condicionales!`,

        quiz: `
🧠 QUIZ INTERACTIVO

Características a implementar:
• Banco de preguntas
• Sistema de puntuación
• Diferentes niveles
• Estadísticas finales
• Opción de repetir

Estructura sugerida:
1. Selección de nivel (if/elif)
2. Bucle de preguntas (for/while)
3. Validación de respuestas
4. Cálculo de puntaje
5. Clasificación final

¡Excelente para dominar estructuras de control!`,

        agenda: `
📅 AGENDA PERSONAL

Características a implementar:
• Agregar eventos
• Ver calendario
• Buscar por fecha
• Recordatorios
• Categorías de eventos

Estructura sugerida:
1. Menú principal (while)
2. Validación de fechas (if/else)
3. Listado de eventos (for)
4. Búsquedas y filtros
5. Clasificación por categorías

¡Combina todas las estructuras aprendidas!`
    };
    
    result.textContent = proyectos[tipo] || 'Proyecto no encontrado';
}

// Navegación entre módulos
function anteriorModulo() {
    alert('Navegando al Módulo 3: Variables y Tipos de Datos');
}

function siguienteModulo() {
    if (currentSection !== 'resumen') {
        alert('Por favor, completa todo el módulo antes de continuar.');
        return;
    }
    alert('Navegando al Módulo 5: Funciones');
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    setupQuizListeners();
    showSection('introduccion');
    
    // Generar campos de notas por defecto
    generarInputsNotas();
});