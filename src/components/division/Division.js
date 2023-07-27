import { SliderComponent } from "../../core/SliderComponent";

export class Division extends SliderComponent {
    constructor(orientation) {
        _Division_instances.add(this);
        this.$el = document.createElement('div');
        this.$el.classList.add('ranger__scale-division');
        if (orientation === 'horizontal') {
        }
        else if (orientation === 'vertical') {
            this.$el.classList.add('ranger-vert__scale-division');
        }
        __classPrivateFieldGet(this, _Division_instances, "m", _Division_setup).call(this);
    }
    appendTo(parent) {
        parent.appendChild(this.$el);
    }
    appendChild(child) {
        this.$el.appendChild(child);
    }
    clickHandler(event) {
        clickMouse(event);
    }

    toHTML() {
        return `<h1>Division</h1>`
    }
}