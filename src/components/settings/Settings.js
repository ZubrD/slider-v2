import { SliderComponent } from "../../core/SliderComponent";

export class Settings extends SliderComponent {
    constructor(options) {
        super(options)
        this.$el = document.createElement('div');
        this.$el.classList.add('zdslider-config');
        this.$el.setAttribute('data-type', 'config')
    }

    setAttribute(attr, number) {
        this.$el.setAttribute(attr, number);
    }
}