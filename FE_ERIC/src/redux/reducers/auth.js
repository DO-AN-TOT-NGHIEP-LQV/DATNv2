import types from "../types";

const initialState = {
  tokenData: {},
  detailUser: {},
  isLogin: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.LOGIN: {
      const data = action.payload;
      return { ...state, tokenData: data };
    }
    case types.GET_DETAIL_USERS: {
      const data = action.payload;
      return { ...state, detailUser: data };
    }
    case types.IS_LOGIN: {
      const data = action.payload;
      return { ...state, isLogin: data };
    }

    default:
      return { ...state };
  }
}
