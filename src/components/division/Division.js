import { SliderComponent } from "../../core/SliderComponent";
import { clickMouse } from "../../js/mouseClick";

export class Division extends SliderComponent {
    constructor(orientation) {
        super()
        this.$el = document.createElement('div');
        this.$el.classList.add('ranger__scale-division');
        this.$el.setAttribute('data-type', 'scale-division')
        if (orientation === 'horizontal') {
        }
        else if (orientation === 'vertical') {
            this.$el.classList.add('ranger-vert__scale-division');
        }
        this.#setup()
    }

    #setup() {
        this.clickHandler = this.clickHandler.bind( this )        /* Только для местных функций */
        this.$el.addEventListener( 'click', this.clickHandler )
    }
    clickHandler(event) {
        clickMouse(event);
    }
}