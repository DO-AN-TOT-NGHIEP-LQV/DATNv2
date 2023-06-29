import { SEARCH_ALL_BY_TEXT, SEARCH_ALL_B_IMG } from "../../config/urls";
import { getFileExtension } from "../../ultils/helperFunction";
import { apiGet, apiPost } from "../../ultils/utilsApi";
import store from "../store";
import types from "../types";

const { dispatch } = store;

export const saveListSearch = (data) => {
  dispatch({
    type: types.GET_LIST_SEARCH,
    payload: data,
  });
};

export const updatePage = (data) => {
  dispatch({
    type: types.PAGE,
    payload: data,
  });
};

export const updatePagePost = (data) => {
  dispatch({
    type: types.PAGE_POST,
    payload: data,
  });
};

export const updatePageProduct = (data) => {
  dispatch({
    type: types.PAGE_PRODUCT,
    payload: data,
  });
};
export const updateSearchText = (data) => {
  dispatch({
    type: types.SEARCH_TEXT,
    payload: data,
  });
};

export const updateCategoryIndex = (data) => {
  dispatch({
    type: types.UPDATE_CATEGORY_INDEX,
    payload: data,
  });
};

export const updateIsLoading = (data) => {
  dispatch({
    type: types.IS_LOADING,
    payload: data,
  });
};

export const updateIsMainViewDisplay = (data) => {
  dispatch({
    type: types.IS_MAIN_VIEW_DISPLAY,
    payload: data,
  });
};

export const updateShowAllCategories = (data) => {
  dispatch({
    type: types.SHOW_ALL_CATEGORY,
    payload: data,
  });
};

export const searchWithImage = (pickedImagePath) => {
  return new Promise(async (resolve, reject) => {
    var headers = {
      "Content-type": "multipart/form-data",
    };

    const fileUri = pickedImagePath;
    const fileName = fileUri.split("/").pop(); // Lấy tên tệp từ đường dẫn
    const fileExtension = getFileExtension(fileName);

    var formData = new FormData();
    formData.append("fileSearchImg", {
      uri: fileUri,
      type: `image/${fileExtension}`,
      name: fileName,
    });

    await apiPost(SEARCH_ALL_B_IMG, formData, headers, false)
      .then((res) => {
        saveListSearch(res.data);
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const fetchDataForSearchText = (
  searchText,
  page,
  endPoint = SEARCH_ALL_BY_TEXT
) => {
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

    await apiGet(endPoint, data, headers, true)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
