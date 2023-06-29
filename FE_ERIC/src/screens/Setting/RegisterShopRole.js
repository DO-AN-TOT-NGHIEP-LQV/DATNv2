import React, { useEffect, useState } from "react";
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
  // TextInput,
} from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../../constans";
import Icons, { icons } from "../../components/Icons";
import ProductValue from "../../components/SalerManager/ProductValue";
import LineDivider from "../../components/LineDivider";
import { SIZES } from "../../constans/Theme";
import { Input, Avatar } from "react-native-elements";
import { TextInput } from "react-native-paper";

export default function RegisterShopRole() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: "none" },
      tabBarVisible: false,
    });

    return () => {
      navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
    };
  }, [navigation]);

  const [shopDetailForm, setShopDetailForm] = useState({
    sAddress1: "",
    sLink: "",
    sName: "",
    sNumber: "",
  });

  const { sAddress1, sLink, sName, sNumber, shopId } = shopDetailForm;
  //   const [pickedImagePath, setPickedImagePath] = useState(null);

  const updateShopForm = (data) =>
    setShopDetailForm(() => ({ ...shopDetailForm, ...data }));

  //   ///////////////////////////////////////////////
  const [isShowModal, setShowModal] = useState({
    sNameModal: false,
    sAddress1Modal: false,
    sNumberModal: false,
    sLinkModal: false,
  });

  const { sNameModal, sAddress1Modal, sNumberModal, sLinkModal } = isShowModal;

  const updateIsShowModal = (data) =>
    setShowModal(() => ({ ...isShowModal, ...data }));

  function renderDetailField() {
    return (
      <ScrollView>
        <View style={styles.profileSessionContainer}>
          <ProductValue
            label={"Chủ sở hữu"}
            // value={detailUser?.username}
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
            // value={detailUser?.email}
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
            onPress={() => {
              //   updateIsShowModal({ sNameModal: true });
            }}
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
            onPress={() => {
              //   updateIsShowModal({ sLinkModal: true });
            }}
          />
          <LineDivider />

          <ProductValue
            label={"Số điện thoại"}
            value={sNumber}
            onPress={() => {
              updateIsShowModal({ sNumberModal: true });
            }}
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
            onPress={() => {}}
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
      </ScrollView>
    );
  }
  function renderInputDetail() {
    return (
      <ScrollView style={{}}>
        <TextInput
          label="Tên cửa hàng"
          style={{ backgroundColor: Color.white }}
          mode="flat"
          // outlineColor={Color.transparent}
          // activeOutlineColor={Color.hostessGreen}
          // theme={{ roundness: 16 }}
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
          activeOutlineColor={Color.mainColor}
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
          left={
            <TextInput.Icon
              icon={"map-marker-outline"}
              iconColor={Color.mainColor}
              size={20}
            />
          }
        />
      </ScrollView>
    );
  }
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fcfcfb", // Color.mainTheme,
        // flex: 1,
      }}
    >
      <View>
        {/* Contianer 1 */}
        <View style={{ backgroundColor: "#ffffff" }}>
          <View
            style={{
              backgroundColor: "#4f5898",
              // backgroundColor: Color.blackOpacity,
              // backgroundColor: Color.mainColor,
              // backgroundColor: Color.bbl,
              padding: 50,
              borderBottomLeftRadius: 60,
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                style={{ width: 100, height: 100, resizeMode: "contain" }}
                // source={require("../assets/logo_1.png")}
              />
            </View>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontWeight: "500", fontSize: 20, color: "#fff" }}>
                Lahore Graphics Academy
              </Text>
              <Text style={{ fontWeight: "300", fontSize: 15, color: "#fff" }}>
                Student Portal
              </Text>
            </View>
          </View>
        </View>

        {/* Container 2 */}
        <SafeAreaView style={{ backgroundColor: "#4f5898" }}>
          <View
            style={{
              justifyContent: "center",
              backgroundColor: "#fff",
              paddingHorizontal: 30,
              borderTopRightRadius: 60,
              width: "100%",
              flex: 1,
              zIndex: 10,
            }}
          >
            {/* <View style={styles.spacing_big}></View> */}

            {renderInputDetail()}
            {/* {renderDetailField()} */}
          </View>
        </SafeAreaView>
      </View>

      {/* <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: Color.transparent,
          alignItems: "flex-end",
        }}
      >
        <Image
          source={require("../public/assets/gif/man-doing-shoes-shopping.gif")}
          style={{
            width: 200,
            height: 200,
          }}
          resizeMode="contain"
        />
      </View> */}

      {/* Circel Section */}
      {/* <View style={styles.circleBlue}></View> */}
      {/* <View style={styles.circleYellow}></View> */}
    </SafeAreaView>
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
    // paddingLeft: -10,
    // marginLeft: -20,
    // marginRight: 5,
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
    bottom: 0,
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

    // alignItems:'center',
    // justifyContent:'center'
  },
});
