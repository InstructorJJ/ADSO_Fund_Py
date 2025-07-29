// Actualizar barra de progreso
let progreso = 0;

function actualizarProgreso() {
    progreso += 12.5; // 8 secciones = 12.5% cada una
    if (progreso > 100) progreso = 100;
    document.getElementById('progressBar').style.width = progreso + '%';
}

// Función para ejecutar código 1
function ejecutarCodigo1() {
    const output = `Nombre: Ana
Edad: 25
¿Es estudiante? True`;
    document.getElementById('output1').textContent = output;
    actualizarProgreso();
}

// Función para ejecutar código 2
function ejecutarCodigo2() {
    const output = `=== PERFIL DE USUARIO ===
Nombre: María González
Edad: 28 años
Email: maria.gonzalez@email.com
Usuario Premium: True
Saldo en cuenta: $150.75
Seguidores: 1250

=== TIPOS DE DATOS ===
Tipo de 'usuario_nombre': <class 'str'>
Tipo de 'usuario_edad': <class 'int'>
Tipo de 'es_usuario_premium': <class 'bool'>
Tipo de 'saldo_cuenta': <class 'float'>`;
    document.getElementById('output2').textContent = output;
    actualizarProgreso();
}

// Función para ejecutar código 3
function ejecutarCodigo3() {
    const output = `Precio original: $100
Descuento: $15
Precio final: $85

==============================
Nombre: Carlos
Apellido: López
Nombre completo: Carlos López

==============================
Puntos iniciales: 100
Puntos después de ganar: 150
Puntos después de gastar: 125`;
    document.getElementById('output3').textContent = output;
    actualizarProgreso();
}

// Verificar ejercicio 1
function verificarEjercicio1() {
    const codigo = document.getElementById('exercise1').value.trim();
    const feedback = document.getElementById('feedback1');
    
    // Verificaciones básicas
    const tieneNombre = /\w+\s*=\s*["'][^"']+["']/.test(codigo);
    const tieneEdad = /\w+\s*=\s*\d+/.test(codigo);
    const tieneAltura = /\w+\s*=\s*\d+\.\d+/.test(codigo);
    const tieneBool = /(True|False)/.test(codigo);
    const tienePrint = /print\s*\(/.test(codigo);
    
    feedback.style.display = 'block';
    
    if (codigo.length < 50) {
        feedback.className = 'feedback incorrect';
        feedback.textContent = '❌ Tu código parece muy corto. Asegúrate de incluir todas las variables solicitadas y los print statements.';
    } else if (!tieneNombre || !tieneEdad || !tieneAltura || !tieneBool) {
        feedback.className = 'feedback incorrect';
        feedback.textContent = '❌ Parece que te faltan algunas variables. Verifica que tengas: nombre (texto), edad (entero), altura (decimal), y si eres estudiante (booleano).';
    } else if (!tienePrint) {
        feedback.className = 'feedback incorrect';
        feedback.textContent = '❌ No olvides usar print() para mostrar tus variables en pantalla.';
    } else {
        feedback.className = 'feedback correct';
        feedback.textContent = '✅ ¡Excelente! Has creado correctamente variables de diferentes tipos y las has mostrado en pantalla. ¡Continúa así!';
        actualizarProgreso();
    }
}

// Verificar ejercicio 2
function verificarEjercicio2() {
    const codigo = document.getElementById('exercise2').value.trim();
    const feedback = document.getElementById('feedback2');
    
    // Verificaciones básicas
    const tieneNumeros = (codigo.match(/\w+\s*=\s*\d+/g) || []).length >= 2;
    const tieneSuma = /\+/.test(codigo);
    const tieneResta = /-/.test(codigo);
    const tieneMultiplicacion = /\*/.test(codigo);
    const tieneDivision = /\//.test(codigo);
    const tienePrint = /print\s*\(/.test(codigo);
    
    feedback.style.display = 'block';
    
    if (codigo.length < 100) {
        feedback.className = 'feedback incorrect';
        feedback.textContent = '❌ Tu código parece incompleto. Asegúrate de definir dos números y realizar las cuatro operaciones básicas.';
    } else if (!tieneNumeros) {
        feedback.className = 'feedback incorrect';
        feedback.textContent = '❌ Necesitas definir al menos dos variables numéricas para realizar los cálculos.';
    } else if (!tieneSuma || !tieneResta || !tieneMultiplicacion || !tieneDivision) {
        feedback.className = 'feedback incorrect';
        feedback.textContent = '❌ Asegúrate de incluir las cuatro operaciones: suma (+), resta (-), multiplicación (*), y división (/).';
    } else if (!tienePrint) {
        feedback.className = 'feedback incorrect';
        feedback.textContent = '❌ No olvides mostrar los resultados usando print().';
    } else {
        feedback.className = 'feedback correct';
        feedback.textContent = '✅ ¡Perfecto! Has creado una calculadora simple usando variables y operaciones básicas. ¡Muy buen trabajo!';
        actualizarProgreso();
    }
}

// Animar las secciones cuando se cargan
window.addEventListener('load', function() {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach((section, index) => {
        section.style.animationDelay = (index * 0.2) + 's';
    });
});