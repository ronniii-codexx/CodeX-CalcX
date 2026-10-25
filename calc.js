const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('.buttons button');

    let currentInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (button.classList.contains('clear')) {
                currentInput = '';
                display.value = '0';
                return;
            }

            if (value === '⌫') {
                currentInput = currentInput.slice(0, -1);
                display.value = currentInput === '' ? '0' : currentInput;
                return;
            }

            if (button.classList.contains('equal')) {
                if (currentInput === '') return;
                try {
                    let expression = currentInput
                        .replace(/÷/g, '/')
                        .replace(/×/g, '*')
                        .replace(/−/g, '-');

                    let result = Function(`'use strict'; return (${expression})`)();

                    if (Number.isFinite(result)) {
                        display.value = parseFloat(result.toFixed(8));
                        currentInput = display.value.toString();
                    } else {
                        display.value = 'Error';
                        currentInput = '';
                    }
                } catch (error) {
                    display.value = 'Error';
                    currentInput = '';
                }
                return;
            }

            if (value === '%') {
                if (currentInput !== '') {
                    try {
                        let expression = currentInput
                            .replace(/÷/g, '/')
                            .replace(/×/g, '*')
                            .replace(/−/g, '-');
                        let num = Function(`'use strict'; return (${expression})`)();
                        num = num / 100;
                        display.value = num;
                        currentInput = num.toString();
                    } catch {
                        display.value = 'Error';
                        currentInput = '';
                    }
                }
                return;
            }

            const lastChar = currentInput.slice(-1);
            const operators = ['+', '−', '×', '÷'];
            if (operators.includes(value) && operators.includes(lastChar)) {
                currentInput = currentInput.slice(0, -1) + value;
                display.value = currentInput;
                return;
            }

            if (value === '.') {
                const lastNumber = currentInput.split(/[+−×÷]/).pop();
                if (lastNumber.includes('.')) return;
            }

            currentInput += value;
            display.value = currentInput;
        });
    });