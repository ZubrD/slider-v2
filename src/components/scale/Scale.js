import { SliderComponent } from "../../core/SliderComponent";

export class Scale extends SliderComponent {
    constructor(orientation) {
        this.$el = document.createElement('div');
        this.$el.classList.add('ranger__scale');
        if (orientation === 'horizontal') {
        }
        else if (orientation === 'vertical') {
            this.$el.classList.add('ranger-vert__scale');
        }
    }
    appendTo(parent) {
        parent.appendChild(this.$el);
    }
    appendChild(child) {
        this.$el.appendChild(child);
    }

    toHTML() {
        return `<h1>Scale</h1>`
    }
}