import { SliderComponent } from "../../core/SliderComponent";

export class ScaleSpan extends SliderComponent {
    constructor(orientation) {
        super()
        this.$el = document.createElement('span');
        this.$el.classList.add('ranger__scale-span');
        if (orientation === 'horizontal') {
        }
        else if (orientation === 'vertical') {
            this.$el.classList.add('ranger-vert__scale-span');
        }
    }

    inner_HTML(child) {
        this.$el.innerHTML = child;
    }
}