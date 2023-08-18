export function setStyles(state) {
  const sliderState = state.sliderState;
  // console.log('Первоначальное состояние', sliderState)
  const zdslider = document.querySelector(".zdslider");
  const interval = zdslider.querySelector("[data-type='interval']");
  const buttonFirst = zdslider.querySelector("[data-type='btn-first']");
  const buttonSecond = zdslider.querySelector("[data-type='btn-second']");

  interval.style.height = sliderState.intervalStyleHeight;
  interval.style.width = sliderState.intervalStyleWidth;
  interval.style.marginTop = sliderState.intervalStyleMarginTop;
  interval.style.marginLeft = sliderState.intervalStyleMarginLeft;
  buttonFirst.style.marginLeft = sliderState.buttonFirstStyleMarginLeft;
  buttonFirst.style.marginTop = sliderState.buttonFirstStyleMarginTop;

  if (buttonSecond) {
    buttonSecond.style.marginTop = sliderState.buttonSecondStyleMarginTop;
    buttonSecond.style.marginLeft = sliderState.buttonSecondStyleMarginLeft;
  }
}
