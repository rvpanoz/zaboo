import { identity, prop, propOr } from "ramda";

const createReducer = (uiState, handlers) => (state = uiState, action) =>
  propOr(identity, prop("type", action), handlers)(state, action);

export default createReducer;
