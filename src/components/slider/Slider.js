import { configObj } from "../../js/config";
import { makeScale } from "../../js/scale";
import { Ranger } from "../ranger/Ranger";
import { Interval } from "../interval/Interval";
import { Button } from "../button/Button";
import { Division } from "../division/Division";
import { DivisionSpan } from "../divisionSpan/DivisionSpan";
import { Scale } from "../scale/Scale";
import { ScaleSpan } from "../scaleSpan/ScaleSpan";
import { Settings } from "../settings/Settings";
import { Panel } from "../panel/Panel";
import { changeMinListener, changeMaxListener, changeStepListener, allChecksListener } from "../../js/listeners";
import { getCoords } from "../../js/scale";

export class Slider {

  init() {
    const runnerNumber = configObj.runner_number;
    const min = configObj.min;
    const max = configObj.max;
    const step = 1;
    const discrete = configObj.discrete;
    const orientation = configObj.orientation;
    const scaleArrs = makeScale(min, max, step);
    /* Массив значений шкалы */
    const scaleArr = scaleArrs[0];
    const iteration = scaleArrs[1];
    const iterationsArr = scaleArrs[2];
    const elements = document.querySelectorAll(".zdslider");
    if (elements.length != 0) {
        /* Создание структуры слайдера */
        setStructure(runnerNumber, min, max, discrete, orientation, scaleArr, iteration, iterationsArr);
        /* Первоначальное размещение слайдера */
        sliderPositioning(runnerNumber, orientation);
    }
    let numberOfSliders = document.querySelectorAll('.zdslider-panel');
    numberOfSliders.forEach((elem) => {
        /* Слушатель переключателей */
        elem.addEventListener('click', allChecksListener);
    });
  }
}

/* Структура слайдера */
export function setStructure(runners, min, max, discrete, orientation, scaleArr, iteration, iterationsArr) {
    let elements = document.querySelectorAll('.zdslider');
    /* Счётчик количества слайдеров для создания атрибутов */
    let counter = 1;
    /*  Счётчик цикла для определенияя номера ranger в массиве */
    let i = 0;
    elements.forEach((elem) => {
        if (orientation === 'horizontal') {
        }
        else if (orientation === 'vertical') {
            elem.classList.add('zdslider-vert');
        }
        let ranger = new Ranger(orientation);
        ranger.appendTo(elem);
        let interval = new Interval(orientation);
        let rangerDiv = document.querySelectorAll('.ranger')[i];
        interval.appendTo(rangerDiv);
        if (runners === 2) {
            let button_1 = new Button(orientation);
            let button_2 = new Button(orientation);
            button_1.setAttribute('data-type', 'btn-first');
            button_2.setAttribute('data-type', 'btn-second');
            button_1.appendTo(rangerDiv);
            button_2.appendTo(rangerDiv);
        }
        else {
            let button_1 = new Button(orientation);
            button_1.setAttribute('data-type', 'btn-first');
            button_1.appendTo(rangerDiv);
        }
        let division = new Division(orientation);
        scaleArr.forEach((el) => {
            let span = new DivisionSpan(orientation);
            span.appendTo(division);
        });
        division.appendTo(elem);
        let scale = new Scale(orientation);
        scaleArr.forEach((el) => {
            let span = new ScaleSpan(orientation);
            span.appendTo(scale);
            span.inner_HTML(el);
        });
        scale.appendTo(elem);
        /* Слой для обмена данными между Моделью и Контроллером, Моделью и Представлением */
        let settings = new Settings();
        settings.setAttribute('data-inst', counter);
        settings.setAttribute('data-runners', runners);
        settings.setAttribute('data-min', min);
        settings.setAttribute('data-max', max);
        settings.setAttribute('data-discrete', discrete);
        settings.setAttribute('data-orientation', orientation);
        settings.setAttribute('data-tip', 'no');
        /* Для дискретного перемещения */
        settings.setAttribute('data-scale_length', scaleArr.length);
        /* Координаты первого бегуна */
        settings.setAttribute('data-btn1_coord', 0);
        /* Координаты второго бегуна */
        settings.setAttribute('data-btn2_coord', rangerDiv.offsetWidth);
        settings.setAttribute('data-width', String(rangerDiv.offsetWidth));
        settings.setAttribute('data-height', String(rangerDiv.offsetHeight));
        let button_1_div = document.querySelectorAll('[data-type="btn-first"]')[i];
        settings.setAttribute('data-button_width', String(button_1_div.offsetWidth));
        settings.appendTo(elem.parentNode);
        let panel = new Panel();
        panel.appendTo(elem.parentNode);
        let confInputMin = document.querySelectorAll('.zdslider-panel__min')[i];
        confInputMin.setAttribute('data-min', String(min));
        confInputMin.setAttribute('data-max', String(max));
        confInputMin.value = String(min);
        confInputMin.addEventListener('change', changeMinListener);
        let confInputMax = document.querySelectorAll('.zdslider-panel__max')[i];
        confInputMax.setAttribute('data-min', String(min));
        confInputMax.setAttribute('data-max', String(max));
        confInputMax.value = String(max);
        confInputMax.addEventListener('change', changeMaxListener);
        let confInputStep = document.querySelectorAll('.zdslider-panel__step')[i];
        confInputStep.setAttribute('data-steps', String(iterationsArr));
        confInputStep.setAttribute('data-iteration', String(iteration));
        confInputStep.setAttribute('data-current', String(iteration));
        if (iterationsArr.length !== 0) {
            confInputStep.setAttribute('max', String(iterationsArr[0]));
            confInputStep.setAttribute('min', String(iterationsArr[iterationsArr.length - 1]));
        }
        else {
            /* Если интервалов для шкалы нет, то делаю инпут неактивным */
            confInputStep.disabled = true;
        }
        confInputStep.value = confInputStep.dataset.iteration;
        confInputStep.addEventListener('input', changeStepListener);
        counter += 1;
        i += 1;
    });
}
/* Первоначальное размещение слайдера */
export function sliderPositioning(runners, orientation) {
    let elements = document.querySelectorAll('.zdslider');
    let i = 0;
    elements.forEach((elem) => {
        let ranger = document.querySelectorAll('.ranger')[i];
        let interval = document.querySelectorAll('.ranger__interval')[i];
        let button1 = document.querySelectorAll('[data-type="btn-first"]')[i];
        let config = document.querySelectorAll('.zdslider-config')[i];
        if (orientation === 'horizontal') {
            interval.style.width = (config.dataset.width) + 'px';
        }
        else if (orientation === 'vertical') {
            /* 5 - это ширина риски шкалы */
            interval.style.height = Number(config.dataset.height) - 5 + 'px';
        }
        if (runners === 1) {
            if (orientation == 'horizontal') {
                button1.style.marginLeft = (Number(config.dataset.width) - Number(config.dataset.button_width)) + 2 + 'px';
                initialButtonPosition(i, runners);
            }
            else if (orientation == 'vertical') {
                button1.style.marginTop = 0 + 'px';
            }
        }
        if (runners === 2) {
            if (orientation === 'horizontal') {
                button1.style.marginLeft = '0px';
                let button2 = document.querySelectorAll('[data-type="btn-second"]')[i];
                button2.style.marginLeft = (Number(config.dataset.width) - Number(config.dataset.button_width)) + 'px';
                /* Исходные позиции бегунов сохраняю в конфиге */
                initialButtonPosition(i, runners);
            }
            else if (orientation === 'vertical') {
                button1.style.marginTop = config.dataset.height + 'px';
                let button2 = document.querySelectorAll('[data-type="btn-second"]')[i];
                button2.style.marginTop = 0 + 'px';
            }
        }
        i += 1;
    });
}
export function initialButtonPosition(i, runners) {
    let config = document.querySelectorAll('.zdslider-config')[i];
    let btn1 = document.querySelectorAll('[data-type="btn-first"]')[i];
    let initBtn1Pos = getCoords(btn1);
    config.dataset.btn1_init_pos = String(initBtn1Pos.left);
    if (runners === 2) {
        let btn2 = document.querySelectorAll('[data-type="btn-second"]')[i];
        let initBtn2Pos = getCoords(btn2);
        config.dataset.btn2_init_pos = initBtn2Pos.left;
    }
}