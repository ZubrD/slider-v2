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
import { getCoords } from "../../js/scale";

export class Slider {
  constructor(options) {
    this.store = options.store;
  }
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
    const store = this.store
    if (elements.length != 0) {
      /* Создание структуры слайдера */
      setStructure(
        runnerNumber,
        min,
        max,
        discrete,
        orientation,
        scaleArr,
        iteration,
        iterationsArr,
        store
      );
      /* Первоначальное размещение слайдера */
      sliderPositioning(runnerNumber, orientation);
    }
  }
}

/* Структура слайдера */
export function setStructure(
  runners,
  min,
  max,
  discrete,
  orientation,
  scaleArr,
  iteration,
  iterationsArr,
  store
) {
  const elements = document.querySelectorAll(".zdslider");
  /* Счётчик количества слайдеров для создания атрибутов */
  let counter = 1;
  /*  Счётчик цикла для определенияя номера ranger в массиве */
  let i = 0;
  elements.forEach((elem) => {
    if (orientation === "horizontal") {
    } else if (orientation === "vertical") {
      elem.classList.add("zdslider-vert");
    }
    const ranger = new Ranger(orientation, store);
    ranger.appendTo(elem);
    const interval = new Interval(orientation, store);
    const rangerDiv = document.querySelectorAll("[data-type='ranger']")[i];
    interval.appendTo(rangerDiv);
    if (runners === 2) {
      const button_1 = new Button(orientation, store);
      const button_2 = new Button(orientation, store);
      button_1.setAttribute("data-type", "btn-first");
      button_2.setAttribute("data-type", "btn-second");
      button_1.appendTo(rangerDiv);
      button_2.appendTo(rangerDiv);
    } else {
      const button_1 = new Button(orientation, store);
      console.log(button_1)
      button_1.setAttribute("data-type", "btn-first");
      button_1.appendTo(rangerDiv);
    }
    const division = new Division(orientation, store);
    scaleArr.forEach((el) => {
      const span = new DivisionSpan(orientation, store);
      span.appendTo(division);
    });
    division.appendTo(elem);
    const scale = new Scale(orientation, store);
    scaleArr.forEach((el) => {
      const span = new ScaleSpan(orientation, store);
      span.appendTo(scale);
      span.inner_HTML(el);
    });
    scale.appendTo(elem);
    /* Слой для обмена данными между Моделью и Контроллером, Моделью и Представлением */
    const settings = new Settings(store);
    settings.setAttribute("data-inst", counter);
    settings.setAttribute("data-runners", runners);
    settings.setAttribute("data-min", min);
    settings.setAttribute("data-max", max);
    settings.setAttribute("data-discrete", discrete);
    settings.setAttribute("data-orientation", orientation);
    settings.setAttribute("data-tip", "no");
    /* Для дискретного перемещения */
    settings.setAttribute("data-scale_length", scaleArr.length);
    /* Координаты первого бегуна */
    settings.setAttribute("data-btn1_coord", 0);
    /* Координаты второго бегуна */
    settings.setAttribute("data-btn2_coord", rangerDiv.offsetWidth);
    settings.setAttribute("data-width", String(rangerDiv.offsetWidth));
    settings.setAttribute("data-height", String(rangerDiv.offsetHeight));
    const button_1_div = document.querySelectorAll('[data-type="btn-first"]')[i];
    settings.setAttribute(
      "data-button_width",
      String(button_1_div.offsetWidth)
    );
    settings.appendTo(elem.parentNode);
    const panel = new Panel(store);
    panel.appendTo(elem.parentNode);
    const confInputMin = document.querySelectorAll(
      "[data-type='zdslider-panel__min']"
    )[i];
    // confInputMin.setAttribute("data-min", String(min));    // Вроде, не нужны, УБРАТЬ
    // confInputMin.setAttribute("data-max", String(max));
    confInputMin.value = String(min);
    const confInputMax = document.querySelectorAll(
      "[data-type='zdslider-panel__max']"
    )[i];
    // confInputMax.setAttribute("data-min", String(min));   // Вроде, не нужны, УБРАТЬ
    // confInputMax.setAttribute("data-max", String(max));
    confInputMax.value = String(max);
    const confInputStep = document.querySelectorAll(
      "[data-type='zdslider-panel__step']"
    )[i];
    confInputStep.setAttribute("data-steps", String(iterationsArr));
    confInputStep.setAttribute("data-iteration", String(iteration));
    confInputStep.setAttribute("data-current", String(iteration));
    if (iterationsArr.length !== 0) {
      confInputStep.setAttribute("max", String(iterationsArr[0]));
      confInputStep.setAttribute(
        "min",
        String(iterationsArr[iterationsArr.length - 1])
      );
    } else {
      /* Если интервалов для шкалы нет, то делаю инпут неактивным */
      confInputStep.disabled = true;
    }
    confInputStep.value = confInputStep.dataset.iteration;

    counter += 1;
    i += 1;
  });
}
/* Первоначальное размещение слайдера */
export function sliderPositioning(runners, orientation) {
  const elements = document.querySelectorAll(".zdslider");
  let i = 0;
  elements.forEach((elem) => {
    const interval = document.querySelectorAll("[data-type='interval']")[i];
    const button1 = document.querySelectorAll('[data-type="btn-first"]')[i];
    const config = document.querySelectorAll("[data-type='config']")[i];
    if (orientation === "horizontal") {
      interval.style.width = config.dataset.width + "px";
    } else if (orientation === "vertical") {
      /* 5 - это ширина риски шкалы */
      interval.style.height = Number(config.dataset.height) - 5 + "px";
    }
    if (runners === 1) {
      if (orientation == "horizontal") {
        button1.style.marginLeft =
          Number(config.dataset.width) -
          Number(config.dataset.button_width) +
          2 +
          "px";
        // initialButtonPosition(i, runners);
      } else if (orientation == "vertical") {
        button1.style.marginTop = 0 + "px";
      }
    }
    if (runners === 2) {
      if (orientation === "horizontal") {
        button1.style.marginLeft = "0px";
        const button2 = document.querySelectorAll('[data-type="btn-second"]')[i];
        button2.style.marginLeft =
          Number(config.dataset.width) -
          Number(config.dataset.button_width) +
          "px";
        /* Исходные позиции бегунов сохраняю в конфиге */
        // initialButtonPosition(i, runners);
      } else if (orientation === "vertical") {
        button1.style.marginTop = config.dataset.height + "px";
        const button2 = document.querySelectorAll('[data-type="btn-second"]')[i];
        button2.style.marginTop = 0 + "px";
      }
    }
    i += 1;
  });
}
export function initialButtonPosition(i, runners) {
  const config = document.querySelectorAll("[data-type='config']")[i];
  const btn1 = document.querySelectorAll('[data-type="btn-first"]')[i];
  const initBtn1Pos = getCoords(btn1);
  // config.dataset.btn1_init_pos = String(initBtn1Pos.left);
  config.dataset.btn1_init_pos = 0;
  if (runners === 2) {
    const btn2 = document.querySelectorAll('[data-type="btn-second"]')[i];
    const initBtn2Pos = getCoords(btn2);
    config.dataset.btn2_init_pos = initBtn2Pos.left;
    // config.dataset.btn2_init_pos = 0;
  }
}
