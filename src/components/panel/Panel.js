import { SliderComponent } from "../../core/SliderComponent";

export class Panel extends SliderComponent {
    constructor() {
        super()
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
        this.#setup()
    }
    #setup() {
        this.clickHandler = this.clickHandler.bind( this )        /* Только для местных функций */
        this.$panel.addEventListener( 'click', this.clickHandler )
    }
    clickHandler(event) {
        let elem = event.target;
        let { run } = elem.dataset;
    }
    appendTo(parent) {
        parent.appendChild(this.$panel);
    }
    toHTML() {
        return `<h1>Panel</h1>`
    }
}