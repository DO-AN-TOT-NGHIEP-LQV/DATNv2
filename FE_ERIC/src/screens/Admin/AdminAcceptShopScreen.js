// shop_1_385d754d-84eb-49d5-8b19-edf8cadcddd7.jpeg
import React, { Fragment, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  // TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  // TextInput,
} from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../../constans";
import Icons, { icons } from "../../components/Icons";
import ProductValue from "../../components/SalerManager/ProductValue";
import LineDivider from "../../components/LineDivider";
import { FONTS, SIZES } from "../../constans/Theme";
import { Input, Avatar, Button } from "react-native-elements";
import { TextInput } from "react-native-paper";
import { LogoApp, bg2, shopImageMan } from "../../public/assets/image";
import { logoHome } from "../../public/assets/icons";
import CustomButton from "../../components/CustomButton/index.js";
import * as Animatable from "react-native-animatable";
import { useSelector } from "react-redux";
import {
  ADMIN_ACCEPT_SHOP,
  ADMIN_GET_USER,
  CANCEL_REGISTER_SHOP,
  GET_DETAIL_SHOP,
  REGISTER_SHOP,
  STATUS_REGISTER_SHOP,
} from "../../config/urls";
import { apiDelete, apiGet, apiPost } from "../../ultils/utilsApi";
import { showError, showSuccess } from "../../ultils/messageFunction";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function AdminAcceptShopScreen({ route }) {
  const shopId = route.params?.shopId;
  const navigation = useNavigation();
  //   const detailUser = useSelector((state) => state.auth.detailUser);
  const [shopDetail, setShopDetail] = useState(null);
  const [userDetail, setUserDetail] = useState(null);

  const [shopDetailForm, setShopDetailForm] = useState({
    sName: "",
    sNumber: "",
    sAddress1: "",
    sLink: "",
  });

  const { sAddress1, sLink, sName, sNumber } = shopDetailForm;

  const updateShopForm = (data) =>
    setShopDetailForm(() => ({ ...shopDetailForm, ...data }));

  useEffect(() => {
    firstLoad();
  }, []);

  const firstLoad = async () => {
    try {
      var headers = {
        "Content-Type": "application/json",
      };
      //   const shopId = detailUser?.shop_id || undefined;
      if (shopId != null) {
        let url = `${GET_DETAIL_SHOP}?`;
        if (shopId !== undefined) {
          url += `shopId=${shopId}`;
        }
        const res = await apiGet(url, {}, headers, false);
        setShopDetail(res.data);
        console.log(res.data);
        updateShopForm({
          sAddress1: res.data?.sAddress1,
          sFax: res.data?.sFax,
          sLink: res.data?.sLink,
          sLogo: res.data?.sLogo,
          sName: res.data?.sName,
          sNumber: res.data?.sNumber,
          sStatus: res.data?.sStatus,
        });
        console.log(GET_DETAIL_SHOP);
        //////////////////

        let urlGetUser = `${ADMIN_GET_USER}?`;
        if (shopId !== undefined) {
          urlGetUser += `userId=${res.data?.user_id}`;
        }
        const resGetUser = await apiGet(urlGetUser, {}, headers, true);
        setUserDetail(resGetUser.data);
        console.log(urlGetUser);
      } else {
        showError("Không thể lấy Id của shop");
      }
    } catch (error) {
      //   console.log(error);
      console.log(error.error_message || "Lấy dữ liệu thất bại");
    }
  };

  const acceptNewShop = async () => {
    try {
      var headers = {
        "Content-Type": "application/json",
      };
      let url = `${ADMIN_ACCEPT_SHOP}?`;
      url += `shopId=${shopDetail?.id}`;
      console.log(url);
      const res = await apiPost(url, {}, {}, true);
      // showSuccess("Từ chối thành công");
      // const res = await apiPost(ADMIN_ACCEPT_SHOP, shopDetailForm, {}, true);
      // setShopDetail(res.data);

      showSuccess("Đã duyệt shop này");

      navigation.navigate("AdminManagerShopScreen", {
        refresh: true,
      });
    } catch (error) {
      showError(error.error_message || "Thất bại");
    }
  };

  const cancelRegisterShop = async () => {
    try {
      var headers = {
        "Content-Type": "application/json",
      };
      if (shopDetail?.sStatus == false) {
        let url = `${CANCEL_REGISTER_SHOP}?`;
        url += `shopId=${shopDetail?.id}`;
        const res = await apiDelete(url, {}, headers, false);
        showSuccess("Từ chối thành công");
        navigation.navigate("AdminManagerShopScreen", {
          refresh: true,
        });
      } else {
        showError("Không tìm thấy id cửa hàng");
      }
    } catch (error) {
      showError(error.error_message || "Lấy dữ liệu thất bại");
    }
    console.log("tu choi");
  };

  function renderDetailField() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Animatable.View
          animation={"fadeInUp"}
          duration={500}
          delay={500}
          //   pointerEvents={!shopDetail ? "auto" : "none"}
        >
          <View style={styles.profileSessionContainer}>
            <ProductValue
              label={"Chủ sở hữu"}
              value={userDetail?.username}
              icon={
                <View style={styles.iconStyle}>
                  <Icons
                    size={20}
                    name={"user"}
                    icon={icons.AntDesign}
                    color={Color.mainColor}
                  />
                </View>
              }
            />
            <LineDivider />
            <ProductValue
              label={"Email"}
              value={userDetail?.email}
              icon={
                <View style={styles.iconStyle}>
                  <Icons
                    size={16}
                    name={"mail"}
                    icon={icons.AntDesign}
                    color={Color.mainColor}
                  />
                </View>
              }
            />
            <LineDivider />
            <ProductValue
              label={"Tên cửa hàng"}
              value={sName}
              icon={
                <View style={styles.iconStyle}>
                  <Icons
                    size={16}
                    name={"storefront-outline"}
                    icon={icons.MaterialCommunityIcons}
                    color={Color.mainColor}
                  />
                </View>
              }
            />
            <LineDivider />

            <ProductValue
              label={"Liên kết"}
              value={sLink}
              icon={
                <View style={styles.iconStyle}>
                  <Icons
                    size={20}
                    name={"link-outline"}
                    icon={icons.Ionicons}
                    color={Color.mainColor}
                  />
                </View>
              }
            />
            <LineDivider />

            <ProductValue
              label={"Số điện thoại"}
              value={sNumber}
              icon={
                <View style={styles.iconStyle}>
                  <Icons
                    size={18}
                    name={"phone-call"}
                    icon={icons.Feather}
                    color={Color.mainColor}
                  />
                </View>
              }
            />
            <LineDivider />

            <ProductValue
              label={"Địa chỉ"}
              value={sAddress1}
              icon={
                <View style={styles.iconStyle}>
                  <Icons
                    size={18}
                    name={"ios-location-outline"}
                    icon={icons.Ionicons}
                    color={Color.mainColor}
                  />
                </View>
              }
            />
            {/* <LineDivider /> */}
          </View>
        </Animatable.View>
      </ScrollView>
    );
  }

  function renderHeader2() {
    const AdminManagerShopScreen = () => {
      navigation.navigate("AdminManagerShopScreen", {
        // refresh: true,
      });
    };

    return (
      <View
        style={{
          alignItems: "center",
          borderRadius: 20,
          paddingVertical: 35,
          paddingHorizontal: 5,
        }}
      >
        <View
          style={{
            ...styles.headerWrapper,
            ...styles.shadowTouch,
          }}
        >
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: Color.textLight,
              borderRadius: SIZES.radius,
            }}
            onPress={() => {
              AdminManagerShopScreen();
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

          <View style={{ flex: 1, justifyContent: "center", marginLeft: 15 }}>
            <Text style={{ ...FONTS.h3 }}>Chi tiết cửa hàng</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <ImageBackground source={bg2} style={{ height: windowHeight }}>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <Animatable.View animation={"zoomInRight"} duration={500} delay={500}>
          <View
            style={{
              // flex: 1,
              height: 90,
              width: "100%",
              backgroundColor: Color.transparent,
              //   borderTopLeftRadius: 60,
            }}
          >
            {renderHeader2()}
          </View>
        </Animatable.View>

        {/* Container 2  // "#4f5898" */}
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              backgroundColor: Color.white,
              //   paddingHorizontal: 10,
              borderTopRightRadius: 60,
              width: "100%",
              flex: 1,
            }}
          >
            {/* Button session */}
            <Animatable.View
              animation={"zoomInLeft"}
              duration={500}
              delay={500}
            >
              <View style={{ paddingHorizontal: 30, paddingTop: 10 }}>
                {shopDetail && !shopDetail?.sStatus && (
                  <View
                    style={{
                      marginVertical: 5,
                      flexDirection: "row",
                      height: 55,
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        borderStyle: "dashed",
                        borderColor: Color.success,
                        width: "45%",
                        marginVertical: 3,
                        borderWidth: 1,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => {
                        acceptNewShop();
                      }}
                    >
                      <Text style={{ color: Color.success }}>Chấp nhận</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        borderStyle: "dashed",
                        borderColor: Color.red,
                        width: "45%",
                        marginVertical: 3,
                        borderWidth: 1,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => {
                        cancelRegisterShop();
                      }}
                    >
                      <Text style={{ color: Color.red }}>Từ chối</Text>
                    </TouchableOpacity>

                    {/* <View
                      style={{
                        width: "40%",
                        alignItems: "flex-end",
                        justifyContent: "center",
                      }}
                    >
                      <CustomButton
                        label="Hủy"
                        onPress={() => cancelRegisterShop()}
                        textStyle={{ lineHeight: 16 }}
                        styleContainer={{
                          width: 100,
                          height: 35,
                          marginLeft: 15,
                        }}
                      />
                    </View> */}
                  </View>
                )}
                {/* 
                {shopDetail && shopDetail?.sStatus && (
                  <View
                    style={{
                      marginVertical: 5,
                      flexDirection: "row",
                      height: 55,
                      width: "100%",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        borderStyle: "dashed",
                        borderColor: Color.success,
                        width: "100%",
                        marginVertical: 3,
                        borderWidth: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        borderTopRightRadius: 20,
                      }}
                      onPress={() => navigation.navigate("ShopTab")}
                    >
                      <Text style={{ color: Color.success }}>
                        Đến cửa hàng của bạn
                      </Text>
                    </TouchableOpacity>
                  </View>
                )} */}

                {/* {!shopDetail && (
                  <View
                    style={{
                      width: "100%",
                      // borderWidth: 1,
                      alignItems: "flex-end",
                      justifyContent: "center",
                      height: 55,
                    }}
                  >
                    <CustomButton
                      label="Hoàn tất"
                      onPress={() => registerNewShop()}
                      textStyle={{ lineHeight: 16 }}
                      styleContainer={{
                        width: 100,
                        // height: 35,
                        marginLeft: 15,
                      }}
                    />
                  </View>
                )} */}
              </View>
            </Animatable.View>

            {/* Button session */}
            {renderDetailField()}
          </View>
          <View style={styles.circleYellow}></View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  profileSessionContainer: {
    marginTop: 20,
    marginHorizontal: SIZES.font,
    paddingHorizontal: SIZES.title,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: Color.textLight,
    backgroundColor: Color.white,
  },
  iconStyle: {
    width: 40,
    height: 40,
    marginLeft: -5,
    marginRight: 5,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    zIndex: 10,
    backgroundColor: Color.mainTheme,
  },

  circleBlue: {
    opacity: 0.1,
    zIndex: -10,
    width: 200,
    height: 200,
    borderRadius: 999,
    position: "absolute",
    bottom: 260,
    right: "-25%",
    backgroundColor: "#E99265",
  },
  circleYellow: {
    opacity: 0.1,
    width: 300,
    height: 300,
    backgroundColor: "#00BCC9",
    borderRadius: 999,
    position: "absolute",
    top: 550,
    left: "-25%",
    right: "-50%",
  },
  spacing: {
    margin: 10,
  },
  spacing_big: {
    margin: 30,
  },
  label: {
    fontWeight: "300",
    paddingLeft: 5,
    fontSize: 17,
    color: "#999",
  },
  input: {
    height: 40,
    margin: 5,
    borderRadius: 100,
    backgroundColor: "#e7e7e7",
    padding: 10,
  },
  imagecontainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image_logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 7,
    elevation: 5,
    marginTop: 100,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: Color.white,
    height: Dimensions.get("window").height / 15,
    width: "100%",
    paddingVertical: 5,
  },
  shadowTouch: {
    borderRadius: 16,
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
  },
});
