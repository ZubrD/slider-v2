import { SliderComponent } from "../../core/SliderComponent";

export class Ranger extends SliderComponent {
    constructor(orientation, options) {
        super({...options})
        
        this.$el = document.createElement('div');      
        this.$el.classList.add('ranger');
        this.$el.setAttribute('data-type', 'ranger');
        if (orientation === 'horizontal') {
        }
        else if (orientation === 'vertical') {
            this.$el.classList.add('ranger-vert');
        }
    }
}