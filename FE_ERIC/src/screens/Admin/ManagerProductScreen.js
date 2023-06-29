import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Pressable,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Color } from "../../constans";
import { FONTS, SIZES, shadow, statusbarHeight } from "../../constans/Theme";
import Header from "../../components/Header";
import Icons, { icons } from "../../components/Icons";
import { useNavigation } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";

import { showError } from "../../ultils/messageFunction";
import { apiGet } from "../../ultils/utilsApi";
import { GET_ALL_PRODUCT } from "../../config/urls";
import { ShoesFLas } from "../../public/assets";

const ManagerProductScreen = ({ route }) => {
  // const shopId = route.params.shopId;
  const navigation = useNavigation();

  const [listProduct, setListProduct] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (route.params?.refresh) {
      fetchData();
      navigation.setParams({ refresh: false });
    }
  }, [route.params?.refresh]);

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
        // shopId: shopId,
        keyword: keyword,
      },
    };
    await apiGet(GET_ALL_PRODUCT, data, headers, false)
      .then((res) => {
        setListProduct(res.data);
      })
      .catch((error) => {
        showError(error.error_message);
      });
  };

  function renderHeader() {
    return (
      <Header
        title={"Quản lý danh sách sản phẩm"}
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
              navigation.navigate("AdminMainScreen");
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
        // rightComponent={
        //   <TouchableOpacity
        //     style={{
        //       width: 40,
        //       height: 40,
        //       alignItems: "center",
        //       justifyContent: "center",
        //       // : 1,
        //       borderColor: Color.textLight,
        //       borderRadius: SIZES.radius,
        //     }}
        //   ></TouchableOpacity>
        // }
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

  function renderCartList() {
    return (
      <SwipeListView
        data={listProduct}
        keyExtractor={(item) => `${item?.id}-id`}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
        }}
        disableRightSwipe={true}
        rightOpenValue={-120}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        renderItem={({ item, index }) => {
          return (
            <Pressable
              style={{
                height: 100,
                backgroundColor: Color.white,
                // backgroundColor: rgb(242, 241, 253),
                ...styles.cartProductContainer,
                zIndex: 1,
                marginRight: 3,
                ...shadow.shadow,
                paddingLeft: 4,
                marginBottom: 2,
              }}
              onPress={() =>
                navigation.navigate("UpdateProductScreen", {
                  productId: item.id,

                  // shopId: shopId,
                })
              }
            >
              <View
                style={{
                  height: 100,
                  width: 90,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={
                    item?.images[0]?.url
                      ? { uri: item?.images[0]?.url }
                      : ShoesFLas
                  }
                  resizeMode="contain"
                  style={styles.images}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  height: 100,
                  marginHorizontal: 5,
                  paddingVertical: 10,
                }}
              >
                <Text
                  style={{
                    ...FONTS.h4,
                    height: 20,
                    lineHeight: 20,
                    alignItems: "flex-start",
                  }}
                  numberOfLines={1}
                >
                  Id: {item.id}
                </Text>

                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 20,
                    height: 40,
                  }}
                  numberOfLines={2}
                >
                  <Text style={{ ...FONTS.h4, height: 40, lineHeight: 20 }}>
                    {`Name: `}
                  </Text>
                  {`${item.name}`}
                </Text>

                <Text
                  style={{
                    ...FONTS.h3,
                    color: Color.mainColor,
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                  numberOfLines={1}
                >
                  {`đ ${item.price}`}
                </Text>
              </View>

              {/* <View
                style={{
                  width: 50,
                  borderWidth: 2,
                  height: 36,
                }}
              ></View> */}
            </Pressable>
          );
        }}
        renderHiddenItem={({ item, index }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              backgroundColor: Color.mainColor,
              height: 100,
              ...styles.cartProductContainer,
              paddingHorizontal: 0,
            }}
          >
            <Pressable
              style={{
                height: 100,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: SIZES.radius,
                marginHorizontal: 10,
                marginLeft: 20,
              }}
              // onPress={() => {
              //   deleteProduct();
              // }}
            >
              <Icons
                name={"delete"}
                icon={icons.AntDesign}
                size={20}
                color={Color.white}
              />
            </Pressable>

            <Pressable
              style={{
                height: 100,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: SIZES.radius,
                marginRight: 10,
              }}
              onPress={() => {
                // changeFeatured();
              }}
            >
              <Icons
                name={"local-fire-department"}
                icon={icons.MaterialIcons}
                size={20}
                color={item.id?.featured ? Color.yellow : Color.white}
              />
            </Pressable>
          </View>
        )}
      />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Color.mainTheme }}>
      {/* Header */}
      {renderHeader()}

      {/* Card list */}
      {/* {renderSearch()} */}

      {/* footer */}
      {renderCartList()}
    </View>
  );
};

export default ManagerProductScreen;

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
    borderWidth: 0,
    borderRadius: 12,
    borderColor: Color.black,
  },
});
