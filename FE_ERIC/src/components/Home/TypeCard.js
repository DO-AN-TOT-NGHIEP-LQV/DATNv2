import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import React from "react";
import { FONTS, SIZES } from "../../constans/Theme";
import Color from "../../constans/Color";

const TypeCard = ({ type, containerStyle, onPress, textStyle, imageStyle }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={type?.thumbnail}
        imageStyle={{ borderRadius: SIZES.radius, ...imageStyle }}
        resizeMode="cover"
        style={{
          ...style.containerStyle,
          ...containerStyle,
        }}
      >
        <Text style={{ ...style.title, ...textStyle }}>{type?.value}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default TypeCard;

const style = StyleSheet.create({
  containerStyle: {
    height: 80,
    width: 150,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.radius,
    justifyContent: "flex-end",
  },
  title: {
    color: Color.white,
    ...FONTS.h2,
  },
});
