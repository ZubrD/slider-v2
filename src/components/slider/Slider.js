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
import { setStyles } from "../../js/setStyles";

export class Slider {
  constructor(options) {
    this.store = options.store;
  }
  init() {
    const state = this.store.getState();
    const sliderState = state.sliderState;
    const runnerNumber = configObj.runner_number && Number(sliderState.runners);
    const min = configObj.min && Number(sliderState.min);
    const max = configObj.max && Number(sliderState.max);
    const step = 1;
    const discrete = configObj.discrete && sliderState.discrete;
    const orientation = configObj.orientation && sliderState.orientation;
    const scaleArrs = makeScale(min, max, step);
    /* Массив значений шкалы */
    const scaleArr = scaleArrs[0];
    const iteration = scaleArrs[1];
    const iterationsArr = scaleArrs[2];
    const elements = document.querySelectorAll(".zdslider");
    const store = this.store;
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
    setStyles(state)  // Звдвние исходных стилей
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
  const state = store.getState();
  /* Счётчик количества слайдеров для создания атрибутов */
  let counter = 1;
  /*  Счётчик цикла для определенияя номера ranger в массиве */
  let i = 0;
  elements.forEach((elem) => {
    if (orientation === "horizontal") {
    } else if (orientation === "vertical") {
      elem.classList.add("zdslider-vert");
    }

    //////////////////////////// Компонент Ranger ///////////////////////////

    const ranger = new Ranger(orientation, store);
    ranger.appendTo(elem);

    //////////////////////////// Компонент Interval ///////////////////////////

    const interval = new Interval(orientation, store);
    const rangerDiv = document.querySelectorAll("[data-type='ranger']")[i];
    interval.appendTo(rangerDiv);

    /////////////////////////// Компоненты Button ///////////////////////////////

    if (runners === 2) {
      const button_1 = new Button(orientation, store);
      const button_2 = new Button(orientation, store);
      button_1.setAttribute("data-type", "btn-first");
      button_2.setAttribute("data-type", "btn-second");
      button_1.appendTo(rangerDiv);
      button_2.appendTo(rangerDiv);
    } else {
      const button_1 = new Button(orientation, store);
      button_1.setAttribute("data-type", "btn-first");
      button_1.appendTo(rangerDiv);
    }

    //////////////////////////// Компонент Division ///////////////////////////////////

    const division = new Division(orientation, store);
    scaleArr.forEach((el) => {
      const span = new DivisionSpan(orientation, store);
      span.appendTo(division);
    });
    division.appendTo(elem);

    //////////////////////////////// Компонент Scale ////////////////////////////////

    const scale = new Scale(orientation, store);
    scaleArr.forEach((el) => {
      const span = new ScaleSpan(orientation, store);
      span.appendTo(scale);
      span.inner_HTML(el);
    });
    scale.appendTo(elem);

    /////////////////////////////// Компонент Settings ////////////////////////////////
    /* Слой для обмена данными между Моделью и Контроллером, Моделью и Представлением */
    
    const button_1_div = document.querySelectorAll('[data-type="btn-first"]')[i];
    const settings = new Settings(
      store,
      counter,
      runners,
      min,
      max,
      discrete,
      orientation,
      scaleArr,
      rangerDiv,
      button_1_div
    );

    settings.appendTo(elem.parentNode);

    ///////////////////////////// Компонент Panel ////////////////////////////////

    const panel = new Panel(
      store,
      runners,
      discrete,
      orientation,
      min,
      max,
      iterationsArr,
      iteration
    );
    panel.appendTo(elem.parentNode);
    

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
        const button2 = document.querySelectorAll('[data-type="btn-second"]')[
          i
        ];
        button2.style.marginLeft =
          Number(config.dataset.width) -
          Number(config.dataset.button_width) +
          "px";
        /* Исходные позиции бегунов сохраняю в конфиге */
        // initialButtonPosition(i, runners);
      } else if (orientation === "vertical") {
        button1.style.marginTop = config.dataset.height + "px";
        const button2 = document.querySelectorAll('[data-type="btn-second"]')[
          i
        ];
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
