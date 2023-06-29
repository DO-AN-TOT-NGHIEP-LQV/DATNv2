import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import React, { Fragment, useEffect, useLayoutEffect } from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { apiDelete, apiGet, apiPatch, apiPost } from "../../ultils/utilsApi";
import {
  CHANGE_FEATURE,
  DELETE_PRODUCT,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_DETAIL,
  UPDATE_PRODUCT,
} from "../../config/urls";
import Header from "../../components/Header";
import { FONTS, SIZES, spacing } from "../../constans/Theme";
import { Color } from "../../constans";
import Icons, { icons } from "../../components/Icons";
import CustomButton from "../../components/CustomButton/index.js.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { ShoesFLas } from "../../public/assets";
import { showError, showSuccess } from "../../ultils/messageFunction";
import { SwipeListView } from "react-native-swipe-list-view";
import ProductValue from "../../components/SalerManager/ProductValue";
import LineDivider from "../../components/LineDivider";
import ModalInputBrand from "../../components/SalerManager/ModalInputBrand";
import ModalInputText from "../../components/SalerManager/ModalInputText";
import ModalInputNumber from "../../components/SalerManager/ModalInputNumber";
import openWebLink from "../../hookFuntion/openWebLink";
import { TypeCard } from "../../components/Home";
import { typeList } from "../../constans/raw";
import InputModal from "../../components/InputModal";
import { validatorUpdateProduct } from "../../ultils/validations";
import moment from "moment";
import { ActivityIndicator } from "react-native-paper";
import * as Progress from "react-native-progress";
import { Alert } from "react-native";
import LottieLoading from "../../components/LottieLoading";

const windowWidth = Dimensions.get("window").width;

const UpdateProductScreen = ({ route }) => {
  const productId = route.params.productId;
  // const shopId = route.params.shopId;

  const navigation = useNavigation();

  /////////////////////////////////////
  const [productForm, setProductForm] = useState({
    id: productId,
    name: "",
    description: "",
    price: 0,
    // originalPrice: 0,
    // link: "",
    type: "",
    // quantity: 0,
    brand: "",
  });

  const {
    id,
    name,
    description,
    price,
    // originalPrice,
    // link,
    type,
    brand,
    // quantity,
  } = productForm;

  const updateProductForm = (data) =>
    setProductForm(() => ({ ...productForm, ...data }));

  ///////////////////////////////////////////////
  const [isShowModal, setShowModal] = useState({
    nameModal: false,
    descriptionModal: false,
    priceModal: false,
    // originalPriceModal: false,
    // linkModal: false,
    typeModal: false,
    // quantityModal: false,
    brandModal: false,
  });

  const {
    nameModal,
    descriptionModal,
    priceModal,
    // originalPriceModal,
    // linkModal,
    typeModal,
    // quantityModal,
    brandModal,
  } = isShowModal;

  const updateIsShowModal = (data) =>
    setShowModal(() => ({ ...isShowModal, ...data }));

  //////////////////////////////////////////////

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingFirst, setLoadingFirst] = useState(false);

  //////////////////////////////////////////////

  useEffect(() => {
    firstLoad();

    return () => {
      setProduct(null);
    };
  }, [productId]);

  const firstLoad = async () => {
    setLoadingFirst(true);
    try {
      var headers = {
        "Content-Type": "application/json",
      };

      var data = {
        params: {
          productId: productId,
          // shopId: shopId,
        },
      };

      const res = await apiGet(GET_PRODUCT_BY_ID, data, headers, false);

      const resProduct = res.data;
      console.log("GET_PRODUCT_BY_ID");

      updateProductForm({
        id: resProduct.id,
        name: resProduct.name,
        description: resProduct.description,
        price: resProduct.price,
        // originalPrice: resProduct.originalPrice,
        // link: resProduct.link,
        type: resProduct.type,
        // quantity: resProduct.quantity,
        brand: resProduct.brand,
      });

      setProduct(resProduct);
      setLoadingFirst(false);
    } catch (error) {
      // console.log(error);
      showError(
        error.error_message || "Sản phẩm này không tồn tại, hãy thử lại"
      );
      setLoadingFirst(false);
    }
  };

  const isValidData = () => {
    const error = validatorUpdateProduct(productForm);
    if (error) {
      showError(error);
      return false;
    }
    return true;
  };

  const updateProduct = async () => {
    setLoading(true);
    const checkValid = isValidData();

    try {
      if (checkValid) {
        var headers = {
          "Content-Type": "application/json",
        };

        await apiPost(UPDATE_PRODUCT, productForm, headers, true)
          .then((res) => {
            setLoading(false);
            console.log(res.data);
            setProduct(res.data);
          })
          .catch((error) => {
            showError(error.error_message);
            setLoading(false);
          });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deleteProduct = async () => {
    try {
      setLoading(true);
      var headers = {
        "Content-Type": "application/json",
      };
      let url = `${DELETE_PRODUCT}?`;

      if (productId !== undefined) {
        url += `IdDelete=${productId}&`;
      } else throw { error_message: "Không tìm thấy id sản phẩm" };

      const res = await apiDelete(url, {}, headers, true);

      showSuccess("Xóa thành công");
      setLoading(false);
      navigation.navigate("ManagerProductScreen", {
        // shopId: shopId,
        refresh: true,
      });
    } catch (error) {
      showError(error.error_message);
      setLoading(false);
    }
  };

  const changeFeatured = async () => {
    setLoading(true);

    try {
      var headers = {
        "Content-Type": "application/json",
      };

      let url = `${CHANGE_FEATURE}?`;

      if (productId !== undefined) {
        url += `productId=${productId}&`;
      } else throw { error_message: "Không tìm thấy id sản phẩm" };

      // if (shopId !== undefined) {
      //   url += `shopId=${shopId}&`;
      // } else throw { error_message: "Không tìm thấy id của shop" };

      url += `isFeature=${!product?.featured}`;

      const res = await apiPatch(url, {}, headers, true);

      firstLoad();
      setLoading(false);
    } catch (error) {
      showError(error.error_message);
      setLoading(false);
    }
  };

  function renderHeader() {
    return (
      <Header
        leftComponent={
          <TouchableOpacity
            style={styles.leftComponent}
            onPress={() => {
              navigation.navigate("ManagerProductScreen", {
                // shopId: shopId,
              });
            }}
          >
            <View style={styles.headerLeft}>
              <Icons
                icon={icons.Feather}
                size={12}
                color={Color.black}
                name={"chevron-left"}
              />
            </View>
          </TouchableOpacity>
        }
        rightComponent={
          <CustomButton
            loading={loading}
            label="Cập nhật"
            onPress={() => updateProduct()}
            styleContainer={{
              height: 36,
              width: 90,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 0,
              paddingHorizontal: 0,
            }}
            textStyle={{ fontSize: 14 }}
          />
        }
        title={"Chi tiết sản phẩm"}
        containerStyle={{ ...styles.shadow }}
      ></Header>
    );
  }

  const onDeleteAlert = () => {
    Alert.alert(
      "Xóa",
      "Bạn có chắc muốn xóa sản phẩm này. Hành động xóa sẽ xóa tất cả thông tin và không thể khôi phục",
      [{ text: "Yes", onPress: () => deleteProduct() }, { text: "No" }],
      { cancelable: true }
    );
  };

  function renderDetailContent() {
    return (
      <View style={{ marginVertical: SIZES.base }}>
        <SwipeListView
          data={[{ id: 1 }]}
          keyExtractor={(item) => `${item?.id}-id`}
          contentContainerStyle={{
            paddingHorizontal: SIZES.padding,
          }}
          disableRightSwipe={true}
          rightOpenValue={-120}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                style={{
                  backgroundColor: Color.white,
                  ...styles.cartProductContainer,
                  marginRight: 3,
                  ...styles.shadow,
                  paddingLeft: 4,
                  paddingRight: 0,
                }}
              >
                {/* image */}
                <View
                  style={{
                    height: 100,
                    width: 90,
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={
                      product?.images[0]?.url
                        ? { uri: product?.images[0]?.url }
                        : ShoesFLas
                    }
                    resizeMode="contain"
                    style={styles.images}
                  />
                </View>

                {/* content */}
                <View style={{ flex: 1, marginLeft: 5 }}>
                  <View style={styles.TopTabContainer}>
                    <View style={{ flex: 1 }}>
                      {/*  Name */}
                      <Text
                        style={{
                          ...FONTS.h4,
                          // height: 20,
                          lineHeight: 20,
                          alignItems: "flex-start",
                        }}
                        numberOfLines={1}
                      >
                        Id: {product?.id}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("DetailProduct", {
                          productId: product.id,
                          fromManagement: true,
                          previousScreen: "ManagerProductScreen",
                          // shopId: shopId,
                        });
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.mainColor,
                          textDecorationLine: "underline",
                          marginRight: 4,
                        }}
                      >
                        Chế độ khách
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.TopTabContainer}>
                    <View style={{ flex: 1 }}>
                      {/*  Name */}
                      <Text
                        style={{
                          fontSize: 16,
                          lineHeight: 20,
                          height: 40,
                        }}
                        numberOfLines={2}
                      >
                        <Text
                          style={{ ...FONTS.h4, height: 40, lineHeight: 20 }}
                        >
                          {`Name: `}
                        </Text>
                        {`${product?.name}`}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.TopTabContainer}>
                    <Text
                      style={{
                        ...FONTS.h3,
                        color: Color.mainColor,
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                      numberOfLines={1}
                    >
                      {`đ ${product?.price}`}
                    </Text>
                    <Text
                      style={{
                        flex: 1,
                        textAlign: "right",
                        fontWeight: "300",
                        fontSize: 12,
                        fontStyle: "italic",
                      }}
                    >
                      {/* {moment(product?.createdAt).format("YYYY-MM-DD HH:mm")} */}
                      {moment(product?.createdAt).format("YYYY-MM-DD HH:mm")}
                    </Text>
                  </View>
                </View>
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
                onPress={() => {
                  onDeleteAlert();
                }}
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
                  changeFeatured();
                }}
              >
                <Icons
                  name={"local-fire-department"}
                  icon={icons.MaterialIcons}
                  size={20}
                  color={product?.featured ? Color.yellow : Color.white}
                />
              </Pressable>
            </View>
          )}
        />
      </View>
    );
  }

  function renderTagType() {
    const handleTypeTagPress = (tag) => {
      if (type === tag) {
        updateProductForm({ type: "" });
      } else {
        updateProductForm({ type: tag });
      }
    };

    return (
      <View style={styles.selectedTagsContainer}>
        {typeList.map((tag, index) => (
          <Fragment key={index}>
            <TypeCard
              type={tag}
              onPress={() => handleTypeTagPress(tag?.value)}
              imageStyle={{
                opacity: type == tag.value ? 1 : 0.1,
                marginRight: 15,
                paddingRight: 15,
              }}
              containerStyle={{
                height: 40,
                width: "100%",
                paddingVertical: 0,
                paddingHorizontal: 0,
                marginRight: 15,
                justifyContent: "flex-end",
                ...styles.tagType,
                paddingRight: 10,
              }}
              textStyle={{
                color: Color.black,
                fontSize: 16,
              }}
            />
          </Fragment>
        ))}
      </View>
    );
  }

  function renderDetailField() {
    return (
      <ScrollView>
        <View style={styles.profileSessionContainer}>
          <ProductValue
            label={"Tên sản phẩm"}
            value={name}
            onPress={() => {
              updateIsShowModal({ nameModal: true });
            }}
          />
          <LineDivider />

          <ProductValue
            label={"Mô tả "}
            value={description}
            onPress={() => {
              updateIsShowModal({ descriptionModal: true });
            }}
          />
          <LineDivider />

          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                marginRight: 10,
                paddingRight: 10,
                borderRightWidth: 1,
                borderRightColor: Color.textLight,
              }}
            >
              <ProductValue
                label={"Giá bán"}
                value={price}
                onPress={() => {
                  updateIsShowModal({ priceModal: true });
                }}
              />
            </View>
            {/* <View style={{ flex: 1 }}>
              <ProductValue
                label={"Giá gốc"}
                value={originalPrice}
                onPress={() => {
                  updateIsShowModal({ originalPriceModal: true });
                }}
              />
            </View> */}
          </View>
          <LineDivider />

          {/* <ProductValue
            label={"Link sản phẩm"}
            value={link}
            onPress={() => {
              updateIsShowModal({ linkModal: true });
            }}
          >
            <CustomButton
              label={"Kiểm tra"}
              onPress={() => {
                link ? openWebLink(link) : null;
              }}
              styleContainer={{
                backgroundColor: Color.transparent,
                marginRight: 5,
              }}
              textStyle={{ color: Color.mainColor }}
            />
          </ProductValue> */}
          <LineDivider />

          <ProductValue
            label={"Kiểu dáng"}
            value={type}
            onPress={() => {
              updateIsShowModal({ typeModal: true });
            }}
          />
          <LineDivider />

          {/* <ProductValue
            label={"Số lượng"}
            value={quantity}
            onPress={() => {
              updateIsShowModal({ quantityModal: true });
            }}
          />
          <LineDivider /> */}

          <ProductValue
            label={"Nhãn hàng"}
            value={brand}
            onPress={() => {
              updateIsShowModal({ brandModal: true });
            }}
          />
        </View>
      </ScrollView>
    );
  }

  return loadingFirst ? (
    <LottieLoading />
  ) : (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.mainTheme,
      }}
    >
      {loading && (
        <>
          <Progress.Bar
            progress={0.9}
            indeterminate={true}
            width={windowWidth}
            borderColor={Color.blueMain}
            color={Color.blueMain}
            height={4}
            style={{
              position: "absolute",
              top: spacing.statusbarHeight,
              zIndex: 10,
            }}
          />
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
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <ActivityIndicator size="large" color="white" />
            <Text style={{ color: Color.white, alignItems: "center" }}>
              Quá trình này có thể mất vài phút, xin hãy giữ kết nối
            </Text>
          </View>
        </>
      )}

      {renderHeader()}

      {renderDetailContent()}

      {renderDetailField()}

      {nameModal && (
        <ModalInputText
          isVisible={nameModal}
          label={"Tên sản phẩm"}
          onClose={() => updateIsShowModal({ nameModal: false })}
          value={name}
          onPress={(value) => updateProductForm({ name: value })}
        />
      )}

      {descriptionModal && (
        <ModalInputText
          isVisible={descriptionModal}
          label={"Mô tả sản phẩm"}
          onClose={() => updateIsShowModal({ descriptionModal: false })}
          value={description}
          onPress={(value) => updateProductForm({ description: value })}
          maxLength={2500}
        />
      )}

      {priceModal && (
        <ModalInputNumber
          isVisible={priceModal}
          label={"Giá bán sản phẩm"}
          onClose={() => updateIsShowModal({ priceModal: false })}
          value={price}
          onPress={(value) => updateProductForm({ price: value })}
          isInteger={false}
        />
      )}

      {/* {originalPriceModal && (
        <ModalInputNumber
          isVisible={originalPriceModal}
          label={"Giá gốc của sản phẩm"}
          onClose={() => updateIsShowModal({ originalPriceModal: false })}
          value={originalPrice}
          onPress={(value) => updateProductForm({ originalPrice: value })}
          isInteger={false}
        />
      )} */}

      {/* {linkModal && (
        <ModalInputText
          isVisible={linkModal}
          label={"Link sản phẩm"}
          onClose={() => updateIsShowModal({ linkModal: false })}
          // value={link || "https://shopee.vn/ruby_store.88"}
          value={link || "https://"}
          maxLength={500}
          onPress={(value) => updateProductForm({ link: value })}
        />
      )} */}

      {typeModal && (
        <InputModal
          isVisible={typeModal}
          label={"Loại giày"}
          onClose={() => updateIsShowModal({ typeModal: false })}
          styleContainer={{
            height: 600,
          }}
        >
          <View
            styleContainer={{
              borderWidth: 2,
            }}
          >
            {renderTagType()}
          </View>
        </InputModal>
      )}

      {/* {quantityModal && (
        <ModalInputNumber
          isVisible={quantityModal}
          label={"Số lượng"}
          onClose={() => updateIsShowModal({ quantityModal: false })}
          value={quantity}
          onPress={(value) => updateProductForm({ quantity: value })}
          isInteger={true}
        />
      )} */}

      {brandModal && (
        <ModalInputBrand
          isVisible={brandModal}
          label={"Nhãn hiệu"}
          value={brand}
          onClose={() => updateIsShowModal({ brandModal: false })}
          onPress={(value) => updateProductForm({ brand: value })}
        />
      )}
    </View>
  );
};

export default UpdateProductScreen;

const styles = StyleSheet.create({
  leftComponent: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Color.textLight,
    borderRadius: SIZES.radius,
    backgroundColor: Color.whileOpacity,
  },
  headerLeft: {
    borderColor: Color.textLight,
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
  },
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 15,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  cartProductContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: Color.textLight,
  },
  profileSessionContainer: {
    marginHorizontal: SIZES.font,
    paddingHorizontal: SIZES.title,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: Color.textLight,
    backgroundColor: Color.white,
  },
  textInput: {
    backgroundColor: Color.white,
    borderRadius: 25,
    color: "#14171A",
    fontSize: 16,
    height: 120,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    textAlignVertical: "top",
    borderColor: "#E1E8ED",
    borderWidth: 2,
  },
  selectedTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
    alignItems: "baseline",
  },
  tagType: {
    margin: 2,
    borderRadius: 8,
  },
  numOfText: {
    color: Color.textLight,
    ...FONTS.body4,
    textDecorationLine: "line-through",
  },
  images: {
    width: "100%",
    height: "80%",
    position: "absolute",
    // borderWidth: 1,
    borderRadius: 12,
    borderColor: Color.black,
  },
  //////////////////
  TopTabContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  customButtonGoTo: {
    width: 90,
    alignSelf: "flex-start",
    backgroundColor: Color.white,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: Color.mainColor,
  },
});
