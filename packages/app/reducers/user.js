import { AUTH_SUCCESS, AUTH_FAILURE, SIGNOUT } from "../actions/user/types";

const userReducer = (
  state = {
    token: ""
  },
  action
) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      const { token } = action.payload;

      return {
        ...state,
        token
      };
    case AUTH_FAILURE:
      return {
        ...state,
        token: ""
      };
    case SIGNOUT:
      return {
        ...state,
        token: ""
      };
    default:
      return state;
  }
};

export default userReducer;
