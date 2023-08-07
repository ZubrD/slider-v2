import { SliderComponent } from "../../core/SliderComponent";

export class Interval extends SliderComponent {
    constructor(orientation, options) {
        super({...options})
        this.$el = document.createElement('div');
        this.$el.classList.add('ranger__interval');
        this.$el.setAttribute('data-type', 'interval');
        if (orientation === 'horizontal') {
        }
        else if (orientation === 'vertical') {
            this.$el.classList.add('ranger-vert__interval');
        }
    }
}