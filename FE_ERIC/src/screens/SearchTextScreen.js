import { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Animated,
  KeyboardAvoidingView,
  RefreshControl,
} from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";

import Color from "../constans/Color";
import actions from "../redux/actions";

import MasonryListProducts from "../components/Search/MasonryListProducts";
import { useSelector } from "react-redux";
import { showError } from "../ultils/messageFunction";
import FilterModal from "../components/Search/FilterModal";
// import SearchInputHeader from "../components/Search/SearchInputHeader";
import { SIZES, spacing, statusbarHeight } from "../constans/Theme";
import Icons, { icons } from "../components/Icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const SearchTextScreen = () => {
  const navigation = useNavigation();
  const [listSearch, setListSearch] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [showFilterModel, setShowFilterModel] = useState(false);

  const isApplyFilter = useSelector((state) => state.filter.isApplyFilter);

  const nowRangeMinMaxPrice = useSelector(
    (state) => state.filter.nowRangeMinMaxPrice
  );

  const typeSelectedList = useSelector(
    (state) => state.filter.typeSelectedList
  );

  const brandSelectedList = useSelector(
    (state) => state.filter.brandSelectedList
  );

  /////////
  const renderCount = useRef(0);

  //Search Input State

  ///// State va func  Scroll
  const [pageProduct, setPageProduct] = useState(0);
  const [loadingEndScroll, setLoadingEndScroll] = useState(false);
  const [isEndOfData, setIsEndOfData] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    if (loadingEndScroll == false) {
      setIsRefreshing(true);
      firstRenderData();
      setIsEndOfData(false);
      setIsRefreshing(false);
    }
  };

  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isEndReached =
      contentOffset.y + layoutMeasurement.height >= contentSize.height;

    if (isEndReached && !loadingEndScroll && !isEndOfData) {
      fetchMoreDataSearch();
    }
  };

  // const firstRenderData = () => {
  //   // day la ham load lai dau tien
  //   try {
  //     setListSearch([]);
  //     setLoadingEndScroll(true);
  //     setIsEndOfData(false);

  //     if (isApplyFilter) {
  //       const res = actions.searchAndFilterProducts(
  //         0,
  //         searchText,
  //         typeSelectedList,
  //         brandSelectedList,
  //         nowRangeMinMaxPrice[0],
  //         nowRangeMinMaxPrice[1]
  //       );
  //       setListSearch(res.data);
  //       console.log(res.data);
  //     } else {
  //       // const res = await actions.searchAndFilterProducts(0, searchText);
  //       const res = actions.searchProductByText(0, searchText);
  //       console.log(res.data);
  //       setListSearch(res.data);
  //     }

  //     setPageProduct(0);
  //     setLoadingEndScroll(false);
  //     console.log("done");
  //   } catch (error) {
  //     setPageProduct(0);
  //     setLoadingEndScroll(false);
  //     showError(error.error_message);
  //   }
  // };

  // const fetchMoreDataSearch = () => {
  //   // Hay featch data cho van de scroll
  //   try {
  //     setLoadingEndScroll(true);

  //     if (isApplyFilter) {
  //       const res = actions.searchAndFilterProducts(
  //         pageProduct + 1,
  //         searchText,
  //         typeSelectedList,
  //         brandSelectedList,
  //         nowRangeMinMaxPrice[0],
  //         nowRangeMinMaxPrice[1]
  //       );
  //       console.log(res.data);
  //       setListSearch([...listSearch, ...res.data]);
  //       if (res.data.length === 0) {
  //         setIsEndOfData(true);
  //       }
  //     } else {
  //       const res = actions.searchProductByText(pageProduct + 1, searchText);
  //       console.log(res.data);
  //       setListSearch([...listSearch, ...res.data]);
  //       if (res.data.length === 0) {
  //         setIsEndOfData(true);
  //       }
  //     }

  //     setPageProduct((pre) => pre + 1);
  //     setLoadingEndScroll(false);
  //   } catch (error) {
  //     console.log(error);
  //     showError(error.error_message);
  //     setLoadingEndScroll(false);
  //   }
  // };

  const firstRenderData = async () => {
    // day la ham load lai dau tien
    // try {
    setListSearch([]);
    setLoadingEndScroll(true);
    setIsEndOfData(false);

    if (isApplyFilter) {
      await actions
        .searchAndFilterProducts(
          0,
          searchText,
          typeSelectedList,
          brandSelectedList,
          nowRangeMinMaxPrice[0],
          nowRangeMinMaxPrice[1]
        )
        .then((res) => {
          setListSearch(res.data);
          // console.log(res.data);
        })
        .catch((error) => {
          setPageProduct(0);
          setLoadingEndScroll(false);
          showError(error.error_message);
        });
    } else {
      await actions
        .searchProductByText(0, searchText)
        .then((res) => {
          // console.log(res.data);
          setListSearch(res.data);
        })
        .catch((error) => {
          setPageProduct(0);
          setLoadingEndScroll(false);
          showError(error.error_message);
        });
    }

    setPageProduct(0);
    setLoadingEndScroll(false);
    // console.log("done");
  };

  const fetchMoreDataSearch = async () => {
    // Hay featch data cho van de scroll
    try {
      setLoadingEndScroll(true);

      if (isApplyFilter) {
        await actions
          .searchAndFilterProducts(
            pageProduct + 1,
            searchText,
            typeSelectedList,
            brandSelectedList,
            nowRangeMinMaxPrice[0],
            nowRangeMinMaxPrice[1]
          )
          .then((res) => {
            console.log(res.data);
            setListSearch([...listSearch, ...res.data]);
            if (res.data.length === 0) {
              setIsEndOfData(true);
            }
          })
          .catch((error) => {
            // console.log(error);
            showError(error.error_message);
            setLoadingEndScroll(false);
          });
      } else {
        await actions
          .searchProductByText(pageProduct + 1, searchText)
          .then((res) => {
            // console.log(res.data);
            setListSearch([...listSearch, ...res.data]);
            if (res.data.length === 0) {
              setIsEndOfData(true);
            }
          })
          .catch((error) => {
            // console.log(error);
            showError(error.error_message);
            setLoadingEndScroll(false);
          });
      }

      setPageProduct((pre) => pre + 1);
      setLoadingEndScroll(false);
    } catch (error) {}
  };

  /// Effect render
  useEffect(() => {
    setPageProduct(0);
    firstRenderData();
  }, []);

  const isChangeFilter = useSelector((state) => state.filter.isChangeFilter);

  useEffect(() => {
    setPageProduct(0);
    // setListSearch([]);
    firstRenderData();
  }, [isChangeFilter]);
  ///////////////

  function searchInputHeader() {
    const onSearch = () => {
      if (loadingEndScroll) return;
      firstRenderData();
    };

    return (
      <View
        style={{
          backgroundColor: Color.mainTheme,
          ...statusbarHeight,
        }}
      >
        <View style={[style.headerWrapperHeader, style.shadowTouch]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={style.headerLeft}>
              <Icons
                icon={icons.Feather}
                size={12}
                color={Color.black}
                name={"chevron-left"}
              />
            </View>
          </TouchableOpacity>

          <View style={style.headerRight}>
            <View
              style={{
                borderWidth: 1,
                borderColor: Color.blueMain,
                borderRadius: 10,
              }}
            >
              <View style={style.inner}>
                <TextInput
                  style={style.field}
                  placeholder="Search"
                  value={searchText}
                  onChangeText={setSearchText}
                />

                {/* Camera icon */}
                <TouchableOpacity
                  style={{
                    ...style.cameraButton,
                  }}
                  onPress={() => {
                    navigation.navigate("SearchTab", {
                      screen: "SearchImage",
                    });
                  }}
                >
                  <View>
                    <Icons
                      icon={icons.Ionicons}
                      size={20}
                      name="camera-outline"
                    />
                  </View>
                </TouchableOpacity>

                {/* Filter icon */}
                <TouchableOpacity
                  style={{
                    ...style.cameraButton,
                  }}
                  onPress={() => setShowFilterModel(true)}
                >
                  <View>
                    {isApplyFilter ? (
                      <Icons
                        icon={icons.Ionicons}
                        size={20}
                        name="md-filter-outline" //isApplyFilter
                      />
                    ) : (
                      <Icons
                        icon={icons.MaterialCommunityIcons}
                        size={20}
                        name={"filter-variant-remove"}
                      />
                    )}
                  </View>
                </TouchableOpacity>

                {/* Search Button */}
                <TouchableOpacity
                  style={style.filter}
                  // onPress={async () => await onSearch()}
                  onPress={() => onSearch()}
                >
                  <View>
                    <Icons
                      icon={icons.AntDesign}
                      name="search1"
                      color={Color.white}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
  //////////////////////////////////////////////

  return (
    <View style={style.container}>
      {searchInputHeader()}

      <TouchableOpacity
        style={{
          paddingHorizontal: 15,
          paddingVertical: 6,
          gap: 10,
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            fontWeight: "600",
            fontStyle: "italic",
            fontSize: 14,
            opacity: 1,
            borderBottomWidth: 1,
            paddingLeft: 50,
          }}
        >
          Products
        </Text>
      </TouchableOpacity>

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        {listSearch ? (
          <MasonryListProducts
            data={listSearch}
            previousScreen={"SearchText"}
          />
        ) : null}

        {loadingEndScroll && (
          <View>
            <ActivityIndicator />
          </View>
        )}
        {isEndOfData && (
          <Text
            style={{
              fontStyle: "italic",
              fontSize: 12,
              alignSelf: "center",
            }}
          >
            Đã đến cuối cùng
          </Text>
        )}
      </ScrollView>

      {/* Filter */}
      {showFilterModel && (
        <FilterModal
          isVisible={showFilterModel}
          onClose={() => setShowFilterModel(false)}
        />
      )}
    </View>
  );
};

export default SearchTextScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F1FD",
  },
  headerWrapperHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: Color.white,

    height: Dimensions.get("window").height / 15,
    marginHorizontal: 5,
    marginTop: 5,
    zIndex: 10,
  },
  headerLeft: {
    borderColor: Color.textLight,
    borderWidth: 2,
    padding: 12,
    borderRadius: 10,
  },
  headerRight: {
    height: "90%",
    flexGrow: 1,
    marginLeft: 8,
    backgroundColor: Color.white,
  },

  shadowTouch: {
    borderRadius: 16,
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 2,
  },

  inner: {
    flexDirection: "row",
  },
  field: {
    backgroundColor: Color.white,
    paddingLeft: spacing.s,
    paddingVertical: 10,
    borderRadius: 16,
    marginRight: 3,

    flex: 1,
    shadowColor: Color.black,
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  filter: {
    borderWidth: 2,
    borderColor: Color.blueMain,
    width: 40,
    backgroundColor: Color.blueMain,
    justifyContent: "center",
    alignItems: "center",
    borderBottomEndRadius: 8,
    borderTopRightRadius: 8,
  },
  cameraButton: {
    justifyContent: "center",
    marginRight: 3,
  },
});
