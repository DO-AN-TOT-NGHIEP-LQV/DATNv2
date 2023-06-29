import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  Animated,
  ImageBackground,
  StatusBar,
} from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";

import {
  ImageHeaderScrollView,
  TriggeringView,
} from "react-native-image-header-scroll-view";

// import Color from "../constans/Color";
import { Color } from "../constans";

import Icons, { icons } from "../components/Icons";
import { useNavigation } from "@react-navigation/core";

import * as ImagePicker from "expo-image-picker";
import actions from "../redux/actions";
import { showError } from "../ultils/messageFunction";
import MasonryListProducts from "../components/Search/MasonryListProducts";
import ScanImageEffect from "../components/Search/ScanImageEffect";
import { SIZES, spacing, statusbarHeight } from "../constans/Theme";
import { ShoesFLas } from "../public/assets";
import { ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";

// const { width, height } = Dimensions.get("window");
const width = Dimensions.get("window").width / 2 - 30;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 65;
const MAX_HEIGHT = 200;

const SearchImageScreen = () => {
  /// Cac state reder chon Image
  const [scrollY] = useState(new Animated.Value(0));

  const [homeBarColor, setHomeBarColor] = useState("rgba(0,0,0,0.2)");
  const [homeIconBColor, setHomeIconColor] = useState(Color.textLight);

  const opacityFunction = scrollY.interpolate({
    inputRange: [0, MAX_HEIGHT - MIN_HEIGHT],
    outputRange: [1, 0.1],
    extrapolate: "clamp",
  });

  const colorIconFunction = scrollY.interpolate({
    inputRange: [0, MAX_HEIGHT - MIN_HEIGHT],
    outputRange: [Color.textLight, Color.white],
    extrapolate: "clamp",
  });

  /// State
  const [pickedImagePath, setPickedImagePath] = useState(null);

  const [listSearch, setListSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const fetchData = async (pickedImagePathInput) => {
    if (pickedImagePathInput) {
      try {
        setPickedImagePath(pickedImagePathInput);

        setListSearch([]);
        setIsLoading(true);
        const startTime = new Date().getTime();
        const res = await actions.searchWithImage(pickedImagePathInput);
        setListSearch(res.data);
        const endTime = new Date().getTime(); // Thời gian kết thúc request
        const elapsedTime = endTime - startTime;
        console.log("Da render lai ham Search Image");
        console.log(elapsedTime / 1000);
        setIsLoading(false);
      } catch (error) {
        setListSearch([]);
        showError(error.error_message);
        setIsLoading(false);
      }
    }
  };

  function renderImageChose() {
    return (
      <Animated.View
        style={{
          alignItems: "center",
          paddingHorizontal: 5,
          height: MAX_HEIGHT,
          opacity: opacityFunction,
        }}
      >
        {!pickedImagePath ? (
          <TouchableOpacity
            style={{
              ...styles.imagePickerStyle,
              borderStyle: "dashed",
              borderColor: Color.blueTheme,
            }}
          >
            <ImageBackground
              source={ShoesFLas}
              resizeMode="contain"
              imageStyle={{
                width: "100%",
                height: "100%",
                
              }}
              style={styles.header}
            />
            <Text style={{}}>Chọn ảnh cần tìm</Text>
          </TouchableOpacity>
        ) : isLoading ? (
          <ScanImageEffect
            pickedImagePath={pickedImagePath}
            style={styles.imagePickerStyle}
          />
        ) : (
          <Image
            source={{ uri: pickedImagePath }}
            style={styles.imagePickerStyle}
          />
        )}

        {renderButton()}
      </Animated.View>
    );
  }

  function renderHeader() {
    return (
      <Animated.View
        style={{
          ...styles.headerWrapperHeader,
        }}
      >
        {/* Icon call back  */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SearchTab", {
              screen: "SearchText",
            });
          }}
        >
          <Animated.View
            style={{
              ...styles.backStyles,
              backgroundColor: colorIconFunction,
            }}
          >
            <Icons
              icon={icons.Feather}
              size={18}
              color={Color.black}
              name={"chevron-left"}
            />
          </Animated.View>
        </TouchableOpacity>

        <View style={{ flexDirection: "row" }}>
          {/* Icon 2  */}
          <TouchableOpacity
            onPress={() => {
              setPickedImagePath("");
              setListSearch([]);
            }}
          >
            <Animated.View
              style={{
                ...styles.rightHomeIconStyle,
                backgroundColor: colorIconFunction,
                // borderColor: homeIconBColor,
              }}
            >
              <Icons
                icon={icons.Feather}
                size={20}
                name="x"
                color={Color.black}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  function renderButton() {
    const showImagePicker = async () => {
      // Ask the user for the permission to access the media library
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your photos!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        fetchData(result.assets[0].uri);
      }
    };

    const openCamera = async () => {
      // Ask the user for the permission to access the camera
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your camera!");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        fetchData(result.assets[0].uri);
      }
    };

    return (
      <View style={styles.buttonContainer}>
        <Button
          icon="camera"
          mode="contained"
          onPress={() => openCamera()}
          style={{ marginRight: 20, backgroundColor: Color.mainColor }}
        >
          Máy ảnh
        </Button>
        <Button
          icon="image-multiple"
          mode="outlined"
          onPress={() => showImagePicker()}
          style={{ backgroundColor: "white" }}
          textColor={Color.mainColor}
        >
          Thư viện
        </Button>
      </View>
    );
  }

  function renderContent() {
    return isLoading ? (
      <ActivityIndicator style={{ marginTop: 5 }} />
    ) : (
      <MasonryListProducts data={listSearch} previousScreen={"SearchImage"} />
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ImageHeaderScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        scrollViewBackgroundColor={Color.mainTheme}
        renderTouchableFixedForeground={() => renderImageChose()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <TriggeringView
          style={{
            marginTop: 5,
          }}
        >
          {renderContent()}
        </TriggeringView>
      </ImageHeaderScrollView>
    </View>
  );
};

export default SearchImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.statusbarHeight,
    backgroundColor: Color.mainTheme,
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  headerWrapperHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 16,
    height: Dimensions.get("window").height / 15,
    marginHorizontal: 5,
    marginTop: 5,
    zIndex: 10,
    position: "absolute",
    top: spacing.statusbarHeight,
    left: 0,
    right: 0,
  },

  backStyles: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    borderColor: Color.textLight,
  },
  rightHomeIconStyle: {
    borderWidth: 2,
    padding: 8,
    borderRadius: 50,
    borderColor: Color.textLight,
  },
  imagePickerStyle: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
    height: (MAX_HEIGHT * 9) / 10,
    borderRadius: SIZES.radius,
    borderColor: Color.textLight,
    backgroundColor: Color.white,
    borderWidth: 2,
  },
  header: {
    height: 75,
    width: "50%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
