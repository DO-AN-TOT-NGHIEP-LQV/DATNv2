import { StyleSheet, Text, View } from "react-native";
import React from "react";
// import LottieView from "lottie-react-native";
import Lottie from "lottie-react-native";
import { useRef } from "react";
import { useEffect } from "react";

export default function LottieLoading({ style }) {
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(120, 1000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        ...style,
      }}
    >
      <Lottie
        ref={animationRef}
        source={require("../../assets/lottiesJson/data.json")}
        autoPlay
        loop
        style={{ alignSelf: "flex-start" }} // Đặt chiều rộng (ví dụ: 200)
      />
    </View>
  );
}

const styles = StyleSheet.create({});
