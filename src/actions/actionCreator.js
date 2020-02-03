const actionCreator = type => {
  const actionCreatorFunc = payload => ({
    type,
    payload
  });

  actionCreatorFunc.type = type;
  return actionCreatorFunc;
};

const requestActionCreator = type => {
  const action = actionCreator(type);

  action.success = `${type}_SUCCESS`;
  action.failure = `${type}_FAILURE`;

  return action;
};

export { actionCreator, requestActionCreator };
