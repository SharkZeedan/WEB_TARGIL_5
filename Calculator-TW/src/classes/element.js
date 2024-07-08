import { processClassList } from '../utils';

export class Element {
    constructor(type,value) {
        this.type = type
        this.value = value
    }

    toHTML() {
        throw('toHTML function must be implemented')
    }

    processClasses(className) {
        return processClassList(className);
    }
}