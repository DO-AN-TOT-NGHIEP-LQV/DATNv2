import types from "../types";

const initialState = {
  reloadShopManagerScreen: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.RELOAD_SHOP_MANAGER_SCREEN: {
      return {
        ...state,
        reloadShopManagerScreen: !state.reloadShopManagerScreen,
      };
    }

    default:
      return { ...state };
  }
}
