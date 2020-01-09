import { combineEpics } from "redux-observable";
import { toggleSidebarEpic } from "./uiEpics";
import { addTaskEpic } from "./taskEpics";
import { userLoginEpic } from "./userEpics";

export default combineEpics(addTaskEpic, toggleSidebarEpic, userLoginEpic);
