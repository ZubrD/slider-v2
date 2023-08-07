import { async } from "regenerator-runtime";
import { getCoords } from "../js/scale.js";
import { forTip } from "../js/tipToggler.js";
export async function mouseDownBtnFirst(event) {
  let elem = event.target;
  let config = elem.parentNode.parentNode.parentNode.querySelector(
    "[data-type='config']"
  );
  let runnerNumber = Number(config.dataset.runners);
  if (runnerNumber === 1) {
    /* если один бегун */
    const data = await mouseDownBtnFirstSingle(event);
    return data
  } else if (runnerNumber === 2) {
    /* первый бегун (левый) если бегунов два */
    const data = await mouseDownBtnFirstDouble(event);
    return data;
  }
}
export function mouseDownBtnSecond(event) {
  return new Promise((resolve) => {
    /* Для надписи над бегуном */
    let elem = event.target;
    let config = elem.parentNode.parentNode.parentNode.querySelector(
      "[data-type='config']"
    );
    let slerNumber = Number(config.dataset.inst);
    let sler = document.querySelectorAll("[data-type='ranger']")[
      slerNumber - 1
    ];
    let interval = sler.querySelector("[data-type='interval']");
    let btn1 = sler.querySelector('[data-type="btn-first"]');
    let btn2 = sler.querySelector('[data-type="btn-second"]');
    let discreteStatus = config.dataset.discrete;
    /* Для дискретного перемещения */
    let interval_number = Number(config.dataset.scale_length) - 1;
    let slerCoords = getCoords(sler);
    let btn1Coords = getCoords(btn1);
    let btn2Coords = getCoords(btn2);
    let shiftX1 = event.pageX - btn1Coords.left;
    let shiftX2 = event.pageX - btn2Coords.left;
    document.onmousemove = function (event) {
      let left2 = event.pageX - shiftX2 - slerCoords.left;
      let right2 = sler.offsetWidth - btn2.offsetWidth;

      if (left2 < 0) left2 = 0;

      if (left2 > right2) left2 = right2;
      btn2.style.marginLeft = left2 + "px";
      config.dataset.btn2_coord = String(left2);
      /* Дублирую, чтобы бегуны не выпадали за пределы слайдера при изменении ширины окна */
      config.dataset.btn2_init_pos = String(left2);
      shiftX1 = event.pageX - btn1Coords.left;
      let left1 = event.pageX - shiftX1 - slerCoords.left;
      let right1 = sler.offsetWidth - btn1.offsetWidth;

      if (left1 < 0) left1 = 0;

      if (left1 > right1) left1 = right1;
      let discretArr = discreteArray(interval_number, right1);
      let range = discretArr[1] - discretArr[0];
      let integ = Math.floor(left2);
      if (discreteStatus === "yes") {
        discretArr.forEach((num) => {
          if (integ >= num - range / 2 && integ < num + range / 2) {
            if (num < left1) {
              interval.style.width = left1 - num + "px";
              interval.style.marginLeft = num + "px";
            }

            if (num >= left1) {
              interval.style.width = num - left1 + "px";
              interval.style.marginLeft = left1 + "px";
            }
            btn2.style.marginLeft = num + "px";
            config.dataset.btn2_coord = String(num);
            config.dataset.btn2_init_pos = String(num);
            /* Передача значения в конфиг */
            config.dataset.btn2_tip = forTip(elem, num);
            /* Значение над бегуном */
            btn2.dataset.tip = config.dataset.btn2_tip;
          }
        });
      } else if (discreteStatus === "no") {
        /* Передача значения в конфиг */
        config.dataset.btn2_tip = forTip(elem, left2);
        /* Значение над бегуном */
        btn2.dataset.tip = config.dataset.btn2_tip;

        if (left1 > left2) {
          interval.style.width = left1 - left2 + "px";
          interval.style.marginLeft = left2 + "px";
        } else {
          interval.style.width = left2 - left1 + "px";
          interval.style.marginLeft = left1 + "px";
        }
      }
    };
    document.onmouseup = function () {
      resolve({
        runner: "btn2_tip",
        valueRunner: config.dataset.btn2_tip,
        coord: "btn2_coord",
        valueCoord: config.dataset.btn2_coord,
        initPos: "btn2_init_pos",
        valueInitPos: config.dataset.btn2_init_pos,
      });
      document.onmousemove = document.onmouseup = null;
    };
  });
}
export function mouseDownBtnFirstSingle(event) {
  return new Promise((resolve) => {
    const elem = event.target;
    const config = elem.parentNode.parentNode.parentNode.querySelector(
      "[data-type='config']"
    );
    const slerNumber = Number(config.dataset.inst);
    const sler = document.querySelectorAll("[data-type='ranger']")[
      slerNumber - 1
    ];
    const interval = sler.querySelector("[data-type='interval']");
    const btn1 = sler.querySelector('[data-type="btn-first"]');
    const discreteStatus = config.dataset.discrete;
    /* Для дискретного перемещения */
    const intervalNumber = Number(config.dataset.scale_length) - 1;
    const slerCoords = getCoords(sler);
    const btn1Coords = getCoords(btn1);
    /* Если не учитывать, то будет при первом перемещении бегунка скачок на эту величину */
    /* Это смещение клика от левого края бегунка, изменяется от 0 до ширины бегунка */
    let shiftX1 = event.pageX - btn1Coords.left;
    document.onmousemove = function (event) {
      let left1 = event.pageX - shiftX1 - slerCoords.left;
      let right1 = sler.offsetWidth - btn1.offsetWidth;
      if (discreteStatus === "yes") {
        if (left1 < 0) left1 = 0;

        if (left1 > right1) left1 = right1;
        let discretArr = discreteArray(intervalNumber, right1);
        let range = discretArr[1] - discretArr[0];
        let integ = Math.floor(left1);
        discretArr.forEach((num) => {
          if (integ < num + range / 2 && integ > num - range / 2) {
            btn1.style.marginLeft = num + "px";
            interval.style.width = num + "px";
            config.dataset.btn1_coord = String(num);
            /* Дублирую, чтобы бегуны не выпадали за пределы слайдера при изменении ширины окна */
            config.dataset.btn1_init_pos = String(num);
            /* Передача значения в конфиг */
            config.dataset.btn1_tip = forTip(elem, num);
            /* Значение над бегуном */
            btn1.dataset.tip = config.dataset.btn1_tip;
          }
        });
      } else if (discreteStatus === "no") {
        if (left1 < 0) left1 = 0;

        if (left1 > right1) left1 = right1;
        btn1.style.marginLeft = left1 + "px";
        interval.style.width = left1 + "px";
        config.dataset.btn1_coord = String(left1);
        config.dataset.btn1_init_pos = String(left1);
        /* Передача значения в конфиг */
        config.dataset.btn1_tip = forTip(elem, left1);
        /* Значение над бегуном */
        btn1.dataset.tip = config.dataset.btn1_tip;
      }
    };
    document.onmouseup = function () {
      resolve({
        runner: "btn1_tip",
        valueRunner: config.dataset.btn1_tip,
        coord: "btn1_coord",
        valueCoord: config.dataset.btn1_coord,
        initPos: "btn1_init_pos",
        valueInitPos: config.dataset.btn1_init_pos,
      });
      document.onmousemove = document.onmouseup = null;
    };
  });
}
export function mouseDownBtnFirstDouble(event) {
  return new Promise((resolve) => {
    let elem = event.target;
    let config = elem.parentNode.parentNode.parentNode.querySelector(
      "[data-type='config']"
    );
    let slerNumber = Number(config.dataset.inst);
    let sler = document.querySelectorAll("[data-type='ranger']")[
      slerNumber - 1
    ];
    let interval = sler.querySelector("[data-type='interval']");
    let btn1 = sler.querySelector('[data-type="btn-first"]');
    let btn2 = sler.querySelector('[data-type="btn-second"]');
    let discreteStatus = config.dataset.discrete;
    /* Для дискретного перемещения */
    let intervalNumber = Number(config.dataset.scale_length) - 1;
    let slerCoords = getCoords(sler);
    let btn1Coords = getCoords(btn1);
    let btn2Coords = getCoords(btn2);
    /* Если не учитывать, то будет при первом перемещении бегунка скачок на эту величину */
    /* Это смещение клика от левого края бегунка, изменяется от 0 до ширины бегунка */
    let shiftX1 = event.pageX - btn1Coords.left;
    let shiftX2 = event.pageX - btn2Coords.left;
    document.onmousemove = function (event) {
      let left1 = event.pageX - shiftX1 - slerCoords.left;
      let right1 = sler.offsetWidth - btn1.offsetWidth;
      shiftX2 = event.pageX - btn2Coords.left;
      let left2 = event.pageX - shiftX2 - slerCoords.left;
      let right2 = sler.offsetWidth;

      if (left1 < 0) left1 = 0;

      if (left1 > right1) left1 = right1;
      let discretArr = discreteArray(intervalNumber, right1);
      let range = discretArr[1] - discretArr[0];
      let integ = Math.floor(left1);
      if (discreteStatus === "yes") {
        /* Счётчик для перехода по массиву подписей */
        let counter = 0;
        discretArr.forEach((num) => {
          if (integ < num + range / 2 && integ > num - range / 2) {
            if (num > left2) {
              interval.style.width = num - left2 + "px";
              interval.style.marginLeft = left2 + "px";
            }

            if (num <= left2) {
              interval.style.width = left2 - num + "px";
              interval.style.marginLeft = num + "px";
            }
            btn1.style.marginLeft = num + "px";
            config.dataset.btn1_coord = String(num);
            config.dataset.btn1_init_pos = String(num);
            /* Передача значения в конфиг */
            config.dataset.btn1_tip = forTip(elem, num);
            /* Извлечение из конфига значения над бегуном */
            btn1.dataset.tip = config.dataset.btn1_tip;
          }
          counter += 1;
        });
      } else if (discreteStatus === "no") {
        btn1.style.marginLeft = left1 + "px";
        config.dataset.btn1_coord = String(left1);
        config.dataset.btn1_init_pos = String(left1);
        /* Передача значения в конфиг */
        config.dataset.btn1_tip = forTip(elem, left1);
        /* Значение над бегуном */
        btn1.dataset.tip = config.dataset.btn1_tip;
        shiftX2 = event.pageX - btn2Coords.left;
        let left2 = event.pageX - shiftX2 - slerCoords.left;
        let right2 = sler.offsetWidth;

        if (left2 < 0) left2 = 0;

        if (left2 > right2) left2 = right2;

        if (left1 > left2) {
          interval.style.width = left1 - left2 + "px";
          interval.style.marginLeft = left2 + "px";
        } else {
          interval.style.width = left2 - left1 + "px";
          interval.style.marginLeft = left1 + "px";
        }
      }
    };
    document.onmouseup = function () {
      resolve({
        runner: "btn1_tip",
        valueRunner: config.dataset.btn1_tip,
        coord: "btn1_coord",
        valueCoord: config.dataset.btn1_coord,
        initPos: "btn1_init_pos",
        valueInitPos: config.dataset.btn1_init_pos,
      });
      document.onmousemove = document.onmouseup = null;
    };
  });
}
export function discreteArray(intervalNumber, length) {
  /* FIXME Если не указать абсолютное значение, бегун будет колебаться??? */
  let interv = length / intervalNumber;
  let discretArr = [];
  let arrCount = 0;
  discretArr.push(0);
  /* Это не итератор, поэтому не меняю на forEach */
  for (let i = 0; i < intervalNumber; i++) {
    arrCount = arrCount + interv;
    discretArr.push(arrCount);
  }
  return discretArr;
}
export function resetBtnCoord(event) {
  let elem = event.target;
  const config = elem.parentNode.parentNode.querySelector(
    "[data-type='config']"
  );
  const ranger = elem.parentNode.parentNode.querySelector(
    "[data-type='ranger']"
  );
  const orientation = config.dataset.orientation;
  config.dataset.btn1_coord = String(0);
  if (orientation === "horizontal") {
    config.dataset.btn2_coord = String(ranger.offsetWidth);
    config.dataset.btn2_init_pos = String(ranger.offsetWidth);
  } else if (orientation === "vertical") {
    config.dataset.btn2_coord = String(ranger.offsetHeight);
  }
}
