import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Pressable,
  RefreshControl,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Color } from "../../constans";
import { FONTS, SIZES, shadow, statusbarHeight } from "../../constans/Theme";
import Header from "../../components/Header";
import Icons, { icons } from "../../components/Icons";
import { useNavigation } from "@react-navigation/native";

import { showError } from "../../ultils/messageFunction";
import { apiGet } from "../../ultils/utilsApi";
import { GET_PRODUCT_OF_SHOP } from "../../config/urls";
import { ShoesFLas } from "../../public/assets";
import { bg1, bg2 } from "../../public/assets/image";
import { Fragment } from "react";
import LineDivider from "../../components/LineDivider";
import { useSelector } from "react-redux";
import { PanGestureHandler } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";

const ShopManagerProductScreen = ({ route }) => {
  const { shopId } = route.params;
  const navigation = useNavigation();

  const [listProduct, setListProduct] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [refreshing, setRefreshing] = useState(false);

  const reloadShopManagerScreen = useSelector(
    (state) => state.reload.reloadShopManagerScreen
  );

  useEffect(() => {
    fetchData();
  }, [reloadShopManagerScreen]);

  // useEffect(() => {
  //   navigation
  //     .getParent()
  //     ?.setOptions({ tabBarStyle: { display: "none" }, tabBarVisible: false });
  //   return () =>
  //     navigation
  //       .getParent()
  //       ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  // }, [navigation]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  const fetchData = async () => {
    var headers = {
      "Content-Type": "application/json",
    };

    var data = {
      params: {
        shopId: shopId,
        keyword: keyword,
      },
    };
    await apiGet(GET_PRODUCT_OF_SHOP, data, headers, false)
      .then((res) => {
        setListProduct(res.data);
        console.log("GET_PRODUCT_OF_SHOP");
        // console.log(res.data);
      })
      .catch((error) => {
        showError(error.error_message);
      });
  };

  function renderHeader() {
    return (
      <Header
        // title={"Quản lý danh sách sản phẩm"}
        image={bg2}
        leftComponent={
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: Color.textLight,
              borderRadius: SIZES.radius,
              backgroundColor: Color.whileOpacity,
            }}
            onPress={() => {
              navigation.navigate("ShopTab", { screen: "ShopMainScreen" });
              // navigation.goBack();
            }}
          >
            <View
              style={{
                borderColor: Color.textLight,
                borderWidth: 1,
                padding: 12,
                borderRadius: 10,
              }}
            >
              <Icons
                icon={icons.Feather}
                size={12}
                color={Color.black}
                name={"chevron-left"}
              />
            </View>
          </TouchableOpacity>
        }
        rightComponent={<View style={{ flex: 1 }}>{renderSearch()}</View>}
      >
        {/* {renderSearch()} */}
      </Header>
    );
  }

  function renderSearch() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 40,
          alignItems: "center",
          marginLeft: SIZES.padding,
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: Color.white, // Color.mainTheme,
          borderWidth: 1,
          borderColor: Color.textLight,
          ...shadow.shadow,
        }}
      >
        {/* icon */}
        <Icons
          icon={icons.AntDesign}
          size={16}
          name="search1"
          color={Color.black}
        />

        <TextInput
          style={{ flex: 1, marginLeft: SIZES.radius, ...FONTS.body3 }}
          onChangeText={(value) => setKeyword(value)}
        />

        <TouchableOpacity
          onPress={() => {
            fetchData();
          }}
        >
          <Image
            source={require("../../public/assets/icons/filterIcon.png")}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderProductList() {
    return (
      <SafeAreaView
        style={{
          marginTop: SIZES.base,
          marginHorizontal: SIZES.padding,
          padding: 10,

          borderRadius: SIZES.radius,
          backgroundColor: Color.white,
          ...styles.customContainerStyles,
          flex: 1,
        }}
      >
        <FlatList
          contentContainerStyle={{}}
          scrollEnabled={true}
          data={listProduct}
          keyExtractor={(item) => `${item?.product?.id}`}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          renderItem={({ item, index }) => {
            return (
              <Animatable.View
                // animation={"fadeInUp"}
                animation={"zoomInRight"}
                duration={1000}
                delay={index * 100}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: SIZES.base,
                    paddingHorizontal: SIZES.base,
                    paddingRight: 0,
                  }}
                  onPress={() => {
                    navigation.navigate("ShopTab", {
                      screen: "ShopUpdateProductScreen",
                      params: {
                        productId: item?.product?.id,
                        // productShop: item,
                        // shopId: item?.product?.id,
                      },
                    });
                  }}
                >
                  <Image
                    source={{ uri: item?.product?.images[0]?.url }}
                    style={{
                      width: 50,
                      height: 50,
                      resizeMode: "contain",
                      borderRadius: 5,
                    }}
                  />
                  <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                    <Text
                      numberOfLines={1}
                      style={{ ...FONTS.h4, width: "75%" }}
                    >
                      Id: {item?.product?.id}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={{
                        color: Color.textLight,
                        ...FONTS.body4,
                        lineHeight: 18,
                        width: "75%",
                        height: 40,
                      }}
                    >
                      {item?.product?.name}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        style={{
                          color: Color.blueSd,
                          ...FONTS.h4,
                          flex: 1,
                        }}
                      >
                        {(item?.shopProduct?.price || 0).toLocaleString(
                          "vi-VN"
                        )}
                      </Text>
                      <Text numberOfLines={1} style={{ alignSelf: "flex-end" }}>
                        {(item?.shopProduct?.quantity || 0).toLocaleString(
                          "vi-VN"
                        )}
                        /đôi
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      height: "100%",
                      alignItems: "center",
                    }}
                  >
                    {/* <Text
                    numberOfLines={1}
                    style={{
                      color: Color.blueSd,
                      // ...FONTS.body4,
                      fontFamily: "Roboto-Regular",
                    }}
                  >
                    {(item?.shopProduct?.price || 0).toLocaleString("vi-VN")}
                  </Text> */}
                    <Icons icon={icons.AntDesign} name={"right"} size={18} />
                  </View>
                </TouchableOpacity>
                <LineDivider />
              </Animatable.View>
            );
          }}
          // showsVerticalScrollIndicator={false}
          // ItemSeparatorComponent={() => {
          //   return <LineDivider />;
          // }}
        />
      </SafeAreaView>
    );
  }

  return (
    <PanGestureHandler
      onGestureEvent={() => {
        console.log("Ádasdsa");
        navigation.navigate("ShopTab", { screen: "ShopMainScreen" });
      }}
      activeOffsetX={[-9999, 9999]} // Khoảng cách ngang lớn hơn kích thước màn hình để không kích hoạt swipe
      failOffsetX={[-9999, 9999]}
    >
      <View style={{ flex: 1, backgroundColor: Color.white }}>
        {/* Header */}
        {renderHeader()}

        <Text
          style={{
            ...FONTS.h2,
            lineHeight: 50,
            // marginVertical: 5,
            paddingLeft: 20,
          }}
        >
          Danh sách sản phẩm
        </Text>

        {/* Card list */}
        {/* {renderSearch()} */}

        {/* footer */}
        {renderProductList()}
      </View>
    </PanGestureHandler>
  );
};

export default ShopManagerProductScreen;

const styles = StyleSheet.create({
  cartProductContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
  },
  images: {
    width: "100%",
    height: "80%",
    position: "absolute",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Color.black,
  },
  customContainerStyles: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
