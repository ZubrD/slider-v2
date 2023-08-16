export function setStyles(state) {
    const sliderState = state.sliderState
    // console.log('Первоначальное состояние', sliderState)
    const zdslider = document.querySelector(".zdslider");
    const interval = zdslider.querySelector("[data-type='interval']")
    // console.log(sliderState.intervalStyleHeight)
    if(sliderState.orientation === 'vertical') {
        interval.style.height = sliderState.intervalStyleHeight
        interval.style.marginTop = sliderState.intervalStyleMarginTop
    } else if(sliderState.orientation = 'horizontal') {

    }
    if(sliderState.runners === 2) {
        const buttonFirst = zdslider.querySelector("[data-type='btn-first'")
        const buttonSecond = zdslider.querySelector("[data-type='btn-second'")
        buttonFirst.style.marginTop = sliderState.buttonFirstStyleMarginTop
        buttonSecond.style.marginTop = sliderState.buttonSecondStyleMarginTop
    } else if(sliderState.runners === 1) {

    }
}