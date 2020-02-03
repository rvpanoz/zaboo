import { SYSTEM_MESSAGE, CLEAR_SYSTEM_MESSAGE } from "./types";
import { actionCreator } from "../actionCreator";

export const clearSystemMessage = actionCreator(CLEAR_SYSTEM_MESSAGE);
export const systemMessage = actionCreator(SYSTEM_MESSAGE);
