import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import Color from "../../constans/Color";

const CustomButton = ({
  label,
  onPress,
  styleContainer,
  isLoading,
  textStyle,
  isDisable = false,
}) => {
  return (
    <Button
      onPress={onPress}
      // style={className ? className : styles.defaultClassname}
      style={{ ...styles.defaultClassname, ...styleContainer }}
      loading={isLoading}
      loadingProps={{ color: "black" }}
      disabled={isDisable}
    >
      {!!isLoading ? (
        ""
      ) : (
        <Text style={{ ...styles.textStyle, ...textStyle }}>{label}</Text>
      )}
    </Button>
  );
};

const styles = StyleSheet.create({
  defaultClassname: {
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: Color.mainColor,
  },
  // btnStyle: {
  //   height: 48,
  //   backgroundColor: "blue",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderRadius: 10,
  //   paddingHorizontal: 16,
  // },
  textStyle: {
    alignItems: "center",
    color: "white",
    lineHeight: 18,
  },
});

export default CustomButton;
