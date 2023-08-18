import { SliderComponent } from "../../core/SliderComponent";

export class Settings extends SliderComponent {
  constructor(
    options,
    counter,
    runners,
    min,
    max,
    discrete,
    orientation,
    scaleArr,
    rangerDiv,
    button_1_div
  ) {
    super({...options});
    this.store = options
    this.state = this.store.getState()
    this.$el = document.createElement("div");
    this.$el.classList.add("zdslider-config");
    this.$el.setAttribute("data-type", "config");
    this.$el.setAttribute("data-inst", counter);
    this.$el.setAttribute("data-runners", runners);
    this.$el.setAttribute("data-min", min);
    this.$el.setAttribute("data-max", max);
    this.$el.setAttribute("data-discrete", discrete);
    this.$el.setAttribute("data-orientation", orientation);
    this.$el.setAttribute("data-tip", "no");
    /* Для дискретного перемещения */
    this.$el.setAttribute("data-scale_length", scaleArr.length);
    /* Координаты первого бегуна */
    this.$el.setAttribute("data-btn1_coord", this.state.sliderState.btn1_coord);
    /* Координаты второго бегуна */
    // Был баг при вертикальном: при первом клике на шкалу в зоне первого бегуна,
    // этот бегун вместе с интервалом выпадал вниз. Исправил добавив проверку оринтировки
    if(orientation === 'horizontal') {
      // this.$el.setAttribute("data-btn2_coord", rangerDiv.offsetWidth);
      this.$el.setAttribute("data-btn2_coord", this.state.sliderState.btn2_coord);
    } else if(orientation === 'vertical') {
      // this.$el.setAttribute("data-btn2_coord", rangerDiv.offsetHeight);
      this.$el.setAttribute("data-btn2_coord", this.state.sliderState.btn2_coord);
    }
    this.$el.setAttribute("data-width", String(rangerDiv.offsetWidth));
    this.$el.setAttribute("data-height", String(rangerDiv.offsetHeight));
    this.$el.setAttribute(
      "data-button_width",
      String(button_1_div.offsetWidth)
    );
  }

  setAttribute(attr, number) {
    this.$el.setAttribute(attr, number);
  }
}
