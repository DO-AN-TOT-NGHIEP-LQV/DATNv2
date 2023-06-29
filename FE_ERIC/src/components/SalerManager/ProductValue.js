import { StyleSheet, TouchableOpacity, Image, Text, View } from "react-native";
import React from "react";
import Color from "../../constans/Color";
import Icons, { icons } from "../Icons";
import { FONTS, SIZES } from "../../constans/Theme";

export default function ProductValue({
  label,
  value,
  onPress,
  children,
  isChosen = false,

  icon,
}) {
  return (
    <TouchableOpacity style={styles.touchableContainer} onPress={onPress}>
      {icon}
      <View style={{ flex: 1, marginLeft: SIZES.radius }}>
        {label && (
          <Text
            numberOfLines={1}
            style={{ color: Color.blackOpacity, ...FONTS.h4, marginLeft: -10 }}
          >
            {label}
          </Text>
        )}

        <Text numberOfLines={1} style={styles.numOfText}>
          {value}
        </Text>
      </View>

      {children}

      {onPress && (
        <View style={{ transform: [{ rotate: isChosen ? "90deg" : "0deg" }] }}>
          <Icons
            size={16}
            name={"right"}
            icon={icons.AntDesign}
            color={Color.black}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableContainer: {
    flexDirection: "row",
    height: 70,
    alignItems: "center",
  },
  numOfText: {
    color: Color.textLight,
    ...FONTS.body4,
  },

  iconStyle: {
    width: 40,
    height: 40,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: Color.mainTheme,
  },
});
