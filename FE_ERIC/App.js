// import Routes from "./src/navigations/Routes";
// import { Provider, useSelector } from "react-redux";
// import store from "./src/redux/store";

// import { useEffect } from "react";
// import { getStorageTokenUserData } from "./src/ultils/credentials";
// import { saveUserData } from "./src/redux/actions/auth";
// import { StatusBar, View, Text } from "react-native";
// import { MenuProvider } from "react-native-popup-menu";
// import AppLoading from "expo-app-loading";
// import * as SplashScreen from "expo-splash-screen";

// import { useFonts } from "expo-font";
// import { Color, Theme } from "./src/constans";
// import actions from "./src/redux/actions";

// export default function App() {
//   // const detailData = useSelector((state) => state.auth.detailUser);

//   // Kiem tra Token va khoi dong lai
//   // useEffect(() => {
//   //   (async () => {
//   //     const tokenData = await getStorageTokenUserData();
//   //     if (!!tokenData) {
//   //       console.log("First load:lai ren lai");
//   //       await saveUserData(tokenData);
//   //     }
//   //   })();
//   // }, []);

//   useEffect(() => {
//     const firstLoad = async () => {
//       const tokenData = await getStorageTokenUserData();
//       // actions.setIsLogin(false);
//       if (!!tokenData) {
//         try {
//           await saveUserData(tokenData);
//           const detailData = await actions.getDetailUser();
//           console.log(detailData.data);
//           await actions.saveDetailUser(detailData.data);
//           await actions.setIsLogin(true);
//         } catch (error) {
//           // actions.logout();
//           actions.setIsLogin(false);
//         }
//       }
//     };

//     firstLoad();
//   }, []);

//   const [loadedFonts] = useFonts({
//     "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
//     "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
//     "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
//   });

//   useEffect(() => {
//     async function prepare() {
//       await SplashScreen.preventAutoHideAsync();
//     }
//     prepare();
//   }, []);

//   if (!loadedFonts) {
//     return undefined;
//   } else {
//     SplashScreen.hideAsync();
//   }

//   return (
//     <>
//       {/* <StatusBar
//         barStyle="dark-content"
//         backgroundColor={Color.mainTheme}
//         translucent={true}
//       /> */}
//       {/* <View>
//         <Text style={{ fontFamily: "Roboto-Bold" }}>
//           Hello, Expo with Custom Font!
//         </Text>
//       </View> */}
//       <View style={{ flex: 1 }}>
//         <Provider store={store}>
//           <MenuProvider>
//             <Routes />
//           </MenuProvider>
//         </Provider>
//       </View>

//       {/* <View style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
//         <Provider store={store}>
//           <Routes />
//         </Provider>
//       </View> */}
//     </>
//   );
// }

import Routes from "./src/navigations/Routes";
import { Provider, useSelector } from "react-redux";
import store from "./src/redux/store";

import { useEffect, useState } from "react";
import { getStorageTokenUserData } from "./src/ultils/credentials";
import { saveUserData } from "./src/redux/actions/auth";
import { StatusBar, View, Text, StyleSheet } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useFonts } from "expo-font";
import { Color, Theme } from "./src/constans";
import actions from "./src/redux/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  // const detailData = useSelector((state) => state.auth.detailUser);

  // Kiem tra Token va khoi dong lai
  // useEffect(() => {
  //   (async () => {
  //     const tokenData = await getStorageTokenUserData();
  //     if (!!tokenData) {
  //       console.log("First load:lai ren lai");
  //       await saveUserData(tokenData);
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    const firstLoad = async () => {
      const tokenData = await getStorageTokenUserData();
      // actions.setIsLogin(false);
      if (!!tokenData) {
        try {
          await saveUserData(tokenData);
          const detailData = await actions.getDetailUser();
          console.log(detailData.data);
          await actions.saveDetailUser(detailData.data);
          await actions.setIsLogin(true);
        } catch (error) {
          // actions.logout();
          actions.setIsLogin(false);
        }
      }

      AsyncStorage.getAllKeys()
        .then((keys) => {
          // Lấy giá trị tương ứng với mỗi key
          return AsyncStorage.multiGet(keys);
        })
        .then((result) => {
          // result là một mảng chứa các cặp [key, value]
          result.forEach(([key, value]) => {
            console.log(`Key: ${key}, Value: ${value}`);
          });
        })
        .catch((error) => {
          console.error("Lỗi khi lấy các giá trị từ AsyncStorage:", error);
        });
    };

    firstLoad();
  }, []);

  const [loadedFonts] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!loadedFonts) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <MenuProvider>
          <Routes />
        </MenuProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  stepImage: {
    width: "90%",
    height: "50%",
    marginVertical: 30,
  },
  stepIndicatorView: {
    flexDirection: "row",
  },
  stepIndicator: {
    height: 10,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginVertical: 20,
  },
  description: {
    textAlign: "center",
    paddingHorizontal: 10,
  },
  navigationView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  navigationBtn: {
    backgroundColor: "#A838D7",
    height: 40,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  navigationBtnTxt: {
    color: "white",
    fontWeight: "bold",
  },
});
