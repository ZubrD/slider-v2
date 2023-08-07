import { getCoords } from "../js/scale.js";
import { forTip } from "../js/tipToggler.js";
import { discreteArray } from "../js/mouse.js";

export async function mouseVertDownBtnFirst(event) {
  let elem = event.target;
  let config = elem.parentNode.parentNode.parentNode.querySelector(
    "[data-type='config']"
  );
  let runner_number = Number(config.dataset.runners);
  if (runner_number === 1) {
    /* если один бегун */
    const data = await mouseVertDownBtnFirstSingle(event);
    return data
  } else if (runner_number === 2) {
    /* первый бегун (левый) если бегунов два */
    const data = await mouseVertDownBtnFirstDouble(event);
    return data
  }
}
export function mouseVertDownBtnSecond(event) {
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
    let shiftY1 = event.pageY - btn1Coords.top;
    let shiftY2 = event.pageY - btn2Coords.top;
    document.onmousemove = function (event) {
      let top2 = event.pageY - shiftY2 - slerCoords.top;
      let down2 = sler.offsetHeight;

      if (top2 < 0) top2 = 0;

      if (top2 > down2) top2 = down2;
      btn2.style.marginTop = top2 + "px";
      shiftY1 = event.pageY - btn1Coords.top;
      let top1 = event.pageY - shiftY1 - slerCoords.top;
      let down1 = sler.offsetHeight;

      if (top1 < 0) top1 = 0;

      if (top1 > down1) top1 = down1;
      let discretArr = discreteArray(intervalNumber, down2);
      let range = discretArr[1] - discretArr[0];
      let integ = Math.floor(top2);
      if (discreteStatus === "yes") {
        discretArr.forEach((num) => {
          if (integ >= num - range / 2 && integ < num + range / 2) {
            if (num < top1) {
              interval.style.height = top1 - num + "px";
              interval.style.marginTop = num + "px";
            }

            if (num >= top1) {
              interval.style.height = num - top1 + "px";
              interval.style.marginTop = top1 + "px";
            }
            btn2.style.marginTop = num + "px";
            let coords = sler.offsetHeight - num;
            config.dataset.btn2_coord = String(coords);
            /* Передача значения в конфиг */
            config.dataset.btn2_tip = String(forTip(elem, coords));
            /* Значение над бегуном */
            btn2.dataset.tip = config.dataset.btn2_tip;
          }
        });
      } else if (discreteStatus === "no") {
        if (top1 > top2) {
          interval.style.height = top1 - top2 + "px";
          interval.style.marginTop = top2 + "px";
        }

        if (top1 <= top2) {
          interval.style.height = top2 - top1 + "px";
          interval.style.marginTop = top1 + "px";
        }
        let coords = sler.offsetHeight - top2;
        config.dataset.btn2_coord = String(coords);
        /* Передача значения в конфиг */
        config.dataset.btn2_tip = String(forTip(elem, coords));
        /* Значение над бегуном */
        btn2.dataset.tip = config.dataset.btn2_tip;
      }
    };
    document.onmouseup = function () {
        resolve({
            runner: "btn2_tip",
            valueRunner: config.dataset.btn2_tip,
            coord: "btn2_coord",
            valueCoord: config.dataset.btn2_coord,
          });
      document.onmousemove = document.onmouseup = null;
    };
  });
}

function mouseVertDownBtnFirstSingle(event) {
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
    let discreteStatus = config.dataset.discrete;
    /* Для дискретного перемещения */
    let intervalNumber = Number(config.dataset.scale_length) - 1;
    let slerCoords = getCoords(sler);
    let btn1Coords = getCoords(btn1);
    /* Если не учитывать, то будет при первом перемещении бегунка скачок на эту величину */
    /* Это смещение клика от левого края бегунка, изменяется от 0 до ширины бегунка */
    let shiftY1 = event.pageY - btn1Coords.top;
    document.onmousemove = function (event) {
      let top1 = event.pageY - shiftY1 - slerCoords.top;
      let down1 = sler.offsetHeight;
      if (discreteStatus === "yes") {
        if (top1 < 0) top1 = 0;

        if (top1 > down1) top1 = down1;
        let discretArr = discreteArray(intervalNumber, down1);
        let range = discretArr[1] - discretArr[0];
        let integ = Math.floor(top1);
        discretArr.forEach((num) => {
          if (integ < num + range / 2 && integ > num - range / 2) {
            btn1.style.marginTop = num + "px";
            interval.style.marginTop = num + "px";
            interval.style.height = sler.offsetHeight - num + "px";
            /* Инвертирование значения */
            let coords = sler.offsetHeight - num;
            config.dataset.btn1_coord = String(coords);
            /* Передача значения в конфиг */
            config.dataset.btn1_tip = String(forTip(elem, coords));
            /* Значение над бегуном */
            btn1.dataset.tip = config.dataset.btn1_tip;
          }
        });
      } else if (discreteStatus === "no") {
        if (top1 < 0) top1 = 0;

        if (top1 > down1) top1 = down1;
        btn1.style.marginTop = top1 + "px";
        interval.style.marginTop = top1 + "px";
        interval.style.height = sler.offsetHeight - top1 + "px";
        /* Инвертирование значения */
        let coords = sler.offsetHeight - top1;
        config.dataset.btn1_coord = String(coords);
        /* Передача значения в конфиг */
        config.dataset.btn1_tip = String(forTip(elem, coords));
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
          });
      document.onmousemove = document.onmouseup = null;
    };
  });
}
function mouseVertDownBtnFirstDouble(event) {
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
    let intervalNumber =
      Number(config.dataset.scale_length) - 1; /* Для дискретного перемещения */
    let slerCoords = getCoords(sler);
    let btn1Coords = getCoords(btn1);
    let btn2Coords = getCoords(btn2);
    /* Если не учитывать, то будет при первом перемещении бегунка скачок на эту величину */
    /* Это смещение клика от левого края бегунка, изменяется от 0 до ширины бегунка */
    let shiftY1 = event.pageY - btn1Coords.top;
    let shiftY2 = event.pageY - btn2Coords.top;
    document.onmousemove = function (event) {
      let top1 = event.pageY - shiftY1 - slerCoords.top;
      let down1 = sler.offsetHeight;
      shiftY2 = event.pageY - btn2Coords.top;
      let top2 = event.pageY - shiftY2 - slerCoords.top;
      let down2 = sler.offsetHeight;

      if (top1 < 0) top1 = 0;

      if (top1 > down1) top1 = down1;
      let discretArr = discreteArray(intervalNumber, down1);
      let range = discretArr[1] - discretArr[0];
      let integ = Math.floor(top1);
      if (discreteStatus === "yes") {
        let counter = 0;
        discretArr.forEach((num) => {
          if (integ < num + range / 2 && integ > num - range / 2) {
            if (num > top2) {
              interval.style.height = num - top2 + "px";
              interval.style.marginTop = top2 + "px";
            }

            if (num <= top2) {
              interval.style.height = top2 - num + "px";
              interval.style.marginTop = num + "px";
            }
            btn1.style.marginTop = num + "px";
            let coords = sler.offsetHeight - num;
            config.dataset.btn1_coord = String(coords);
            /* Передача значения в конфиг */
            config.dataset.btn1_tip = String(forTip(elem, coords));
            /* Значение над бегуном */
            btn1.dataset.tip = config.dataset.btn1_tip;
          }
          counter += 1;
        });
      } else if (discreteStatus === "no") {
        btn1.style.marginTop = top1 + "px";
        shiftY2 = event.pageY - btn2Coords.top;
        let top2 = event.pageY - shiftY2 - slerCoords.top;
        let down2 = sler.offsetHeight;

        if (top2 < 0) top2 = 0;

        if (top2 > down2) top2 = down2;

        if (top1 > top2) {
          interval.style.height = top1 - top2 + "px";
          interval.style.marginTop = top2 + "px";
        }

        if (top1 <= top2) {
          interval.style.height = top2 - top1 + "px";
          interval.style.marginTop = top1 + "px";
        }
        let coords = sler.offsetHeight - top1;
        config.dataset.btn1_coord = String(coords);
        /* Передача значения в конфиг */
        config.dataset.btn1_tip = String(forTip(elem, coords));
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
          });
      document.onmousemove = document.onmouseup = null;
    };
  });
}
