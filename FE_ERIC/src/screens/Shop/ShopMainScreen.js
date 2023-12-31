import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
  Linking,
} from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import { bg2 } from "../../public/assets/image";
import Colors from "../../constans/Color";
import { SIZES, FONTS, spacing } from "../../constans/Theme";
import { useSelector } from "react-redux";
import { apiGet } from "../../ultils/utilsApi";
import { GET_DETAIL_SHOP } from "../../config/urls";
import { LoginImg } from "../../public/assets";
import { showError } from "../../ultils/messageFunction";
import { shop_main_promo, shop_manager_promo } from "../../constans/raw";
import ItemPromo from "../../components/SalerManager/ItemPromo";
import openWebLink from "../../hookFuntion/openWebLink";
import { useNavigation } from "@react-navigation/native";
import { ManagerGif } from "../../public/assets/gif";
import * as Animatable from "react-native-animatable";

const ShopMainScreen = () => {
  const detailUser = useSelector((state) => state.auth.detailUser);
  const [shopDetail, setShopDetail] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    firstLoad();
  }, []);

  const firstLoad = async () => {
    try {
      var headers = {
        "Content-Type": "application/json",
      };

      const shopId = detailUser?.shop_id || undefined;
      if (detailUser && detailUser?.shop_id != null) {
        let url = `${GET_DETAIL_SHOP}?`;
        if (shopId !== undefined) {
          url += `shopId=${shopId}`;
        }
        const res = await apiGet(url, {}, headers, false);
        setShopDetail(res.data);
        // console.log(res.data);
        console.log(GET_DETAIL_SHOP);
        // console.log(shopDetail.id);
      } else {
        showError("Không thể lấy Id của shop");
      }
    } catch (error) {
      console.log(error);
      console.log(error.error_message || "Lấy dữ liệu thất bại");
    }
  };

  function renderHeader() {
    return (
      <View
        style={{
          width: "100%",
          height: 240,
          // ...styles.shadow,
        }}
      >
        <ImageBackground
          source={bg2}
          resizeMode="cover"
          style={{
            flex: 1,
            alignItems: "center",
            borderRadius: 20,
            paddingTop: spacing.statusbarHeight,
          }}
          imageStyle={{
            opacity: 0.7,
            borderRadius: SIZES.radius,
            transform: [{ scaleX: -1 }],
          }}
        >
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: Colors.black, ...FONTS.h3, marginTop: 10 }}>
              Shop của bạn
            </Text>
          </View>
          <ImageBackground style={styles.imgBg}>
            <TouchableOpacity
              onPress={() => {
                firstLoad();
              }}
              style={{
                width: 80,
                height: 80,
                marginLeft: 15,
              }}
            >
              {/* <Image
                source={
                  shopDetail && shopDetail?.sLogo
                    ? { uri: shopDetail?.sLogo }
                    : LoginImg
                }
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 40,
                  borderWidth: 1,
                  borderColor: Colors.textLight,
                }}
              /> */}
              <Image
                source={
                  shopDetail && shopDetail?.image?.url
                    ? { uri: shopDetail?.image?.url }
                    : LoginImg
                }
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 40,
                  borderWidth: 1,
                  borderColor: Colors.textLight,
                }}
              />

              <TouchableOpacity
                style={styles.styleContainerButtonRole}
                onPress={() => openWebLink()}
              >
                <Text style={{ ...styles.styleTextButtonRole }}>Link</Text>
              </TouchableOpacity>
            </TouchableOpacity>

            <View
              style={{
                marginTop: 15,
                flex: 1,
                marginLeft: SIZES.radius,
                alignItems: "flex-start",
              }}
            >
              <Text
                numberOfLines={2}
                style={{
                  // height: 40,
                  color: Colors.white,
                  ...FONTS.h2,
                  paddingTop: 5,
                  lineHeight: 20,
                }}
              >
                {shopDetail?.sName || "Chưa có tên"}
                {/* {"dddddddđChsds;lsd;âddasdsdưa có tên"} */}
              </Text>

              <Text
                style={{
                  color: Colors.white,
                  ...FONTS.body4,
                  fontStyle: "italic",
                  fontWeight: 100,
                  fontSize: 12,
                }}
                numberOfLines={3}
              >
                Địa chỉ: {shopDetail?.sAddress1 || "Chưa có địa chỉ"}
              </Text>
            </View>
          </ImageBackground>
        </ImageBackground>
      </View>
    );
  }

  function renderPromo() {
    const [promoTags, setPromoTags] = useState(shop_main_promo);

    const navigateManagerProduct = () => {
      navigation.navigate("ShopTab", {
        screen: "ShopManagerProductScreen",
        params: { shopId: shopDetail?.id },
      });
    };

    const navigateCreateProductScreen = () => {
      // navigation.navigate("ShopTab", {
      //   screen: "ShopCreateProduct",
      //   params: { shopId: shopDetail?.id },
      // });

      navigation.navigate("ShopTab", {
        screen: "ShopSearchProductVentor",
        params: { shopId: shopDetail?.id },
      });
    };

    const navigateProfileShopScreen = () => {
      navigation.navigate("ShopTab", {
        screen: "ShopProfileScreen",
        params: { shopId: shopDetail?.id },
      });
    };

    return (
      <Fragment>
        <FlatList
          scrollEnabled={false}
          columnWrapperStyle={styles.columnWrapperStyle}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={promoTags}
          renderItem={({ item, index }) => (
            <Animatable.View
              // animation={"fadeInUp"}
              animation={"zoomInUp"}
              duration={1000}
              delay={200}
            >
              <ItemPromo
                item={item}
                onPress={() => {
                  if (index == 0) navigateManagerProduct();
                  if (index == 1) navigateProfileShopScreen();
                  if (index == 2) navigateCreateProductScreen();
                }}
              />
            </Animatable.View>
          )}
        />
        {/* <View
          style={{
            paddingHorizontal: SIZES.padding * 3,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <ItemPromo
              item={promoTags[0]}
              onPress={() => {
                navigateManagerProduct();
              }}
            />
            <ItemPromo
              item={promoTags[1]}
              onPress={() => {
                navigateProfileShopScreen();
              }}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ItemPromo
              item={promoTags[2]}
              onPress={() => {
                navigateCreateProductScreen();
              }}
            />
          </View>
        </View> */}
      </Fragment>
    );
  }

  return (
    <View style={styles.mainContainer}>
      {renderHeader()}
      {renderPromo()}
      {/* <View
        style={{ position: "absolute", bottom: -15, right: 0, zIndex: -10 }}
      >
        <Image
          source={ManagerGif}
          style={{
            width: 200,
            height: 200,
          }}
          resizeMode="cover"
        />
      </View> */}
    </View>
  );
};

export default ShopMainScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.mainTheme,
    flex: 1,
  },
  imgBg: {
    flexDirection: "row",
    // alignItems: "center",
    width: "90%",
    height: 150,
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.radius,
    paddingVertical: 20,
    borderRadius: SIZES.radius,
    backgroundColor: "#2d2d44",
  },
  shadow: {
    borderRadius: 16,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 2,
  },

  styleContainerButtonRole: {
    backgroundColor: Colors.mainTheme,
    borderRadius: 15,
    height: 25,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    // marginLeft: -10,
  },
  styleTextButtonRole: {
    color: Colors.mainColor,
    fontSize: 10,
    ...FONTS.h4,
    marginHorizontal: 10,
  },

  columnWrapperStyle: {
    // flex: 1,
    // flexDirection: "row",
    // marginHorizontal: 20,
    // paddingHorizontal: 20,
    justifyContent: "space-between",
    alignContent: "space-between",
    marginHorizontal: 25,
    paddingTop: 15,
  },
});

// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   ImageBackground,
//   TouchableOpacity,
//   Image,
//   StatusBar,
//   FlatList,
//   Linking,
// } from "react-native";
// import React, { Fragment, useEffect, useRef, useState } from "react";
// import { bg1, bg2 } from "../../public/assets/image";
// import Colors from "../../constans/Color";
// import { SIZES, FONTS, statusbarHeight } from "../../constans/Theme";
// import { useSelector } from "react-redux";
// import { apiGet } from "../../ultils/utilsApi";
// import { GET_DETAIL_SHOP } from "../../config/urls";
// import { LoginImg } from "../../public/assets";
// import { showError } from "../../ultils/messageFunction";
// import { shop_manager_promo } from "../../constans/raw";
// import ItemPromo from "../../components/SalerManager/ItemPromo";
// import openWebLink from "../../hookFuntion/openWebLink";
// import { useNavigation } from "@react-navigation/native";

// const AdminMainScreen = () => {
//   const detailUser = useSelector((state) => state.auth.detailUser);
//   const [shopDetail, setShopDetail] = useState(null);

//   const navigation = useNavigation();

//   useEffect(() => {
//     firstLoad();
//   }, []);

//   const firstLoad = async () => {
//     try {
//       var headers = {
//         "Content-Type": "application/json",
//       };

//       const shopId = detailUser?.shop_id || undefined;
//       if (detailUser && detailUser?.shop_id != null) {
//         let url = `${GET_DETAIL_SHOP}?`;
//         if (shopId !== undefined) {
//           url += `shopId=${shopId}`;
//         }
//         const res = await apiGet(url, {}, headers, false);
//         setShopDetail(res.data);
//         console.log(res.data);
//       } else {
//         showError("Can'n get Id of shop");
//       }
//     } catch (error) {
//       console.log(error.error_message || "Fail get detail your shop");
//     }
//   };

//   function renderHeader() {
//     return (
//       <View
//         style={{
//           width: "100%",
//           height: 200,
//           ...styles.shadow,
//           ...statusbarHeight,
//         }}
//       >
//         <ImageBackground
//           source={bg2}
//           resizeMode="cover"
//           style={{
//             flex: 1,
//             alignItems: "center",
//             borderRadius: 20,
//           }}
//           imageStyle={{
//             borderRadius: SIZES.radius,
//             transform: [{ scaleY: -1 }],
//           }}
//         >
//           <View style={{ alignItems: "center", justifyContent: "center" }}>
//             <Text style={{ color: Colors.black, ...FONTS.h3, marginTop: 10 }}>
//               Shop của bạn
//             </Text>
//           </View>

//           <ImageBackground style={styles.imgBg}>
//             <TouchableOpacity
//               style={{
//                 width: 80,
//                 height: 80,
//                 marginLeft: 15,
//               }}
//             >
//               <Image
//                 source={
//                   shopDetail && shopDetail?.sLogo
//                     ? { uri: shopDetail?.sLogo }
//                     : LoginImg
//                 }
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   borderRadius: 40,
//                   borderWidth: 1,
//                   borderColor: Colors.textLight,
//                 }}
//               />

//               <TouchableOpacity
//                 style={styles.styleContainerButtonRole}
//                 onPress={() => openWebLink()}
//               >
//                 <Text style={{ ...styles.styleTextButtonRole }}>Link</Text>
//               </TouchableOpacity>
//             </TouchableOpacity>

//             <View
//               style={{
//                 marginTop: 15,
//                 flex: 1,
//                 marginLeft: SIZES.radius,
//                 alignItems: "flex-start",
//               }}
//             >
//               <Text
//                 numberOfLines={2}
//                 style={{
//                   // height: 40,
//                   color: Colors.white,
//                   ...FONTS.h2,
//                   paddingTop: 5,
//                   lineHeight: 20,
//                 }}
//               >
//                 {shopDetail?.sName || "Chưa có tên"}
//                 {/* {"dddddddđChsds;lsd;âddasdsdưa có tên"} */}
//               </Text>

//               <Text
//                 style={{
//                   color: Colors.white,
//                   ...FONTS.body4,
//                   fontStyle: "italic",
//                   fontWeight: 100,
//                   fontSize: 12,
//                 }}
//                 numberOfLines={3}
//               >
//                 Địa chỉ: {shopDetail?.sAddress1 || "Chưa có địa chỉ"}
//               </Text>
//             </View>
//           </ImageBackground>
//         </ImageBackground>
//       </View>
//     );
//   }

//   function renderPromo() {
//     const [promoTags, setPromoTags] = useState(shop_manager_promo);

//     const navigateCreateProductScreen = () => {
//       navigation.navigate("CreateProductScreen", {
//         shopId: shopDetail.id,
//       });
//     };

//     const navigateProfileShopScreen = () => {
//       navigation.navigate("ProfileShopScreen", {
//         shopId: shopDetail.id,
//       });
//     };

//     const navigateManagerProduct = () => {
//       navigation.navigate("ManagerProductScreen", {
//         shopId: shopDetail.id,
//       });
//     };

//     return (
//       <Fragment>
//         <View
//           style={{
//             paddingHorizontal: SIZES.padding * 3,
//             justifyContent: "space-between",
//           }}
//         >
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between",

//               marginTop: 5,
//             }}
//           >
//             <ItemPromo
//               item={promoTags[0]}
//               onPress={() => {
//                 navigateManagerProduct();
//               }}
//             />
//             <ItemPromo
//               item={promoTags[1]}
//               onPress={() => {
//                 navigateProfileShopScreen();
//               }}
//             />
//           </View>
//           <View
//             style={{ flexDirection: "row", justifyContent: "space-between" }}
//           >
//             <ItemPromo
//               item={promoTags[2]}
//               onPress={() => {
//                 navigateCreateProductScreen();
//               }}
//             />
//           </View>
//         </View>
//       </Fragment>
//     );
//   }

//   return (
//     <View style={styles.mainContainer}>
//       {renderHeader()}
//       {renderPromo()}
//     </View>
//   );
// };

// export default AdminMainScreen;

// const styles = StyleSheet.create({
//   mainContainer: {
//     backgroundColor: Colors.mainTheme,
//     flex: 1,
//   },
//   imgBg: {
//     flexDirection: "row",
//     // alignItems: "center",
//     width: "90%",
//     height: 150,
//     marginTop: SIZES.padding,
//     paddingHorizontal: SIZES.radius,
//     paddingVertical: 20,
//     borderRadius: SIZES.radius,
//     backgroundColor: "#2d2d44",
//   },
//   shadow: {
//     borderRadius: 16,
//     shadowColor: Colors.black,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.5,
//     shadowRadius: 16,
//     elevation: 2,
//   },

//   styleContainerButtonRole: {
//     backgroundColor: Colors.mainTheme,
//     borderRadius: 15,
//     height: 25,
//     marginVertical: 5,
//     alignItems: "center",
//     justifyContent: "center",
//     // marginLeft: -10,
//   },
//   styleTextButtonRole: {
//     color: Colors.mainColor,
//     fontSize: 10,
//     ...FONTS.h4,
//     marginHorizontal: 10,
//   },
// });
