import { AUTH_SUCCESS, AUTH_FAILURE, SIGNOUT } from "../actions/user/types";

const userReducer = (
  state = {
    auth: false,
    token: ""
  },
  action
) => {
  const { token } = action.payload;

  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        auth: Boolean(token),
        token
      };
    case AUTH_FAILURE:
      return {
        ...state,
        auth: false,
        token: ""
      };
    case SIGNOUT:
      return {
        ...state,
        auth: false,
        token: ""
      };
    default:
      return state;
  }
};

export default userReducer;
