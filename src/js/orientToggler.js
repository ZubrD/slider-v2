import { hideTip } from '../js/tipToggler.js';
export function orientationToggler(elem, orientation) {
    let zdslider = elem.parentNode.parentNode.querySelector('.zdslider');
    let ranger = zdslider.querySelector("[data-type='ranger']");
    let rangerInterval = zdslider.querySelector("[data-type='interval']");
    let rangerScale = zdslider.querySelector("[data-type='scale']");
    let rangerScaleDivision = zdslider.querySelector("[data-type='scale-division']");
    let rangerScaleDivisionSpans = zdslider.querySelectorAll("[data-type='division-span']");
    let rangerButtons = zdslider.querySelectorAll("[data-button='button']");
    let config = elem.parentNode.parentNode.querySelector("[data-type='config']");
    /* Сброс флага ярлыка */
    hideTip(elem);
    if (orientation === 'vertical') {
        zdslider.classList.add('zdslider-vert');
        ranger.classList.add('ranger-vert');
        rangerInterval.classList.add('ranger-vert__interval');
        rangerScale.classList.add('ranger-vert__scale');
        rangerScaleDivision.classList.add('ranger-vert__scale-division');
        rangerInterval.style.height = (ranger.offsetHeight) + 'px';
        rangerInterval.style.width = 5 + 'px';
        rangerInterval.style.marginLeft = 0 + 'px';
        config.dataset.width = String(ranger.offsetWidth);
        config.dataset.height = String(ranger.offsetHeight);
        rangerScaleDivisionSpans.forEach((elem) => {
            elem.classList.add('ranger-vert__scale-division-span');
        });
        for (let elem of rangerButtons) {
            elem.classList.add('ranger-vert__button');
            /* Сброс значений ярлыков */
            elem.dataset.tip = '';
            /* Количество бегунов */
            if (rangerButtons.length === 1) {
                elem.style.marginTop = 0 + 'px';
                elem.style.marginLeft = 0 + 'px';
            }
            else if (rangerButtons.length === 2) {
                if (elem.dataset.type === 'btn-first') {
                    elem.style.marginTop = ranger.offsetHeight + 'px';
                    elem.style.marginLeft = 0 + 'px';
                }
                else if (elem.dataset.type === 'btn-second') {
                    elem.style.marginTop = 0 + 'px';
                    elem.style.marginLeft = 0 + 'px';
                }
            }
        }
    }
    else if (orientation === 'horizontal') {
        zdslider.classList.remove('zdslider-vert');
        ranger.classList.remove('ranger-vert');
        rangerInterval.classList.remove('ranger-vert__interval');
        rangerScale.classList.remove('ranger-vert__scale');
        rangerScaleDivision.classList.remove('ranger-vert__scale-division');
        /* Переопределение стиля интервала после определения класса */
        rangerInterval.style.width = ranger.offsetWidth + 'px';
        rangerInterval.style.height = 5 + 'px';
        rangerInterval.style.marginTop = 0 + 'px';
        config.dataset.width = String(ranger.offsetWidth);
        config.dataset.height = String(ranger.offsetHeight);
        rangerScaleDivisionSpans.forEach((elem) => {
            elem.classList.remove('ranger-vert__scale-division-span');
        });
        rangerButtons.forEach((elem) => {
            elem.classList.remove('ranger-vert__button');
            elem.classList.remove('ranger-vert__button-tip');
            elem.dataset.tip = '';
            /* Сброс значений ярлыков. Новые значения из панели */
            if (rangerButtons.length === 1) {
                elem.style.marginLeft = (ranger.offsetWidth - elem.offsetWidth) + 2 + 'px';
                elem.style.marginTop = 0 + 'px';
            }
            else if (rangerButtons.length === 2) {
                if (elem.dataset.type === 'btn-first') {
                    elem.style.marginLeft = 0 + 'px';
                    elem.style.marginTop = 0 + 'px';
                }
                else if (elem.dataset.type === 'btn-second') {
                    elem.style.marginLeft = (ranger.offsetWidth - elem.offsetWidth) + 'px';
                    elem.style.marginTop = 0 + 'px';
                }
            }
        });
    }
}
