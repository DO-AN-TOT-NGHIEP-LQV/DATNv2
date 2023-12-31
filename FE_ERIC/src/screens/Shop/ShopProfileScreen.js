import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../constans/Color";
import { bg2 } from "../../public/assets/image";
import { FONTS, SIZES, spacing, statusbarHeight } from "../../constans/Theme";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { LoginImg } from "../../public/assets";
import {
  GET_DETAIL_SHOP,
  UPDATE_SHOP_IMAGE,
  UPDATE_SHOP_PRODUCT,
  UPDATE_SHOP_PROFILE,
} from "../../config/urls";
import { apiGet, apiPost } from "../../ultils/utilsApi";
import openWebLink from "../../hookFuntion/openWebLink";
import ProductValue from "../../components/SalerManager/ProductValue";
import LineDivider from "../../components/LineDivider";
import { ProfileValue } from "../../components/Profile";
import Icons, { icons } from "../../components/Icons";
import CustomButton from "../../components/CustomButton/index.js";
import ModalInputText from "../../components/SalerManager/ModalInputText";
import ModalInputNumber from "../../components/SalerManager/ModalInputNumber";
import { showError, showSuccess } from "../../ultils/messageFunction";
import * as ImagePicker from "expo-image-picker";
import { getFileExtension } from "../../ultils/helperFunction";
import { ActivityIndicator } from "react-native";
import Color from "../../constans/Color";
import LottieLoading from "../../components/LottieLoading";

const ShopProfileScreen = () => {
  const detailUser = useSelector((state) => state.auth.detailUser);
  const [shopDetail, setShopDetail] = useState(null);

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [shopDetailForm, setShopDetailForm] = useState({
    shopId: null,
    sAddress1: "",
    sLink: "",
    sName: "",
    sNumber: "",
  });

  const { sAddress1, sLink, sName, sNumber, shopId } = shopDetailForm;
  const [pickedImagePath, setPickedImagePath] = useState(null);

  const updateShopForm = (data) =>
    setShopDetailForm(() => ({ ...shopDetailForm, ...data }));

  ///////////////////////////////////////////////
  const [isShowModal, setShowModal] = useState({
    sNameModal: false,
    sAddress1Modal: false,
    sNumberModal: false,
    sLinkModal: false,
  });

  const { sNameModal, sAddress1Modal, sNumberModal, sLinkModal } = isShowModal;

  const updateIsShowModal = (data) =>
    setShowModal(() => ({ ...isShowModal, ...data }));

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
        // console.log(shopDetail.id);
      } else {
        showError("Không thể lấy Id của shop");
      }
    } catch (error) {
      console.log(error);
      console.log(error.error_message || "Lấy dữ liệu thất bại");
    }
  };

  const updateProfile = async () => {
    setLoading(true);
    // const checkValid = isValidData();

    if (true) {
      const shopId = detailUser?.shop_id || null;
      // const shopId = undefined;

      let url = UPDATE_SHOP_PROFILE + `/${shopId}`;

      await apiPost(url, shopDetailForm, {}, true)
        .then((res) => {
          setLoading(false);
          setShopDetail(res.data);
          showSuccess("Cập nhật thành công!");
          // actions.reloadShopManagerScreen();
        })
        .catch((error) => {
          console.log(error);
          showError(error.error_message || "Cập nhật thất bại");
          setLoading(false);
        });
    }

    setLoading(false);
  };

  const updateImageShop = async () => {
    setLoading(true);

    const shopId = detailUser?.shop_id || null;

    var headers = {
      "Content-type": "multipart/form-data",
    };

    const fileUri = pickedImagePath;
    const fileName = fileUri.split("/").pop(); // Lấy tên tệp từ đường dẫn
    const fileExtension = getFileExtension(fileName);

    var formData = new FormData();
    formData.append("fileImage", {
      uri: fileUri, // Đường dẫn đến file
      type: `image/${fileExtension}`,
      name: fileName, // Tên file
    });

    let url = UPDATE_SHOP_IMAGE + `/${shopId}`;

    await apiPost(url, formData, headers, true)
      .then((res) => {
        setLoading(false);
        setShopDetail(res.data);
        showSuccess("Cập nhật ảnh thành công");
        setPickedImagePath("");

        // actions.reloadShopManagerScreen();
      })
      .catch((error) => {
        console.log(error);
        showError(error.error_message || "Cập nhật thất bại");
        setLoading(false);
      });

    setLoading(false);
  };

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImagePath(result.assets[0].uri);
      // setIsChoseImage(true);
      // fetchData(result.assets[0].uri);
    }
  };

  function renderHeader() {
    return (
      <View
        style={{
          width: "100%",
        }}
      >
        <View style={styles.headerContainer}>
          <Text style={{ ...FONTS.h2, paddingTop: 5 }}>Thông tin cửa hàng</Text>
        </View>

        <ImageBackground style={styles.imgBg}>
          <View
            style={{
              width: 80,
              height: 80,
              marginLeft: 15,
            }}
          >
            {/* {pickedImagePath && isChoseImage ? ( */}
            {pickedImagePath ? (
              <View>
                <Image
                  source={{ uri: pickedImagePath }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 40,
                    borderWidth: 1,
                    borderColor: Colors.textLight,
                  }}
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    alignItems: "center",
                    left: -20,
                    width: 30,
                    height: 30,
                  }}
                  onPress={() => {
                    setPickedImagePath("");
                    // setIsChoseImage(false);
                  }}
                >
                  <Icons
                    name={"closecircleo"}
                    icon={icons.AntDesign}
                    color={Colors.darkGray}
                    size={18}
                  />
                </TouchableOpacity>
              </View>
            ) : (
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
            )}

            {pickedImagePath ? (
              <TouchableOpacity
                style={styles.styleContainerButtonRole}
                onPress={() => updateImageShop()}
              >
                <Text style={{ ...styles.styleTextButtonRole }}>Cập nhật</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.styleContainerButtonRole}
                onPress={() => showImagePicker()}
              >
                <Icons
                  // name={isChoseImage ? "closecircleo" : "pluscircleo"}
                  name={"pluscircleo"}
                  icon={icons.AntDesign}
                  color={Colors.black}
                  size={18}
                />
              </TouchableOpacity>
            )}
          </View>

          <View
            style={{
              flex: 1,
              marginLeft: SIZES.radius,
            }}
          >
            <View
              style={{
                height: 80,
                color: Colors.white,
                justifyContent: "center",
              }}
            >
              <Text
                numberOfLines={3}
                style={{
                  color: Colors.white,
                  ...FONTS.h2,
                  lineHeight: 22,
                }}
              >
                {shopDetail?.sName || "Chưa có tên"}{" "}
              </Text>
            </View>

            <Text
              style={{
                color: Colors.whileOpacity,
                ...FONTS.body4,
                fontStyle: "italic",
                fontWeight: 100,
                fontSize: 12,
                lineHeight: 15,
              }}
              numberOfLines={2}
            >
              Địa chỉ: {shopDetail?.sAddress1 || "Chưa có địa chỉ"}
            </Text>
          </View>

          <Text
            numberOfLines={1}
            style={{
              position: "absolute",
              bottom: 0,
              right: 15,
              color: Colors.white,
              ...FONTS.body4,
              fontStyle: "italic",
              fontWeight: 200,
              fontSize: 10,
            }}
          >
            {shopDetail?.created_at}
          </Text>
        </ImageBackground>
        {/* </View> */}
      </View>
    );
  }

  function renderDetailField() {
    return (
      <ScrollView>
        <View style={styles.profileSessionContainer}>
          <ProductValue
            label={"Chủ sở hữu"}
            value={detailUser?.username}
            icon={
              <View style={styles.iconStyle}>
                <Icons
                  size={20}
                  name={"user"}
                  icon={icons.AntDesign}
                  color={Colors.mainColor}
                />
              </View>
            }
          />
          <LineDivider />
          <ProductValue
            label={"Email"}
            value={detailUser?.email}
            icon={
              <View style={styles.iconStyle}>
                <Icons
                  size={16}
                  name={"mail"}
                  icon={icons.AntDesign}
                  color={Colors.mainColor}
                />
              </View>
            }
          />
          <LineDivider />
          <ProductValue
            label={"Tên cửa hàng"}
            value={sName}
            onPress={() => {
              updateIsShowModal({ sNameModal: true });
            }}
            icon={
              <View style={styles.iconStyle}>
                <Icons
                  size={16}
                  name={"storefront-outline"}
                  icon={icons.MaterialCommunityIcons}
                  color={Colors.mainColor}
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
                  color={Colors.mainColor}
                />
              </View>
            }
            onPress={() => {
              updateIsShowModal({ sLinkModal: true });
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
                  color={Colors.mainColor}
                />
              </View>
            }
          />
          <LineDivider />

          <ProductValue
            label={"Địa chỉ"}
            value={sAddress1}
            onPress={() => {
              updateIsShowModal({ sAddress1Modal: true });
            }}
            icon={
              <View style={styles.iconStyle}>
                <Icons
                  size={18}
                  name={"ios-location-outline"}
                  icon={icons.Ionicons}
                  color={Colors.mainColor}
                />
              </View>
            }
          />
          {/* <LineDivider /> */}
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.mainContainer}>
      {loading && (
        <>
          <View
            style={{
              position: "absolute",
              top: spacing.statusbarHeight + 3,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
              // flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <LottieLoading
              style={{
                height: 300,
                width: "100%",
                flex: 0,
              }}
            />
            <ActivityIndicator size="large" color="white" />
            <Text style={{ color: Color.white, alignItems: "center" }}>
              Quá trình này có thể mất vài phút, xin hãy giữ kết nối
            </Text>
          </View>
        </>
      )}

      {renderHeader()}
      {renderDetailField()}

      <CustomButton
        label={"Cập nhật"}
        styleContainer={{
          width: "90%",
          alignSelf: "center",
        }}
        onPress={() => updateProfile()}
      ></CustomButton>

      {sNameModal && (
        <ModalInputText
          isVisible={sNameModal}
          label={"Tên cửa hàng"}
          onClose={() => updateIsShowModal({ sNameModal: false })}
          value={sName}
          onPress={(name) => updateShopForm({ sName: name })}
        />
      )}

      {sNumberModal && (
        <ModalInputNumber
          isVisible={sNumberModal}
          label={"Số điện thoại"}
          onClose={() => updateIsShowModal({ sNumberModal: false })}
          value={sNumber}
          onPress={(value) => updateShopForm({ sNumber: value })}
          isInteger={true}
        />
      )}

      {sLinkModal && (
        <ModalInputText
          isVisible={sLinkModal}
          label={"Liên kết sản phẩm"}
          onClose={() => updateIsShowModal({ sLinkModal: false })}
          value={sLink}
          onPress={(name) => updateShopForm({ sLink: name })}
        />
      )}

      {sAddress1Modal && (
        <ModalInputText
          isVisible={sAddress1Modal}
          label={"Tên cửa hàng"}
          onClose={() => updateIsShowModal({ sAddress1Modal: false })}
          value={sAddress1}
          onPress={(name) => updateShopForm({ sAddress1: name })}
        />
      )}
    </View>
  );
};

export default ShopProfileScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.mainTheme,
    flex: 1,

    borderWidth: 1,
  },
  headerContainer: {
    flexDirection: "row",
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.radius,
    justifyContent: "space-between",
    ...statusbarHeight,
  },

  imgBg: {
    flexDirection: "row",
    height: 140,
    marginHorizontal: 10,
    paddingHorizontal: SIZES.radius,
    paddingVertical: 15,
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
  iconStyle: {
    width: 40,
    height: 40,
    // paddingLeft: -10,
    marginLeft: -5,
    marginRight: 5,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: Colors.mainTheme,
  },
  styleContainerButtonRole: {
    backgroundColor: Colors.mainTheme,
    borderRadius: 15,
    height: 25,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  styleTextButtonRole: {
    color: Colors.mainColor,
    fontSize: 10,
    ...FONTS.h4,
    marginHorizontal: 10,
  },

  profileSessionContainer: {
    marginTop: 20,
    marginHorizontal: SIZES.font,
    paddingHorizontal: SIZES.title,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: Colors.textLight,
    backgroundColor: Colors.white,
  },
});
