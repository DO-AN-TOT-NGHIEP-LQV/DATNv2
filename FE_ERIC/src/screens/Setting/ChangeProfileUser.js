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
  USER_UPDATE_IMAGE,
  USER_UPDATE_PROFILE,
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
import actions from "../../redux/actions";
import { validatorUpdateProfile } from "../../ultils/validations";

const ChangeProfileUser = () => {
  const detailUser = useSelector((state) => state.auth.detailUser);

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [detailUserForm, setDetailUserForm] = useState({
    gender: false,
    username: null,
    number: null,
  });
  const { gender, username, number } = detailUserForm;
  const updateDetailUserForm = (data) =>
    setDetailUserForm(() => ({ ...detailUserForm, ...data }));

  const [pickedImagePath, setPickedImagePath] = useState(null);

  const handleGenderSelection = (isMale) => {
    setDetailUserForm((prevState) => ({
      ...prevState,
      gender: isMale,
    }));
  };

  ///////////////////////////////////////////////
  const [isShowModal, setShowModal] = useState({
    sNameModal: false,
    sNumberModal: false,
  });

  const { sNameModal, sNumberModal } = isShowModal;

  const updateIsShowModal = (data) =>
    setShowModal(() => ({ ...isShowModal, ...data }));

  useEffect(() => {
    const firstLoad2 = async () => {
      const detailData = await actions.getDetailUser();
      // console.log(detailData.data);
      await actions.saveDetailUser(detailData.data);

      updateDetailUserForm({
        gender: detailData.data?.gender,
        username: detailData.data?.username,
        number: detailData.data?.number,
      });
    };
    firstLoad2();
  }, []);

  const firstLoad = async () => {
    // try {
    //   var headers = {
    //     "Content-Type": "application/json",
    //   };
    //   const shopId = detailUser?.shop_id || undefined;
    //   if (detailUser && detailUser?.shop_id != null) {
    //     let url = `${GET_DETAIL_SHOP}?`;
    //     if (shopId !== undefined) {
    //       url += `shopId=${shopId}`;
    //     }
    //     const res = await apiGet(url, {}, headers, false);
    //     setShopDetail(res.data);
    //     console.log(res.data);
    //     // updateShopForm({
    //     //   sAddress1: res.data?.sAddress1,
    //     //   sFax: res.data?.sFax,
    //     //   sLink: res.data?.sLink,
    //     //   sLogo: res.data?.sLogo,
    //     //   sName: res.data?.sName,
    //     //   sNumber: res.data?.sNumber,
    //     //   sStatus: res.data?.sStatus,
    //     // });
    //     console.log(GET_DETAIL_SHOP);
    //     // console.log(shopDetail.id);
    //   } else {
    //     showError("Không thể lấy Id của shop");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   console.log(error.error_message || "Lấy dữ liệu thất bại");
    // }
  };

  const isValidData = () => {
    try {
      const error = validatorUpdateProfile({
        username,
        number,
      });
      if (error) {
        showError(error);
        return false;
      }
      return true;
    } catch (error) {
      // showError(error);
      console.log(error);
      return false;
    }
  };

  const updateProfile = async () => {
    setLoading(true);
    const checkValid = isValidData();
    if (checkValid) {
      await apiPost(USER_UPDATE_PROFILE, detailUserForm, {}, true)
        .then((res) => {
          setLoading(false);
          actions.saveDetailUser(res.data);

          updateDetailUserForm({
            gender: res.data?.gender,
            username: res.data?.username,
            number: res.data?.number,
          });
          showSuccess("Cập nhật thành công!");
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

    const userId = detailUser?.id;

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

    let url = USER_UPDATE_IMAGE + `/${userId}`;
    console.log(url);

    await apiPost(url, formData, headers, true)
      .then((res) => {
        setLoading(false);
        // setShopDetail(res.data);
        actions.saveDetailUser(res.data);
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
    const getStringRole = (roles) => {
      let highestRole = "";
      for (let i = 0; i < roles.length; i++) {
        const role = roles[i];
        if (role.id === 3) {
          highestRole += "Admin";
        } else if (role.id === 2) {
          highestRole += "Saler";
        }
        if (i !== roles.length - 1) {
          highestRole += ", ";
        }
      }
      if (highestRole.startsWith(", ")) {
        highestRole = highestRole.substring(2);
      }
      return highestRole;
    };

    return (
      <View
        style={{
          width: "100%",
        }}
      >
        <View style={styles.headerContainer}>
          <Text style={{ ...FONTS.h2, paddingTop: 5 }}>
            Cập nhật hồ sơ cá nhân
          </Text>
        </View>

        <ImageBackground style={styles.imgBg}>
          <View
            style={{
              width: 80,
              height: 80,
              marginLeft: 15,
            }}
          >
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
                  detailUser && detailUser?.image?.url
                    ? { uri: detailUser?.image?.url }
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
                {detailUser?.username || "Chưa có tên"}
              </Text>
              <Text
                style={{
                  color: Color.white,
                  ...FONTS.body4,
                  fontStyle: "italic",
                  fontWeight: 100,
                }}
              >
                {detailUser?.roles ? getStringRole(detailUser?.roles) : ""}
              </Text>
            </View>
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
            {detailUser?.created_at}
          </Text>
        </ImageBackground>
      </View>
    );
  }

  function renderDetailField() {
    return (
      <View style={styles.profileSessionContainer}>
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
          label={"Tên người dùng"}
          value={username}
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
          onPress={() => {
            updateIsShowModal({ sNameModal: true });
          }}
        />
        <LineDivider />

        <ProductValue
          label={"Giới tính"}
          icon={
            <View style={styles.iconStyle}>
              <Icons
                size={16}
                name={"transgender"}
                icon={icons.FontAwesome}
                color={Colors.mainColor}
              />
            </View>
          }
        >
          <View
            style={{
              width: "60%",
              height: "80%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 20,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: Color.blueTheme,
                width: 60,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 12,
                marginRight: 10,
                // alignContent: "center",
                // opacity: 0.1,
                opacity: gender ? 1 : 0.1,
              }}
              onPress={() => handleGenderSelection(true)} // Chọn giới tính nam
            >
              <Text style={{ fontStyle: "italic" }}>Nam</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: Color.backGround,
                width: 60,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 12,
                opacity: gender ? 0.1 : 1,
              }}
              onPress={() => handleGenderSelection(false)} // Chọn giới tính nam
            >
              <Text style={{ fontStyle: "italic" }}>Nữ</Text>
            </TouchableOpacity>
          </View>
        </ProductValue>
        <LineDivider />

        <ProductValue
          label={"Số điện thoại"}
          value={number}
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
      </View>
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

      {/* <View> */}
      <CustomButton
        label={"Cập nhật"}
        styleContainer={{
          width: "90%",
          alignSelf: "center",
          marginTop: 10,
          // height: 40,
        }}
        onPress={() => updateProfile()}
      ></CustomButton>
      {/* </View> */}

      {sNameModal && (
        <ModalInputText
          isVisible={sNameModal}
          label={"Tên người dùng"}
          onClose={() => updateIsShowModal({ sNameModal: false })}
          value={username}
          onPress={(name) => updateDetailUserForm({ username: name })}
        />
      )}

      {sNumberModal && (
        <ModalInputText
          isVisible={sNumberModal}
          label={"Số điện thoại"}
          onClose={() => updateIsShowModal({ sNumberModal: false })}
          value={number}
          onPress={(value) => updateDetailUserForm({ number: value })}
          // isInteger={true}
        />
      )}

      {/* {sLinkModal && (
        <ModalInputText
          isVisible={sLinkModal}
          label={"Liên kết sản phẩm"}
          onClose={() => updateIsShowModal({ sLinkModal: false })}
          value={sLink}
          onPress={(name) => updateShopForm({ sLink: name })}
        />
      )} */}

      {/* {sAddress1Modal && (
        <ModalInputText
          isVisible={sAddress1Modal}
          label={"Tên cửa hàng"}
          onClose={() => updateIsShowModal({ sAddress1Modal: false })}
          value={sAddress1}
          onPress={(name) => updateShopForm({ sAddress1: name })}
        />
      )} */}
    </View>
  );
};

export default ChangeProfileUser;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.mainTheme,
    height: SIZES.height,
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
