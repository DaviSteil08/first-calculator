const display = document.getElementById('display');
const historyDiv = document.getElementById('history');

function append(value) {
  const operators = ['+', '-', '*', '/'];

  // bloqueia qualquer coisa inválida
  if (!'0123456789+-*/.'.includes(value)) return;

  const current = display.value;
  const lastChar = current.slice(-1);

  // não deixa começar com operador (exceto -)
  if (current === '' && operators.includes(value) && value !== '-') return;

  // impede múltiplos operadores seguidos
  if (operators.includes(lastChar) && operators.includes(value)) {
    // substitui o último operador pelo novo
    display.value = current.slice(0, -1) + value;
    return;
  }

  // impede múltiplos pontos no mesmo número
  if (value === '.') {
    const parts = current.split(/[\+\-\*\/]/);
    const lastNumber = parts[parts.length - 1];
    if (lastNumber.includes('.')) return;
  }

  display.value += value;
  animateDisplay();
}

function clearDisplay() {
  display.value = '';
}

function deleteLast() {
  display.value = display.value.slice(0,-1);
}

function calculate() {
  try {
    const expression = display.value;
    const result = eval(expression);
    addToHistory(expression + ' = ' + result);
    display.value = result;
  } catch {
    display.value = 'Erro';
  }
}

function addToHistory(text) {
  const item = document.createElement('div');
  item.classList.add('history-item');
  item.textContent = text;

  // animação top
  item.style.opacity = 0;
  item.style.transform = 'translateY(20px)';

  historyDiv.appendChild(item);

  setTimeout(() => {
    item.style.transition = '0.3s';
    item.style.opacity = 1;
    item.style.transform = 'translateY(0)';
  }, 10);
}

// teclado
document.addEventListener('keydown', (e) => {
  if ('0123456789+-*/.'.includes(e.key)) {
    append(e.key);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    calculate();
  } else if (e.key === 'Backspace') {
    deleteLast();
  } else if (e.key === 'Escape') {
    clearDisplay();
  }

// animação do display
  function animateDisplay() {
  display.classList.add('updated');
  setTimeout(() => display.classList.remove('updated'), 100);
  }

  function toggleHistory() {
  historyDiv.classList.toggle('active');
  document.querySelector('.calculator').classList.toggle('blur');
}
});
