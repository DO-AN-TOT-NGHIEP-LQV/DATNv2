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
import { ADMIN_GET_ShOPS, GET_ALL_PRODUCT } from "../../config/urls";
import { ShoesFLas } from "../../public/assets";
import * as Animatable from "react-native-animatable";
import { FlatList } from "react-native";

const AdminManagerShopScreen = ({ route }) => {
  const navigation = useNavigation();

  const [listProduct, setListProduct] = useState([]);
  const [listShop, setListShop] = useState([]);
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

  //   useEffect(() => {
  //     if (route.params?.refresh) {
  //       fetchData();
  //       //   navigation.setParams({ refresh: false });
  //     }
  //   }, [route.params?.refresh]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  const fetchData = async (isPending = false) => {
    var headers = {
      "Content-Type": "application/json",
    };

    var data = {
      params: {
        keyword: keyword,
        isPending: isPending,
      },
    };
    await apiGet(ADMIN_GET_ShOPS, data, headers, true)
      .then((res) => {
        setListShop(res.data);
        console.log(res.data);
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
            fetchData(false);
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

  function renderButton() {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{
            backgroundColor: "#91c848",
            borderRadius: 5,
            width: "40%",
            height: 50,
            justifyContent: "center",
          }}
          onPress={() => {
            fetchData(false);
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              color: Color.white,
              fontSize: 12,
              padding: 8,
              alignSelf: "center",
              ...FONTS.h3,
            }}
          >
            Tất cả
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: Color.yellow,
            borderRadius: 5,
            width: "40%",
            height: 50,
            justifyContent: "center",
          }}
          onPress={() => {
            fetchData(true);
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              color: Color.white,
              fontSize: 12,
              padding: 8,
              alignSelf: "center",
              ...FONTS.h3,
            }}
          >
            Chờ duyệt
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderCartList() {
    return (
      <FlatList
        data={listShop}
        keyExtractor={(item) => `${item?.id}-id`}
        contentContainerStyle={{}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        renderItem={({ item, index }) => {
          return (
            <Animatable.View
              animation={"zoomInRight"}
              duration={500}
              delay={index * 100}
            >
              <TouchableOpacity
                style={{
                  ...styles.containerStyle,
                }}
                onPress={() =>
                  navigation.navigate("AdminAcceptShopScreen", {
                    shopId: item?.id,
                  })
                }
              >
                {item?.image?.url ? (
                  <Image
                    source={
                      item?.image?.url ? { uri: item?.image?.url } : ShoesFLas
                    }
                    style={styles.imageStyle}
                  />
                ) : (
                  <View
                    style={{
                      ...styles.imageStyle,
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icons
                      icon={icons.Ionicons}
                      name={"images-outline"}
                      size={30}
                      color={Color.mainColor}
                    ></Icons>
                  </View>
                )}

                {/* info */}
                <View
                  style={{
                    flex: 1,
                    height: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Text numberOfLines={1} style={{ ...FONTS.h4 }}>
                    {item?.sName}
                  </Text>

                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: 10,
                      fontWeight: "normal",
                      color: Color.gray,
                    }}
                  >
                    {`Số lượng sản phẩm: `}
                    <Text numberOfLines={1} style={{ ...FONTS.h4 }}>
                      {item?.shopProducts?.length}
                    </Text>
                  </Text>

                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: 10,
                      fontWeight: "normal",
                      color: Color.gray,
                    }}
                  >
                    Đ/chỉ: {item?.sAddress1}
                  </Text>
                </View>

                <View
                  style={{
                    width: "25%",
                    height: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingBottom: 10,
                    justifyContent: "flex-end",
                    marginRight: 5,
                  }}
                >
                  {item?.sStatus ? (
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: Color.mainColor,
                        borderRadius: 4,
                        width: 85,
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        style={{
                          color: Color.mainColor,
                          fontSize: 9,
                          padding: 8,
                          alignSelf: "center",
                        }}
                      >
                        Đang hoạt động
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: Color.yellow,
                        borderRadius: 4,
                        width: 85,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        style={{
                          color: Color.yellow,
                          fontSize: 10,
                          padding: 8,
                          alignSelf: "center",
                        }}
                      >
                        Chờ duyệt
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </Animatable.View>
          );
        }}
      />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Color.mainTheme }}>
      {renderHeader()}

      {renderButton()}

      {renderCartList()}
    </View>
  );
};

export default AdminManagerShopScreen;

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
  containerStyle: {
    height: 80,
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 5,
    flexDirection: "row",
    borderRadius: SIZES.radius,
    backgroundColor: "#BBBDC1",
    // backgroundColor: "#E5E5E5",
    // backgroundColor: "#F5f5f8",
    // backgroundColor: "#DDDDDD",
    // backgroundColor: "#f8f8F8",
    backgroundColor: Color.while2,
  },
  imageStyle: {
    margin: 5,
    height: 60,
    width: 60,
    borderRadius: 20,
  },
  buttonContainer: {
    height: 60,
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 8,
  },
});
