import { ButtonElement } from './buttonElement.js'
import { createDiv } from '../utils.js';

export class ThemeHandler {
    constructor() {
        this.onHandleClick = this.toggle.bind(this);
        this.container = createDiv("");
        this.#init();
    }
    
    #init() {
        const darkBtn = new DarkButtonToggle(this.onHandleClick); 
        const lightBtn = new LightButtonToggle(this.onHandleClick);
        this.container.appendChild(darkBtn.getElement());
        this.container.appendChild(lightBtn.getElement());
    }

    toggle() {
        document.documentElement.classList.toggle('dark');
    }

    getObject() {
        return this.container;
    }
}

class DarkButtonToggle extends ButtonElement {
    constructor(onClick){
        super("dark:hidden block", "Dark", onClick);
    }
}

class LightButtonToggle extends ButtonElement {
    constructor(onClick){
        super("hidden dark:block", "Light", onClick);
    }
}