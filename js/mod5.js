let currentSection = 'intro';
let completedSections = new Set();
let exerciseResults = {};

function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    document.getElementById(sectionId).classList.add('active');
    
    // Actualizar navegación
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Marcar como completada
    completedSections.add(sectionId);
    updateProgress();
    
    currentSection = sectionId;
}

function updateProgress() {
    const totalSections = 7;
    const progress = (completedSections.size / totalSections) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function testSyntax() {
    const code = document.getElementById('syntaxCode').value;
    const output = document.getElementById('syntaxOutput');
    
    try {
        // Simular ejecución de función simple
        if (code.includes('def ') && code.includes('return')) {
            output.innerHTML = '✅ Sintaxis correcta!\n\nEjemplo de llamada:\nresultado = mi_funcion()\nprint(resultado)  # Salida: Hola Mundo';
            output.className = 'output';
        } else {
            output.innerHTML = '⚠️ Verifica la sintaxis:\n- Usa "def" para definir la función\n- No olvides el "return" si quieres devolver algo\n- Revisa la indentación';
            output.className = 'output';
        }
    } catch (error) {
        output.innerHTML = '❌ Error en la sintaxis: ' + error.message;
        output.className = 'output';
    }
}

function runExample(type) {
    const output = document.getElementById(`output-${type}`);
    
    switch(type) {
        case 'estadisticas':
            output.innerHTML = `Ejecutando calculadora de estadísticas...

calificaciones = [85, 92, 78, 96, 88]
estadisticas = calcular_estadisticas(calificaciones)

Resultado:
{
'promedio': 87.8,
'mayor': 96,
'menor': 78
}

Promedio: 87.80`;
            break;
            
        case 'descuentos':
            output.innerHTML = `Ejecutando sistema de descuentos...

# Compra de estudiante
compra1 = calcular_descuento(100, "estudiante")
Resultado: {
"precio_original": 100,
"descuento_aplicado": 15.0,
"ahorro": 15.0,
"precio_final": 85.0
}

# Compra regular
compra2 = calcular_descuento(200)
Resultado: {
"precio_original": 200,
"descuento_aplicado": 5.0,
"ahorro": 10.0,
"precio_final": 190.0
}`;
            break;
            
        case 'email':
            output.innerHTML = `Ejecutando validador de email...

Emails de prueba: ["usuario@gmail.com", "invalid-email", "test@universidad.edu.co"]

Resultados:
usuario@gmail.com: Email válido
invalid-email: Formato de email inválido
test@universidad.edu.co: Email válido`;
            break;
    }
}

function testUserFunction() {
    const code = document.getElementById('userFunction').value;
    const output = document.getElementById('userFunctionOutput');
    
    if (code.includes('def calcular_area_circulo') && code.includes('radio')) {
        if (code.includes('3.14159') || code.includes('math.pi') || code.includes('pi')) {
            output.innerHTML = '🎉 ¡Excelente! Tu función parece correcta.\n\nEjemplo de uso:\narea = calcular_area_circulo(5)\nprint(f"Área del círculo: {area:.2f}")';
            output.className = 'output success';
        } else {
            output.innerHTML = '🤔 Revisa la fórmula del área del círculo.\nPista: π × radio²\nPuedes usar 3.14159 o import math y usar math.pi';
            output.className = 'output';
        }
    } else {
        output.innerHTML = '❌ Verifica:\n- Nombre de función: calcular_area_circulo\n- Parámetro: radio\n- Implementa la fórmula del área';
        output.className = 'output';
    }
}

function checkExercise(exerciseNum) {
    const code = document.getElementById(`exercise${exerciseNum}`).value;
    const output = document.getElementById(`exercise${exerciseNum}-output`);
    
    switch(exerciseNum) {
        case 1:
            if (code.includes('def convertir_temperatura') && 
                (code.includes('9/5') || code.includes('5/9')) &&
                code.includes('32')) {
                output.innerHTML = '✅ ¡Correcto! Tu función maneja las conversiones de temperatura.';
                output.className = 'feedback success';
                exerciseResults[exerciseNum] = true;
            } else {
                output.innerHTML = '⚠️ Revisa las fórmulas:\nC a F: (C × 9/5) + 32\nF a C: (F - 32) × 5/9';
                output.className = 'feedback error';
            }
            break;
            
        case 2:
            if (code.includes('def calcular_imc') && 
                code.includes('peso') && code.includes('altura') &&
                code.includes('**') || code.includes('*')) {
                output.innerHTML = '✅ ¡Excelente! Tu función calcula el IMC correctamente.';
                output.className = 'feedback success';
                exerciseResults[exerciseNum] = true;
            } else {
                output.innerHTML = '⚠️ Recuerda: IMC = peso / (altura²)\nDebes clasificar según los rangos de IMC.';
                output.className = 'feedback error';
            }
            break;
            
        case 3:
            if (code.includes('def generar_contraseña') && 
                (code.includes('random') || code.includes('choice')) &&
                code.includes('string')) {
                output.innerHTML = '✅ ¡Perfecto! Tu generador de contraseñas está bien estructurado.';
                output.className = 'feedback success';
                exerciseResults[exerciseNum] = true;
            } else {
                output.innerHTML = '⚠️ Necesitas:\n- import random y string\n- Combinar letras, números y símbolos\n- Usar random.choice()';
                output.className = 'feedback error';
            }
            break;
    }
}

function showSolution(exerciseNum) {
    document.getElementById(`solution${exerciseNum}`).style.display = 'block';
}

function selectQuizOption(option, isCorrect) {
    // Remover clases previas
    option.parentNode.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('correct', 'incorrect');
    });
    
    // Marcar respuesta
    if (isCorrect) {
        option.classList.add('correct');
    } else {
        option.classList.add('incorrect');
        // Mostrar la respuesta correcta
        option.parentNode.querySelectorAll('.quiz-option').forEach(opt => {
            if (opt.onclick.toString().includes('true')) {
                opt.classList.add('correct');
            }
        });
    }
}

function checkImprovement() {
    const code = document.getElementById('improveCode').value;
    const output = document.getElementById('improveOutput');
    
    if (code.includes('def calcular_') && 
        code.includes('"""') && 
        !code.includes('print(')) {
        output.innerHTML = `✅ ¡Excelente mejora! Has aplicado:
• Nombre más descriptivo
• Documentación con docstring
• Eliminaste el print (separación de responsabilidades)
• Mejor estructura de parámetros`;
        output.className = 'feedback success';
    } else {
        output.innerHTML = `💡 Mejoras sugeridas:
• Nombre más descriptivo (calcular_operacion_matematica)
• Agregar documentación (docstring)
• Eliminar print (que sea responsabilidad del llamador)
• Validar parámetros de entrada`;
        output.className = 'feedback error';
    }
}

function checkFinalExercise(part) {
    const code = document.getElementById(`finalExercise${part}`).value;
    const output = document.getElementById(`final${part}-output`);
    
    if (part === 1) {
        if (code.includes('def registrar_estudiante') && 
            code.includes('"""') &&
            (code.includes('isinstance') || code.includes('type') || code.includes('@'))) {
            output.innerHTML = '🎉 ¡Excelente! Tu función de registro incluye validaciones apropiadas.';
            output.className = 'feedback success';
        } else {
            output.innerHTML = '💡 Asegúrate de incluir:\n- Validación de tipos de datos\n- Validación de email\n- Validación de rango de edad\n- Documentación completa';
            output.className = 'feedback error';
        }
    } else if (part === 2) {
        if (code.includes('def calcular_promedio_ponderado') &&
            code.includes('def determinar_estado_academico') &&
            code.includes('def generar_reporte_estudiante')) {
            output.innerHTML = '🏆 ¡Perfecto! Has creado un sistema completo de gestión académica.';
            output.className = 'feedback success';
        } else {
            output.innerHTML = '📝 Necesitas implementar las tres funciones:\n- calcular_promedio_ponderado\n- determinar_estado_academico\n- generar_reporte_estudiante';
            output.className = 'feedback error';
        }
    }
}

function selectFinalQuiz(option, answer) {
    const result = document.getElementById('finalQuizResult');
    
    option.parentNode.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('correct', 'incorrect');
    });
    
    if (answer === 'B') {
        option.classList.add('correct');
        result.innerHTML = '🎉 ¡Correcto! La reutilización y organización son las ventajas principales de las funciones.';
        result.className = 'feedback success';
    } else {
        option.classList.add('incorrect');
        option.parentNode.querySelector('.quiz-option:nth-child(2)').classList.add('correct');
        result.innerHTML = '❌ La respuesta correcta es B. Las funciones permiten reutilizar código y organizarlo mejor.';
        result.className = 'feedback error';
    }
}

// Inicializar progreso
completedSections.add('intro');
updateProgress();