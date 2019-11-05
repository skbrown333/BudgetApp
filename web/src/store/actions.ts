export const UPDATE_ACCOUNT_ACTION = "UpdateAccountAction";

export function updateAccount(account) {
  return {
    type: UPDATE_ACCOUNT_ACTION,
    payload: account
  };
}
