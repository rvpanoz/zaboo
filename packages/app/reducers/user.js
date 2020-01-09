import { USER_LOGIN } from "../actions/user/actions";

const userReducer = (
  state = {
    token: ""
  },
  action
) => {
  switch (action.type) {
    case USER_LOGIN:
    default:
      return state;
  }
};

export default userReducer;
