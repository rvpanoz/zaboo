import { SWITCH_THEME, TOGGLE_SIDEBAR, TOGGLE_LOADER } from "./types";
import { actionCreator } from "actions/actionCreator";

export const switchTheme = actionCreator(SWITCH_THEME);
export const toggleSidebar = actionCreator(TOGGLE_SIDEBAR);
export const toggleLoader = actionCreator(TOGGLE_LOADER);
