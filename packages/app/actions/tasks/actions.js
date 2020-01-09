import { ADD_TASK, TOGGLE_TASK } from "./types";

export const addTask = payload => {
  return {
    type: ADD_TASK,
    payload
  };
};

export const toggleTask = payload => {
  return {
    type: TOGGLE_TASK,
    payload
  };
};
