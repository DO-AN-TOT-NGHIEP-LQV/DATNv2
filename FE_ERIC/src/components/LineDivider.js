import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Color from "../constans/Color";

const LineDivider = ({ lineStyle }) => {
  return (
    <View
      style={{
        ...styles.defaultStyle,
        ...lineStyle,
      }}
    ></View>
  );
};

export default LineDivider;

const styles = StyleSheet.create({
  defaultStyle: {
    height: 2,
    width: "100%",
    backgroundColor: Color.textLight,
  },
});
