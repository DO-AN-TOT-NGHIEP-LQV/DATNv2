import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";
import { useSelector } from "react-redux";
import FlashMessage from "react-native-flash-message";
import {
  AdminMainScreen,
  CreateProductScreen,
  DetailProductScreen,
  HomeScreen,
  LoginScreen,
  ManagerProductScreen,
  ProfileScreen,
  SearchImageScreen,
  SearchTextScreen,
  ShopMainScreen,
  ShopManagerProductScreen,
  ShopSearchProductVentor,
  SignupScreen,
  UpdateProductScreen,
  ShopCreateProduct,
  ShopUpdateProductScreen,
  ShopProfileScreen,
  RegisterShopRole,
  AdminEditUsers,
} from "../screens";
import { statusbarHeight } from "../constans/Theme";
import CustomTabBarIcon from "../components/CustomTabBarIcon";
import { Color } from "../constans";
import { Keyboard } from "react-native";
// import ShopUpdateProductScreen from "../screens/Shop/ShopUpdateProductScreen";
import { hasAdminRole, hasSalerRole } from "../ultils/helperFunction";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createStackNavigator } from "@react-navigation/stack";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const Routes = () => {
  const flashMessageRef = useRef(null);

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const detailUser = useSelector((state) => state.auth.detailUser);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          gestureEnabled: false,
          tabBarStyle: [
            {
              ...styles.tabBarStyle,
              ...styles.shadow,
              display: isKeyboardOpen ? "none" : "flex",
            },
            null,
          ],
        })}
      >
        <BottomTab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <CustomTabBarIcon
                nameIcon={"home"}
                textLabel={"HOME"}
                color={color}
                size={size}
                focused={focused}
              />
            ),
          }}
        />

        <BottomTab.Screen
          name="AuthTab"
          component={AuthStackNavigator}
          options={{
            tabBarStyle: { display: "none" },
            tabBarButton: () => null,
          }}
        />

        <BottomTab.Screen
          name="SearchTab"
          component={SearchStackNavigator}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <CustomTabBarIcon
                nameIcon={"search1"}
                textLabel={"SEARCH"}
                color={color}
                size={size}
                focused={focused}
              />
            ),
          }}
        />

        {/* <BottomTab.Screen
          name="AdminTab"
          component={AdminManagerStackNavigator}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <CustomTabBarIcon
                nameIcon={"appstore-o"}
                textLabel={"ADMIN"}
                color={color}
                size={size}
                focused={focused}
              />
            ),
          }}
        /> */}

        {detailUser?.roles && hasAdminRole(detailUser?.roles) && (
          <BottomTab.Screen
            name="AdminTab"
            component={AdminManagerStackNavigator}
            options={{
              tabBarIcon: ({ color, size, focused }) => (
                <CustomTabBarIcon
                  nameIcon={"appstore-o"}
                  textLabel={"ADMIN"}
                  color={color}
                  size={size}
                  focused={focused}
                />
              ),
            }}
          />
        )}

        {detailUser?.roles && hasSalerRole(detailUser?.roles) && (
          <BottomTab.Screen
            name="ShopTab"
            component={SalerManagerStackNavigator}
            options={{
              tabBarIcon: ({ color, size, focused }) => (
                <CustomTabBarIcon
                  nameIcon={"shoppingcart"}
                  textLabel={"MY SHOP"}
                  color={color}
                  size={size}
                  focused={focused}
                />
              ),
            }}
          />
        )}

        <BottomTab.Screen
          name="SettingTab"
          component={SettingStackNavigator}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <CustomTabBarIcon
                nameIcon={"setting"}
                textLabel={"SETTING"}
                color={color}
                size={size}
                focused={focused}
              />
            ),
          }}
        />

        {/* Differin Screen */}
        {/* Login */}
        {/* <BottomTab.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            tabBarButton: () => null,
            tabBarStyle: { display: "none" },
          }}
        />
        <BottomTab.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{
            tabBarStyle: { display: "none" },
            tabBarButton: () => null,
          }}
        /> */}

        {/* <BottomTab.Screen
          name="DetailProduct"
          component={DetailProductScreen}
          options={{
            tabBarStyle: { display: "none" },
            tabBarButton: () => null,
          }}
        /> */}

        {/* Main product */}
        {/* <BottomTab.Screen
          name="CreateProductScreen"
          component={CreateProductScreen}
          options={{
            tabBarStyle: { display: "none" },
            tabBarButton: () => null,
          }}
        /> */}

        <BottomTab.Screen
          name="ManagerProductScreen"
          component={ManagerProductScreen}
          options={{
            tabBarStyle: { display: "none" },
            tabBarButton: () => null,
          }}
        />

        <BottomTab.Screen
          name="UpdateProductScreen"
          component={UpdateProductScreen}
          options={{
            tabBarStyle: { display: "none" },
            tabBarButton: () => null,
          }}
        />
        <BottomTab.Screen
          name="ShopCreateProduct"
          component={ShopCreateProduct}
          options={{
            tabBarStyle: { display: "none" },
            tabBarButton: () => null,
          }}
        />
      </BottomTab.Navigator>

      <FlashMessage
        refs={flashMessageRef}
        position="top"
        style={{ zIndex: 100, ...statusbarHeight }}
      />
    </NavigationContainer>
  );
};

export default Routes;

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

// const AuthNavigator = createNativeStackNavigator();
const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
      initialRouteName="LoginScreen"
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: () => null,
          tabBarVisible: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{
          gestureEnabled: false,
          tabBarStyle: { display: "none" },
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

const SettingNavigator = createNativeStackNavigator();
const SettingStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
      initialRouteName="ProfileScreen"
    >
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          gestureEnabled: false,
          tabBarStyle: { display: "none" },
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />

      <Stack.Screen
        name="RegisterShopRole"
        component={RegisterShopRole}
        tabBarOptions={{
          style: {
            display: "none",
          },
          keyboardHidesTabBar: true,
        }}
      />

      <Stack.Screen
        name="AdminEditUsers"
        component={AdminEditUsers}
        tabBarOptions={{
          style: {
            display: "none",
          },
          keyboardHidesTabBar: true,
        }}
      />
      {/* <SettingNavigator.Screen
        name="Auth"
        component={AuthStackNavigator}
        // options={{
        //   tabBarStyle: { display: "none" },
        //   tabBarButton: () => null,
        // }}
      /> */}
    </Stack.Navigator>
  );
};

const SearchNavigator = createNativeStackNavigator();
const SearchStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
      initialRouteName="SearchText"
    >
      <Stack.Screen
        name="SearchImage"
        component={SearchImageScreen}
        tabBarOptions={{
          style: {
            display: "none",
          },
          keyboardHidesTabBar: true,
        }}
      />
      <Stack.Screen
        name="SearchText"
        component={SearchTextScreen}
        tabBarOptions={{
          style: {
            display: "none",
          },
          keyboardHidesTabBar: true,
        }}
      />

      <Stack.Screen
        name="DetailProduct"
        component={DetailProductScreen}
        tabBarOptions={{
          style: {
            display: "none",
          },
          keyboardHidesTabBar: true,
        }}
      />

      <Stack.Screen name="ShopCreateProduct" component={ShopCreateProduct} />
    </Stack.Navigator>
  );
};

// const AdminSalerManagerNavigator = createNativeStackNavigator();
const AdminManagerStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="AdminMainScreen"
    >
      <Stack.Screen name="AdminMainScreen" component={AdminMainScreen} />

      <Stack.Screen
        name="CreateProductScreen"
        component={CreateProductScreen}
        tabBarOptions={{
          style: {
            display: "none",
          },
          keyboardHidesTabBar: true,
        }}
      />

      <Stack.Screen
        name="ManagerProductScreen"
        component={ManagerProductScreen}
        tabBarOptions={{
          style: {
            display: "none",
          },
          keyboardHidesTabBar: true,
        }}
      />

      <Stack.Screen
        name="DetailProduct"
        component={DetailProductScreen}
        tabBarOptions={{
          style: {
            display: "none",
          },
          keyboardHidesTabBar: true,
        }}
      />

      <Stack.Screen
        name="UpdateProductScreen"
        component={UpdateProductScreen}
        tabBarOptions={{
          style: {
            display: "none",
          },
          keyboardHidesTabBar: true,
        }}
      />
    </Stack.Navigator>
  );
};

const SalerManagerNavigator = createNativeStackNavigator();
const SalerManagerStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
      initialRouteName="ShopMainScreen"
    >
      <Stack.Screen
        name="ShopMainScreen"
        component={ShopMainScreen}
        // options={{ tabBarVisible: true }}
      />
      <Stack.Screen
        name="ShopManagerProductScreen"
        component={ShopManagerProductScreen}
      />
      {/* <Stack.Screen name="ShopCreateProduct" component={ShopCreateProduct} /> */}

      <Stack.Screen
        name="ShopSearchProductVentor"
        component={ShopSearchProductVentor}
      />

      <Stack.Screen
        name="ShopUpdateProductScreen"
        component={ShopUpdateProductScreen}
      />

      <Stack.Screen name="ShopProfileScreen" component={ShopProfileScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  tabBarStyle: {
    bottom: 0,
    position: "relative",
    borderTopColor: "#3333",
    borderTopWidth: 2,
    elevation: 0,
    backgroundColor: Color.white,
  },
  customTabBarButton: {
    bottom: -10,
    backgroundColor: Color.white,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Color.white,
    borderTopColor: "#3333",
  },
});
