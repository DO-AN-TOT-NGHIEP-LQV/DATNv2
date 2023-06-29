import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import React from "react";
import { FONTS, SIZES, shadow, statusbarHeight } from "../constans/Theme";
import { bg2 } from "../public/assets/image";
import { Color } from "../constans";

const Header = ({
  containerStyle,
  title,
  leftComponent,
  rightComponent,
  children,
  image,
  centerComponent,
}) => {
  // return (
  //   <ImageBackground
  //     source={bg2}
  //     resizeMode="cover"
  //     style={{
  //       // flex: 1,
  //       alignItems: "center",
  //       borderRadius: 20,
  //       flexDirection: "row",
  //       ...containerStyle,
  //     }}
  //     imageStyle={{
  //       borderRadius: SIZES.radius,
  //       transform: [{ scaleY: -1 }],
  //     }}
  //   >
  //     {/* <View style={{ alignItems: "center", justifyContent: "center" }}>
  //       <Text style={{ color: Colors.black, ...FONTS.h3, marginTop: 10 }}>
  //         Shop của bạn
  //       </Text>
  //     </View> */}

  //     {/* <View style={{ flexDirection: "row", ...containerStyle }}> */}
  //     {/*  Left*/}
  //     {leftComponent}

  //     {/* title */}
  //     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
  //       <Text style={{ ...FONTS.h3 }}>{title}</Text>
  //     </View>

  //     {/* right */}
  //     {rightComponent}
  //     {/* </View> */}
  //   </ImageBackground>
  // );

  return (
    <ImageBackground
      source={image || bg2}
      resizeMode="cover"
      style={{
        alignItems: "center",
        borderRadius: 20,
        paddingVertical: 3,
        paddingHorizontal: 5,
        ...containerStyle,
      }}
      imageStyle={{ opacity: 0.5 }}
    >
      {/* <View style={[styles.headerWrapper, styles.shadowTouch]}> */}
      <View
        style={{
          ...styles.headerWrapper,
          ...styles.shadowTouch,
          ...statusbarHeight,
        }}
      >
        {/*  Left*/}
        {leftComponent}

        {/* title */}
        {centerComponent}

        {/* <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ ...FONTS.h3 }}>{title}</Text>
        </View> */}

        {/* right */}
        {rightComponent}
      </View>
      {/* {children} */}
    </ImageBackground>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: Color.white,
    height: Dimensions.get("window").height / 15,
    width: "100%",
    paddingVertical: 5,
  },
  shadowTouch: {
    borderRadius: 16,
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
  },
});
