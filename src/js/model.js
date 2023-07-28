var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Button_instances, _Button_setup, _Division_instances, _Division_setup, _Panel_instances, _Panel_setup;
import { mouseDownBtnFirst, mouseDownBtnSecond, } from '../js/mouse.js';
import { mouseVertDownBtnFirst, mouseVertDownBtnSecond, } from '../js/mouseVert.js';
import { clickMouse } from '../js/mouseClick.js';
export class Ranger {
    constructor(orientation) {
        this.$el = document.createElement('div');
        this.$el.classList.add('ranger');
        this.$el.setAttribute('data-type', 'ranger');
        if (orientation === 'horizontal') {
        }
        else if (orientation === 'vertical') {
            this.$el.classList.add('ranger-vert');
        }
    }
    appendTo(parent) {
        parent.appendChild(this.$el);
    }
}
export class Interval {
    constructor(orientation) {
        this.$el = document.createElement('div');
        this.$el.classList.add('ranger__interval');
        this.$el.setAttribute('data-type', 'interval');
        if (orientation === 'horizontal') {
        }
        else if (orientation === 'vertical') {
            this.$el.classList.add('ranger-vert__interval');
        }
    }
    appendTo(parent) {
        parent.appendChild(this.$el);
    }
}
export class Button {
    constructor(orientation) {
        _Button_instances.add(this);
        this.$el = document.createElement('button');
        this.$el.classList.add('ranger__button');
        if (orientation === 'horizontal') {
        }
        else if (orientation === 'vertical') {
            this.$el.classList.add('ranger-vert__button');
        }
        __classPrivateFieldGet(this, _Button_instances, "m", _Button_setup).call(this);
    }
    appendTo(parent) {
        parent.appendChild(this.$el);
    }
    setAttribute(attr, number) {
        this.$el.setAttribute(attr, number);
    }
    clickHandler(event) {
        let elem = event.target;
        const { type } = elem.dataset;
        let config_dataset = elem.parentNode.parentNode.parentNode.querySelector('.zdslider-config');
        const { orientation } = config_dataset.dataset;
        if (orientation === 'horizontal') {
            if (type === 'btn-first') {
                mouseDownBtnFirst(event);
            }
            if (type === 'btn-second') {
                mouseDownBtnSecond(event);
            }
        }
        if (orientation === 'vertical') {
            if (type === 'btn-first') {
                mouseVertDownBtnFirst(event);
            }
            if (type === 'btn-second') {
                mouseVertDownBtnSecond(event);
            }
        }
    }
}
_Button_instances = new WeakSet(), _Button_setup = function _Button_setup() {
    /* Только для местных функций */
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('mousedown', this.clickHandler);
};
export class Scale {
    constructor(orientation) {
        this.$el = document.createElement('div');
        this.$el.classList.add('ranger__scale');
        if (orientation === 'horizontal') {
        }
        else if (orientation === 'vertical') {
            this.$el.classList.add('ranger-vert__scale');
        }
    }
    appendTo(parent) {
        parent.appendChild(this.$el);
    }
    appendChild(child) {
        this.$el.appendChild(child);
    }
}
export class ScaleSpan {
    constructor(orientation) {
        this.$el = document.createElement('span');
        this.$el.classList.add('ranger__scale-span');
        if (orientation === 'horizontal') {
        }
        else if (orientation === 'vertical') {
            this.$el.classList.add('ranger-vert__scale-span');
        }
    }
    appendTo(parent) {
        parent.appendChild(this.$el);
    }
    inner_HTML(child) {
        this.$el.innerHTML = child;
    }
}
export class Division {
    constructor(orientation) {
        _Division_instances.add(this);
        this.$el = document.createElement('div');
        this.$el.classList.add('ranger__scale-division');
        if (orientation === 'horizontal') {
        }
        else if (orientation === 'vertical') {
            this.$el.classList.add('ranger-vert__scale-division');
        }
        __classPrivateFieldGet(this, _Division_instances, "m", _Division_setup).call(this);
    }
    appendTo(parent) {
        parent.appendChild(this.$el);
    }
    appendChild(child) {
        this.$el.appendChild(child);
    }
    clickHandler(event) {
        clickMouse(event);
    }
}
_Division_instances = new WeakSet(), _Division_setup = function _Division_setup() {
    /* Только для местных функций */
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
};
export class DivisionSpan {
    constructor(orientation) {
        this.$el = document.createElement('span');
        this.$el.classList.add('ranger__scale-division-span');
        if (orientation === 'horizontal') {
        }
        else if (orientation === 'vertical') {
            this.$el.classList.add('ranger-vert__scale-division-span');
        }
    }
    appendTo(parent) {
        parent.appendChild(this.$el);
    }
}
export class Panel {
    constructor() {
        _Panel_instances.add(this);
        this.$panel = document.createElement('div');
        this.$panel.classList.add('zdslider-panel');
        this.$runCheckbox = document.createElement('input');
        this.$runCheckbox.classList.add('zdslider-panel__check-runners');
        this.$runCheckbox.setAttribute('type', 'checkbox');
        this.$runCheckbox.setAttribute('data-run', 'run');
        this.$discreteCheckbox = document.createElement('input');
        this.$discreteCheckbox.classList.add('zdslider-panel__check-discrete');
        this.$discreteCheckbox.setAttribute('type', 'checkbox');
        this.$discreteCheckbox.setAttribute('data-discrete', 'discrete');
        this.$tipCheckbox = document.createElement('input');
        this.$tipCheckbox.classList.add('zdslider-panel__check-tip');
        this.$tipCheckbox.setAttribute('type', 'checkbox');
        this.$tipCheckbox.setAttribute('data-tip', 'tip');
        this.$orientCheckbox = document.createElement('input');
        this.$orientCheckbox.classList.add('zdslider-panel__check-orient');
        this.$orientCheckbox.setAttribute('type', 'checkbox');
        this.$orientCheckbox.setAttribute('data-orient', 'orient');
        this.$minNumber = document.createElement('input');
        this.$minNumber.classList.add('zdslider-panel__min');
        this.$minNumber.setAttribute('type', 'number');
        this.$maxNumber = document.createElement('input');
        this.$maxNumber.classList.add('zdslider-panel__max');
        this.$maxNumber.setAttribute('type', 'number');
        this.$stepNumber = document.createElement('input');
        this.$stepNumber.classList.add('zdslider-panel__step');
        this.$stepNumber.setAttribute('type', 'number');
        this.$stepNumber.setAttribute('onkeydown', 'return false');
        this.$runLabel = document.createElement('label');
        this.$runLabel.innerHTML = '1 Бегун';
        this.$discreteLabel = document.createElement('label');
        this.$discreteLabel.innerHTML = 'Дискретный';
        this.$tipLabel = document.createElement('label');
        this.$tipLabel.innerHTML = 'Ярлык';
        this.$orientLabel = document.createElement('label');
        this.$orientLabel.innerHTML = 'Вертикальный';
        this.$minLable = document.createElement('label');
        this.$minLable.innerHTML = 'Минимум';
        this.$maxLabel = document.createElement('label');
        this.$maxLabel.innerHTML = 'Максимум';
        this.$stepLabel = document.createElement('label');
        this.$stepLabel.innerHTML = 'Шаг';
        this.$panel.appendChild(this.$runCheckbox);
        this.$panel.appendChild(this.$runLabel);
        this.$panel.appendChild(document.createElement('br'));
        this.$panel.appendChild(this.$discreteCheckbox);
        this.$panel.appendChild(this.$discreteLabel);
        this.$panel.appendChild(document.createElement('br'));
        this.$panel.appendChild(this.$tipCheckbox);
        this.$panel.appendChild(this.$tipLabel);
        this.$panel.appendChild(document.createElement('br'));
        this.$panel.appendChild(this.$orientCheckbox);
        this.$panel.appendChild(this.$orientLabel);
        this.$panel.appendChild(document.createElement('br'));
        this.$panel.appendChild(this.$minNumber);
        this.$panel.appendChild(this.$minLable);
        this.$panel.appendChild(document.createElement('br'));
        this.$panel.appendChild(this.$maxNumber);
        this.$panel.appendChild(this.$maxLabel);
        this.$panel.appendChild(document.createElement('br'));
        this.$panel.appendChild(this.$stepNumber);
        this.$panel.appendChild(this.$stepLabel);
        this.$panel.appendChild(document.createElement('br'));
        __classPrivateFieldGet(this, _Panel_instances, "m", _Panel_setup).call(this);
    }
    clickHandler(event) {
        let elem = event.target;
        let { run } = elem.dataset;
    }
    appendTo(parent) {
        parent.appendChild(this.$panel);
    }
}
_Panel_instances = new WeakSet(), _Panel_setup = function _Panel_setup() {
    /* Только для местных функций */
    this.clickHandler = this.clickHandler.bind(this);
    this.$panel.addEventListener('click', this.clickHandler);
};
export class Settings {
    constructor() {
        this.$el = document.createElement('div');
        this.$el.classList.add('zdslider-config');
    }
    appendTo(parent) {
        parent.appendChild(this.$el);
    }
    setAttribute(attr, number) {
        this.$el.setAttribute(attr, number);
    }
}
