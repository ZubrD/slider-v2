export function addStylesToDispatch() {
    const zdslider = document.querySelector(".zdslider");
    const interval = zdslider.querySelector("[data-type='interval']");
    const buttonFirst = zdslider.querySelector("[data-type='btn-first']");
    const buttonSecond = zdslider.querySelector("[data-type='btn-second']");

    return {
        checkItem4: 'intervalStyleHeight',
        valueCheckItem4: interval.style.height,            
        checkItem5: 'intervalStyleWidth',
        valueCheckItem5: interval.style.width,
        checkItem6: 'intervalStyleMarginTop',
        valueCheckItem6: interval.style.marginTop,
        checkItem7: 'intervalStyleMarginLeft',
        valueCheckItem7: interval.style.marginLeft,
        checkItem8: 'buttonFirstStyleMarginTop',
        valueCheckItem8: buttonFirst.style.marginTop,
        checkItem9: 'buttonFirstStyleMarginLeft',
        valueCheckItem9: buttonFirst.style.marginLeft,
        checkItem10: 'buttonSecondStyleMarginTop',
        valueCheckItem10: buttonSecond ? buttonSecond.style.marginTop : "",
        checkItem11: 'buttonSecondStyleMarginLeft',
        valueCheckItem11: buttonSecond ? buttonSecond.style.marginLeft : ""
      }
}