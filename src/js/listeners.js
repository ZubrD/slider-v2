import { makeScale, reScale, modifyScaleInput } from '../js/scale.js';
import { oneRunner, twoRunners } from './runnerToggler.js';
import { showTip, hideTip, reValueTip } from '../js/tipToggler.js';
import { orientationToggler } from '../js/orientToggler.js';
import { resetBtnCoord } from '../js/mouse.js';
import { getConfigData } from './getConfigData.js';
/* Переключение количества ползунков через панель */
export async function allChecksListener(event) {
    /* HTMLInputElement - т.к. метода checked нет для HTMLElement */
    const elem = event.target;
    const { run } = elem.dataset;
    const { discrete } = elem.dataset;
    const { tip } = elem.dataset;
    const { orient } = elem.dataset;
    const ranger = elem.parentNode.parentNode.querySelector("[data-type='ranger']");
    const config = elem.parentNode.parentNode.querySelector("[data-type='config']");
    const interval = ranger.querySelector("[data-type='interval']")

    /* Извлечение из конфига флага ориентации */
    let orientation = config.dataset.orientation;
    /* Извлечение из конфига номера экземпляра слайдера */
    const instant = config.dataset.inst;
    // Один или два бегуна
    if (run && elem.checked) {
        oneRunner(elem);
        /* Скрываю надписи */
        hideTip(elem);
        resetBtnCoord(event);
        return {   // Передача флага дискретного хода бегунов в Panel для store                 
            checkItem1: 'runners',
            valueCheckItem1: config.dataset.runners,
          }
    }
    else if (run && (!elem.checked)) {
        twoRunners(elem, instant);
        hideTip(elem);
        resetBtnCoord(event);
        
        const buttonSecondBis = ranger.querySelector("[data-type='btn-second']")
        return {                   
            checkItem1: 'runners',
            valueCheckItem1: config.dataset.runners,
          }
    }
    /* Дискретный / плавный ход */
    if (discrete && elem.checked) {
        config.dataset.discrete = 'yes';
        return {   // Передача флага дискретного хода бегунов в Panel для store                 
            checkItem1: 'discrete',
            valueCheckItem1: config.dataset.discrete,
          }
    }
    else if (discrete && !elem.checked) {
        config.dataset.discrete = 'no';
        return {
            checkItem1: 'discrete',
            valueCheckItem1: config.dataset.discrete,
          }
    }
    /* Подписи к бегунам */
    if (tip && elem.checked) {
        config.dataset.tip = 'yes'
        let element = event.target;
        showTip(element, orientation);
        return {        // Передача флага подписи к бегунам в Panel для store
            checkItem1: 'tip',
            valueCheckItem1: config.dataset.tip,
          }
    }
    else if (tip && !elem.checked) {
        config.dataset.tip = 'no'
        hideTip(elem, orientation);
        return {
            checkItem1: 'tip',
            valueCheckItem1: config.dataset.tip,
          }
    }
    /* Смена ориентации */
    if (orient && elem.checked) {
        /* Передача в конфиг флага ориентации */
        config.dataset.orientation = 'vertical';
        /* Извлечение из конфига флага ориентации */
        orientation = config.dataset.orientation;
        orientationToggler(elem, orientation);
        resetBtnCoord(event);
        return {            // Передача флага ориентации слажера в Panel для store
            checkItem1: 'orientation',
            valueCheckItem1: config.dataset.orientation,
            checkItem2: 'btn1_coord',
            valueCheckItem2: config.dataset.btn1_coord,
            checkItem3: 'btn2_coord',
            valueCheckItem3: config.dataset.btn2_coord,
          }
    }
    else if (orient && (elem.checked === false)) {
        config.dataset.orientation = 'horizontal';
        orientation = config.dataset.orientation;
        orientationToggler(elem, orientation);
        resetBtnCoord(event);
        console.log(interval.style.marginLeft)
        getConfigData(elem)
        return {
            checkItem1: 'orientation',
            valueCheckItem1: config.dataset.orientation,
            checkItem2: 'btn1_coord',
            valueCheckItem2: config.dataset.btn1_coord,
            checkItem3: 'btn2_coord',
            valueCheckItem3: config.dataset.btn2_coord,
          }
    }
}

export function changeMinListener(event) {
    const config = event.target.parentNode.parentNode.querySelector("[data-type='config']");
    const parent = event.target.parentNode;
    const elem = parent.querySelector("[data-type='zdslider-panel__min']");
    const min = Number(elem.value);
    const maxInput = parent.querySelector("[data-type='zdslider-panel__max']");
    const stepInput = parent.querySelector("[data-type='zdslider-panel__step']");
    const max = Number(maxInput.value);
    /* Указал произвольный шаг */
    const step = 1;
    const newScaleArr = makeScale(min, max, step);
    /* Передаю в конфиг */
    config.dataset.min = String(min);
    reValueTip(elem);
    const iteration = newScaleArr[1];
    const iterationsArr = newScaleArr[2];
    modifyScaleInput(parent, iteration, iterationsArr);
    /* ВНИМАНИЕ!!!! Здесь определил числовое значение как строку */
    const currentInst = config.dataset.inst;
    /* Ограничитель, чтобы max не превышал min */
    maxInput.setAttribute('min', String(min));
    /* Перестроение шкалы по новому значению min */
    reScale(newScaleArr[0], currentInst);
    return {                    
        checkItem1: 'min',
        valueCheckItem1: config.dataset.min,
        checkItem2: 'minLimit',
        valueCheckItem2: maxInput.getAttribute('min'),
        checkItem3: 'scaleLength',
        valueCheckItem3: config.dataset.scale_length,
        checkItem4: 'steps',
        valueCheckItem4: stepInput.dataset.steps || '',
        checkItem5: 'current',
        valueCheckItem5: stepInput.dataset.current,
        checkItem6: 'stepMinLimit',
        valueCheckItem6: stepInput.getAttribute('min'),
        checkItem7: 'stepMaxLimit',
        valueCheckItem7: stepInput.getAttribute('max')
      }
}

export function changeMaxListener(event) {
    const config = event.target.parentNode.parentNode.querySelector("[data-type='config']");
    const parent = event.target.parentNode;
    const elem = parent.querySelector("[data-type='zdslider-panel__max']");
    const minInput = parent.querySelector("[data-type='zdslider-panel__min']");
    const stepInput = parent.querySelector("[data-type='zdslider-panel__step']");
    const min = Number(minInput.value);
    const max = Number(elem.value);
    /* Указал произвольный шаг */
    const step = 1;
    /* получение массивов */
    const newScaleArr = makeScale(min, max, step);
    /* Передаю в конфиг */
    config.dataset.max = String(max);
    reValueTip(elem);
    const iteration = newScaleArr[1];
    const iterationsArr = newScaleArr[2];
    modifyScaleInput(parent, iteration, iterationsArr);
    const currentInst = config.dataset.inst;
    /* Ограничитель, чтобы min не превышал max */
    minInput.setAttribute('max', String(max));
    /* Перестроение шкалы по новому значению min */
    reScale(newScaleArr[0], currentInst);
    return {                    
        checkItem1: 'max',
        valueCheckItem1: config.dataset.max,
        checkItem2: 'maxLimit',
        valueCheckItem2: minInput.getAttribute('max'),
        checkItem3: 'scaleLength',
        valueCheckItem3: config.dataset.scale_length,
        checkItem4: 'steps',
        valueCheckItem4: stepInput.dataset.steps || '',
        checkItem5: 'current',
        valueCheckItem5: stepInput.dataset.current,
        checkItem6: 'stepMinLimit',
        valueCheckItem6: stepInput.getAttribute('min'),
        checkItem7: 'stepMaxLimit',
        valueCheckItem7: stepInput.getAttribute('max')
      }
}
export function changeStepListener(event) {
    const config = event.target.parentNode.parentNode.querySelector("[data-type='config']");
    const parent = event.target.parentNode;
    const elem = parent.querySelector("[data-type='zdslider-panel__step']");
    const minInput = parent.querySelector("[data-type='zdslider-panel__min']");
    const maxInput = parent.querySelector("[data-type='zdslider-panel__max']");
    const stepInput = parent.querySelector("[data-type='zdslider-panel__step']");
    const min = Number(minInput.value);
    const max = Number(maxInput.value);
    const val = Number(elem.value);
    const current = Number(elem.dataset.current);
    const arr = elem.dataset.steps.split(',');
    const arrNumber = arr.map(parseFloat);
    /* Индекс текущего шага шкалы в массиве */
    const currentIndex = arrNumber.indexOf(current);

    if (current < val) {
        elem.dataset.current = String(arrNumber[currentIndex - 1]);
        elem.value = String(arrNumber[currentIndex - 1]);
    }

    if (current > val) {
        elem.dataset.current = String(arrNumber[currentIndex + 1]);
        elem.value = String(arrNumber[currentIndex + 1]);
    }
    const currentInst = config.dataset.inst;
    /* val после изменения на значение из массива */
    const step = Number(elem.value);
    const newScaleArr = makeScale(min, max, step);
    /* Перестроение шкалы по новому значению шага */
    reScale(newScaleArr[0], currentInst);
    return {                    // Функция простая, можно вызвать return в конце, без использования промиса
        checkItem1: 'scaleLength',
        valueCheckItem1: config.dataset.scale_length,
        checkItem2: 'current',
        valueCheckItem2: stepInput.dataset.current,
      }
}

/* Сдвиг бегунов при изменении размера окна */
window.addEventListener('resize', function () {
    let config = document.body.querySelector("[data-type='config']");
    let ranger = document.body.querySelector("[data-type='ranger']");
    let interval = document.body.querySelector("[data-type='interval']");
    let btn1 = document.body.querySelector('[data-type="btn-first"]');
    let btn2 = document.body.querySelector('[data-type="btn-second"]');
    let btn1InitPos = config.dataset.btn1_init_pos;
    let btn2InitPos = config.dataset.btn2_init_pos;
    // Если на слайдере только один бегунок
    if(!btn2) {
        btn2 = btn1
    }
    if (ranger.offsetWidth == Number(btn2InitPos) || ranger.offsetWidth < Number(btn2InitPos) ||
        ranger.offsetWidth == Number(btn1InitPos) || ranger.offsetWidth < Number(btn1InitPos)) {
        config.dataset.btn2_init_pos = String(ranger.offsetWidth - btn2.offsetWidth);
        btn1.style.marginLeft = 0 + 'px';
        btn2.style.marginLeft = config.dataset.btn2_init_pos + 'px';
        interval.style.marginLeft = 0 + 'px';
        interval.style.width = config.dataset.btn2_init_pos + 'px';
    }
});
