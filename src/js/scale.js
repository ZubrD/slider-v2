import { Scale } from "../components/scale/Scale.js";
import { Division } from "../components/division/Division.js";
import { DivisionSpan } from "../components/divisionSpan/DivisionSpan.js";
import { ScaleSpan } from "../components/scaleSpan/ScaleSpan.js";

/* Получение координат элементов слайдера */
export function getCoords(elem) {
  let coords = elem.getBoundingClientRect();
  return {
    top: coords.top,
    left: coords.left,
  };
}
/* Массив значений для шкалы по умолчанию */
export function makeScale(min, max, step) {
  let stepArr = [];
  let dividersArr = [];
  /* Массив размера шага */
  let iterationArr = [];
  /* Член массива размеров шага */
  let iter = 0;
  let maximus = 0;
  let iteration = 0;
  let item = 0;
  if (step > 0) {
    let range = max - min;
    /* Получаю массив делителей без остатка */
    for (let i = 2; i < range / 2 + 1; i++) {
      if (range % i) {
      } else {
        dividersArr.push(i);
      }
    }
    if (dividersArr.length > 0) {
      /* Определяю наибольшее количество интервалов меньше 10 */
      for (let el of dividersArr) {
        if (el < 10) {
          maximus = el;
          iter = range / maximus;
          /* Массив размеров шага шкалы */
          iterationArr.push(iter);
        } else {
          /* Не применил forEach из-за break */
          break;
        }
      }
    } else {
      stepArr = [min, max];
      return [stepArr, iteration, iterationArr];
    }
    /* Иначе iteration = Infinity */
    if (maximus === 0) {
      stepArr = [min, max];
      return [stepArr, iteration, iterationArr];
    }
    iteration = range / maximus;
    /* Переопределение - этот участок кода применяется при изменении размера шага через панель */
    if (step > 1) {
      iteration = step;
      maximus = range / iteration;
    }
    item = min;
    stepArr.push(min);
    /* Массив значений шкалы */
    for (let i = 0; i < maximus; i++) {
      item = item + iteration;
      stepArr.push(item);
    }
  } else {
    stepArr = [min, max];
  }
  return [stepArr, iteration, iterationArr];
}
export function reScale(scaleArr, currentInst) {
  let parents = document.querySelectorAll(".zdslider");
  parents.forEach((parent) => {
    let config = parent.parentNode.querySelector("[data-type='config']");
    if (Number(config.dataset.inst) == currentInst) {
      let currentRanger = parent.querySelector("[data-type='ranger']");
      let currentScale = parent.querySelector("[data-type='scale']");
      let currentDivision = parent.querySelector("[data-type='scale-division']");
      let orientation = config.dataset.orientation;
      currentScale.remove();
      currentDivision.remove();
      /* Для дискретного перемещения */
      config.dataset.scale_length = String(scaleArr.length);
      let division = new Division(orientation);
      division.appendTo(parent);
      scaleArr.forEach((el) => {
        let span = new DivisionSpan(orientation);
        span.appendTo(division);
      });
      let scale = new Scale(orientation);
      scale.appendTo(parent);
      scaleArr.forEach((el) => {
        let span = new ScaleSpan(orientation);
        span.appendTo(scale);
        span.inner_HTML(el);
      });
    }
  });
}
/* Изменение инпута переключения шага  */
export function modifyScaleInput(parent, iteration, iterationsArr) {
  let confInputStep = parent.querySelector("[data-type='zdslider-panel__step']");
  confInputStep.setAttribute("data-steps", String(iterationsArr));
  confInputStep.setAttribute("data-iteration", String(iteration));
  confInputStep.setAttribute("data-current", String(iteration));
  if (iterationsArr.length !== 0) {
    confInputStep.disabled = false;
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
}
