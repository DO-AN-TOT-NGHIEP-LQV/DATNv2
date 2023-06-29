import React from "react";
import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import CustomButton from "./CustomButton/index.js";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AuthRequired = ({
  styleContainer,
  styleButton,
  navigation,
  nextTabName,
}) => {
  const Auth = "AuthTab";

  const handleLogin = () => {
    navigation.navigate(Auth, {
      screen: "LoginScreen",
    });
  };

  const handleRegister = () => {
    navigation.navigate(Auth, {
      screen: "SignupScreen",
    });
  };

  return (
    <View style={{ ...styles.styleContainer, styleContainer }}>
      <Text
        style={{
          fontFamily: "Roboto-Regular",
          fontStyle: "italic",
          marginVertical: 5,
        }}
      >
        Bạn phải đăng nhập để thực hiện chức năng này
      </Text>
      <CustomButton
        onPress={() => handleLogin()}
        label={"Đăng nhập"}
        styleContainer={{ ...styles.styleButton, styleButton }}
      />

      <View className="mt-[1px] justify-center flex-row">
        <Text>Chưa có tài khoảng?</Text>
        <TouchableOpacity onPress={() => handleRegister()}>
          <Text className=" font-[700] text-[#AD40AF]"> Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthRequired;

const styles = StyleSheet.create({
  styleContainer: {
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  styleButton: {
    width: 150,
    alignSelf: "center",
  },
});
