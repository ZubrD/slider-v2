import { NUMERICAL } from "./types"

export function rootReducer(state, action) {
  
  switch(action.type) {
    case NUMERICAL:
      const prevState = state.sliderState || {}
      console.log('Action', action.data)
      prevState[action.data.runner] = action.data.valueRunner
      prevState[action.data.coord] = action.data.valueCoord
      prevState[action.data.initPos] = action.data.valueInitPos
      return {...state, sliderState: prevState}
    default: return state
  }
}
