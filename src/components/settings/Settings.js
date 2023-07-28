import { SliderComponent } from "../../core/SliderComponent";

export class Settings extends SliderComponent {
    constructor() {
        super()
        this.$el = document.createElement('div');
        this.$el.classList.add('zdslider-config');
    }
    appendTo(parent) {
        parent.appendChild(this.$el);
    }
    setAttribute(attr, number) {
        this.$el.setAttribute(attr, number);
    }
}