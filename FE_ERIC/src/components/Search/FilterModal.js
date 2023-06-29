import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  FlatList,
  Pressable,
  Switch,
} from "react-native";

import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useState } from "react";
import Color from "../../constans/Color";
import actions from "../../redux/actions";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRef } from "react";
import Icons, { icons } from "../Icons";
import CustomButton from "../CustomButton/index.js";
import { suggestions, typeList } from "../../constans/raw";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const FilterModal = ({ isVisible, onClose }) => {
  const isApplyFilter = useSelector((state) => state.filter.isApplyFilter);

  const [switchToggle, setSwitchToggle] = useState(isApplyFilter);
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start(onClose());
    }
  }, [isVisible]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [windowHeight, (windowHeight * 1.2) / 10],
  });

  const saveFilterValue = async () => {
    let isAnyVariableChanged = false;
    onClose();
    if (sliderValue !== nowRangeMinMaxPrice) {
      actions.nowRangeMinMaxPrice(sliderValue);
      isAnyVariableChanged = true;
    }

    if (selectedTypeTags !== typeSelectedList) {
      actions.typeSelectedList(selectedTypeTags);
      isAnyVariableChanged = true;
    }

    if (selectedBrandTags !== brandSelectedList) {
      actions.brandSelectedList(selectedBrandTags);
      isAnyVariableChanged = true;
    }

    if (isApplyFilter !== switchToggle) {
      actions.updateApplyFilter(switchToggle);
      isAnyVariableChanged = true;
    }

    if (isAnyVariableChanged) actions.changeFilter();
  };

  /////////////////////////////////////
  useEffect(() => {
    handleSliderChange(nowRangeMinMaxPrice);
    setSelectedTypeTags(typeSelectedList);
    setSelectedBrandTags(brandSelectedList);
    setSwitchToggle(isApplyFilter);
  }, []);

  ///////////// State va funtion Price
  const nowRangeMinMaxPrice = useSelector(
    (state) => state.filter.nowRangeMinMaxPrice
  );

  const [sliderValue, setSliderValue] = useState([0, 0]);
  const [readValue, setReadValue] = useState([0, 0]);
  const postfix = "đồng";

  const handleSliderChange = (values) => {
    setSliderValue(values);
    let minValue = calculateDisplayValue(values[0]);
    let maxValue = calculateDisplayValue(values[1]);
    setReadValue([minValue, maxValue]);
  };
  const calculateDisplayValue = (value) => {
    const min = 0;
    const max = 100;
    const threshold = 70;

    const maxPriceValue = 10000000;
    const minPriceValue = 1000000;

    if (value <= threshold) {
      // Phần đầu (0 - threshold)
      const range = minPriceValue - min;
      const adjustedValue = (value - min) / (threshold - min);
      return Math.round(min + adjustedValue * range).toLocaleString("vi-VN");
    } else {
      // Phần sau (threshold - max)
      const range = maxPriceValue - minPriceValue;
      const adjustedValue = (value - threshold) / (max - threshold);
      return Math.round(minPriceValue + adjustedValue * range).toLocaleString(
        "vi-VN"
      );
    }
  };

  ////////////State cua Type
  const typeSelectedList = useSelector(
    (state) => state.filter.typeSelectedList
  );

  const [selectedTypeTags, setSelectedTypeTags] = useState([]);

  // Modal search Brand
  const [showBrandPopup, setShowPopup] = useState(false);
  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const brandSelectedList = useSelector(
    (state) => state.filter.brandSelectedList
  );

  const [selectedBrandTags, setSelectedBrandTags] = useState([]);

  const handleTagBrandPress = (tag) => {
    const updatedBrandTags = selectedBrandTags.filter(
      (selectedTag) => selectedTag !== tag
    );
    setSelectedBrandTags(updatedBrandTags);
  };

  function renderAutocompleteScreen() {
    const [data, setData] = useState([]);

    const [newTag, setNewTag] = useState("");

    const handleNewTagSubmit = () => {
      if (newTag && !selectedBrandTags.includes(newTag)) {
        setSelectedBrandTags([...selectedBrandTags, newTag]);
        setNewTag("");
      }
    };

    const onChangeText = (text) => {
      setNewTag(text);
      if (text === "") {
        setData([]);
      }
      const regex = new RegExp(`^${text}`, "i");
      setData(suggestions.filter((item) => item.value.match(regex)));
    };

    const selecteSuget = (item) => {
      if (item && !selectedBrandTags.includes(item.value)) {
        setSelectedBrandTags([...selectedBrandTags, item.value]);
        setNewTag("");
      }
    };

    return (
      <Modal animationType="fade" transparent={true} visible={showBrandPopup}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
          <Animated.View
            style={{
              ...styles.mainPopup,
              ...styles.sessionPopup,
              paddingTop: 15,
            }}
          >
            {/* Header */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{ ...styles.filterMainTitle, ...styles.sessionTittle }}
              >
                Nhãn hiệu
              </Text>
              {/* close brand popup */}
              <TouchableOpacity onPress={() => closePopup()}>
                <View style={styles.closeButton}>
                  <Icons
                    icon={icons.Ionicons}
                    size={20}
                    color={Color.textLight}
                    name={"close"}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ ...styles.selectedTagsContainer }}>
              {selectedBrandTags.map((tag) => (
                <TouchableOpacity
                  key={tag}
                  style={styles.selectedTag}
                  onPress={() => handleTagBrandPress(tag)}
                >
                  <Text
                    style={{
                      color: Color.blueMain,
                      fontSize: 13,
                      padding: 10,
                    }}
                  >
                    {tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <SafeAreaView style={{ flex: 1 }}>
              {/* Input  */}
              <Section title={"_____________"}>
                <View style={{ paddingTop: 3 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <TextInput
                      onChangeText={onChangeText}
                      value={newTag}
                      style={{
                        paddingVertical: 10,
                        borderColor: Color.textLight,
                        borderWidth: 1,
                        paddingHorizontal: 10,
                        width: "80%",
                        borderRadius: 5,
                        height: 45,
                        backgroundColor: Color.whileOpacity,
                      }}
                      placeholder="Nhập vào nhãn hiệu bạn muốn tìm"
                      onSubmitEditing={handleNewTagSubmit}
                    />

                    <CustomButton
                      onPress={() => {
                        handleNewTagSubmit();
                      }}
                      label={"Thêm"}
                      textStyle={{ fontSize: 14 }}
                      styleContainer={{
                        borderRadius: 10,
                        height: 45,
                        justifyContent: "center",
                        alignItems: "center",
                        borderColor: Color.textLight,
                        borderRadius: 5,
                        width: "20%",
                      }}
                    />
                  </View>

                  {newTag && data.length > 0 ? (
                    <View style={{ height: 400 }}>
                      <FlatList
                        data={data}
                        contentContainerStyle={{ height: 200 }}
                        showsVerticalScrollIndicator={true}
                        renderItem={({ item, index }) => (
                          <Pressable
                            style={({ pressed }) => [
                              { opacity: pressed ? 0.5 : 1 },
                            ]}
                            onPress={() => {
                              selecteSuget(item);
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                padding: 15,
                              }}
                            >
                              <View style={{ marginLeft: 10, flexShrink: 1 }}>
                                <Text style={{ fontWeight: "700" }}>
                                  {item.value}
                                </Text>
                                <Text style={{ fontSize: 12 }}>
                                  {item.value}
                                </Text>
                              </View>
                            </View>
                          </Pressable>
                        )}
                        keyExtractor={(item, index) => item + index}
                      />
                    </View>
                  ) : null}
                </View>
              </Section>
            </SafeAreaView>
          </Animated.View>
        </View>
      </Modal>
    );
  }

  function renderTagType() {
    const handleTypeTagPress = (tag) => {
      if (selectedTypeTags.includes(tag)) {
        // Hủy chọn tag nếu đã được chọn trước đó
        setSelectedTypeTags(
          selectedTypeTags.filter((selectedTag) => selectedTag !== tag)
        );
      } else {
        // Chọn tag nếu chưa được chọn trước đó
        setSelectedTypeTags([...selectedTypeTags, tag]);
      }
    };

    return (
      <View style={styles.selectedTagsContainer}>
        {typeList.map((tag, index) => (
          <TouchableOpacity
            key={tag?.value + index}
            style={[
              styles.tagType,
              selectedTypeTags.includes(tag?.value) && styles.selectedTagType,
            ]}
            onPress={() => handleTypeTagPress(tag?.value)}
          >
            <Text
              style={{
                color: Color.black,
                fontSize: 13,
                padding: 10,
              }}
            >
              {tag?.value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  //////////////////////////////////////////////
  // FILTER MODAL
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
        {/* Transparent  */}
        <TouchableWithoutFeedback onPress={() => onClose()}>
          <View style={styles.absoluteFull}></View>
        </TouchableWithoutFeedback>

        {/* Main Content */}
        <Animated.View
          style={{
            ...styles.mainPopup,
            top: modalY,
            flex: 1,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              paddingHorizontal: 5,
            }}
          >
            <Text style={styles.filterMainTitle}>Bộ lọc của bạn</Text>

            <View
              style={{
                // flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Switch
                trackColor={{ true: Color.textLight, false: Color.textLight }}
                thumbColor={switchToggle ? Color.mainColor : "#767577"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(value) => {
                  setSwitchToggle(!switchToggle);
                }}
                value={switchToggle}
              />
            </View>

            <Text
              style={{
                flex: 0.2,
              }}
            >
              {switchToggle ? "On" : "Off"}
            </Text>

            <TouchableOpacity onPress={() => onClose()}>
              <View style={styles.closeButton}>
                <Icons
                  icon={icons.Ionicons}
                  size={20}
                  color={Color.textLight}
                  name={"close"}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View
            pointerEvents={switchToggle ? "auto" : "none"}
            style={{
              opacity: switchToggle ? 1 : 0.2,
              // backgroundColor: switchToggle
              //   ? Color.transparent
              //   : Color.blackOpacity,
            }}
          >
            <ScrollView
              contentContainerStyle={styles.contentScrollView}
              showsVerticalScrollIndicator={false}
            >
              {/* Price */}
              <Section title={"Giá"}>
                <View style={{ alignItems: "center", paddingTop: 0 }}>
                  <MultiSlider
                    values={sliderValue}
                    sliderLength={windowWidth - 50 - 20}
                    min={0}
                    max={110}
                    step={1}
                    markerOffsetY={20}
                    selectedStyle={{
                      backgroundColor: Color.mainColor,
                      // borderWidth: 1,
                    }}
                    trackStyle={{
                      height: 10,
                      borderRadius: 10,
                      backgroundColor: Color.textLight,
                      // zIndex: 10,
                    }}
                    minMarkerOverlapDistance={40}
                    isMarkersSeparated={true}
                    customMarkerLeft={(e) => {
                      return (
                        <View style={styles.customMakerContainer}>
                          <View
                            style={{
                              ...styles.customMakerPoint,
                              ...styles.shadowColor,
                            }}
                          />
                          <Text
                            style={{
                              height: 30,
                              color: Color.textDark,
                              fontSize: 10,
                              fontWeight: 400,
                              // zIndex: 10,
                            }}
                          >
                            {readValue[0]} {postfix}
                          </Text>
                        </View>
                      );
                    }}
                    customMarkerRight={(e) => {
                      return (
                        <View style={styles.customMakerContainer}>
                          <View
                            style={{
                              ...styles.customMakerPoint,
                              ...styles.shadowColor,
                              backgroundColor:
                                e.currentValue > 100
                                  ? Color.yellow
                                  : Color.mainColor,
                            }}
                          />
                          <Text
                            style={{
                              height: 30,
                              color: Color.textDark,
                              fontSize: 10,
                              fontWeight: 400,
                            }}
                          >
                            {e.currentValue > 100
                              ? ">10 triệu"
                              : `${readValue[1]}`}
                          </Text>
                        </View>
                      );
                    }}
                    onValuesChange={handleSliderChange}
                  />
                </View>
              </Section>

              {/* Type */}
              <Section title={"Kiểu loại"}>
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingTop: 5,
                  }}
                >
                  {renderTagType()}
                </View>
              </Section>

              <Section title={"Nhãn hiệu"}>
                <TouchableOpacity
                  onPress={() => openPopup()}
                  style={{
                    ...styles.newTagInput,
                  }}
                >
                  <Text style={{ opacity: 0.2 }}>Nhập nhãn hiệu muốn tìm</Text>
                </TouchableOpacity>

                {renderAutocompleteScreen()}

                <View style={styles.selectedTagsContainer}>
                  {selectedBrandTags.map((tag) => (
                    <TouchableOpacity
                      key={tag}
                      style={styles.selectedTag}
                      onPress={() => handleTagBrandPress(tag)}
                    >
                      <Text
                        style={{
                          color: Color.blueMain,
                          fontSize: 13,
                          padding: 10,
                        }}
                      >
                        {tag}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Section>
            </ScrollView>
          </View>

          <View
            style={{
              position: "absolute",
              bottom: 120,
              left: 0,
              right: 0,
              height: 55,
              paddingHorizontal: 20,
              paddingVertical: 20,
              backgroundColor: Color.transparent,
              flex: 1,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: Color.mainColor,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                height: 55,
                borderWidth: 0,
              }}
              onPress={() => {
                saveFilterValue();
              }}
            >
              <Text
                style={{ color: Color.white, fontSize: 18, fontWeight: "600" }}
              >
                Áp dụng
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const Section = ({ containerStyle, title, children }) => {
  return (
    <View
      style={{
        marginVertical: 10,
        // flex: 1,
        marginBottom: 15,
        ...containerStyle,
      }}
    >
      <Text style={styles.sessionTittle}> {title}</Text>
      {children}
    </View>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  filterMainTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "800",
  },
  sessionPopup: {
    top: (windowHeight * 1.5) / 10,
    flex: 1,
    borderRadius: 20,
    width: "90%",
    height: (windowHeight * 8) / 10,
    left: "5%",
    right: "5%",
    marginBottom: (windowHeight * 1) / 10,
  },

  sessionTittle: {
    fontSize: 16,
    fontWeight: "500",
  },
  closeButton: {
    borderColor: Color.textLight,
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
  },
  absoluteFull: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  mainPopup: {
    zIndex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: Color.textLight,
    backgroundColor: Color.mainTheme,
  },
  selectedTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  selectedTag: {
    paddingHorizontal: 4,
    margin: 4,
    backgroundColor: Color.whiteColor,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.mainColor,
  },
  selectedTagText: {
    fontSize: 12,
  },
  newTagInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 14,
    marginTop: 8,
    borderWidth: 1,
    height: 50,
    justifyContent: "center",
  },
  addButton: {
    backgroundColor: "#2196f3",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  customMakerContainer: {
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    zIndex: 10,
  },
  customMakerPoint: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 4,
    borderColor: Color.white,
    backgroundColor: Color.mainColor,
    zIndexL: 1,
  },
  shadowColor: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 1,
    shadowOpacity: 0.1,
  },
  tagType: {
    // paddingHorizontal: 2,
    margin: 2,
    backgroundColor: Color.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.textLight,
    paddingVertical: 0,
  },
  selectedTagType: {
    paddingHorizontal: 4,
    margin: 2,
    backgroundColor: Color.white,
    color: Color.mainColor,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Color.mainColor,
  },
  contentScrollView: {
    paddingBottom: windowHeight,
    backgroundColor: Color.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: 1,
    borderColor: Color.textLight,
  },
});
