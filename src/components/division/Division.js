import { SliderComponent } from "../../core/SliderComponent";
import { clickMouse } from "../../js/mouseClick";
import * as actions from "../../redux/actions";

export class Division extends SliderComponent {
  constructor(orientation, options) {
    super({ ...options });
    this.$el = document.createElement("div");
    this.$el.classList.add("ranger__scale-division");
    this.$el.setAttribute("data-type", "scale-division");
    this.store = options
    if (orientation === "horizontal") {
    } else if (orientation === "vertical") {
      this.$el.classList.add("ranger-vert__scale-division");
    }
    this.#setup();
  }

  #setup() {
    this.clickHandler =
      this.clickHandler.bind(this); /* Только для местных функций */
    this.$el.addEventListener("click", this.clickHandler);
  }
  
  async clickHandler(event) {
    try {
      const data = await clickMouse(event);
      console.log(data)
      this.dispatch(actions.runnersMovement(data));
    } catch (error) {
      console.warn("Ошибка при клике на шкалу", error.message);
    }
  }
}
