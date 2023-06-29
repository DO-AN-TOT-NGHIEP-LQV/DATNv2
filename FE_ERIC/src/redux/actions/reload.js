import store from "../store";
import types from "../types";
const { dispatch } = store;

export const reloadShopManagerScreen = () => {
  dispatch({
    type: types.RELOAD_SHOP_MANAGER_SCREEN,
  });
};
