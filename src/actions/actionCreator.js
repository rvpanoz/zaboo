const actionCreator = type => {
  const actionCreatorFunc = payload => ({
    type,
    payload
  });

  actionCreatorFunc.type = type;
  return actionCreatorFunc;
};

export default actionCreator;
