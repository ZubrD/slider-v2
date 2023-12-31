import { SliderComponent } from "../../core/SliderComponent";

export class Scale extends SliderComponent {
    constructor(orientation, options) {
        super({...options})
        this.$el = document.createElement('div');
        this.$el.classList.add('ranger__scale');
        this.$el.setAttribute('data-type', 'scale')
        if (orientation === 'horizontal') {
        }
        else if (orientation === 'vertical') {
            this.$el.classList.add('ranger-vert__scale');
        }
    }
}