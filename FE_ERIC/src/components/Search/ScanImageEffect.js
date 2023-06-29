import React, { useEffect, useRef } from "react";
import { Animated, Easing, Image, ImageBackground, View } from "react-native";
import { Color } from "../../constans";
import { ShoesFLas } from "../../public/assets";
import { SIZES } from "../../constans/Theme";

const ScanImageEffect = ({ pickedImagePath, style }) => {
  const scanAnimation = useRef(new Animated.Value(0)).current;
  const moveAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startScanAnimation = () => {
      Animated.loop(
        Animated.timing(scanAnimation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };

    const startMoveAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(moveAnimation, {
            toValue: 1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(moveAnimation, {
            toValue: 0,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startScanAnimation();
    startMoveAnimation();
  }, []);

  const scanOpacity = scanAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.2, 1, 0.2],
  });

  const moveTranslateY = moveAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 150],
  });

  return (
    <Animated.View
      style={{
        ...style,
        backgroundColor: Color.textLight,
        overflow: "hidden",
        borderRadius: SIZES.radius,
      }}
    >
      <ImageBackground
        source={{ uri: pickedImagePath }}
        style={{
          width: "100%",
          height: "100%",
          borderWidth: 0,
          borderRadius: SIZES.radius,
        }}
        imageStyle={{ overflow: "hidden" }}
      >
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            // bottom: 55,
            // borderRadius: 5,
            overflow: "hidden",
            height: "20%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            transform: [{ translateY: moveTranslateY }],
          }}
        />
      </ImageBackground>

      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          borderRadius: SIZES.radius,
          // overflow: "hidden",
          bottom: 0,
          width: "200%",
          height: "200%",
          backgroundColor: Color.textLight,
          opacity: scanOpacity,
        }}
      />
    </Animated.View>
  );
};

export default ScanImageEffect;
