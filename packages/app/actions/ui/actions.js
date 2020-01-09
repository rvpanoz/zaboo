import { SWITCH_THEME, ADD_CATEGORY, TOGGLE_SIDEBAR } from "./types";

export const switchTheme = theme => ({
  type: SWITCH_THEME,
  payload: {
    theme
  }
});

export const addCategory = payload => ({
  type: ADD_CATEGORY,
  payload
});

export const toggleSidebar = isOpen => ({
  type: TOGGLE_SIDEBAR,
  payload: {
    isOpen
  }
});
