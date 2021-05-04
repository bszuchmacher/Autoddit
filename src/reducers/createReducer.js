import produce from "immer";

export default (actionHandlers, initialState) => (
  state = initialState,
  action
) => {
  if (!actionHandlers[action.type]) return state;

  return produce(actionHandlers[action.type])(state, action);
};
