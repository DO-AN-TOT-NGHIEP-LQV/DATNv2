import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";
import React from "react";
import Color from "../constans/Color";

export default function CustomGradient({ children }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Color.blueTheme, Color.white]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }} // Bắt đầu từ 20% (y = 0.2)
        end={{ x: 0, y: 0.5 }} // Kết thúc tại 100% (y = 1)
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: "relative", // Thêm thuộc tính position
  },
  gradient: {
    position: "absolute", // Thêm thuộc tính position
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    // flex: 1,
  },
});
