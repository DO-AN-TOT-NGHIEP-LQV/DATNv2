import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Color from "../../constans/Color";
import Icons, { icons } from "../Icons";
import CustomButton from "../CustomButton/index.js";
import { color } from "react-native-reanimated";
import LineDivider from "../LineDivider";
import { showError } from "../../ultils/messageFunction";
import { useSelector } from "react-redux";
import { newListProduct } from "../../constans/raw";
import { LinearGradient } from "expo-linear-gradient";
import { apiGet } from "../../ultils/utilsApi";
import { GET_SHOP_BY_PRODUCT_ID } from "../../config/urls";
import LottieLoading from "../LottieLoading";
import { FONTS, SIZES } from "../../constans/Theme";

const DetailShop = ({ dataProduct, effectMainTriggered }) => {
  const [listShop, setListShop] = useState([]);
  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, [dataProduct, effectMainTriggered]);

  const fetchData = async () => {
    setLoading(true);
    var headers = {
      "Content-Type": "application/json",
    };

    var data = {
      params: {
        productId: dataProduct?.id,
      },
    };
    await apiGet(GET_SHOP_BY_PRODUCT_ID, data, headers, false)
      .then((res) => {
        console.log("GET_SHOP_BY_PRODUCT_ID");
        setListShop(res.data);
      })
      .catch((error) => {
        console.log(error);
        showError(error.error_message);
      });

    setLoading(false);
  };

  function renderListShop() {
    return (
      <View style={{}}>
        {listShop.length == 0 ? (
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontStyle: "italic",
              marginVertical: 5,
              marginTop: 20,

              alignSelf: "center",
            }}
          >
            Không có cửa hàng nào có sản phẩm này
          </Text>
        ) : (
          <FlatList
            data={listShop}
            keyExtractor={(item) => `item-${item.shop.id}`}
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 10 }}
            // onRefresh={handleRefresh}
            // refreshing={refreshing}
            renderItem={({ item, index }) => {
              return (
                <HorizontalShopCard
                  containerStyle={{
                    height: 80,
                    alignItems: "center",
                    marginHorizontal: SIZES.font,
                    marginBottom: SIZES.radius,
                  }}
                  imageStyle={{
                    // marginTop: 10,
                    margin: 5,
                    height: 60,
                    width: 60,
                    borderRadius: 20,
                  }}
                  item={item}
                  onPress={() => {}}
                />
              );
            }}
          ></FlatList>
        )}
      </View>
    );
  }

  return loading ? (
    <LottieLoading
      style={{
        height: 200,
        flex: 0,
      }}
    />
  ) : (
    renderListShop()
  );
};

const HorizontalShopCard = ({ containerStyle, imageStyle, item, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        borderRadius: SIZES.radius,
        backgroundColor: "#BBBDC1",
        backgroundColor: "#E5E5E5",
        // backgroundColor: "#F5f5f8",
        // backgroundColor: "#DDDDDD",
        // backgroundColor: "#f8f8F8",
        backgroundColor: Color.darkGray2,
        ...containerStyle,
      }}
    >
      {/* IMAGE */}
      <Image source={{ uri: item?.shop?.sLogo }} style={imageStyle} />

      {/* info */}
      <View
        style={{
          flex: 1,
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Text numberOfLines={1} style={{ ...FONTS.h4 }}>
          {item?.shop?.sName}
        </Text>

        <Text
          numberOfLines={2}
          style={{ fontSize: 10, fontWeight: "normal", color: Color.gray }}
        >
          {`S/lượng: `}
          <Text numberOfLines={1} style={{ ...FONTS.h4 }}>
            {item?.shopProduct?.quantity}
          </Text>
        </Text>

        <Text
          numberOfLines={2}
          style={{ fontSize: 10, fontWeight: "normal", color: Color.gray }}
        >
          Đ/chỉ: {item?.shop?.sAddress1} Thôn 2 thái sơn điện tiến ddien ban
          quang nam
        </Text>
      </View>

      <View
        style={{
          width: "30%",
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            color: Color.blueSd,
            ...FONTS.h3,
            fontSize: 15,
            // alignItems: "flex-end",
            alignSelf: "flex-end",
            paddingTop: 5,
            paddingRight: 10,
          }}
        >
          {(item?.shopProduct?.price || 0).toLocaleString("vi-VN")}
        </Text>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: Color.mainColor,
            borderRadius: 4,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text
            numberOfLines={1}
            style={{ color: Color.mainColor, fontSize: 10, padding: 5 }}
          >
            Đến nơi bán
          </Text>

          <Icons
            icon={icons.Feather}
            name={"arrow-up-right"}
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
      </View>
    </TouchableOpacity>
  );
};
export default DetailShop;

const styles = StyleSheet.create({
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
  addressStyle: {
    fontWeight: "300",
    fontSize: 14,
  },
  TopTabContainer: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
    flex: 1,
  },
  titleListProduct: {
    fontWeight: "500",
    fontSize: 18,
    marginBottom: 3,
  },
  thumbnailProduct: {
    width: 80,
    height: 80,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Color.textLight,
  },
});
