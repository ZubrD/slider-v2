import { makeScale, reScale, modifyScaleInput } from '../js/scale.js';
import { oneRunner, twoRunners } from './runnerToggler.js';
import { showTip, hideTip, reValueTip } from '../js/tipToggler.js';
import { orientationToggler } from '../js/orientToggler.js';
import { resetBtnCoord } from '../js/mouse.js';
/* Переключение количества ползунков через панель */
export function allChecksListener(event) {
    /* HTMLInputElement - т.к. метода checked нет для HTMLElement */
    let elem = event.target;
    let { run } = elem.dataset;
    let { discrete } = elem.dataset;
    let { tip } = elem.dataset;
    let { orient } = elem.dataset;
    let ranger = elem.parentNode.parentNode.querySelector('.ranger');
    let config = elem.parentNode.parentNode.querySelector('.zdslider-config');
    /* Извлечение из конфига флага ориентации */
    let orientation = config.dataset.orientation;
    /* Извлечение из конфига номера экземпляра слайдера */
    let instant = config.dataset.inst;
    if (run && elem.checked) {
        oneRunner(elem);
        /* Скрываю надписи */
        hideTip(elem);
        resetBtnCoord(event);
    }
    else if (run && (!elem.checked)) {
        twoRunners(elem, instant);
        hideTip(elem);
        resetBtnCoord(event);
    }
    /* Дискретный / плавный ход */
    if (discrete && elem.checked) {
        config.dataset.discrete = 'yes';
    }
    else if (discrete && !elem.checked) {
        config.dataset.discrete = 'no';
    }
    /* Подписи к бегунам */
    if (tip && elem.checked) {
        let element = event.target;
        showTip(element, orientation);
    }
    else if (tip && !elem.checked) {
        hideTip(elem, orientation);
    }
    /* Смена ориентации */
    if (orient && elem.checked) {
        /* Передача в конфиг флага ориентации */
        config.dataset.orientation = 'vertical';
        /* Извлечение из конфига флага ориентации */
        orientation = config.dataset.orientation;
        orientationToggler(elem, orientation);
        resetBtnCoord(event);
    }
    else if (orient && (elem.checked === false)) {
        config.dataset.orientation = 'horizontal';
        orientation = config.dataset.orientation;
        orientationToggler(elem, orientation);
        resetBtnCoord(event);
    }
}
export function changeMinListener(event) {
    let elem = event.target;
    let config = elem.parentNode.parentNode.querySelector('.zdslider-config');
    let parent = elem.parentNode;
    let min = Number(elem.value);
    let maxInput = parent.querySelector('.zdslider-panel__max');
    let max = Number(maxInput.value);
    /* Указал произвольный шаг */
    let step = 1;
    let newScaleArr = makeScale(min, max, step);
    /* Передаю в конфиг */
    config.dataset.min = String(min);
    config.dataset.max = String(max);
    reValueTip(elem);
    let iteration = newScaleArr[1];
    let iterationsArr = newScaleArr[2];
    modifyScaleInput(parent, iteration, iterationsArr);
    /* ВНИМАНИЕ!!!! Здесь определил числовое значение как строку */
    let currentInst = config.dataset.inst;
    /* Ограничитель, чтобы max не превышал min */
    maxInput.setAttribute('min', String(min));
    /* Перестроение шкалы по новому значению min */
    reScale(newScaleArr[0], currentInst);
}
export function changeMaxListener(event) {
    let elem = event.target;
    let config = elem.parentNode.parentNode.querySelector('.zdslider-config');
    let parent = elem.parentNode;
    let minInput = parent.querySelector('.zdslider-panel__min');
    let min = Number(minInput.value);
    let max = Number(elem.value);
    /* Указал произвольный шаг */
    let step = 1;
    /* получение массивов */
    let newScaleArr = makeScale(min, max, step);
    /* Передаю в конфиг */
    config.dataset.min = String(min);
    config.dataset.max = String(max);
    reValueTip(elem);
    let iteration = newScaleArr[1];
    let iterationsArr = newScaleArr[2];
    modifyScaleInput(parent, iteration, iterationsArr);
    let currentInst = config.dataset.inst;
    /* Ограничитель, чтобы min не превышал max */
    minInput.setAttribute('max', String(max));
    /* Перестроение шкалы по новому значению min */
    reScale(newScaleArr[0], currentInst);
}
export function changeStepListener(event) {
    let elem = event.target;
    let config = elem.parentNode.parentNode.querySelector('.zdslider-config');
    let parent = elem.parentNode;
    let minInput = parent.querySelector('.zdslider-panel__min');
    let maxInput = parent.querySelector('.zdslider-panel__max');
    let min = Number(minInput.value);
    let max = Number(maxInput.value);
    let val = Number(elem.value);
    let current = Number(elem.dataset.current);
    let arr = elem.dataset.steps.split(',');
    let arrNumber = arr.map(parseFloat);
    /* Индекс текущего шага шкалы в массиве */
    let currentIndex = arrNumber.indexOf(current);
    if (localStorage.test) {
        current = Number(localStorage.current_1);
        val = Number(localStorage.val_1);
    }
    if (current < val) {
        elem.dataset.current = String(arrNumber[currentIndex - 1]);
        elem.value = String(arrNumber[currentIndex - 1]);
    }
    if (localStorage.test) {
        current = Number(localStorage.current_2);
        val = Number(localStorage.val_2);
    }
    if (current > val) {
        elem.dataset.current = String(arrNumber[currentIndex + 1]);
        elem.value = String(arrNumber[currentIndex + 1]);
    }
    let currentInst = config.dataset.inst;
    /* val после изменения на значение из массива */
    let step = Number(elem.value);
    let newScaleArr = makeScale(min, max, step);
    /* Перестроение шкалы по новому значению шага */
    reScale(newScaleArr[0], currentInst);
}
/* Сдвиг бегунов при изменении размера окна */
window.addEventListener('resize', function () {
    let config = document.body.querySelector('.zdslider-config');
    let ranger = document.body.querySelector('.ranger');
    let interval = document.body.querySelector('.ranger__interval');
    let btn1 = document.body.querySelector('[data-type="btn-first"]');
    let btn2 = document.body.querySelector('[data-type="btn-second"]');
    let btn1InitPos = config.dataset.btn1_init_pos;
    let btn2InitPos = config.dataset.btn2_init_pos;
    if (ranger.offsetWidth == Number(btn2InitPos) || ranger.offsetWidth < Number(btn2InitPos) ||
        ranger.offsetWidth == Number(btn1InitPos) || ranger.offsetWidth < Number(btn1InitPos)) {
        config.dataset.btn2_init_pos = String(ranger.offsetWidth - btn2.offsetWidth);
        btn1.style.marginLeft = 0 + 'px';
        btn2.style.marginLeft = config.dataset.btn2_init_pos + 'px';
        interval.style.marginLeft = 0 + 'px';
        interval.style.width = config.dataset.btn2_init_pos + 'px';
        console.log(btn1InitPos);
    }
});
