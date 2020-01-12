import { combineEpics } from "redux-observable";
import { toggleSidebarEpic } from "./uiEpics";
import { addTaskEpic } from "./taskEpics";
import { signoutEpic } from "./userEpics";

export default combineEpics(addTaskEpic, toggleSidebarEpic, signoutEpic);
