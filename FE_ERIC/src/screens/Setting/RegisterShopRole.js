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
import { LogoApp, shopImageMan } from "../../public/assets/image";
import { logoHome } from "../../public/assets/icons";
import CustomButton from "../../components/CustomButton/index.js";
import * as Animatable from "react-native-animatable";
import { useSelector } from "react-redux";
import {
  CANCEL_REGISTER_SHOP,
  REGISTER_SHOP,
  STATUS_REGISTER_SHOP,
} from "../../config/urls";
import { apiDelete, apiGet, apiPost } from "../../ultils/utilsApi";
import { showError, showSuccess } from "../../ultils/messageFunction";

export default function RegisterShopRole() {
  const navigation = useNavigation();
  const detailUser = useSelector((state) => state.auth.detailUser);
  const [shopDetail, setShopDetail] = useState(null);

  // useEffect(() => {
  //   navigation.getParent()?.setOptions({
  //     tabBarStyle: { display: "none" },
  //     tabBarVisible: false,
  //   });

  //   return () => {
  //     navigation
  //       .getParent()
  //       ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  //   };
  // }, [navigation]);

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

      if (detailUser) {
        let url = `${STATUS_REGISTER_SHOP}?`;

        url += `userId=${detailUser?.id}`;

        const res = await apiGet(url, {}, headers, false);
        setShopDetail(res.data);
        setShopDetailForm({
          sName: res.data?.sName,
          sLink: res.data?.sLink,
          sAddress1: res.data?.sAddress1,
          sNumber: res.data?.sNumber,
        });

        console.log(res.data);
        console.log(url);
      }
    } catch (error) {
      showError(error.error_message || "Lấy dữ liệu thất bại");
    }
  };

  const registerNewShop = async () => {
    try {
      const res = await apiPost(REGISTER_SHOP, shopDetailForm, {}, true);
      setShopDetail(res.data);
      showSuccess("Đăng ký thành công");
      firstLoad();

      // navigation.goBack();
    } catch (error) {
      showError(error.error_message || "Đăng ký thất bại");
    }
  };

  const cancelRegisterShop = async () => {
    try {
      var headers = {
        "Content-Type": "application/json",
      };

      if (shopDetail && shopDetail?.sStatus == false) {
        let url = `${CANCEL_REGISTER_SHOP}?`;

        url += `shopId=${shopDetail?.id}`;

        const res = await apiDelete(url, {}, headers, false);
        showSuccess("Hủy đăng ký thành công");
        firstLoad();
      } else {
        showError("Không tìm thấy id cửa hàng");
      }
    } catch (error) {
      showError(error.error_message || "Lấy dữ liệu thất bại");
    }
  };

  function renderInputDetail() {
    return (
      <ScrollView style={{ flex: 1, opacity: !shopDetail ? 1 : 0.2 }}>
        <Animatable.View
          animation={"fadeInUp"}
          duration={500}
          delay={500}
          pointerEvents={!shopDetail ? "auto" : "none"}
        >
          <TextInput
            label="Tên cửa hàng"
            style={{ backgroundColor: Color.white }}
            mode="flat"
            value={sName}
            onChangeText={(name) => updateShopForm({ sName: name })}
            left={
              <TextInput.Icon
                icon={"storefront-outline"}
                iconColor={Color.mainColor}
                size={20}
              />
            }
          />

          <TextInput
            label="Link cửa hàng"
            style={{ backgroundColor: Color.white }}
            mode="flat"
            value={sLink}
            onChangeText={(sLink) => updateShopForm({ sLink: sLink })}
            activeOutlineColor={Color.mainColor}
            left={
              <TextInput.Icon
                icon={"link"}
                iconColor={Color.mainColor}
                size={20}
              />
            }
          />

          <TextInput
            label="Số điện thoại"
            style={{ backgroundColor: Color.white }}
            mode="flat"
            keyboardType="phone-pad"
            activeOutlineColor={Color.mainColor}
            value={sNumber}
            onChangeText={(sNumber) => updateShopForm({ sNumber: sNumber })}
            left={
              <TextInput.Icon
                icon={"phone-outline"}
                iconColor={Color.mainColor}
                size={20}
              />
            }
          />

          <TextInput
            label="Địa chỉ"
            style={{ backgroundColor: Color.white, zIndex: -10, height: 70 }}
            mode="flat"
            activeOutlineColor={Color.mainColor}
            value={sAddress1}
            onChangeText={(sAddress1) =>
              updateShopForm({ sAddress1: sAddress1 })
            }
            left={
              <TextInput.Icon
                icon={"map-marker-outline"}
                iconColor={Color.mainColor}
                size={20}
              />
            }
          />
        </Animatable.View>

        <Animatable.View
          animation={"fadeInUp"}
          // animation={"zoomInRight"}
          duration={500}
          delay={500}
        >
          <View style={{ paddingLeft: 20, paddingTop: 20 }}>
            <Text>* Đăng ký thông tin của cửa hàng của bạn</Text>
            <Text>* Vui lòng nhập đúng thông tin</Text>
            <Text>
              * Chung tôi sẽ liên lạc với bạn thông qua mail và số điện thoại
              bạn đã cung cấp
            </Text>
          </View>
        </Animatable.View>
      </ScrollView>
    );
  }

  return (
    <Fragment>
      <SafeAreaView
        style={{
          backgroundColor: "#fcfcfb",
          flex: 1,
        }}
      >
        {/* Contianer 1 */}
        <Animatable.View animation={"zoomInRight"} duration={500} delay={500}>
          <View style={{ backgroundColor: Color.white, height: 200 }}>
            <ImageBackground
              style={{
                backgroundColor: Color.mainTheme,
                flex: 1,
                borderBottomLeftRadius: 60,
                flexDirection: "row",
              }}
              source={shopImageMan}
              imageStyle={{
                width: 250,
                height: 195,
                marginLeft: 160,
                borderColor: Color.black,
                opacity: 1,
              }}
            >
              <View
                style={{
                  borderRadius: 8,
                  color: Color.mainColor,

                  justifyContent: "center",
                  width: "70%",
                }}
              >
                <Text
                  style={{
                    color: "#3c6072",
                    fontSize: 20,
                    marginLeft: 10,
                    // marginTop: 30,
                    alignSelf: "flex-start",
                  }}
                >
                  Tham gia cùng chúng tôi
                </Text>
                {/* First Section DONE */}
                <View
                  style={{
                    flexDirection: "row",
                    // alignItems: "center",
                  }}
                >
                  <Image
                    source={logoHome}
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: 50,
                    }}
                    resizeMode="cover"
                  />
                  {/* </View> */}
                  <View style={{}}>
                    <Text
                      style={{
                        ...FONTS.h2,
                        lineHeight: 25,
                        color: "#00BCC9",
                        marginTop: 10,
                      }}
                    >
                      Shoes ERIC
                    </Text>
                    <Text
                      className="text-[#3C6072]"
                      style={{
                        marginLeft: -5,
                        color: Color.blackOpacity,
                        fontFamily: "Roboto-Regular",
                        paddingRight: 20,
                        fontSize: 13,
                      }}
                    >
                      Đăng ký cửa hàng của{"\n"} bạn vào hệ thống
                    </Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </Animatable.View>

        {/* Container 2  // "#4f5898" */}
        <KeyboardAvoidingView
          style={{
            flex: 1,
            backgroundColor: Color.mainTheme,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              backgroundColor: Color.white,
              paddingHorizontal: 30,
              borderTopRightRadius: 60,
              width: "100%",
              flex: 1,
            }}
          >
            <>
              <Animatable.View
                animation={"zoomInLeft"}
                duration={500}
                delay={500}
              >
                {shopDetail && !shopDetail?.sStatus && (
                  <View
                    style={{
                      marginVertical: 5,
                      flexDirection: "row",
                      height: 55,
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        borderStyle: "dashed",
                        borderColor: Color.yellow,
                        width: "60%",
                        marginVertical: 3,
                        borderWidth: 1,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ color: Color.yellow }}>
                        Đang chờ duyệt
                      </Text>
                    </View>

                    <View
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
                    </View>
                  </View>
                )}

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
                )}

                {!shopDetail && (
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
                )}
              </Animatable.View>
              {renderInputDetail()}
            </>

            <View style={styles.circleYellow}></View>
          </View>
        </KeyboardAvoidingView>

        {/* <View style={styles.circleBlue}></View> */}
      </SafeAreaView>
    </Fragment>
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
    width: 20,
    height: 20,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
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
    zIndex: -10,
    width: 300,
    height: 300,
    backgroundColor: "#00BCC9",
    borderRadius: 999,
    position: "absolute",
    top: 400,
    // bottom: 0,
    left: "-25%",
    zIndex: 10,
  },
  spacing: {
    margin: 10,
  },
  spacing_big: {
    margin: 30,
  },
  label: {
    // justifyContent: 'center',
    // alignItems: 'center',\
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
});
