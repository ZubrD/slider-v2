import { SliderComponent } from "../../core/SliderComponent";

export class DivisionSpan extends SliderComponent {
    constructor(orientation, options) {
        super({...options})
        this.$el = document.createElement('span');
        this.$el.classList.add('ranger__scale-division-span');
        this.$el.setAttribute('data-type', 'division-span')
        if (orientation === 'horizontal') {
        }
        else if (orientation === 'vertical') {
            this.$el.classList.add('ranger-vert__scale-division-span');
        }
    }
}