import {
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useEffect } from "react";
import Color from "../../constans/Color";
import actions from "../../redux/actions";
import { useSelector } from "react-redux";
import { Surface, TextInput, Text } from "react-native-paper";

import { useRef } from "react";
import Icons, { icons } from "../Icons";
import CustomButton from "../CustomButton/index.js";
import { FONTS } from "../../constans/Theme";
import FlashMessage from "react-native-flash-message";
import { validatorChangePass } from "../../ultils/validations";
import { apiPost } from "../../ultils/utilsApi";
import { CHANGE_PASSWORD } from "../../config/urls";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ModalChangePassword = ({ isVisible, onClose }) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(onClose());
    }
  }, [isVisible]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [windowHeight, (windowHeight * 1.2) / 10],
  });

  const flashMessageRef = useRef();

  const showError = (message) => {
    flashMessageRef.current.showMessage({
      type: "danger",
      icon: "danger",
      duration: 3000,
      message,
      priority: "high",
    });
  };

  const showSuccess = (message) => {
    flashMessageRef.current.showMessage({
      type: "success",
      icon: "success",
      duration: 3000,
      message,
      backgroundColor: "#8BC34A",
      color: Color.white,
    });
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
        {/* Transparent  */}
        <TouchableWithoutFeedback>
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
              marginVertical: 8,
              paddingHorizontal: 5,
            }}
          >
            <Text style={styles.filterMainTitle}>Thay đổi mật khẩu</Text>

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

          <ChangePasswordContent
            onClose={onClose}
            showError={showError}
            showSuccess={showSuccess}
          />
        </Animated.View>

        <FlashMessage ref={flashMessageRef} position="top" />
      </View>
    </Modal>
  );
};

export default ModalChangePassword;

const ChangePasswordContent = ({ onClose, showError, showSuccess }) => {
  const [state, setState] = useState({
    isLoading: false,
    currentPass: "",
    newPass: "",
    confirmPass: "",
  });
  const { isLoading, currentPass, newPass, confirmPass } = state;
  const updateState = (data) => setState(() => ({ ...state, ...data }));

  const isValidData = () => {
    const error = validatorChangePass({
      currentPass,
      newPass,
      confirmPass,
    });
    if (error) {
      showError(error);
      return false;
    }
    return true;
  };

  const onChangePass = async () => {
    const checkValid = isValidData();
    if (checkValid) {
      updateState({ isLoading: true });

      try {
        const res = await apiPost(
          CHANGE_PASSWORD,
          {
            currentPassword: currentPass,
            newPassword: newPass,
          },
          {},
          true
        );

        showSuccess("Password changed successfully. Please log in again.");
        onClose();
        actions.logout();
        updateState({ isLoading: false });
      } catch (error) {
        showError(error.error_message);
        updateState({ isLoading: false });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.box}>
        <TextInput
          label="Mật khẩu cũ"
          mode="outlined"
          value={currentPass}
          onChangeText={(currentPass) => updateState({ currentPass })}
          style={{ marginBottom: 5 }}
          autoCapitalize="none"
          autoCompleteType="password"
        />

        <TextInput
          label="Mật khẩu mới"
          mode="outlined"
          value={newPass}
          onChangeText={(newPass) => updateState({ newPass })}
          style={{ marginBottom: 5 }}
        />

        <TextInput
          label="Nhập lại mật khẩu mới"
          mode="outlined"
          value={confirmPass}
          onChangeText={(confirmPass) => updateState({ confirmPass })}
          style={{ marginBottom: 5 }}
        />

        <CustomButton
          label={"Lưu thay đổi"}
          onPress={onChangePass}
          isLoading={isLoading}
          style={{ marginBottom: 5 }}
        />
      </Surface>
    </View>
  );
};
const styles = StyleSheet.create({
  absoluteFull: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  closeButton: {
    borderColor: Color.textLight,
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
  },
  mainPopup: {
    zIndex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: 350,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: Color.mainTheme,
  },
  filterMainTitle: {
    flex: 1,
    fontSize: 16,
    ...FONTS.h3,
    // fontWeight: "800",
  },
  contentScrollView: {
    paddingBottom: windowHeight,
    backgroundColor: Color.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: 1,
    borderColor: Color.textLight,
  },
  box: {
    borderRadius: 10,
    elevation: 5,
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: Color.mainTheme,
    marginBottom: 30,
  },
  image: {},
  title: {
    fontSize: 40,
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
    fontWeight: "bold",
  },
});
