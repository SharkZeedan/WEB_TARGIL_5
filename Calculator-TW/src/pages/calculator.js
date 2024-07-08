import { ButtonElement } from '../classes/buttonElement'
import { grid, createDiv } from '../utils';

class Calculator {
    constructor(labels, container) {
        this.labels = labels;
        this.container = container;
        this.onHandleClick = this.onHandleClick.bind(this);
        container.innerHTML = ''; // Clears the content container
        this.addMonitor(); // Adds the monitor to the app container
        this.addButtons(); // Adds the calculator buttons to the app containers
    };

    addMonitor = () => {
        const monitor = `<div id='monitor' class="bg-white border-4 border-blue-400 h-20 flex items-center col-span-5 text-blue-800 p-2 rounded-lg mb-2 font-bold text-4xl dark:bg-gray-700 dark:text-sky-50"></div>`;
        this.container.insertAdjacentHTML('beforeend', monitor); // Adds the monitor HTML to the container
    };

    // Adds buttons to a container
    addButtons = () => {
        const labelsGrid = grid();

        this.labels.forEach((innerText) => {
            const cl = innerText === 'calculate' ? 'col-span-4' : '';
            const button = new ButtonElement(`bg-blue-400 hover:bg-blue-600 text-white ${cl} py-1 rounded-md text-center text-lg font-bold cursor-pointer d-btn dark:bg-gray-500 dark:text-sky-50 dark:hover:bg-gray-400`,
                innerText,
                this.onHandleClick,
                true
            );
            labelsGrid.appendChild(button.getElement());
        });

        this.container.appendChild(labelsGrid);
    };

    // Handles button clicks for the calculator
    onHandleClick = (event) => {
        const monitor = document.getElementById('monitor'); // Selects the monitor element
        const bac = monitor.innerText.trim(); // Gets the current text from the monitor
        const a = event.target.innerText; // Gets the text of the clicked button
        if (a === 'clear') {
            monitor.innerText = ''; // Clears the monitor text
        } else if (a === 'calculate') {
            monitor.innerText = bac + '=' + eval(bac); // Evaluates the expression and updates the monitor
        } else {
            monitor.innerText += a; // Adds the button text to the monitor
        }
    };

    getObject() {
        return this.container;
    }
}

export const renderCalculator = (app=null) => {
    const content = document.getElementById('content');
    let container = document.querySelector('#wrapper-content-container');
    if (!container) {
        container = createDiv("w-full bg-blue-100 p-2 dark:bg-gray-900", "wrapper-content-container");
    } else {
        content.innerHTML = '';
    }
    
    const calculator = new Calculator([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '**', 'calculate', 'clear'], container);
    if (!app) {
        return calculator;
    }
    content.appendChild(calculator.getObject());
}
