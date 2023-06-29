import {
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from "react-native";
import { Fragment, useEffect, useState } from "react";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Button, Modal } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Color from "../../constans/Color";
import { ShoesFLas } from "../../public/assets";
import Icons, { icons } from "../../components/Icons";
import CustomButton from "../../components/CustomButton/index.js";
import LineDivider from "../../components/LineDivider";
import { FONTS, SIZES, spacing } from "../../constans/Theme";
import ProductValue from "../../components/SalerManager/ProductValue";
import ModalInputText from "../../components/SalerManager/ModalInputText";
import ModalInputNumber from "../../components/SalerManager/ModalInputNumber";
import openWebLink from "../../hookFuntion/openWebLink";
import InputModal from "../../components/InputModal";
import { typeList } from "../../constans/raw";
import { TypeCard } from "../../components/Home";
import { showError, showSuccess } from "../../ultils/messageFunction";
import ModalInputBrand from "../../components/SalerManager/ModalInputBrand";
import {
  ADD_PRODUCT_TO_SHOP,
  CREATE_NEW_PRODUCT,
  DELETE_PRODUCT_TO_SHOP,
  GET_PRODUCT_BY_ID,
  GET_VENDOR_PRODUCT,
  UPDATE_PRODUCT_TO_SHOP,
} from "../../config/urls";
import { validatorAddShopProduct } from "../../ultils/validations";
import { apiDelete, apiGet, apiPatch, apiPost } from "../../ultils/utilsApi";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import { ProfileEdit, ProfileValue } from "../../components/Profile";
import { Calculator, PriceVND } from "../../public/assets/icons";
import actions from "../../redux/actions";
import { SwipeListView } from "react-native-swipe-list-view";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ShopUpdateProductScreen = ({ route }) => {
  const productId = route.params?.productId;

  const detailUser = useSelector((state) => state.auth.detailUser);
  const shopId = detailUser?.shop_id || undefined;

  const [productShop, setProductShop] = useState(null);

  const navigation = useNavigation();

  // useEffect(() => {
  //   navigation.getParent()?.setOptions({
  //     tabBarStyle: { display: "none" },
  //     tabBarVisible: false,
  //   });

  //   return () => {
  //     navigation
  //       .getParent()
  //       ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  //     setProduct(null);
  //   };
  // }, [navigation]);

  const [loading, setLoading] = useState(false);

  const [productShopForm, setProductShopForm] = useState({
    productId: productId,
    shopId: shopId,
    price: 0,
    link: "",
    quantity: 0,
  });

  const { price, link, quantity } = productShopForm;

  const updateProductShopForm = (data) =>
    setProductShopForm(() => ({ ...productShopForm, ...data }));

  ///////////////////////////////////////////////
  const [isShowModal, setShowModal] = useState({
    priceModal: false,
    linkModal: false,
    quantityModal: false,
  });

  const { priceModal, linkModal, quantityModal } = isShowModal;

  const updateIsShowModal = (data) =>
    setShowModal(() => ({ ...isShowModal, ...data }));

  const fetchData = async () => {
    var headers = {
      "Content-Type": "application/json",
    };

    let url = GET_VENDOR_PRODUCT + `/${shopId}/${productId}`;
    await apiGet(url, {}, headers, true)
      .then((res) => {
        setProductShop(res.data);

        console.log(GET_VENDOR_PRODUCT);

        updateProductShopForm({
          productId: productId,
          price: res.data?.shopProduct?.price,
          link: res.data?.shopProduct?.link,
          quantity: res.data?.shopProduct?.quantity,
        });
      })
      .catch((error) => {
        console.log(error);
        showError(error.error_message);
      });

    // try {
    //   const res = await apiGet(url, {}, headers, true);
    //   await setProductShop(res.data);
    //   console.log(res.data);
    // } catch (error) {
    //   showError(error.error_message);
    //   console.log(error);
    // }

    // updateProductShopForm({
    //   productId: productId,
    //   price: productShop?.shopProduct?.price,
    //   link: productShop?.shopProduct?.link,
    //   quantity: productShop?.shopProduct?.quantity,
    // });
  };

  useEffect(() => {
    fetchData();

    // updateProductShopForm({
    //   productId: productId,
    //   price: productShop?.shopProduct?.price,
    //   link: productShop?.shopProduct?.link,
    //   quantity: productShop?.shopProduct?.quantity,
    // });
  }, [productId]);

  useEffect(() => {
    return () => {
      setProductShop(null);
      setProductShopForm({
        productId: productId,
        shopId: shopId,
        price: 0,
        link: "",
        quantity: 0,
      });
    };
  }, []);

  function renderHeader() {
    const isValidData = () => {
      const error = validatorAddShopProduct(productShopForm);
      if (error) {
        showError(error);
        return false;
      }
      return true;
    };

    const addProductVentor = async () => {
      setLoading(true);
      const checkValid = isValidData();
      try {
        if (checkValid) {
          var headers = {
            "Content-type": "application/json",
          };

          console.log(productShopForm);
          await apiPatch(UPDATE_PRODUCT_TO_SHOP, productShopForm, headers, true)
            .then((res) => {
              setLoading(false);
              showSuccess("Cập nhật thành công!");
              actions.reloadShopManagerScreen();
            })
            .catch((error) => {
              console.log(error);
              showError(error.error_message);
              setLoading(false);
            });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    return (
      <Header
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
            onPress={() =>
              navigation.navigate("ShopTab", {
                screen: "ShopManagerProductScreen",
                params: { shopId: shopId },
              })
            }
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
        centerComponent={
          <Text
            style={{
              ...FONTS.h3,
              marginLeft: -50,
            }}
          >
            Cập nhật sản phẩm
          </Text>
        }
        rightComponent={
          <CustomButton
            loading={loading}
            label="Cập nhật"
            onPress={() => addProductVentor()}
            textStyle={{ lineHeight: 16 }}
          />
        }
      ></Header>
    );
  }

  function renderMoreProduct() {
    const productType = typeList.find(
      (tag) => tag.value === productShop?.product?.type
    );
    return (
      <View
        style={{
          height: "30%",
          borderRadius: SIZES.radius,
          padding: 10,
          margin: 8,
          backgroundColor: Color.while2,
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            paddingHorizontal: 0,
            flexDirection: "row",
          }}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingTop: 3,
          }}
        >
          <TypeCard
            type={productType}
            imageStyle={{
              opacity: 0.2,
            }}
            containerStyle={{
              height: 30,
              width: "100%",
              paddingVertical: 0,
              paddingHorizontal: 0,
              marginRight: 15,
              borderRadius: 8,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
            textStyle={{
              color: Color.black,
              fontSize: 14,
              ...FONTS.h4,
            }}
          />

          {productShop?.product?.brand && (
            <TouchableOpacity
              style={{
                height: 30,
                marginLeft: 10,
                paddingHorizontal: 10,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                borderColor: Color.mainColor,
                borderWidth: 1,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  color: Color.mainColor,
                  fontSize: 14,
                  ...FONTS.h4,
                }}
              >
                {productShop?.product?.brand}
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>

        <Text style={{ ...FONTS.h4, marginVertical: 0, marginTop: 1 }}>
          Miêu tả:
        </Text>
        <ScrollView
          style={{
            height: "60%",
          }}
        >
          <Text
            style={{
              ...FONTS.body4,
            }}
          >
            {productShop?.product?.description}
          </Text>
        </ScrollView>
      </View>
    );
  }

  function renderShoeProductDetail() {
    const deleteShopProduct = async () => {
      setLoading(true);
      try {
        let url = `${DELETE_PRODUCT_TO_SHOP}?`;
        if (productId !== undefined && productId !== null) {
          url += `productId=${productId}&`;
        } else throw { error_message: "Không tìm thấy id sản phẩm" };

        if (shopId !== undefined && shopId !== null) {
          url += `shopId=${shopId}&`;
        } else throw { error_message: "Không tìm thấy id của shop" };

        const res = await apiDelete(url, {}, {}, true);

        showSuccess("Xóa thành công");
        actions.reloadShopManagerScreen();

        // navigation.navigate("ShopTab", {
        //   screen: "ShopManagerProductScreen",
        //   params: { shopId: shopId },
        // });
        // navigation.goBack();
        navigation.navigate("ShopTab", {
          screen: "ShopManagerProductScreen",
          params: { shopId: shopId },
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
        showError(error.error_message || error.message);
        setLoading(false);
      }
    };
    return (
      <Pressable
        style={{
          backgroundColor: "#e5f8ed",
          alignItems: "center",
          borderRadius: SIZES.radius,
          borderColor: Color.textLight,
          backgroundColor: Color.white,
          ...styles.shadow,
          padding: SIZES.padding,
          backgroundColor: Color.white,
          margin: SIZES.base,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <SwipeListView
            data={[{ id: 1 }]}
            keyExtractor={(item) => `${item?.id}-id`}
            contentContainerStyle={{}}
            disableRightSwipe={true}
            rightOpenValue={-100}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    borderWidth: 1,
                    ...styles.cartProductContainer,
                    backgroundColor: Color.white,
                    paddingVertical: 10,
                    marginRight: 2,
                    height: 130,
                    zIndex: 10,
                  }}
                >
                  <View
                    style={{
                      height: 120,
                      width: 120,
                      marginHorizontal: 20,
                    }}
                  >
                    <Image
                      source={
                        productShop?.product?.images[0]?.url
                          ? { uri: productShop?.product?.images[0]?.url }
                          : ShoesFLas
                      }
                      resizeMode="contain"
                      style={styles.images}
                    />
                  </View>

                  <View
                    style={{
                      flex: 1,
                      height: "100%",
                      justifyContent: "center",
                      paddingRight: 5,
                    }}
                  >
                    <Text numberOfLines={1} style={{ ...FONTS.h4 }}>
                      {`Id:   `} {productShop?.product?.id}
                    </Text>

                    <Text style={{ ...FONTS.h4, height: 50 }} numberOfLines={2}>
                      {`Tên: `}
                      <Text
                        numberOfLines={2}
                        style={{ ...FONTS.h4, color: Color.gray }}
                      >
                        {productShop?.product?.name}
                      </Text>
                    </Text>

                    <Text numberOfLines={1} style={{ ...FONTS.h4 }}>
                      {`Giá gốc: `}{" "}
                      <Text
                        style={{ ...FONTS.h3, color: Color.blueSd }}
                        numberOfLines={1}
                      >
                        {productShop?.product?.price}
                      </Text>
                    </Text>

                    <View
                      style={{
                        alignSelf: "flex-end",
                        // flex: 1,
                      }}
                    >
                      <Text
                        numberOfLines={2}
                        style={{
                          fontSize: 10,
                          fontWeight: "normal",
                          color: Color.gray,
                        }}
                      >
                        {productShop?.product?.createdAt}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
            renderHiddenItem={({ item, index }) => (
              <View
                style={{
                  // borderWidth: 1,
                  ...styles.cartProductContainer,
                  backgroundColor: Color.white,
                  paddingVertical: 10,
                  height: 130,
                  // borderRightColor: Color.black,
                  borderColor: Color.red,
                  borderRightWidth: 5,
                  // paddingVertical: 10,
                  // paddingRight: -10,
                  // marginRight: -10,
                  zIndex: -10,

                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <CustomButton
                  loading={loading}
                  label="Xóa"
                  onPress={() => deleteShopProduct()}
                  textStyle={{ lineHeight: 16, color: Color.red }}
                  styleContainer={{
                    width: 80,
                    marginRight: 10,
                    backgroundColor: Color.transparent,
                    borderWidth: 1,
                    borderColor: Color.red,
                  }}
                />
              </View>
            )}
          />

          {/* <View
            style={{
              position: "absolute",
              top: -5,
              right: -5,
              borderWidth: 1,
              borderColor: Color.red,
              width: 50,
              height: 30,
              zIndex: 0,
              backgroundColor: Color.white,
              borderRadius: SIZES.radius,
            }}
          ></View> */}
        </View>

        <View
          style={{
            width: "100%",
            borderRadius: SIZES.radius,
            padding: 5,
            marginVertical: 5,
            paddingHorizontal: 10,
            marginHorizontal: 10,

            backgroundColor: Color.darkGray2,
            paddingTop: -10,
          }}
        >
          <ProfileValue
            label={"Giá"}
            value={price}
            icon={
              <Image
                source={PriceVND}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
            }
            onPress={() => {
              updateIsShowModal({ priceModal: true });
            }}
          />
          <LineDivider />

          <ProfileValue
            label={"Liên kết"}
            value={link}
            icon={
              <View>
                <Icons
                  size={20}
                  name={"link-outline"}
                  icon={icons.Ionicons}
                  color={Color.mainColor}
                />
              </View>
            }
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
          </ProfileValue>
          <LineDivider />

          <ProfileValue
            label={"Số lượng"}
            value={quantity}
            icon={
              <Image
                source={Calculator}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
            }
            onPress={() => {
              updateIsShowModal({ quantityModal: true });
            }}
          />
          <LineDivider />
        </View>
      </Pressable>
    );
  }

  return (
    <SafeAreaView
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
            borderRadius={0}
            borderWidth={0}
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

      {/* {Header} */}
      {renderHeader()}

      {/* Image */}
      {renderShoeProductDetail()}

      {renderMoreProduct()}

      {priceModal && (
        <ModalInputNumber
          isVisible={priceModal}
          label={"Giá sản phẩm"}
          onClose={() => {
            updateIsShowModal({ priceModal: false });
          }}
          value={price}
          onPress={(value) => updateProductShopForm({ price: value })}
          isInteger={false}
        />
      )}

      {linkModal && (
        <ModalInputText
          isVisible={linkModal}
          label={"Link sản phẩm"}
          onClose={() => {
            updateIsShowModal({ linkModal: false });
          }} // value={link || "https://shopee.vn/ruby_store.88"}
          value={link || "https://"}
          maxLength={500}
          onPress={(link) => {
            updateProductShopForm({ link: link });
          }}
        />
      )}

      {quantityModal && (
        <ModalInputNumber
          isVisible={quantityModal}
          label={"Số lượng"}
          onClose={() => {
            updateIsShowModal({ quantityModal: false });
          }}
          value={quantity}
          onPress={(quantity) => updateProductShopForm({ quantity: quantity })}
          isInteger={true}
        />
      )}
    </SafeAreaView>
  );
};

export default ShopUpdateProductScreen;

const styles = StyleSheet.create({
  headerLeft: {
    borderColor: Color.textLight,
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
  },

  profileSessionContainer: {
    paddingHorizontal: SIZES.title,
    borderRadius: SIZES.radius,
  },

  cartProductContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    borderRadius: SIZES.radius,
    borderColor: Color.textLight,
  },
  shadow: {
    shadowColor: Color.mainTheme,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  images: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    borderColor: Color.black,
  },
  // selectedTag: {
  //   backgroundColor: Color.whiteColor,
  //   borderRadius: 8,
  //   borderWidth: 1,
  //   borderColor: Color.mainColor,
  //   height: 30,

  //   marginRight: 15,
  //   borderRadius: 8,
  // },
});
