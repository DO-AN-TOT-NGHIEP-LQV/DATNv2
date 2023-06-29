import { StatusBar } from "react-native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const SIZES = {
  width,
  height,

  base: 8,
  font: 14,
  radius: 12,
  title: 24,
  padding: 10,
  maxRadius: 30,

  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,

  body: 14,
  caption: 12,
};

export const spacing = {
  s: 8,
  m: 18,
  l: 24,
  xl: 40,
  statusbarHeight: StatusBar.currentHeight,
};

export const statusbarHeight = {
  marginTop: StatusBar.currentHeight,
};

export const FONTS = {
  h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 20 },
  h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },

  body1: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
};

export const shadow = {
  light: {
    shadowColor: "#fff",
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  dark: {
    shadowColor: "#000",
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
};

const appTheme = { SIZES, FONTS, spacing, shadow };
export default appTheme;
