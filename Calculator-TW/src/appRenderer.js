import { processClassList } from './utils';

export class AppRenderer {
    constructor(selector, classList="") {
        this.$el = document.querySelector(selector);
        const processedClasses = processClassList(classList); 
        this.$el.classList.add(...processedClasses);
    }

    renderApp(model) {
        const appChildren = document.getElementById("pre-content");
        const menuElement = document.getElementById("menu-container");
        const contentElement = document.getElementById("content");

        this.$el.appendChild(menuElement);
        this.$el.appendChild(appChildren);
        this.$el.appendChild(contentElement);

        model['menu-container'].map(block => menuElement.appendChild(block.getObject()));
        appChildren.innerHTML += model['app-children'].map(block => block.toHTML()).join('');
        model['content'].map(block => contentElement.appendChild(block.getObject()));
    }
}