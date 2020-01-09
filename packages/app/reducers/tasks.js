import { ADD_TASK, TOGGLE_TASK } from "../actions/tasks/types";

const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TASK:
      const {
        payload: { id, tag, description }
      } = action;

      return [
        ...state,
        {
          id,
          tag,
          description,
          completed: false
        }
      ];
    case TOGGLE_TASK:
      const {
        payload: { id: taskId }
      } = action;

      return state.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
    default:
      return state;
  }
};

export default tasksReducer;
