import types from "../types";

const initialState = {
  categoryIndex: 0,
  showAllCategories: false,

  listSearch: [],
  page: 0,
  pageProduct: 0, ////
  pagePost: 0, ////
  searchText: "",
  isMainViewVisible: true,
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_LIST_SEARCH: {
      const data = action.payload;
      return { ...state, listSearch: data };
    }
    case types.UPDATE_CATEGORY_INDEX: {
      const data = action.payload;
      return {
        ...state,
        categoryIndex: data,
      };
    }
    case types.SHOW_ALL_CATEGORY: {
      const data = action.payload;
      return {
        ...state,
        showAllCategories: data,
      };
    }
    case types.SEARCH_TEXT: {
      const data = action.payload;
      return {
        ...state,
        searchText: data,
      };
    }

    case types.PAGE_PRODUCT: {
      const data = action.payload;
      return {
        ...state,
        pageProduct: data,
      };
    }
    case types.PAGE_POST: {
      const data = action.payload;
      return {
        ...state,
        pagePost: data,
      };
    }
    case types.IS_MAIN_VIEW_DISPLAY: {
      const data = action.payload;
      return {
        ...state,
        isMainViewVisible: data,
      };
    }
    case types.IS_LOADING: {
      const data = action.payload;
      return {
        ...state,
        isLoading: data,
      };
    }
    default:
      return { ...state };
  }
}
