import { SWITCH_THEME, TOGGLE_SIDEBAR } from "./types";
import actionCreator from "../actionCreator";

export const switchTheme = actionCreator(SWITCH_THEME);
export const toggleSidebar = actionCreator(TOGGLE_SIDEBAR);
