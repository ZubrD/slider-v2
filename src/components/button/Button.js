import { SliderComponent } from "../../core/SliderComponent";
import { mouseDownBtnFirst, mouseDownBtnSecond } from "../../js/mouse";
import { mouseVertDownBtnFirst, mouseVertDownBtnSecond } from "../../js/mouseVert";

export class Button extends SliderComponent {
    constructor(orientation) {
        super()
        this.$el = document.createElement('button');
        this.$el.classList.add('ranger__button');
        if (orientation === 'horizontal') {
        }
        else if (orientation === 'vertical') {
            this.$el.classList.add('ranger-vert__button');
        }
        this.#setup()
    }
    appendTo(parent) {
        parent.appendChild(this.$el);
    }
    setAttribute(attr, number) {
        this.$el.setAttribute(attr, number);
    }
    #setup() {
        this.clickHandler = this.clickHandler.bind( this )        /* Только для местных функций */
        this.$el.addEventListener( 'mousedown', this.clickHandler )
    }
    clickHandler(event) {
        let elem = event.target;
        const { type } = elem.dataset;
        let config_dataset = elem.parentNode.parentNode.parentNode.querySelector('.zdslider-config');
        const { orientation } = config_dataset.dataset;
        if (orientation === 'horizontal') {
            if (type === 'btn-first') {
                mouseDownBtnFirst(event);
            }
            if (type === 'btn-second') {
                mouseDownBtnSecond(event);
            }
        }
        if (orientation === 'vertical') {
            if (type === 'btn-first') {
                mouseVertDownBtnFirst(event);
            }
            if (type === 'btn-second') {
                mouseVertDownBtnSecond(event);
            }
        }
    }

    toHTML() {
        return `<h1>Button</h1>`
    }
}

