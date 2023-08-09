import { SliderComponent } from "../../core/SliderComponent";
import {
  allChecksListener,
  changeMaxListener,
  changeMinListener,
  changeStepListener,
} from "../../js/listeners";
import * as actions from "../../redux/actions";

export class Panel extends SliderComponent {
  constructor(options) {
    super({ ...options });
    this.$el = document.createElement("div");
    this.$el.classList.add("zdslider-panel");
    this.$el.setAttribute("data-type", "zdslider-panel");
    this.$runCheckbox = document.createElement("input");
    this.$runCheckbox.classList.add("zdslider-panel__check-runners");
    this.$runCheckbox.setAttribute("type", "checkbox");
    this.$runCheckbox.setAttribute("data-run", "run");
    this.$discreteCheckbox = document.createElement("input");
    this.$discreteCheckbox.classList.add("zdslider-panel__check-discrete");
    this.$discreteCheckbox.setAttribute("type", "checkbox");
    this.$discreteCheckbox.setAttribute("data-discrete", "discrete");
    this.$tipCheckbox = document.createElement("input");
    this.$tipCheckbox.classList.add("zdslider-panel__check-tip");
    this.$tipCheckbox.setAttribute("data-type", "tip");
    this.$tipCheckbox.setAttribute("type", "checkbox");
    this.$tipCheckbox.setAttribute("data-tip", "tip");
    this.$orientCheckbox = document.createElement("input");
    this.$orientCheckbox.classList.add("zdslider-panel__check-orient");
    this.$orientCheckbox.setAttribute("type", "checkbox");
    this.$orientCheckbox.setAttribute("data-orient", "orient");
    this.$minNumber = document.createElement("input");
    this.$minNumber.classList.add("zdslider-panel__min");
    this.$minNumber.setAttribute("type", "number");
    this.$minNumber.setAttribute("data-type", "zdslider-panel__min");
    this.$maxNumber = document.createElement("input");
    this.$maxNumber.classList.add("zdslider-panel__max");
    this.$maxNumber.setAttribute("type", "number");
    this.$maxNumber.setAttribute("data-type", "zdslider-panel__max");
    this.$stepNumber = document.createElement("input");
    this.$stepNumber.classList.add("zdslider-panel__step");
    this.$stepNumber.setAttribute("type", "number");
    this.$stepNumber.setAttribute("data-type", "zdslider-panel__step");
    this.$stepNumber.setAttribute("onkeydown", "return false");
    this.$runLabel = document.createElement("label");
    this.$runLabel.innerHTML = "1 Бегун";
    this.$discreteLabel = document.createElement("label");
    this.$discreteLabel.innerHTML = "Дискретный";
    this.$tipLabel = document.createElement("label");
    this.$tipLabel.innerHTML = "Ярлык";
    this.$orientLabel = document.createElement("label");
    this.$orientLabel.innerHTML = "Вертикальный";
    this.$minLable = document.createElement("label");
    this.$minLable.innerHTML = "Минимум";
    this.$maxLabel = document.createElement("label");
    this.$maxLabel.innerHTML = "Максимум";
    this.$stepLabel = document.createElement("label");
    this.$stepLabel.innerHTML = "Шаг";
    this.$el.appendChild(this.$runCheckbox);
    this.$el.appendChild(this.$runLabel);
    this.$el.appendChild(document.createElement("br"));
    this.$el.appendChild(this.$discreteCheckbox);
    this.$el.appendChild(this.$discreteLabel);
    this.$el.appendChild(document.createElement("br"));
    this.$el.appendChild(this.$tipCheckbox);
    this.$el.appendChild(this.$tipLabel);
    this.$el.appendChild(document.createElement("br"));
    this.$el.appendChild(this.$orientCheckbox);
    this.$el.appendChild(this.$orientLabel);
    this.$el.appendChild(document.createElement("br"));
    this.$el.appendChild(this.$minNumber);
    this.$el.appendChild(this.$minLable);
    this.$el.appendChild(document.createElement("br"));
    this.$el.appendChild(this.$maxNumber);
    this.$el.appendChild(this.$maxLabel);
    this.$el.appendChild(document.createElement("br"));
    this.$el.appendChild(this.$stepNumber);
    this.$el.appendChild(this.$stepLabel);
    this.$el.appendChild(document.createElement("br"));
    this.#setupMin();   // Определять события нужно сначала для дочерних элементов ...
    this.#setupMax();   
    this.#setupStep();
    this.#setup();      // ... потом для родительских, иначе родительские переопределяют дочерние
  }

  #setupMin() {
    this.clickHandlerMinMax = this.clickHandlerMin.bind(this);
    this.$minNumber.addEventListener("change", this.clickHandlerMinMax); // Если событие назначить для родительского - не работает
  }

  #setupMax() {
    this.clickHandlerMinMax = this.clickHandlerMax.bind(this);
    this.$maxNumber.addEventListener("change", this.clickHandlerMinMax);    
  }
  
  #setupStep() {
    this.clickHandlerStep = this.clickHandlerStep.bind(this);
    this.$stepNumber.addEventListener("input", this.clickHandlerStep); // Если все обработчики запихать в один clickHandler - не работает
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener("click", this.clickHandler);
  }

  async clickHandler(event) {
    const data = await allChecksListener(event);
    if (data) {
      this.dispatch(actions.runnersMovement(data)); // Передача в state значений переключателей из панели
    }
  }

  clickHandlerMin(event) {
    const dataMin = changeMinListener(event);
    console.log(dataMin)
    if (dataMin) {
      this.dispatch(actions.runnersMovement(dataMin)); // Передача в state значений после события изменения минимального значения
    }
  }

  clickHandlerMax(event) {
    const dataMax = changeMaxListener(event);
    if (dataMax) {
      this.dispatch(actions.runnersMovement(dataMax)); // Передача в state значений после события изменения максимального значения
    }
  }

  clickHandlerStep(event) {
    const dataStep = changeStepListener(event)
    if (dataStep) {
      this.dispatch(actions.runnersMovement(dataStep)); // Передача в state значений переключателей из панели
    }    
  }
}
