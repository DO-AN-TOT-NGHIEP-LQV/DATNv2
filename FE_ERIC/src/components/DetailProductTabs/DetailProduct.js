import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { Fragment, useEffect } from "react";
import Color from "../../constans/Color";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TriggeringView } from "react-native-image-header-scroll-view";
import { FONTS, SIZES, spacing } from "../../constans/Theme";
import { showError } from "../../ultils/messageFunction";
import LottieLoading from "../LottieLoading";
import { Button } from "react-native-paper";
import { useCallback } from "react";
import { typeList } from "../../constans/raw";
import { TypeCard } from "../Home";
import CustomButton from "../CustomButton/index.js";
import Icons, { icons } from "../Icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { hasSalerRole } from "../../ultils/helperFunction";

const DetailProduct = ({ dataProduct }) => {
  // xem them
  const navigation = useNavigation();

  const [product, setProduct] = useState(dataProduct);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     var headers = {
  //       "Content-Type": "application/json",
  //     };

  //     var data = {
  //       params: {
  //         productId: productId,
  //       },
  //     };
  //     await apiGet(GET_PRODUCT_BY_ID, data, headers, false)
  //       .then((res) => {
  //         console.log("GET_PRODUCT_BY_ID");
  //         setProduct(res.data);
  //       })
  //       .catch((error) => {
  //         showError(error.error_message);
  //       });

  //     setLoading(false);
  //   };

  //   fetchData();
  // }, [productId]);

  const [showMore, setTextShownMore] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const toggleNumberOfLines = () => {
    setTextShownMore(!showMore);
  };

  const detailUser = useSelector((state) => state.auth.detailUser);

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 5); //to check the text is more than 4 lines or not
  }, []);

  const productType = typeList.find((tag) => tag.value === product?.type);
  return loading ? (
    <LottieLoading
      style={{
        height: 200,
        flex: 0,
      }}
    />
  ) : (
    <Fragment>
      <View style={{ ...styles.section, flexDirection: "row", paddingTop: 20 }}>
        <Text
          numberOfLines={10}
          style={{
            ...styles.title,
            flex: 1,
          }}
        >
          {`${product?.name} `}
        </Text>

        {detailUser?.roles && hasSalerRole(detailUser?.roles) && (
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: Color.mainColor,
              borderRadius: 4,
              alignSelf: "flex-start",
              borderRadius: 5,
            }}
            onPress={() => {
              navigation.navigate("SearchTab", {
                screen: "ShopCreateProduct",
                params: { productId: product?.id },
              });
            }}
          >
            <Text
              numberOfLines={1}
              style={{ color: Color.mainColor, fontSize: 10, padding: 10 }}
            >
              Liên kết sản phẩm
            </Text>

            <Icons
              icon={icons.Feather}
              name={"link"}
              size={14}
              color={Color.mainColor}
              style={{
                backgroundColor: Color.darkGray2,
                borderRadius: 50,
                position: "absolute",
                top: -7,
                right: -7,
              }}
            />
          </TouchableOpacity>
        )}
      </View>

      <View
        style={{
          ...styles.section,
          height: 100,
          flexDirection: "row",
          // paddingTop: 10,
          paddingVertical: 10,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ ...FONTS.h4 }}>Giá cơ bản</Text>
          <Text
            style={{
              ...FONTS.h4,
              color: Color.blueSd,
              fontSize: 20,
              marginRight: 10,
              marginTop: 10,
              paddingLeft: 10,
            }}
            numberOfLines={1}
          >
            {product?.price}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text numberOfLines={1}>
            <Text style={{ ...FONTS.h4 }}>Nhãn hàng: </Text>
            {product?.brand}
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              // marginTop: 15,
              alignItems: "baseline",
              marginTop: 5,
              paddingLeft: 10,
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
          </View>
        </View>
      </View>

      <View style={[styles.section]}>
        <Text style={{ ...FONTS.h4 }}>Miêu tả</Text>
        <Text
          onTextLayout={onTextLayout}
          numberOfLines={showMore ? undefined : 5}
          style={{ lineHeight: 20 }}
        >
          {product?.description}
        </Text>

        {lengthMore ? (
          <TouchableOpacity
            onPress={toggleNumberOfLines}
            style={styles.arrowContainer}
          >
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <Ionicons
                name={showMore ? "arrow-up-outline" : "arrow-down-outline"}
                size={16}
                color={Color.mainColor}
              />
              <Text style={{ color: Color.mainColor }}>
                {showMore ? "Thu gọn" : "Xem thêm"}
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    </Fragment>
  );
};

export default DetailProduct;

const styles = StyleSheet.create({
  section: {
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: Color.textLight,
  },
  sectionContent: {
    fontSize: 16,
    textAlign: "justify",
  },
  arrowContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    ...FONTS.h3,
  },
  name: {
    fontWeight: "bold",
  },

  customButtonGoTo: {
    width: 90,
    alignSelf: "flex-start",
    backgroundColor: Color.white,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: Color.mainColor,
  },
  customTextStyleGoTo: {
    fontSize: 12,
    color: Color.mainColor,
  },
});
