import { ButtonElement } from './buttonElement.js';
import { Title } from './titleElement.js';
import { renderAbout, renderCalculator, renderContact } from '../pages';
import { SVG } from './svgElement.js';
import { createDiv } from '../utils.js'; 
import { ThemeHandler } from './themeHandler.js';

export class Menu {
    constructor() {
        this.menuItems = [
            { name: 'Calculator', view: 'Calculator' },
            { name: 'About', view: 'About' },
            { name: 'Contact', view: 'Contact' }
        ];

        this.secondaryContainer = createDiv("bg-blue-700 dark:bg-blue-500 text-white p-4 flex justify-between dark:bg-gray-500", "wrapper-menu-container");
        this.ddMenu = createDiv("absolute top-[56px] left-0 bg-blue-300 p-3 hidden w-full dark:bg-gray-400", "ddMenu");
        this.topMenu = createDiv("justify-start gap-4 hidden sm:flex", "topMenu");
        this.secondaryContainer.appendChild(this.ddMenu);
        this.secondaryContainer.appendChild(this.topMenu);
    }

    toggleMenu(hide=false) {
        if (!hide) {
            this.ddMenu.classList.toggle('hidden'); // Toggles hidden class on dropdown menu
            document.querySelectorAll('svg').forEach((el) => {
                el.classList.toggle('hidden'); // Toggles hidden class on all SVG elements
            });
        } else {
            this.ddMenu.classList.add('hidden'); // Adds hidden class to dropdown menu
            document.querySelectorAll('svg')[0].classList.remove('hidden'); // Shows the first SVG element
            document.querySelectorAll('svg')[1].classList.add('hidden'); // Hides the second SVG element
        }
    }

    setView(text) {
        const app = document.getElementById('wrapper-content-container');
        const preContent = document.getElementById('pre-content');
        let pageTitle = text
        this.toggleMenu(true); // Hides the dropdown menu

        // Renders the selected view
        if (text === 'Calculator') {
            renderCalculator(app);
        } else if (text === 'About') {
            renderAbout(app);
        } else if (text === 'Contact') {
            renderContact(app);
        } else {
            pageTitle = "404 - Page Not Found"
        }

        preContent.innerHTML = (new Title(pageTitle, "text-3xl border-b-[10px] border-blue-300 pb-4")).toHTML();
    }

    renderMenu() {
        const burgerBtn = new ButtonElement("block sm:hidden", "", () => {
            this.toggleMenu();
        });

        const burgerMenuIcon = new HamburgerButton();
        const burgerMenuCloseIcon = new CloseMenuButton();

        burgerBtn.getElement().appendChild(burgerMenuIcon.getElement());
        burgerBtn.getElement().appendChild(burgerMenuCloseIcon.getElement());
        this.secondaryContainer.insertBefore(burgerBtn.getElement(), this.secondaryContainer.firstChild);
    
    
        // Creates menu items for both the dropdown and top menu
        this.menuItems.forEach(item => {
            const hamburgerMenuBtn = new HamburgerMenuButton('block py-1 px-2', item.name, () => this.setView(item.view));
            this.ddMenu.appendChild(hamburgerMenuBtn.getElement());
    
            const topMenuBtn = new TopMenuButton('py-1 px-2', item.name, () => this.setView(item.view));
            this.topMenu.appendChild(topMenuBtn.getElement());
        });

        // Render theme
        this.secondaryContainer.appendChild((new ThemeHandler).getObject());

        return this.secondaryContainer;
    }

    getObject() {
        return this.renderMenu();
    }
}

class HamburgerButton {
    constructor() {
        this.path = new SVG("http://www.w3.org/2000/svg", 'path');
        this.path.setAttribute(null, "fill", "#FFFFFF");
        this.path.setAttribute(null, "d", "M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z");
        
        this.svg = new SVG("http://www.w3.org/2000/svg", 'svg');
        this.svg.setAttribute(null, 'viewBox', '0 0 448 512');
        this.svg.setAttribute(null, 'height', '1.5em');
        this.svg.getElement().appendChild(this.path.getElement());
    }

    getElement() {
        return this.svg.getElement();
    }
}

class CloseMenuButton {
    constructor() {
        this.path = new SVG("http://www.w3.org/2000/svg", 'path');
        this.path.setAttribute(null, "fill", "#FFFFFF");
        this.path.setAttribute(null, "d", "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z");

        this.svg = new SVG("http://www.w3.org/2000/svg", 'svg');
        this.svg.setAttribute(null, 'viewBox', '0 0 384 512');
        this.svg.setAttribute(null, 'height', '1.5em');
        this.svg.setAttribute(null, 'class', 'hidden');
        this.svg.getElement().appendChild(this.path.getElement());
    }

    getElement() {
        return this.svg.getElement();
    }
}

class TopMenuButton extends ButtonElement {
    constructor(className, innerText, onHandleClick){
        super(className, innerText, onHandleClick);
    }
}

class HamburgerMenuButton extends ButtonElement {
    constructor(className, innerText, onHandleClick){
        super(className, innerText, onHandleClick);
    }
}