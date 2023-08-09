import { NUMERICAL } from "./types"

export function rootReducer(state, action) {
  switch(action.type) {
    case NUMERICAL:   
      const prevState = state.sliderState || {}
      prevState[action.data.runner] = action.data.valueRunner
      prevState[action.data.coord] = action.data.valueCoord
      prevState[action.data.initPos] = action.data.valueInitPos
      prevState[action.data.checkItem] = action.data.valueCheckItem   // Значения переключателей панели
      prevState[action.data.checkItem1] = action.data.valueCheckItem1
      prevState[action.data.checkItem2] = action.data.valueCheckItem2
      prevState[action.data.checkItem3] = action.data.valueCheckItem3
      prevState[action.data.checkItem4] = action.data.valueCheckItem4
      prevState[action.data.checkItem5] = action.data.valueCheckItem5
      prevState[action.data.checkItem6] = action.data.valueCheckItem6
      prevState[action.data.checkItem7] = action.data.valueCheckItem7
      return {...state, sliderState: prevState}
    default: return state
  }
}
