import { SliderComponent } from "../../core/SliderComponent";

export class Panel extends SliderComponent {
    constructor() {
        super()
        this.$el = document.createElement('div');
        this.$el.classList.add('zdslider-panel');
        this.$el.setAttribute('data-type', 'zdslider-panel')
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
        this.$tipCheckbox.setAttribute('data-type', 'tip');
        this.$tipCheckbox.setAttribute('type', 'checkbox');
        this.$tipCheckbox.setAttribute('data-tip', 'tip');
        this.$orientCheckbox = document.createElement('input');
        this.$orientCheckbox.classList.add('zdslider-panel__check-orient');
        this.$orientCheckbox.setAttribute('type', 'checkbox');
        this.$orientCheckbox.setAttribute('data-orient', 'orient');
        this.$minNumber = document.createElement('input');
        this.$minNumber.classList.add('zdslider-panel__min');
        this.$minNumber.setAttribute('type', 'number');
        this.$minNumber.setAttribute('data-type', 'zdslider-panel__min');
        this.$maxNumber = document.createElement('input');
        this.$maxNumber.classList.add('zdslider-panel__max');
        this.$maxNumber.setAttribute('type', 'number');
        this.$maxNumber.setAttribute('data-type', 'zdslider-panel__max');
        this.$stepNumber = document.createElement('input');
        this.$stepNumber.classList.add('zdslider-panel__step');
        this.$stepNumber.setAttribute('type', 'number');
        this.$stepNumber.setAttribute('data-type', 'zdslider-panel__step');
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
        this.$el.appendChild(this.$runCheckbox);
        this.$el.appendChild(this.$runLabel);
        this.$el.appendChild(document.createElement('br'));
        this.$el.appendChild(this.$discreteCheckbox);
        this.$el.appendChild(this.$discreteLabel);
        this.$el.appendChild(document.createElement('br'));
        this.$el.appendChild(this.$tipCheckbox);
        this.$el.appendChild(this.$tipLabel);
        this.$el.appendChild(document.createElement('br'));
        this.$el.appendChild(this.$orientCheckbox);
        this.$el.appendChild(this.$orientLabel);
        this.$el.appendChild(document.createElement('br'));
        this.$el.appendChild(this.$minNumber);
        this.$el.appendChild(this.$minLable);
        this.$el.appendChild(document.createElement('br'));
        this.$el.appendChild(this.$maxNumber);
        this.$el.appendChild(this.$maxLabel);
        this.$el.appendChild(document.createElement('br'));
        this.$el.appendChild(this.$stepNumber);
        this.$el.appendChild(this.$stepLabel);
        this.$el.appendChild(document.createElement('br'));
        this.#setup()
    }
    #setup() {
        this.clickHandler = this.clickHandler.bind( this )        /* Только для местных функций */
        this.$el.addEventListener( 'click', this.clickHandler )
    }
    clickHandler(event) {
        let elem = event.target;
        let { run } = elem.dataset;
    }
}