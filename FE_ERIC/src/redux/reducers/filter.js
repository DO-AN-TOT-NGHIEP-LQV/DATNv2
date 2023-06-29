import types from "../types";

const initialState = {
  isChangeFilter: false,
  isApplyFilter: false,

  ///price
  nowRangeMinMaxPrice: [0, 80],

  //  Type
  typeSelectedList: [], //have
  brandSelectedList: [], //have
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SHOW_FILTER_MODEL: {
      const data = action.payload;
      return { ...state, showFilterModel: data };
    }

    case types.NOW_RANGE_MINMAX: {
      const data = action.payload;
      return { ...state, nowRangeMinMaxPrice: data };
    }

    case types.TYPE_SELECTED_LIST: {
      const data = action.payload;
      return { ...state, typeSelectedList: data };
    }
    case types.BRAND_SELECTED_LIST: {
      const data = action.payload;
      return { ...state, brandSelectedList: data };
    }

    case types.IS_CHANGE_FILTER: {
      return { ...state, isChangeFilter: !state.isChangeFilter };
    }
    case types.UPDATE_APPLY_FILTER: {
      const data = action.payload;
      return { ...state, isApplyFilter: data };
    }

    default:
      return { ...state };
  }
}
