import { StyleSheet, TouchableOpacity, Image, Text, View } from "react-native";
import React from "react";
import Color from "../../constans/Color";
import Icons, { icons } from "../Icons";
import { FONTS, SIZES } from "../../constans/Theme";
import LineDivider from "../LineDivider";

export default function ProfileEdit({
  iconName,
  label,
  onPress,
  iconSize,
  iconsFamily,
}) {
  return (
    <TouchableOpacity style={styles.touchableContainer} onPress={onPress}>
      {/* Icon */}

      <View
        style={{
          borderColor: Color.mainColor,
          flexDirection: "row",
          height: 50,
          alignItems: "center",
          width: "100%",
          marginBottom: 0,
          alignSelf: "flex-end",
          backgroundColor: Color.mainTheme,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <View style={styles.iconStyle}>
          <Icons
            size={iconSize || 20}
            name={iconName}
            icon={iconsFamily || icons.AntDesign}
            color={Color.darkGray}
          />
        </View>

        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
          <Text style={{ ...FONTS.body4 }}>{label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableContainer: {
    flexDirection: "row",
    height: 60,
    alignItems: "flex-end",
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
