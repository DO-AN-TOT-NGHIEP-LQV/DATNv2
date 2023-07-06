import axios from "axios";

export const getApiUrl = (endpoint) => endpoint;

// Auth and User
export const LOGIN = getApiUrl("/login");
export const SIGNUP = getApiUrl("/user/register");
export const CHANGE_PASSWORD = getApiUrl("/user/changePassword");

export const GET_ALL_USERS = getApiUrl("/users");
export const GET_DETAIL_USERS = getApiUrl("/user/getDetail");
export const REFRESH_TOKEN = getApiUrl("/token/refresh");
export const REGISTER_SHOP = getApiUrl("/user/registerShop");
export const STATUS_REGISTER_SHOP = getApiUrl("/user/getStatusRegisterShop");
export const CANCEL_REGISTER_SHOP = getApiUrl("/user/cancelRegisterShop");

//Search
export const SEARCH_ALL_B_IMG = getApiUrl("/search/searchByImage");
export const SEARCH_POST_B_TEXT = getApiUrl("/search/posts/SearchByText");
export const SEARCH_PRODUCT_B_TEXT = getApiUrl("/search/products/SearchByText");
export const SEARCH_ALL_BY_TEXT = getApiUrl("/search/all/SearchByText");
export const SEARCH_AND_FILTER_PRODUCTS = getApiUrl(
  "/search/products/searchAndFilterProducts"
);
export const GET_PRODUCT_BY_ID = getApiUrl("/search/products/getDetail");
export const CHECK_VENDOR_PRODUCT = getApiUrl(
  "/search/products/checkVendorProduct"
);
// export const GET_PRODUCT_BY_ID = getApiUrl("");

export const GET_PRODUCT_OF_SHOP = getApiUrl("/search/products/shopId");
export const GET_SHOP_BY_PRODUCT_ID = getApiUrl("/search/products/getShops");
export const GET_ALL_PRODUCT = getApiUrl("/search/products/getAll");

//Discution
export const GET_PRODUCT_DISCUSSION = getApiUrl(
  "/user/discussion/product/getDiscussionsByProductIdPageable"
);
export const CREATE_NEW_DISCUSSION = getApiUrl(
  "/user/discussion/product/newDiscussion"
);
export const CREATE_NEW_SUB_DISCUSSION = getApiUrl(
  "/user/discussion/product/newSubDiscussion"
);

export const DELETE_MAIN_DISCUSSION = getApiUrl(
  "/user/discussion/product/deleteMainDiscussion"
);
export const DELETE_SUB_DISCUSSION = getApiUrl(
  "/user/discussion/product/deleteSubDiscussion"
);

//Product

export const CREATE_NEW_PRODUCT = getApiUrl("/sale/product/create");
export const UPDATE_PRODUCT = getApiUrl("/sale/product/update");
export const DELETE_PRODUCT = getApiUrl("/sale/product/delete");
export const GET_PRODUCT_DETAIL = getApiUrl("/sale/product/getById");
export const CHANGE_FEATURE = getApiUrl("/sale/product/feature");

//Product Admin

//Sale // Shop
export const GET_DETAIL_SHOP = getApiUrl("/sale/shop/getShop");
export const ADD_PRODUCT_TO_SHOP = getApiUrl("/sale/shop/addProductVentor");
export const UPDATE_PRODUCT_TO_SHOP = getApiUrl(
  "/sale/shop/updateProductVentor"
);

export const DELETE_PRODUCT_TO_SHOP = getApiUrl(
  "/sale/shop/deleteProductVentor"
);
export const UPDATE_SHOP_PROFILE = getApiUrl("/sale/shop/updateProfile");
export const UPDATE_SHOP_IMAGE = getApiUrl("/sale/shop/updateImage");

export const GET_VENDOR_PRODUCT = getApiUrl("/sale/shop/getVendorProduct");

// axios.defaults.baseURL = "http://172.21.0.79:8080/api";
axios.defaults.baseURL = "http://192.168.1.5:8080/api";
// axios.defaults.baseURL = "http://103.197.185.34/api";
