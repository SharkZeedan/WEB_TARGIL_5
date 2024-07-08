import { Element } from './element';

export class Title extends Element {
    constructor(innerText, classes) {
        super("h1", innerText);
        this.innerText = innerText;
        this.classes = classes;
    }

    toHTML() {
        return `<h1 class=${this.classes}>${this.innerText}</h1>`;
    }
}