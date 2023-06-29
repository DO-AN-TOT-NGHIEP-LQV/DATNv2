import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import Color from "../../constans/Color";
import Icons, { icons } from "../Icons";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { FlatList } from "react-native";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native";

const itemWidth = Dimensions.get("window").width / 2 - 10;

const MasonryListProducts = ({ data, previousScreen }) => {
  return (
    <FlatList
      scrollEnabled={false}
      columnWrapperStyle={style.columnWrapperStyle}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      data={data}
      renderItem={({ item }) => (
        <CardItem data={item} previousScreen={previousScreen} />
      )}
    />
  );
};

const CardItem = ({ data, previousScreen }) => {
  const navigation = useNavigation();

  return (
    <View className="bg-[#111] rounded-md" style={style.cardItemView}>
      <View style={style.card}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("DetailProduct", {
              dataProduct: data,
              previousScreen: previousScreen,
              productId: data?.id,
            });
          }}
          style={{
            borderRadius: 3,
            width: "100%",
            height: 100,
            paddingTop: 5,
            paddingBottom: 0,
          }}
        >
          <Image
            source={{ uri: data?.images[0].url || null }}
            className="w-full h-full object-cover"
            resizeMode="contain"
            style={{
              borderRadius: 3,
            }}
          />
        </TouchableOpacity>

        {/* Content || Name */}
        <View style={{ height: 45 }}>
          <Text
            numberOfLines={1}
            style={{
              fontWeight: "normal",
              fontSize: 14,
              marginLeft: 0,
              lineHeight: 15,
              fontFamily: "Roboto-Bold",
            }}
          >
            {`${data?.name}`}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              fontWeight: "normal",
              fontSize: 12,
              marginLeft: 0,
              lineHeight: 15,
              fontFamily: "Roboto-Regular",
            }}
          >
            {`${data?.content || data?.description}`}
          </Text>
        </View>

        {/* Price */}
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text numberOfLines={1}>
            <Text numberOfLines={1} style={style.priceSmall}>
              đ
            </Text>
            <Text numberOfLines={1} style={style.priceBig}>
              {(data?.price || 0).toLocaleString("vi-VN")}
            </Text>
          </Text>
        </View>

        {/* Detail */}
        <View style={style.detailView}>
          {/* Name && address */}
          <TouchableOpacity style={{ flex: 1 }}>
            {/* <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              [{data?.shop?.sName}]
            </Text> */}

            <Text
              numberOfLines={1}
              style={
                {
                  // fontSize: 14,
                  // fontWeight: "300",
                }
              }
            >
              <Icons icon={icons.Feather} name="map-pin" size={14} />
              {data?.shopProducts.length} nơi bán
            </Text>
          </TouchableOpacity>

          {/* Like, Rate, Count */}
          {/* <View style={{ flex: 1 }}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 14,
                fontWeight: "normal",
              }}
            >
              [{data?.shop?.sName}]
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 10,
                fontWeight: "normal",
              }}
            >
              <Icons icon={icons.AntDesign} name="hearto" size={10} />
              {data?.shop?.sAddress1}
            </Text>
          </View> */}
        </View>
      </View>
    </View>
  );
};

export default MasonryListProducts;

const style = StyleSheet.create({
  card: {
    backgroundColor: Color.white,
    flex: 1,
  },
  priceSmall: {
    fontSize: 14,
    fontWeight: "300",
    color: Color.blueMain,
  },
  priceBig: {
    color: Color.blueMain,
    color: Color.blueSd,
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    fontWeight: "normal",
  },
  // originalPrice: {
  //   fontWeight: "300",
  //   color: Color.textLight,
  //   fontSize: 10,
  //   textDecorationLine: "line-through",
  // },
  detailView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
  },
  cardItemView: {
    borderWidth: 1,
    borderColor: Color.textLight,
    // borderWidth: 1,
    height: Math.round(200),
    backgroundColor: Color.white,
    paddingHorizontal: 5,
    margin: 2,
    width: itemWidth,
  },
  columnWrapperStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
});

// <MasonryList
//   data={data}
//   keyExtractor={(item) => item.id}
//   numColumns={2}
//   imageContainerStyle={{ borderRadius: 8 }}
//   showsVerticalScrollIndicator={false}
//   containerStyle={{ backgroundColor: Color.mainTheme }}
//   renderItem={({ item }) => (
//     <CardItem data={item} previousScreen={previousScreen} />
//   )}
// />

// <FlatList
//   data={data}
//   keyExtractor={(item) => item.id}
//   renderItem={({ item }) => (
//     <CardItem data={item} previousScreen={previousScreen} />
//   )}
//   numColumns={2}
//   contentContainerStyle={{
//     backgroundColor: Color.mainTheme,
//     borderWidth: 1,
//     paddingHorizontal: 5,
//   }}
// />
