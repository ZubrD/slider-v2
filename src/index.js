import { Slider } from "./components/slider/Slider";
import { createStore } from "./core/createStore";
import { initialDefault } from "./js/initialDefaultState";
import { storage } from "./js/utils";
import { rootReducer } from "./redux/rootReducer";
import "./scss/index.scss";

const initial = storage('slider-state') || initialDefault
console.log('Initial', initial)

const store = createStore(rootReducer, initial);

store.subscribe(state=> {
    storage('slider-state', state)
    console.log('App state', state)
})

const slider = new Slider({ store });

slider.init();
