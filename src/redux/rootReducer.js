import { NUMERICAL } from "./types"

export function rootReducer(state, action) {
  switch(action.type) {
    case NUMERICAL:   
      const prevState = state.sliderState || {} 
      prevState[action.data.checkItem1] = action.data.valueCheckItem1
      prevState[action.data.checkItem2] = action.data.valueCheckItem2
      prevState[action.data.checkItem3] = action.data.valueCheckItem3
      prevState[action.data.checkItem4] = action.data.valueCheckItem4
      prevState[action.data.checkItem5] = action.data.valueCheckItem5
      prevState[action.data.checkItem6] = action.data.valueCheckItem6
      prevState[action.data.checkItem7] = action.data.valueCheckItem7
      prevState[action.data.checkItem8] = action.data.valueCheckItem8
      prevState[action.data.checkItem9] = action.data.valueCheckItem9
      prevState[action.data.checkItem10] = action.data.valueCheckItem10
      prevState[action.data.checkItem11] = action.data.valueCheckItem11
      prevState[action.data.checkItem12] = action.data.valueCheckItem12
      return {...state, sliderState: prevState}
    default: return state
  }
}
