import { Slider } from "./components/slider/Slider";
import { Ranger } from "./components/ranger/Ranger";
import { Interval } from "./components/interval/Interval";
import { Button } from "./components/button/Button";
import { Scale } from "./components/scale/Scale";
import { ScaleSpan } from "./components/scaleSpan/ScaleSpan";
import { Division } from "./components/division/Division";
import { DivisionSpan } from "./components/divisionSpan/DivisionSpan";
import { Panel } from "./components/panel/Panel";
import { Settings } from "./components/settings/Settings";
import "./scss/index.scss";

const slider = new Slider("#app", {
  components: [
    Ranger,
    Interval,
    Button,
    Scale,
    ScaleSpan,
    Division,
    DivisionSpan,
    Panel,
    Settings,
  ],
});

slider.render()
