import { SliderComponent } from "../../core/SliderComponent";
import { mouseDownBtnFirst, mouseDownBtnSecond } from "../../js/mouse";
import { addStylesToDispatch } from "../../js/addStylesToDispatch";
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
        const styles = addStylesToDispatch();
        const dataToDispatch = { ...data, ...styles };
        this.dispatch(actions.runnersMovement(dataToDispatch))
      }
      if (type === "btn-second") {
        const data = await mouseDownBtnSecond(event);
        const styles = addStylesToDispatch();
        const dataToDispatch = { ...data, ...styles };
        this.dispatch(actions.runnersMovement(dataToDispatch))
      }
    }
    if (orientation === "vertical") {
      if (type === "btn-first") {
        const data = await mouseVertDownBtnFirst(event);
        const styles = addStylesToDispatch();
        const dataToDispatch = { ...data, ...styles };
        this.dispatch(actions.runnersMovement(dataToDispatch))
      }
      if (type === "btn-second") {
        const data = await mouseVertDownBtnSecond(event);
        const styles = addStylesToDispatch();
        const dataToDispatch = { ...data, ...styles };
        this.dispatch(actions.runnersMovement(dataToDispatch))
      }
    }
  }
}
