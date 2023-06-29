import {
  StyleSheet,
  Text,
  View,
  Modal,
  Animated,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import Icons, { icons } from "./Icons";
import { Color } from "../constans";
import CustomButton from "./CustomButton/index.js";
import { TouchableNativeFeedback } from "react-native";

const windowHeight = Dimensions.get("window").height;

const InputModal = ({
  label,
  isVisible,
  onClose,
  onPress,
  children,
  styleContainer,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
        <TouchableNativeFeedback onPress={onClose}>
          <View style={styles.absoluteFull}></View>
        </TouchableNativeFeedback>
        <Animated.View
          style={{
            ...styles.sessionPopup,
            paddingTop: 15,
            ...styleContainer,
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
              {label}
            </Text>

            {onPress && (
              <View
                style={{
                  marginRight: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CustomButton label="Lưu" onPress={onPress} />
              </View>
            )}

            <TouchableOpacity onPress={onClose}>
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

          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default InputModal;

const styles = StyleSheet.create({
  absoluteFull: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  mainPopup: {
    paddingHorizontal: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: Color.textLight,
    backgroundColor: Color.mainTheme,
  },
  sessionPopup: {
    zIndex: 1,
    position: "absolute",
    top: (windowHeight * 1.5) / 10,
    flex: 1,
    borderRadius: 20,
    width: "94%",
    height: (windowHeight * 4) / 10,
    left: "3%",
    right: "3%",
    paddingHorizontal: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: Color.textLight,
    backgroundColor: Color.mainTheme,
  },
  filterMainTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "800",
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
});
