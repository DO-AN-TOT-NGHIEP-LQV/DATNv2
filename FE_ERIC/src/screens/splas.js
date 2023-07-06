const [currentStep, setCurrentStep] = useState(0);
const [steps, setSteps] = useState([
  {
    image: require("./assets/man-doing-shoes-shopping.png"),
    title: "Easy To Search",
    description:
      "Maecenas elementum est ut nulla blandit ultrices. Nunc quis ipsum urna. Aenean euismod sollicitudin nunc, ut rutrum magna ultricies eget",
  },
  {
    image: require("./assets/icons.png"),
    title: "Easy To Access",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consequat elementum laoreet. Nunc id quam et eros molestie finibus",
  },
  {
    image: require("./assets/adaptive-icon.png"),
    title: "Easy To Manage",
    description:
      "Mauris vulputate interdum nibh vel tempor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas",
  },
]);

const nextStep = () => {
  setCurrentStep(currentStep >= 2 ? 2 : currentStep + 1);
};

const prevStep = () => {
  setCurrentStep(currentStep <= 0 ? 0 : currentStep - 1);
};

<View style={styles.container}>
  <Image
    source={steps[currentStep].image}
    style={styles.stepImage}
    resizeMode="cover"
  />
  <View style={styles.stepIndicatorView}>
    {steps.map((step, index) => {
      return (
        <View
          style={{
            ...styles.stepIndicator,
            width: currentStep === index ? 40 : 30,
            backgroundColor: currentStep === index ? "#A838D7" : "gray",
          }}
        ></View>
      );
    })}
  </View>
  <Text style={styles.title}>{steps[currentStep].title}</Text>
  <Text style={styles.description}>{steps[currentStep].description}</Text>
  <View style={styles.navigationView}>
    {currentStep > 0 ? (
      <TouchableOpacity
        onPress={() => prevStep()}
        style={{
          ...styles.navigationBtn,
          borderTopEndRadius: 20,
          borderBottomEndRadius: 20,
        }}
      >
        <Text style={styles.navigationBtnTxt}>Back</Text>
      </TouchableOpacity>
    ) : (
      <View></View>
    )}

    <TouchableOpacity
      onPress={() => nextStep()}
      style={{
        ...styles.navigationBtn,
        borderTopStartRadius: 20,
        borderBottomStartRadius: 20,
      }}
    >
      <Text style={styles.navigationBtnTxt}>Next</Text>
    </TouchableOpacity>
  </View>
</View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  stepImage: {
    width: "90%",
    height: "50%",
    marginVertical: 30,
  },
  stepIndicatorView: {
    flexDirection: "row",
  },
  stepIndicator: {
    height: 10,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginVertical: 20,
  },
  description: {
    textAlign: "center",
    paddingHorizontal: 10,
  },
  navigationView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  navigationBtn: {
    backgroundColor: "#A838D7",
    height: 40,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  navigationBtnTxt: {
    color: "white",
    fontWeight: "bold",
  },
});

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from "react-native";
import { validatorLogin } from "../ultils/validations";
import { showError, showSuccess } from "../ultils/messageFunction";
import actions from "../redux/actions";
import { LoginImg } from "../public/assets";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import InputFieldCustom from "../components/InputFieldCustom";
import CustomButton from "../components/CustomButton/index.js";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../constans";
import validator from "../ultils/validations";
import { TouchableNativeFeedback } from "react-native";
import { Button } from "react-native-paper";

const LoginScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const steps = [
    {
      component: <LoginComponent />,
    },
    {
      image: require("../../assets/353617423_601011872098791_8224502694004460452_n.jpg"),
      title: "Bước 1",
      description: "Mô tả 1",
    },
    {
      image: require("../../assets/man-doing-shoes-shopping2.png"),
      title: "Bước 2",
      description: "Mô tả 2",
    },
    {
      image: require("../../assets/353617423_601011872098791_8224502694004460452_n.jpg"),
      title: "Bước 3",
      description: "Mô tả 3",
    },
  ];

  const nextStep = () => {
    setCurrentStep(
      currentStep >= steps.length - 1 ? steps.length - 1 : currentStep + 1
    );
  };

  const prevStep = () => {
    setCurrentStep(currentStep <= 0 ? 0 : currentStep - 1);
  };

  const handleLogin = () => {
    // Xử lý chức năng đăng nhập
  };

  const renderLoginComponent = () => {
    return (
      <View style={styles.loginContainer}>
        <ImageBackground style={styles.image} blurRadius={10}>
          <View
            className="flex-[1] px-[20]  justify-center pt-[0]"
            style={{ backgroundColor: Color.mainTheme }}
          >
            <View className=" ">
              <View style={{ alignItems: "center" }}>
                <Image
                  className="w-40 h-40 object-cover"
                  style={{ transform: [{ rotate: "-5deg" }] }}
                  source={LoginImg}
                />
              </View>
              <Text className="mb-[30] font-lg text-[28px] text-[#333] ">
                Đăng nhập
              </Text>

              <InputFieldCustom
                label="Username"
                placeholder="enter your username"
                value={username}
                onChangeText={(username) => updateState({ username })}
                icon={
                  <MaterialIcons
                    name="alternate-email"
                    size={20}
                    color="#666"
                    style={{ marginRight: 5 }}
                  />
                }
              />

              <InputFieldCustom
                label="Password"
                placeholder="enter your password"
                value={password}
                onChangeText={(password) => updateState({ password })}
                icon={
                  <Ionicons
                    name="ios-lock-closed-outline"
                    size={20}
                    color="#666"
                    style={{ marginRight: 5 }}
                  />
                }
                fieldButtonLabel={"Forgot?"}
                fieldButtonFunction={() => {}}
              />
              <CustomButton
                label={"Đăng nhập"}
                // onPress={onLogin}
                // isLoading={isLoading}
                // isDisable={isLoading}
              />

              <View className="mt-[1px] justify-center flex-row">
                <Text>Chưa có tài khoảng?</Text>
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate("ProfileTab", { screen: "SignupScreen" })
                    navigation.navigate("AuthTab", {
                      screen: "SignupScreen",
                    });
                  }}
                >
                  <Text className=" font-[700] text-[#AD40AF]"> Đăng ký</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const renderInformationPage = () => {
    return (
      <View style={styles.informationContainer}>
        <Image
          source={steps[currentStep].image}
          style={styles.stepImage}
          resizeMode="cover"
        />
        <View style={styles.stepIndicatorView}>
          {steps.map((step, index) => (
            <View
              key={index}
              style={{
                ...styles.stepIndicator,
                width: currentStep === index ? 40 : 30,
                backgroundColor: currentStep === index ? "#A838D7" : "gray",
              }}
            ></View>
          ))}
        </View>
        <Text style={styles.title}>{steps[currentStep].title}</Text>
        <Text style={styles.description}>{steps[currentStep].description}</Text>
        <View style={styles.navigationView}>
          {currentStep > 0 && (
            <TouchableOpacity
              onPress={() => prevStep()}
              style={{
                ...styles.navigationBtn,
                borderTopEndRadius: 20,
                borderBottomEndRadius: 20,
              }}
            >
              <Text style={styles.navigationBtnTxt}>Quay lại</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => nextStep()}
            style={{
              ...styles.navigationBtn,
              borderTopStartRadius: 20,
              borderBottomStartRadius: 20,
            }}
          >
            <Text style={styles.navigationBtnTxt}>
              {currentStep === steps.length - 1 ? "Hoàn thành" : "Tiếp tục"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Hiển thị nội dung của bước hiện tại */}
      {steps[currentStep].component ? (
        steps[currentStep].component
      ) : (
        <>
          <Image
            source={steps[currentStep].image}
            style={styles.stepImage}
            resizeMode="cover"
          />
          <View style={styles.stepIndicatorView}>
            {steps.map((step, index) => {
              return (
                <View
                  key={index}
                  style={{
                    ...styles.stepIndicator,
                    width: currentStep === index ? 40 : 30,
                    backgroundColor: currentStep === index ? "#A838D7" : "gray",
                  }}
                ></View>
              );
            })}
          </View>
          <Text style={styles.title}>{steps[currentStep].title}</Text>
          <Text style={styles.description}>
            {steps[currentStep].description}
          </Text>
        </>
      )}

      <View style={styles.navigationView}>
        {currentStep > 0 ? (
          <TouchableOpacity
            onPress={() => prevStep()}
            style={{
              ...styles.navigationBtn,
              borderTopEndRadius: 20,
              borderBottomEndRadius: 20,
            }}
          >
            <Text style={styles.navigationBtnTxt}>Back</Text>
          </TouchableOpacity>
        ) : (
          <View></View>
        )}

        <TouchableOpacity
          onPress={() => nextStep()}
          style={{
            ...styles.navigationBtn,
            borderTopStartRadius: 20,
            borderBottomStartRadius: 20,
          }}
        >
          <Text style={styles.navigationBtnTxt}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// const styles = {
//   image: {
//     flex: 1,
//     resizeMode: "cover",
//     justifyContent: "center",
//     backgroundColor: Color.mainTheme,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   stepImage: {
//     width: "90%",
//     height: "50%",
//     marginVertical: 30,
//   },
//   stepIndicatorView: {
//     flexDirection: "row",
//   },
//   stepIndicator: {
//     height: 10,
//     marginHorizontal: 5,
//     borderRadius: 10,
//   },
//   title: {
//     fontWeight: "bold",
//     fontSize: 30,
//     marginVertical: 20,
//   },
//   description: {
//     textAlign: "center",
//     paddingHorizontal: 10,
//   },
//   navigationView: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: "100%",

//   },
//   navigationBtn: {
//     backgroundColor: "#A838D7",
//     height: 40,
//     width: 80,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   navigationBtnTxt: {
//     color: "white",
//     fontWeight: "bold",
//   },
// };

export default LoginScreen;

const LoginComponent = () => {
  const [state, setState] = useState({
    isLoading: false,
    username: "",
    password: "",
    isSecure: true,
  });
  const { isLoading, username, password, isSecure } = state;

  const navigation = useNavigation();

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: "none" },
      tabBarVisible: false,
    });

    return () => {
      navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
    };
  }, [navigation]);

  const updateState = (data) => setState(() => ({ ...state, ...data }));

  const isValidData = () => {
    console.log(username);
    const error = validatorLogin({
      username,
      password,
    });
    if (error) {
      showError(error);
      return false;
    }
    return true;
  };

  const onLogin = async () => {
    const checkValid = isValidData();
    if (checkValid) {
      updateState({ isLoading: true });
      try {
        var bodyFormData = new FormData();
        bodyFormData.append("username", username);
        bodyFormData.append("password", password);

        const res = await actions.login(bodyFormData);
        showSuccess("Đăng nhập thành công");

        updateState({ isLoading: false });
        await actions.setIsLogin(true);

        navigation.navigate("HomeTab");
      } catch (error) {
        showError(error.error_message);
        await actions.setIsLogin(false);
        updateState({ isLoading: false });
      }
    }
  };
  return (
    <ImageBackground style={styles.image} blurRadius={10}>
      <View
        className="flex-[1] px-[20]  justify-center pt-[0]"
        style={{ backgroundColor: Color.mainTheme }}
      >
        <View className=" ">
          <View style={{ alignItems: "center" }}>
            <Image
              className="w-40 h-40 object-cover"
              style={{ transform: [{ rotate: "-5deg" }] }}
              source={LoginImg}
            />
          </View>
          <Text className="mb-[30] font-lg text-[28px] text-[#333] ">
            Đăng nhập
          </Text>

          <InputFieldCustom
            label="Username"
            placeholder="enter your username"
            value={username}
            onChangeText={(username) => updateState({ username })}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
          />

          <InputFieldCustom
            label="Password"
            placeholder="enter your password"
            value={password}
            onChangeText={(password) => updateState({ password })}
            icon={
              <Ionicons
                name="ios-lock-closed-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            fieldButtonLabel={"Forgot?"}
            fieldButtonFunction={() => {}}
          />
          <CustomButton
            label={"Đăng nhập"}
            onPress={onLogin}
            isLoading={isLoading}
            isDisable={isLoading}
            dis
          />

          <View className="mt-[1px] justify-center flex-row">
            <Text>Chưa có tài khoảng?</Text>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate("ProfileTab", { screen: "SignupScreen" })
                navigation.navigate("AuthTab", {
                  screen: "SignupScreen",
                });
              }}
            >
              <Text className=" font-[700] text-[#AD40AF]"> Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
