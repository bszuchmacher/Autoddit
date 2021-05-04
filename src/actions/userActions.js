export const USER_AUTH = 'USER_AUTH';
export const USER_RESET = 'USER_RESET';

export const userAuth = name => ({
  type: USER_AUTH,
  payload: name
});

export const userReset = () => ({
  type: USER_RESET
});
