import { SliderComponent } from "../../core/SliderComponent";

export class Settings extends SliderComponent {
    constructor() {
        super()
        this.$el = document.createElement('div');
        this.$el.classList.add('zdslider-config');
    }

    setAttribute(attr, number) {
        this.$el.setAttribute(attr, number);
    }
}