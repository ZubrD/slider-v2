import { getCoords } from "./scale.js";
import { forTip } from "./tipToggler.js";
export function clickMouse(event) {
  return new Promise((resolve) => {
    let elem = event.target;
    let division = elem.parentNode.parentNode.querySelector(
      "[data-type='scale-division']"
    );
    /* FIXIT Если клик на риску то ничего не произойдёт */
    /* Этот блок только если клик был на .ranger__scale-division */
    if (event.target === division) {
      const config = elem.parentNode.parentNode.querySelector(
        "[data-type='config']"
      );
      const buttonsNumber = Number(config.dataset.runners);
      const orientation = config.dataset.orientation;
      const buttonFirst = elem.parentNode.querySelector('[data-type="btn-first"]');
      const buttonSecond = elem.parentNode.querySelector('[data-type="btn-second"]');
      const interval = elem.parentNode.querySelector("[data-type='interval']");
      const target = elem.parentNode.querySelector("[data-button='button']");
      let divisionLeft, divisionTop, numberForTip;
      if (orientation === "horizontal") {
        let divisionCoord = getCoords(division);
        /* Половина ширины бегуна, чтобы выставить его по центру клика */
        let halfWidth = buttonFirst.offsetWidth / 2;
        let clientX = event.clientX;
        let pageX = event.pageX;

        /* Если левый край слайдера выходит за пределы страницы при увеличении масштаба */
        if (clientX < pageX) {
          divisionLeft = event.pageX - event.clientX + divisionCoord.left;
        }

        if (clientX >= pageX) {
          divisionLeft = divisionCoord.left;
        }
        let left = event.pageX - divisionLeft - halfWidth;
        let right = division.offsetWidth - buttonFirst.offsetWidth;

        /* Чтобы бегун не выходил за границу слева */
        if (left < 0) left = 0;

        /* Чтобы бегун не выходил за границу справа */
        if (left > right) left = right;
        if (buttonsNumber === 1) {
          buttonFirst.style.marginLeft = left + "px";
          interval.style.width = left + "px";
          /* Передача значения в конфиг */
          config.dataset.btn1_tip = forTip(target, left);
          console.log('Here')
          resolve({
            checkItem1: "btn1_tip",
            valueCheckItem1: config.dataset.btn1_tip,
            checkItem2: "buttonFirstTip",
            valueCheckItem2: config.dataset.btn1_tip,
          });
          /* Значение над бегуном */
          buttonFirst.dataset.tip = config.dataset.btn1_tip;
        } else if (buttonsNumber === 2) {
          let left1 = Number(config.dataset.btn1_coord);
          let left2 = Number(config.dataset.btn2_coord);
          let division_offsetWidth = division.offsetWidth;

          if (left < division_offsetWidth / 2) {
            left1 = left;
            /* Передача текущей координаты в конфиг */
            config.dataset.btn1_coord = String(left);

            buttonFirst.style.marginLeft = left1 + "px";
            /* Передача значения в конфиг */
            config.dataset.btn1_tip = forTip(target, left);
            interval.style.width = left2 - left1 + "px"; // Стили интервала дублирую для отправки в state
            interval.style.marginLeft = left1 + "px";
            resolve({
              checkItem1: "btn1_tip",
              valueCheckItem1: config.dataset.btn1_tip,
              checkItem2: "btn1_coord",
              valueCheckItem2: config.dataset.btn1_coord,
            });
            /* Значение над бегуном */
            buttonFirst.dataset.tip = config.dataset.btn1_tip;
          }

          if (left >= division_offsetWidth / 2) {
            left2 = left;
            config.dataset.btn2_coord = String(left);
            buttonSecond.style.marginLeft = left2 + "px";
            /* Передача значения в конфиг */
            config.dataset.btn2_tip = forTip(target, left);
            interval.style.width = left2 - left1 + "px";
            interval.style.marginLeft = left1 + "px";
            resolve({
              checkItem1: "btn2_tip",
              valueCheckItem1: config.dataset.btn2_tip,
              checkItem2: "btn2_coord",
              valueCheckItem2: config.dataset.btn2_coord,
            });
            /* Значение над бегуном */
            buttonSecond.dataset.tip = config.dataset.btn2_tip;
          }
        }
      } else if (orientation === "vertical") {
        let division_coord = getCoords(division);
        let clientY = event.clientY;
        let pageY = event.pageY;

        /* Если верхний край слайдера выходит за пределы страницы при увеличении масштаба */
        if (clientY < pageY) {
          divisionTop = event.pageY - event.clientY + division_coord.top;
        }

        if (clientY >= pageY) {
          divisionTop = division_coord.top;
        }
        let top = event.pageY - divisionTop;
        let bottom = division.offsetHeight;

        /* Чтобы бегун не выходил за границу сверху */
        if (top < 0) top = 0;

        /* Чтобы бегун не выходил за границу снизу */
        if (top > bottom) top = bottom;
        if (buttonsNumber === 1) {
          buttonFirst.style.marginTop = top + "px";
          interval.style.marginTop = top + "px";
          interval.style.height = division.offsetHeight - top + "px";
          numberForTip = division.offsetHeight - top;
          /* Передача значения в конфиг */
          config.dataset.btn1_tip = forTip(target, numberForTip);
          resolve({
            checkItem1: "btn1_tip",
            valueCheckItem1: config.dataset.btn1_tip,
          });
          /* Значение над бегуном */
          buttonFirst.dataset.tip = config.dataset.btn1_tip;
        } else if (buttonsNumber === 2) {
          let top1 = Number(config.dataset.btn1_coord);
          let top2 = Number(config.dataset.btn2_coord);
          let divisionOffsetHeight = division.offsetHeight;
          

          if (top > divisionOffsetHeight / 2) {
            top1 = top;
            /* Передача текущей координаты в конфиг */
            config.dataset.btn1_coord = String(division.offsetHeight - top);
            buttonFirst.style.marginTop = top1 + "px";
            numberForTip = division.offsetHeight - top;
            /* Передача значения в конфиг */
            config.dataset.btn1_tip = forTip(target, numberForTip);
            /* Проще и правильнее взять из модели */
            top1 = Number(config.dataset.btn1_coord);
            top2 = Number(config.dataset.btn2_coord);
            interval.style.height = top2 - top1 + "px";
            interval.style.marginTop = division.offsetHeight - top2 + "px"; 
            resolve({
              checkItem1: "btn1_tip",
              valueCheckItem1: config.dataset.btn1_tip,
              checkItem2: "btn1_coord",
              valueCheckItem2: config.dataset.btn1_coord,
            });
            /* Значение над бегуном */
            buttonFirst.dataset.tip = config.dataset.btn1_tip;
          }

          if (top < divisionOffsetHeight / 2) {
            top2 = top;
            config.dataset.btn2_coord = String(division.offsetHeight - top);
            buttonSecond.style.marginTop = top2 + "px";
            numberForTip = division.offsetHeight - top;
            /* Передача значения в конфиг */
            config.dataset.btn2_tip = forTip(target, numberForTip);
            /* Проще и правильнее взять из модели */
            top1 = Number(config.dataset.btn1_coord);
            top2 = Number(config.dataset.btn2_coord);
            interval.style.height = top2 - top1 + "px";
            interval.style.marginTop = division.offsetHeight - top2 + "px";
            
            resolve({
              checkItem1: "btn2_tip",
              valueCheckItem1: config.dataset.btn2_tip,
              checkItem2: "btn2_coord",
              valueCheckItem2: config.dataset.btn2_coord,
            });
            
            /* Значение над бегуном */
            buttonSecond.dataset.tip = config.dataset.btn2_tip;
          }
        }
      }
    }
  });
}
