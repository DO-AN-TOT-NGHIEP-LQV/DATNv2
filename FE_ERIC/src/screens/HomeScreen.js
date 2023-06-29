import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
  ImageBackground,
  StatusBar,
  FlatList,
} from "react-native";
import React, { Fragment, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeroImage, ShoesFLas } from "../public/assets";
import * as Animatable from "react-native-animatable";
import actions from "../redux/actions";
import { useSelector } from "react-redux";
import { showError } from "../ultils/messageFunction";
import Color from "../constans/Color";
import { GET_DETAIL_USERS } from "../config/urls";
import { saveDetailUser } from "../redux/actions/auth";
import { apiGet } from "../ultils/utilsApi";
import { banner1, banner2, banner3, bg1, bg2 } from "../public/assets/image";
import { FONTS, SIZES } from "../constans/Theme";
import Swiper from "react-native-swiper";
import Moment from "moment";
import { newListProduct, typeList } from "../constans/raw";
import {
  HorizontalProductCard,
  SectionHome,
  TypeCard,
} from "../components/Home";
import LottieLoading from "../components/LottieLoading";
import { PriceVND, logoHome } from "../public/assets/icons";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const HomeScreen = () => {
  const navigation = useNavigation();
  const tokenData = useSelector((state) => state.auth.tokenData);
  const detailData = useSelector((state) => state.auth.detailUser);

  const currentDate = Moment();
  const formattedDate = currentDate.format("dddd, DD/MM/YYYY");

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //   });
  // }, []);

  // const navigatorToScreen = () => {
  //   navigation.navigate("DiscoverTab", { screen: "DetailPost" });
  // };

  // const getAllUsses = async () => {
  //   try {
  //     const res = await actions.getAllUsers();
  //   } catch (error) {
  //     showError(error.error_message);
  //   }
  // };

  // const getDetailUser = async () => {
  //   await apiGet(GET_DETAIL_USERS, {}, {}, true)
  //     .then((res) => {
  //       console.log("GET_DETAIL_USERS");
  //       saveDetailUser(res.data);
  //     })
  //     .catch((error) => {});
  // };

  function renderHeader() {
    return (
      <Fragment>
        {/* Name && date */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 15,
            paddingHorizontal: 10,
            // borderWidth: 2,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ ...FONTS.h3 }}>
              Xin chào, {detailData?.username || null}
            </Text>
            <Text
              numberOfLines={1}
              style={{ ...FONTS.body4, color: Color.textLight }}
            >
              {formattedDate}
            </Text>
          </View>
        </View>

        {/* Hello */}
        <View
          style={{
            borderRadius: 8,
            color: Color.mainColor,
            marginLeft: 10,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              color: "#3c6072",
              fontSize: 26,
              marginLeft: -3,
              alignSelf: "flex-start",
            }}
          >
            Chào mừng đến với
          </Text>
          {/* First Section DONE */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* <View
              style={{
                width: 90,
                height: 90,
                borderRadius: 9999,
                alignItems: "center",
                justifyContent: "center",
                // borderWidth: 1,
                // backgroundColor: Color.blackOpacity,
              }}
            > */}
            {/* <Text
                className="text-[#00BCC9]  font-semibold"
                style={{ fontSize: 20, lineHeight: 32, color: Color.blueTheme }}
              >
                ER
              </Text> */}
            <Image
              source={logoHome}
              style={{
                width: 90,
                height: 90,
                borderRadius: 9999,
                borderWidth: 1,
              }}
              // resizeMode="cover"
              resizeMode="contain"
            />
            {/* </View> */}
            <View style={{ flex: 1 }}>
              <Text className="text-[#00BCC9] text-[30px] font-bold">
                Shoes ERIC
              </Text>
              <Text className="text-[#3C6072]">
                Hãy để chúng tôi giúp bạn tìm sản phẩm bạn mong muốn
              </Text>
            </View>
          </View>
        </View>
      </Fragment>
    );
  }

  function renderPopularList() {
    return <View></View>;
  }

  function renderTagType() {
    return (
      <SectionHome title={"Loại"} containerStyle={{}}>
        <View style={styles.selectedTagsContainer}>
          {typeList.map((tag, index) => (
            <View key={index} style={{ marginHorizontal: 5, marginTop: 5 }}>
              <TypeCard
                type={tag}
                imageStyle={{
                  opacity: 0.6,
                }}
                containerStyle={{
                  height: 30,
                  width: "100%",
                  paddingVertical: 0,
                  paddingHorizontal: 0,
                  marginRight: 15,
                  borderRadius: 8,
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  // margin: 5,
                  // borderWidth: 1,

                  // marginLeft: 20,
                }}
                textStyle={{
                  color: Color.black,
                  fontSize: 14,
                  ...FONTS.h4,
                }}
                onPress={() => {
                  actions.brandSelectedList([]);
                  actions.typeSelectedList([tag.value]);
                  actions.nowRangeMinMaxPrice([0, 80]);
                  actions.updateApplyFilter(true);
                  actions.changeFilter();
                  navigation.navigate("SearchTab", { screen: "SearchText" });
                }}
              />
            </View>
          ))}
        </View>
      </SectionHome>
    );
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fcfcfb", // Color.mainTheme,
        flex: 1,
      }}
    >
      {renderHeader()}

      {/* Swiper Section */}
      <View
        style={{
          marginHorizontal: 10,
          paddingHorizontal: 10,
          ...styles.sliderContainer,
          borderRadius: 10,
          // flex: 1,
        }}
      >
        <Swiper
          autoplay
          horizontal={false}
          height={180}
          activeDotColor={Color.mainColor}
        >
          <View style={styles.slide}>
            <Image
              source={banner1}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={banner2}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={banner3}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
        </Swiper>
      </View>
      {renderTagType()}
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: Color.transparent,
          alignItems: "flex-end",
          // borderWidth: 1,
        }}
      >
        {/* <TouchableOpacity
          style={{
            width: 100,
            height: 30,
            backgroundColor: Color.while2,
            borderWidth: 1,
          }}
        >
          <Text>dsfasdsa</Text>
        </TouchableOpacity> */}
        <Image
          source={require("../public/assets/gif/man-doing-shoes-shopping.gif")}
          style={{
            width: 200,
            height: 200,
          }}
          resizeMode="contain"
        />
      </View>

      {renderPopularList()}

      {/* Circel Section */}
      <View style={styles.circleBlue}></View>
      <View style={styles.circleYellow}></View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    // backgroundColor: "transparent",
    borderRadius: 8,
  },
  sliderImage: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
  },

  sliderContainer: {
    height: 180,
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 8,
  },
  sessionRow: {
    flexDirection: "row",
    paddingHorizontal: SIZES.padding,
  },
  title: { flex: 1, ...FONTS.h2 },
  selectedTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
  },
  circleBlue: {
    opacity: 0.1,
    zIndex: -10,
    width: 300,
    height: 300,
    backgroundColor: "#00BCC9",
    borderRadius: 999,
    position: "absolute",
    bottom: 260,
    right: "-25%",
  },
  circleYellow: {
    opacity: 0.1,
    zIndex: -10,
    width: 200,
    height: 200,
    backgroundColor: "#E99265",
    borderRadius: 999,
    position: "absolute",
    bottom: 0,
    left: "-25%",
    zIndex: 10,
  },
});
