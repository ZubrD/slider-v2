import { DomListener } from "./DomListener";

export class SliderComponent extends DomListener {
    constructor(options = {}) {
        super()
        this.options = options
        this.store = options.store
    }
    dispatch(action) {
        this.options.dispatch(action)
    }
    subscribe(fn) {
        this.options.subscribe(fn)
      }
    appendTo(parent) {
        parent.appendChild(this.$el);
    }
    appendChild(child) {
        this.$el.appendChild(child);
    }
}