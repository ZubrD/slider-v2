export function showTip(elem, orientation) {
    let parent = elem.parentNode.parentNode.querySelector('.zdslider');
    let parentRanger = parent.querySelector("[data-type='ranger']");
    let buttons = parentRanger.querySelectorAll("[data-button='button']");
    buttons.forEach((elem) => {
        if (orientation === 'horizontal') {
            elem.classList.add('ranger__button-tip');
        }
        else if (orientation === 'vertical') {
            elem.classList.add('ranger-vert__button-tip');
        }
    });
}
export function hideTip(elem) {
    let parent = elem.parentNode.parentNode.querySelector('.zdslider');
    let tip = elem.parentNode.querySelector("[data-type='tip']");
    /* Сбрасываю флаг надписи */
    tip.checked = false;
    let parentRanger = parent.querySelector("[data-type='ranger']");
    let buttons = parentRanger.querySelectorAll("[data-button='button']");
    /* Удаляю стили ярлыков */
    buttons.forEach((elem) => {
        elem.classList.remove('ranger__button-tip');
        elem.classList.remove('ranger-vert__button-tip');
    });
}
export function forTip(target, coord) {
    const config = target.parentNode.parentNode.parentNode.querySelector("[data-type='config']");
    const configMin = Number(config.dataset.min);
    const configMax = Number(config.dataset.max);
    const rangerHeight = Number(config.dataset.height);
    const rangerWidth = Number(config.dataset.width);
    const orientation = config.dataset.orientation;
    if (orientation === 'horizontal') {
        return Math.round(((configMax - configMin) / (rangerWidth - 12)) * (coord)) + configMin;
    }
    else if (orientation === 'vertical') {
        return Math.round(((configMax - configMin) / rangerHeight) * (coord)) + configMin;
    }
}
export function reValueTip(element) {
    /* Изменение значения атрибута tip  при изменении min, max в панели */
    const parent = element.parentNode.parentNode;
    const zdslider = parent.querySelector('.zdslider');
    const input = parent.querySelector("[data-type='tip']");
    input.checked = false;
    const buttons = zdslider.querySelectorAll("[data-button='button']");
    buttons.forEach((elem) => {
        elem.dataset.tip = '';
    });
    hideTip(element);
    const config = parent.querySelector("[data-type='config']");
    config.dataset.tip = 'no'
}
