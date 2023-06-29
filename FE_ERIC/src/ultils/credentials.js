import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getStorageTokenUserData() {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("tokenData").then((data) => {
      resolve(JSON.parse(data));
    });
  });
}

export function setCredentials(data) {
  data = JSON.stringify(data);
  return AsyncStorage.setItem("tokenData", data);
}

export async function clearUserData() {
  return AsyncStorage.removeItem("tokenData");
}
