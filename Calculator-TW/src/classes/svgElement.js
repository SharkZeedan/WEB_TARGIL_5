import { Element } from './element';

export class SVG extends Element {
    #svg

    constructor(namespaceURI, mode) {
        super("svg", null);
        this.#svg = document.createElementNS(namespaceURI, mode);
    }

    setAttribute(attributeNamespace, qualifiedName, value) {
        this.#svg.setAttributeNS(attributeNamespace, qualifiedName, value);
    }

    toHTML() {
        return this.#svg.outerHTML;
    }

    getElement() {
        return this.#svg;
    }
}