import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ImageBackground,
} from "react-native";
import React from "react";
import { FONTS, SIZES } from "../../constans/Theme";
import { Color } from "../../constans";
import { bg1, bg11 } from "../../public/assets/image";

const ItemPromo = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.containStyle} onPress={() => onPress()}>
      <View style={styles.header}>
        <ImageBackground
          source={item?.thumbnail || bg11}
          resizeMode="cover"
          imageStyle={{ ...styles.image, opacity: 0.1 }}
          style={styles.header}
        >
          <Text style={styles.headerText}>{item?.title}</Text>
        </ImageBackground>
      </View>

      <View style={styles.content}>
        <Text style={styles.disText}>{item?.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemPromo;

const styles = StyleSheet.create({
  containStyle: {
    marginVertical: SIZES.base,
    width: SIZES.width / 2.5,
  },
  header: {
    height: 75,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Color.mainTheme,
    justifyContent: "center",
  },
  image: {
    opacity: 0.6,
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    transform: [{ scaleX: -1 }],
  },

  content: {
    padding: SIZES.padding,
    backgroundColor: Color.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 120,
  },
  headerText: {
    alignSelf: "center",

    ...FONTS.h4,
  },
  disText: {
    ...FONTS.body4,
    fontSize: 12,
  },
});
