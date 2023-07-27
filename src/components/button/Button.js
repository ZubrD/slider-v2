import { SliderComponent } from "../../core/SliderComponent";

export class Button extends SliderComponent {
    constructor(orientation) {
        _Button_instances.add(this);
        this.$el = document.createElement('button');
        this.$el.classList.add('ranger__button');
        if (orientation === 'horizontal') {
        }
        else if (orientation === 'vertical') {
            this.$el.classList.add('ranger-vert__button');
        }
        __classPrivateFieldGet(this, _Button_instances, "m", _Button_setup).call(this);
    }
    appendTo(parent) {
        parent.appendChild(this.$el);
    }
    setAttribute(attr, number) {
        this.$el.setAttribute(attr, number);
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

_Button_instances = new WeakSet(), _Button_setup = function _Button_setup() {
    /* Только для местных функций */
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('mousedown', this.clickHandler);
};