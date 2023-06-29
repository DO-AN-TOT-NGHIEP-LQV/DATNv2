import { StyleSheet, Text, View, TextButton } from "react-native";
import React from "react";
import { FONTS, SIZES } from "../../constans/Theme";
// import CustomButton from "../CustomButton/index.js";

const SectionHome = ({ containerStyle, title, onPress, children }) => {
  return (
    <View style={{ ...styles.containerStyle, ...containerStyle }}>
      <View style={styles.sessionRow}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {children}
    </View>
  );
};

export default SectionHome;

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: SIZES.padding,
  },
  sessionRow: {
    flexDirection: "row",
    paddingHorizontal: SIZES.padding,
  },
  title: { flex: 1, ...FONTS.h2, paddingTop: SIZES.base },
  styleContainer: {
    borderRadius: 30,
    width: 80,
  },
});
