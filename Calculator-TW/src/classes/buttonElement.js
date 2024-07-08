import { Element } from './element';

export class ButtonElement extends Element {
    #button;

    constructor(className, innerText, onHandleClick, isDiv=false){
        const tagType = isDiv ? "div" : "button"
        super(tagType, innerText);
        this.#button = document.createElement(tagType);
        const processed_classNames = super.processClasses(className);
        if (processed_classNames.length > 0) {
            this.#button.classList.add(...processed_classNames);
        }
        this.#button.innerText = innerText;
        this.#button.addEventListener('click', onHandleClick);
    }

    toHTML() {
        return this.#button.outerHTML;
    }

    getElement() {
        return this.#button;
    }
}