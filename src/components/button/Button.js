import { SliderComponent } from "../../core/SliderComponent";
import { mouseDownBtnFirst, mouseDownBtnSecond } from "../../js/mouse";
import {
  mouseVertDownBtnFirst,
  mouseVertDownBtnSecond,
} from "../../js/mouseVert";
import * as actions from "../../redux/actions"

export class Button extends SliderComponent {
  constructor(orientation, options) {
    super({ ...options });
    this.$el = document.createElement("button");
    this.$el.classList.add("ranger__button");
    this.$el.setAttribute("data-button", "button");
    if (orientation === "horizontal") {
    } else if (orientation === "vertical") {
      this.$el.classList.add("ranger-vert__button");
    }
    this.#setup();
  }

  setAttribute(attr, number) {
    this.$el.setAttribute(attr, number);
  }
  #setup() {
    this.clickHandler =
      this.clickHandler.bind(this); /* Только для местных функций */
    this.$el.addEventListener("mousedown", this.clickHandler);
  }
  
  async clickHandler(event) {
    let elem = event.target;
    const { type } = elem.dataset;
    let config_dataset = elem.parentNode.parentNode.parentNode.querySelector(
      "[data-type='config']"
    );
    const { orientation } = config_dataset.dataset;
    if (orientation === "horizontal") {
      if (type === "btn-first") {
        const data = await mouseDownBtnFirst(event);
        this.dispatch(actions.runnersMovement(data))
        console.log(data)
      }
      if (type === "btn-second") {
        const data = await mouseDownBtnSecond(event);
        this.dispatch(actions.runnersMovement(data))
        console.log(data)
      }
    }
    if (orientation === "vertical") {
      if (type === "btn-first") {
        const data = await mouseVertDownBtnFirst(event);
        this.dispatch(actions.runnersMovement(data))
        console.log(data)
      }
      if (type === "btn-second") {
        const data = await mouseVertDownBtnSecond(event);
        this.dispatch(actions.runnersMovement(data))
        console.log(data)
      }
    }
  }
}
