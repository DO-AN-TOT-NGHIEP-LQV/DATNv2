import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Color from "../constans/Color";

export default function CustomTabBarIcon({
  color,
  size,
  focused,
  nameIcon,
  textLabel,
}) {
  // const size = size -2;
  return (
    <View className=" items-center justify-center ">
      <AntDesign
        name={nameIcon}
        size={focused ? size + 3 : size - 2}
        color={focused ? Color.mainColor : color}
      />
      {focused ? (
        <Text
          style={{ color: focused ? Color.mainColor : color, fontSize: 10 }}
        >
          {/* { focused?  textLabel : null} */}
          {textLabel}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  iconDefault: {},
  iconFocused: {},
});
