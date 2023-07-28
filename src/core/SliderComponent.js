import { DomListener } from "./DomListener";

export class SliderComponent extends DomListener {
    appendTo(parent) {
        parent.appendChild(this.$el);
    }
    toHTML() {
        return ''
    }
}