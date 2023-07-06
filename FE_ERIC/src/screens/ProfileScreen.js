import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ImageBackground,
  Image,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import actions from "../redux/actions";
import CustomButton from "../components/CustomButton/index.js.js";
import Color from "../constans/Color";
import AuthRequired from "../components/AuthRequired";
import { FONTS, SIZES, statusbarHeight } from "../constans/Theme";
import { bg1, bg2 } from "../public/assets/image";
import { LoginImg } from "../public/assets";
import { useEffect } from "react";
import {
  ModalChangePassword,
  ProfileEdit,
  ProfileValue,
} from "../components/Profile";
import LineDivider from "../components/LineDivider";
import Icons, { icons } from "../components/Icons";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { hasSalerRole } from "../ultils/helperFunction";

const ProfileScreen = () => {
  const detailUser = useSelector((state) => state.auth.detailUser);
  const [isLoading, setLoading] = useState(false);
  const isLogin = useSelector((state) => state.auth.isLogin);

  const [isProcessing, setIsProcessing] = useState(false);

  // Các state quan ly chuyen trang va popup
  const navigation = useNavigation();
  const [isVisibleModalPassword, setVisibleModelPassword] = useState(false);

  useEffect(() => {
    console.log(detailUser);
  }, []);
  const onLogoutAlert = () => {
    Alert.alert(
      "Đăng xuất",
      "Bạn có chắc đăng xuất khỏi thiết bị này",
      [{ text: "Yes", onPress: () => logout() }, { text: "No" }],
      { cancelable: true }
    );
  };

  const logout = async () => {
    if (isLoading) {
      return; // Nếu đang xử lý, không làm gì
    }

    setLoading(true);

    await actions.logout();
    setLoading(false);
  };

  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <Text style={{ ...FONTS.h2, paddingTop: 5 }}>Hồ sơ cá nhân</Text>
      </View>
    );
  }

  function renderProfileCard() {
    const getHighestRole = (roles) => {
      let highestRole = ""; // Vai trò mặc định nếu không tìm thấy
      for (let i = 0; i < roles.length; i++) {
        const role = roles[i];
        if (role.id === 3) {
          highestRole = "Admin";
          break;
        } else if (role.id === 2) {
          highestRole = "Saler";
        } else if (role.id === 1) {
          highestRole = "";
        }
      }
      return highestRole;
    };

    return (
      <View>
        <ImageBackground
          style={{
            flexDirection: "row",
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.radius,
            paddingVertical: 20,
            borderRadius: SIZES.radius,
            backgroundColor: Color.blackOpacity,
          }}
        >
          <TouchableOpacity
            style={{
              width: 80,
              height: 80,
            }}
          >
            <Image
              source={
                isLogin && detailUser?.avatar
                  ? { uri: detailUser?.avatar }
                  : LoginImg
              }
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 40,
                borderWidth: 1,
                borderColor: Color.textLight,
              }}
            />

            {/* Icon thêm ảnh TODO */}
            {/* {detailUser && detailUser?.gender != null && (
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    width: 20,
                    height: 20,
                    marginBottom: -70,
                    alignItems: "center",
                    borderRadius: 15,
                    backgroundColor: Color.mainTheme,
                    justifyContent: "center",
                  }}
                >
                  <Icons
                    name={detailUser?.gender ? "man" : "woman"}
                    icon={icons.AntDesign}
                    color={Color.mainColor}
                    size={10}
                  />
      
                </View>
              </View>
            )} */}
          </TouchableOpacity>

          {/* Detail */}
          <View
            style={{
              flex: 1,
              marginLeft: SIZES.radius,
              alignItems: "flex-start",
            }}
          >
            <Text
              numberOfLines={1}
              style={{ color: Color.white, ...FONTS.h2, paddingTop: 5 }}
            >
              {isLogin && detailUser?.username
                ? detailUser?.username
                : "Xin chào"}
            </Text>

            <Text
              style={{
                color: Color.white,
                ...FONTS.body4,
                fontStyle: "italic",
                fontWeight: 100,
              }}
            >
              {isLogin && detailUser?.roles
                ? getHighestRole(detailUser.roles)
                : ""}
            </Text>
            {/* <CustomButton
                label={"Đến shop cua bạn"}
                styleContainer={styles.styleContainerButtonRole}
                textStyle={styles.styleTextButtonRole}
              /> */}
            {detailUser?.roles && hasSalerRole(detailUser?.roles) ? (
              <TouchableOpacity style={styles.styleContainerButtonRole}>
                <Text style={{ ...styles.styleTextButtonRole }}>
                  Đến shop của bạn
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </ImageBackground>
      </View>
    );
  }

  function renderProfileUser() {
    const gender = detailUser?.gender ? "man" : "woman"; //An
    return (
      <View style={styles.profileSessionContainer}>
        <ProfileValue
          iconName={"user"}
          gender={gender}
          label={"Họ và tên"}
          // value={`${detailUser?.firstName || ""} ${detailUser?.lastName || ""}`}
          value={`${detailUser?.username || ""}`}
        />
        <LineDivider />

        <ProfileValue
          iconName={"mail"}
          label={"Email"}
          value={`${detailUser?.email || ""}`}
        />

        <LineDivider />

        <ProfileValue
          iconName={"lock"}
          iconSize={22}
          label={"Mật khẩu"}
          value={`********`}
          onPress={() => {
            setVisibleModelPassword(true);
          }}
        />
      </View>
    );
  }

  function renderProfileEdit() {
    return (
      <View style={styles.profileSessionContainer}>
        <ProfileEdit
          iconName={"edit"}
          label={"Thay đổi thông tin cá nhân"}
          onPress={() => {}}
        />
        <LineDivider />

        {/* <ProfileEdit
          iconName={"shop"}
          iconsFamily={icons.Entypo}
          label={"Quản lí thông tin shop"}
          onPress={() => {
            navigation.navigate("SettingTab", { screen: "AdminEditUsers" });
          }}
        />
        <LineDivider /> */}

        <ProfileEdit
          iconName={"account-lock-open-outline"}
          iconsFamily={icons.MaterialCommunityIcons}
          label={"Đăng ký bán hàng"}
          onPress={() => {
            navigation.navigate("SettingTab", { screen: "RegisterShopRole" });
          }}
        />
        <LineDivider />

        {/* <ProfileEdit
          iconName={"appstore-o"}
          iconsFamily={icons.AntDesign}
          label={"ADMIN"}
          onPress={() => {}}
        />
        <LineDivider /> */}
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.mainTheme,
      }}
    >
      {renderHeader()}

      <View
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.contentContainerStyle}
      >
        {/* Prodile Card */}
        {renderProfileCard()}

        {isLogin && detailUser ? (
          <React.Fragment>
            {renderProfileUser()}
            {renderProfileEdit()}
            <CustomButton
              isLoading={isLoading}
              label="Đăng xuất"
              onPress={onLogoutAlert}
            />
          </React.Fragment>
        ) : (
          <AuthRequired navigation={navigation} />
        )}
      </View>

      {isVisibleModalPassword && (
        <ModalChangePassword
          isVisible={isVisibleModalPassword}
          onClose={() => setVisibleModelPassword(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.radius,
    justifyContent: "space-between",
    ...statusbarHeight,
  },
  contentContainerStyle: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: 150,
  },
  styleContainerButtonRole: {
    backgroundColor: Color.mainTheme,
    borderRadius: 15,
    height: 25,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  styleTextButtonRole: {
    color: Color.mainColor,
    fontSize: 12,
    ...FONTS.h4,
    marginHorizontal: 10,
  },
  profileSessionContainer: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.title,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: Color.textLight,
    backgroundColor: Color.whileOpacity,
  },
});

export default ProfileScreen;
