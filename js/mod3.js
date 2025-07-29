// Calculadora de expresiones
function calcular() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operator = document.getElementById('operator').value;
    
    let resultado;
    let expresion = `${num1} ${operator} ${num2}`;
    let codigoPython = `print(${num1} ${operator} ${num2})`;
    
    try {
        switch(operator) {
            case '+':
                resultado = num1 + num2;
                break;
            case '-':
                resultado = num1 - num2;
                break;
            case '*':
                resultado = num1 * num2;
                break;
            case '/':
                resultado = num2 !== 0 ? num1 / num2 : 'Error: División por cero';
                break;
            case '//':
                resultado = num2 !== 0 ? Math.floor(num1 / num2) : 'Error: División por cero';
                break;
            case '%':
                resultado = num2 !== 0 ? num1 % num2 : 'Error: División por cero';
                break;
            case '**':
                resultado = Math.pow(num1, num2);
                break;
            case '==':
                resultado = num1 === num2;
                break;
            case '!=':
                resultado = num1 !== num2;
                break;
            case '>':
                resultado = num1 > num2;
                break;
            case '<':
                resultado = num1 < num2;
                break;
            case '>=':
                resultado = num1 >= num2;
                break;
            case '<=':
                resultado = num1 <= num2;
                break;
            default:
                resultado = 'Operador no válido';
        }
        
        document.getElementById('result').textContent = resultado;
        document.getElementById('expression').textContent = expresion;
        document.getElementById('pythonCode').textContent = codigoPython;
        
    } catch (error) {
        document.getElementById('result').textContent = 'Error en el cálculo';
    }
}

// Calculadora de IMC
function calcularIMC() {
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    
    if (peso <= 0 || altura <= 0) {
        document.getElementById('resultadoIMC').textContent = 'Por favor ingresa valores válidos';
        return;
    }
    
    const imc = peso / (altura * altura);
    let categoria;
    let color;
    
    if (imc < 18.5) {
        categoria = 'Bajo peso';
        color = '#3498db';
    } else if (imc >= 18.5 && imc < 25) {
        categoria = 'Normal';
        color = '#27ae60';
    } else if (imc >= 25 && imc < 30) {
        categoria = 'Sobrepeso';
        color = '#f39c12';
    } else {
        categoria = 'Obesidad';
        color = '#e74c3c';
    }
    
    const resultadoDiv = document.getElementById('resultadoIMC');
    resultadoDiv.innerHTML = `
        <div style="color: ${color};">
            <strong>IMC: ${imc.toFixed(2)}</strong><br>
            <strong>Categoría: ${categoria}</strong>
        </div>
    `;
}

// Sistema de quiz
function checkAnswer(element, isCorrect) {
    // Limpiar todas las opciones del mismo grupo
    const options = element.parentNode.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect');
    });
    
    // Marcar la respuesta
    if (isCorrect) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
        // Mostrar la respuesta correcta
        options.forEach(option => {
            if (option.onclick.toString().includes('true')) {
                option.classList.add('correct');
            }
        });
    }
}

// Efectos visuales
document.addEventListener('DOMContentLoaded', function() {
    // Animación de la barra de progreso
    setTimeout(() => {
        document.querySelector('.progress-fill').style.width = '37.5%';
    }, 500);
    
    // Ejecutar cálculo inicial
    calcular();
});