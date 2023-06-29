import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../redux/store";
import types from "../redux/types";
import { showError } from "./messageFunction";
import axios from "axios";
import { REFRESH_TOKEN } from "../config/urls";
import jwtDecode from "jwt-decode";
import { clearUserData, setCredentials } from "./credentials";
import { useNavigation } from "@react-navigation/native";

const { dispatch, getState } = store;

export async function getAuthorizationHeaders() {
  let tokenData = await AsyncStorage.getItem("tokenData");
  if (tokenData) {
    tokenData = JSON.parse(tokenData);
    return {
      authorization: "Bearer " + `${tokenData.access_token}`,
    };
  }
  return {};
}

export async function apiReq(
  endPoint,
  data,
  method,
  headers,
  withAuth = false,
  requestOptions = {}
) {
  return new Promise(async (res, rej) => {
    if (withAuth === true) {
      const c = await getCredentials();
      if (c === null) {
        console.log("c == null");
        clearUserData();
        // let a = await AsyncStorage.removeItem('userData');
        dispatch({
          type: types.CLEAR_REDUX_STATE,
          payload: {},
        });

        rej({
          error_message: "Hãy đăng nhập lại",
        });
        return;
      }
    }

    // const getTokenHeader = await getAuthorizationHeaders();
    // headers = {
    //   ...getTokenHeader,
    //   ...headers,
    // };

    headers = {
      ...headers,
    };

    if (withAuth) {
      const getTokenHeader = await getAuthorizationHeaders();
      headers = {
        ...headers,
        ...getTokenHeader,
      };
    }

    if (method === "get" || method === "delete") {
      data = {
        ...requestOptions,
        ...data,
        headers,
      };
    }
    axios[method](endPoint, data, { headers })
      .then((result) => {
        if (result.status === false) {
          return rej(result);
        }
        return res(result);
      })
      .catch(async (error) => {
        if (error && error.response && 401 === error.response.status) {
          let a = await AsyncStorage.removeItem("tokenData");
          dispatch({
            type: types.CLEAR_REDUX_STATE,
            payload: {},
          });
          return rej(
            error?.response?.data?.error_message || {
              error_message: "ERROR 401",
            }
          );
        }

        if (error && error.response) {
          if (error.response.data) {
            if (!error.response.data.error_message) {
              error.response.data.error_message = "Network Error";
              return rej(error.response.data);
            }
            console.log(error.response.data.error_message);
            showError(error.response.data.error_message);
            return rej(error.response.data); // backend co tra ve messenger
          } else {
            return rej({ error_message: "Network Error" });
          }
        } else {
          return rej({ error_message: "Network Error" });
        }
      });
  });
}

export function apiPost(endPoint, data, headers = {}, withAuth = false) {
  return apiReq(endPoint, data, "post", headers, withAuth);
}

export function apiDelete(endPoint, data, headers = {}, withAuth = false) {
  return apiReq(endPoint, data, "delete", headers, withAuth);
}

export function apiGet(
  endPoint,
  data,
  headers = {},
  withAuth = false,
  requestOptions = {}
) {
  return apiReq(endPoint, data, "get", headers, withAuth, requestOptions);
}

export function apiPut(endPoint, data, headers = {}, withAuth = false) {
  return apiReq(endPoint, data, "put", headers, withAuth);
}

export function apiPatch(endPoint, data, headers = {}, withAuth = false) {
  return apiReq(endPoint, data, "patch", headers, withAuth);
}

///////////////////////////////////////////////
export async function getCredentials() {
  return new Promise(async (resolve, reject) => {
    try {
      let credentials = await AsyncStorage.getItem("tokenData");

      let cred = await getVerifiedUsers(JSON.parse(credentials));
      if (credentials != null && cred != null) {
        resolve(cred);
      } else {
        resolve(null);
      }
      resolve(null);
    } catch (error) {
      resolve(null);
    }
  });
}

// refresh lai accesstoken
export async function updateAccessUsingRefresh(refresh_token) {
  return new Promise(async (resolve, reject) => {
    const header = {
      authorization: "Bearer " + `${refresh_token}`,
    };
    await apiGet(REFRESH_TOKEN, {}, header, false, {}).then((res) => {
      console.log("REFRESH_TOKEN UPDATE");
      setCredentials(res.data).then(() => {
        resolve(res);
        dispatch({
          type: types.LOGIN,
          payload: res.data,
        });
        // saveUserData(res.data)
      });
    });
  }).catch((error) => {
    console.log("Loi khong the refresh token refreshToken");
    reject(error);
  });
}

export function isTokenExpired(token) {
  var decoded = jwtDecode(token);
  if (decoded.exp < Date.now() / 1000) {
    return true;
  } else {
    return false;
  }
}

export async function getVerifiedUsers(tokenData) {
  console.log("Loading keys from storage");
  if (tokenData) {
    if (!isTokenExpired(tokenData.access_token)) {
      return tokenData;
    } else {
      if (!isTokenExpired(tokenData.refresh_token)) {
        try {
          const refreshResponse = await updateAccessUsingRefresh(
            tokenData.refresh_token
          );
          return refreshResponse;
        } catch (error) {
          return null;
        }
      } else {
        console.log("refresh expired, please login");
        return null;
      }
    }
  } else {
    return null;
  }
}
