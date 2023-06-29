import {
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { FONTS, SIZES } from "../../constans/Theme";
import Color from "../../constans/Color";

export default function HorizontalProductCard({ containerStyle, product }) {
  return (
    <TouchableOpacity style={{ ...styles.containerStyle, ...containerStyle }}>
      {/* image thumbnail */}
      <ImageBackground
        source={{ uri: product?.images[0]?.url }}
        resizeMode="cover"
        style={styles.thumbnail}
        imageStyle={{ borderRadius: SIZES.radius }}
      />

      <View
        style={{
          flex: 1,
          marginLeft: SIZES.base,
        }}
      >
        {/* Title */}
        <Text
          numberOfLines={2}
          style={{
            ...FONTS.h4,
            fontSize: 18,
          }}
        >
          {product?.name}
        </Text>

        {/* Detail  */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              ...FONTS.h4,
              color: Color.mainColor,
              alignItems: "flex-end",
            }}
          >
            <Text style={{ ...FONTS.h3 }}>đ</Text>
            {(product?.price).toLocaleString("vi-VN")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    borderRadius: SIZES.radius,
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginBottom: SIZES.radius,
  },
});
