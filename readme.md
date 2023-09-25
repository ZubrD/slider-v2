# Zdslider (вариация на тему range slider)


## Приступая к работе

Для того чтобы протестировать работу плагина, в файле index.html следует добавить в раздел ```<body>``` следующую разметку:

```html
<div class="zdslider-wrapper">
    <div class="zdslider"></div>
</div>
```

и

```html
<script type="module" src="/src/js/script.js"></script>

```

В корень проекта надо добавить из этого репозитория папки src, package.json и через терминал установить зависимости

```
npm i
```

## Предварительные условия

Начальная конфигурация слайдера определяется в файле config.js

```
/src/js/config.js
```

```javascript
export let configObj = {
    runner_number: 2,           /* Количество ползунков */
    min: 12,                    /* Минимальное значение */
    max: 150,                   /* Максимальное значение */
    discrete: 'no',             /* Дискретное перемещение ползунков или нет */
    orientation: 'horizontal'   /* Вертикальная или горизонтальная ориентация слайдера */
};
```

## Пример работы слайдера

![Гифка](/src/slider_horizontal_optimized.gif)


## Создано с помощью

Плагин разработан в IDE Visual Studio Code

## Диаграмма классов

![Диаграмма классов](/out/src/uml/classes/сlasses(UML).png)

## Диаграмма вариантов использования

![Диаграмма ариантов использования](/out/src/uml/usecase/UseCaseDiagram.png)

## Диаграммы последовательности

### Диаграмма плавного (дискретного) перемещения бегунка

![Плавное(дискретное)](/out/src/uml/sequence_smooth/sequence_smooth.png)

### Диаграмма перемещения единственного бегунка на слайдере

![Единственный бегунок на слайдере](/out/src/uml/sequence_1runner/sequence_1runner.png)

### Диаграмма перемещения двух бегунков на слайдере

![Два бегунка на слайдере](/out/src/uml/sequence_2runners/sequence_2runners.png)

### Диаграмма показа (скрытия) текущего значения слайдера над бегунком

![показать (скрыть) надпись над бегунком](/out/src/uml/sequence_with_tip/sequence_with_tip.png)

## Диаграмма переключения вертикальной (горизонтальной) ориентации

![переключить с горизонтали на вертикаль](/out/src/uml/sequence_orientation/sequence_orientation.png)

## Диаграмма изменения минимального (максимального) значения слайдера
![Изменить минимум (максимум)](/out/src/uml/sequence_minmax/sequence_minmax.png)

## Диаграмма изменения шага слайдера
![Изменить шаг](/out/src/uml/sequence_step/sequence_step.png)