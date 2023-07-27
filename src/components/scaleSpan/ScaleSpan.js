import { SliderComponent } from "../../core/SliderComponent";

export class ScaleSpan extends SliderComponent {
    constructor(orientation) {
        this.$el = document.createElement('span');
        this.$el.classList.add('ranger__scale-span');
        if (orientation === 'horizontal') {
        }
        else if (orientation === 'vertical') {
            this.$el.classList.add('ranger-vert__scale-span');
        }
    }
    appendTo(parent) {
        parent.appendChild(this.$el);
    }
    inner_HTML(child) {
        this.$el.innerHTML = child;
    }

    toHTML() {
        return `<h1>ScaleSpan</h1>`
    }
}