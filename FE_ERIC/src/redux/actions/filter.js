import {
  SEARCH_AND_FILTER_PRODUCTS,
  SEARCH_PRODUCT_B_TEXT,
} from "../../config/urls";
import store from "../store";
import types from "../types";
import { apiGet, apiPost } from "../../ultils/utilsApi";
import { calculateDisplayValue } from "../../ultils/helperFunction";
const { dispatch } = store;

export const changeFilter = () => {
  dispatch({
    type: types.IS_CHANGE_FILTER,
  });
};

export const updateApplyFilter = (data) => {
  dispatch({
    type: types.UPDATE_APPLY_FILTER,
    payload: data,
  });
};

export const nowRangeMinMaxPrice = (data) => {
  dispatch({
    type: types.NOW_RANGE_MINMAX,
    payload: data,
  });
};

export const brandSelectedList = (data) => {
  dispatch({
    type: types.BRAND_SELECTED_LIST,
    payload: data,
  });
};

export const typeSelectedList = (data) => {
  dispatch({
    type: types.TYPE_SELECTED_LIST,
    payload: data,
  });
};

export const searchAndFilterProducts = (
  page = 0,
  keyword,
  types = [],
  brands = [],
  minPrice = 0,
  maxPrice = undefined
) => {
  return new Promise(async (resolve, reject) => {
    var headers = {
      "Content-Type": "application/json",
    };

    const keywordParam = keyword.trim() == "" ? undefined : keyword;

    const typesParam =
      types && types.length > 0
        ? types.map((type) => encodeURIComponent(type))
        : undefined;

    const brandParam =
      brands && brands.length > 0
        ? brands.map((brand) => encodeURIComponent(brand))
        : undefined;

    const minPriceParam =
      minPrice !== undefined ? calculateDisplayValue(minPrice) : undefined;

    const maxPriceParam =
      maxPrice !== undefined ? calculateDisplayValue(maxPrice) : undefined;

    let url = `${SEARCH_AND_FILTER_PRODUCTS}?`;

    if (keywordParam !== undefined) {
      url += `keyword=${keywordParam}&`;
    }

    if (brandParam !== undefined) {
      url += `brands=${brandParam}&`;
    }

    if (typesParam !== undefined) {
      url += `types=${typesParam}&`;
    }

    if (minPriceParam !== undefined) {
      url += `minPrice=${minPriceParam}&`;
    }
    if (maxPriceParam !== undefined) {
      url += `maxPrice=${maxPriceParam}&`;
    }
    url += `page=${page}`;
    console.log(SEARCH_AND_FILTER_PRODUCTS);

    await apiGet(url, {}, headers, false)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const searchProductByText = (page, searchText) => {
  return new Promise(async (resolve, reject) => {
    var headers = {
      "Content-Type": "application/json",
    };

    var data = {
      params: {
        searchText: searchText,
        page: page,
      },
    };
    // console.log(data);
    await apiGet(SEARCH_PRODUCT_B_TEXT, data, headers, false)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
