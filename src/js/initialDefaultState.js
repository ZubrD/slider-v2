import { makeScale } from "./scale";
import { configObj } from "./config";

const runners = configObj.runner_number;
const min = configObj.min;
const max = configObj.max;
const step = 1;
const discrete = configObj.discrete;
const orientation = configObj.orientation;
const tip = "no";

const scaleArrs = makeScale(min, max, step);
const scaleArr = scaleArrs[0];
// const iteration = scaleArrs[1];
// const iterationsArr = scaleArrs[2];

const scaleLength = scaleArr.length;
const btn1_coord = 0;
const btn2_coord = configObj.width;
const width = configObj.width;
const height = configObj.height;
const buttonWidth = configObj.buttonWidth;
const btn1_init_pos = 0;
const btn2_init_pos = 0;
const minLimit = 0
const maxLimit = 0
const steps = ""
const current = ""
const stepMinLimit = ""
const stepMaxLimit = ""

// const intervalStyleWidth = ""
// const intervalStyleHeight = ""
// const intervalStyleMarginLeft = ""
// const intervalStyleMarginTop = ""
// const buttonFirstStyleMarginLeft = ""
// const buttonSecondStyleMarginLeft = ""
// const buttonFirstTip = 0
// const buttonSecondTip = 0

export const initialDefault = {
  sliderState: {
    inst: 1,
    runners,
    min,
    max,
    minLimit,
    maxLimit,
    discrete,
    orientation,
    tip,
    scaleLength,
    btn1_coord,
    btn2_coord,
    width,
    height,
    buttonWidth,
    btn1_init_pos,
    btn2_init_pos,
    steps,
    current,
    stepMinLimit,
    stepMaxLimit,
    // intervalStyleWidth,
    // intervalStyleHeight,
    // intervalStyleMarginLeft,
    // intervalStyleMarginTop,
    // buttonFirstStyleMarginLeft,
    // buttonSecondStyleMarginLeft,
    // buttonFirstTip,
    // buttonSecondTip
  },
};
