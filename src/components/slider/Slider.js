export class Slider {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)
        this.components = options.components || []
    }

    getRoot() {
        const $root = document.createElement('div')
        this.components.forEach(Component => {
            const component = new Component()
            $root.insert 
        })
        return $root
    }

    render() {
        this.$el.append(this.getRoot())
    }
}